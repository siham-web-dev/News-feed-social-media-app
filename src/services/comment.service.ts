import { db } from "@/db";
import { Comment } from "@/db/schemas";
import { CreateCommentDto } from "@/lib/dtos/comment.dto";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export class CommentService {
  async addComment(dto: CreateCommentDto) {
    await db.insert(Comment).values({
      ...dto,
      uuid: randomUUID(),
    });
  }

  async getCommentsByPostUuid(postId: string) {
    return await db.query.Comment.findMany({
      where: eq(Comment.postId, postId),
      with: {
        user: {
          with: {
            profile: {
              columns: {
                displayName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });
  }
}
