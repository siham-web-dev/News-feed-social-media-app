import { auth } from "@/lib/auth";
import { Session } from "lucia";
import { cache } from "react";
import { cookies } from "next/headers";
import { SessionValidation } from "@/lib/types/session";
import UserService from "./user.service";

const userService = new UserService();

class AuthService {
  public static async createSession(userId: string) {
    const session = await auth.createSession(userId, { userId: userId });
    return session;
  }
  public static async createCookieSession(session: Session) {
    const sessionCookie = auth.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }

  public static async createBlankSession() {
    const sessionCookie = auth.createBlankSessionCookie();
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }

  public static async validateSession(): SessionValidation {
    return await cache(async (): SessionValidation => {
      const sessionId =
        (await cookies()).get(auth.sessionCookieName)?.value ?? null;
      if (!sessionId) {
        return {
          user: null,
          session: null,
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await auth.validateSession(sessionId);

      if (result.session && result.session.fresh) {
        await this.createCookieSession(result.session);
      }

      if (!result.session) {
        await this.createBlankSession();
      }

      if (result.user) {
        const profile = await userService.getProfileByUserId(result.user.id);

        if (profile) {
          result.user.profile = {
            displayName: profile?.displayName,
            avatarUrl: profile?.avatarUrl,
            bio: profile?.bio,
          };
        }
      }

      return result;
    })();
  }
}

export default AuthService;
