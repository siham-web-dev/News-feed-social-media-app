import { db } from "@/db";
import { Session } from "@/db/schemas/session.schema";
import { User } from "@/db/schemas/user.schema";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import UserService from "@/services/user.service";

const adapter = new DrizzlePostgreSQLAdapter(db, Session, User);
const userService = new UserService();

export const auth = new Lucia(adapter, {
  getSessionAttributes: async function (attributes) {
    // Fetch user data from database
    const user = await userService.findUser({
      id: attributes.userId,
    });

    if (!user) return { user: null };
    const profile = await userService.getProfileByUserId(user.id);

    return {
      user: {
        id: user.id,
        userName: user.username,
        profile: profile
          ? {
              avatarUrl: profile.avatarUrl,
              displayName: profile.displayName,
            }
          : null,
      },
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof Lucia;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
  }

  interface DatabaseSessionAttributes {
    userId: string;
  }
}
