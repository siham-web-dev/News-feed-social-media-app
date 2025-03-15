import { db } from "@/db";
import { Profile, User } from "@/db/schemas";
import { eq, ne } from "drizzle-orm";

class NetworkService {
  async getSugesstions(userId: string) {
    const result = await db
      .select({
        id: User.id,
        username: User.username,
        displayName: Profile.displayName,
        avatarUrl: Profile.avatarUrl,
      })
      .from(User)
      .where(ne(User.id, userId))
      .leftJoin(Profile, eq(User.id, Profile.userId));

    return result;
  }
}

export default NetworkService;
