import { db } from "@/db";
import { LikedPost } from "@/db/schemas";
import { LikePostDto } from "@/lib/dtos/like.dto";
import { LikedByResult } from "@/lib/types/response";
import { and, eq } from "drizzle-orm";

export class LikeService {
  async isLikedBy(dto: LikePostDto): Promise<boolean> {
    const result = await db.query.LikedPost.findFirst({
      where: and(
        eq(LikedPost.postId, dto.postUuid),
        eq(LikedPost.userUuid, dto.userUuid)
      ),
    });

    return !!result;
  }

  async getLikes(postUuid: string): Promise<LikedByResult> {
    const result = await db.query.LikedPost.findMany({
      where: eq(LikedPost.postId, postUuid),
      with: {
        user: {
          with: {
            profile: true,
          },
        },
      },
    });

    const formattedResult = result.map((value) => ({
      user: value.user,
    }));

    return formattedResult as LikedByResult;
  }
  async like(dto: LikePostDto) {
    await db.insert(LikedPost).values({
      postId: dto.postUuid,
      userUuid: dto.userUuid,
    });
  }

  async unlike(dto: LikePostDto) {
    await db
      .delete(LikedPost)
      .where(
        and(
          eq(LikedPost.postId, dto.postUuid),
          eq(LikedPost.userUuid, dto.userUuid)
        )
      );
  }
}
