import { db } from "@/db";
import { Profile, User, UserFollowings } from "@/db/schemas";
import { NetworkDto } from "@/lib/dtos/network.dto";
import { and, eq, ne, notInArray } from "drizzle-orm";

class NetworkService {
  async getSugesstions(userId: string) {
    const suggestions = await db
      .select()
      .from(User)
      .where(
        and(
          notInArray(
            User.id,
            db
              .select({ id: UserFollowings.followingId })
              .from(UserFollowings)
              .where(eq(UserFollowings.userUuid, userId))
          ),
          ne(User.id, userId)
        )
      )
      .limit(10)
      .leftJoin(Profile, eq(User.id, Profile.userId));

    return suggestions;
  }

  async isFollowedBy(dto: NetworkDto): Promise<boolean> {
    const result = await db.query.UserFollowings.findFirst({
      where: and(
        eq(UserFollowings.userUuid, dto.userUuid),
        eq(UserFollowings.followingId, dto.followingUuid)
      ),
    });

    return !!result;
  }

  async follow(dto: NetworkDto) {
    await db.insert(UserFollowings).values({
      userUuid: dto.userUuid,
      followingId: dto.followingUuid,
    });
  }

  async unFollow(dto: NetworkDto) {
    await db
      .delete(UserFollowings)
      .where(
        and(
          eq(UserFollowings.userUuid, dto.userUuid),
          eq(UserFollowings.followingId, dto.followingUuid)
        )
      );
  }
}

export default NetworkService;
