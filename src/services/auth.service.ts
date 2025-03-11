import { auth } from "@/lib/auth";
import { Session } from "lucia";
import { cache } from "react";
import { cookies } from "next/headers";
import { SessionValidation } from "@/lib/types/session";

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

      const result = await auth.validateSession(sessionId);
      // next.js throws when you attempt to set cookie when rendering page
      try {
        if (result.session && result.session.fresh) {
          await this.createCookieSession(result.session);
        }
        if (!result.session) {
          await this.createBlankSession();
        }
      } catch {}
      return result;
    })();
  }
}

export default AuthService;
