import { db } from "@/db";
import { Session } from "@/db/schemas/session.schema";
import { User } from "@/db/schemas/user.schema";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";

const adapter = new DrizzlePostgreSQLAdapter(db, Session, User);

declare module "lucia" {
  interface Register {
    Lucia: typeof Lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }

  interface DatabaseUserAttributes {
    id: string;
    username: string;
    profile?: {
      bio: string | null;
      avatarUrl: string;
      displayName: string;
    };
  }
}

export const auth = new Lucia(adapter, {
  getUserAttributes(databaseUserAttributes) {
    return {
      id: databaseUserAttributes.id,
      userName: databaseUserAttributes.username,
      profile: databaseUserAttributes.profile || null,
    };
  },
});
