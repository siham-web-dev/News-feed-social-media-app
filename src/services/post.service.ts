import { db } from "@/db";
import { Post, Profile, User } from "@/db/schemas";
import { desc, eq, InferSelectModel } from "drizzle-orm";

class PostService {
  async getAllPosts({
    page = 1,
    pageSize = 10,
  }: {
    page?: number;
    pageSize?: number;
  }): Promise<{
    result: {
      posts: InferSelectModel<typeof Post>;
      users: InferSelectModel<typeof User> | null;
      profiles: InferSelectModel<typeof Profile>;
    }[];
    nextPage: number | null;
  }> {
    const offset = (page - 1) * pageSize;

    const result = await db
      .select()
      .from(Post)
      .leftJoin(User, eq(User.id, Post.userUuid))
      .innerJoin(Profile, eq(Profile.userId, User.id))
      .orderBy(desc(Post.createdAt))
      .limit(pageSize)
      .offset(offset);

    const nextPage = result.length === pageSize ? page + 1 : null;

    return { result, nextPage };
  }

  public async creatPost(content: string, userUuid: string) {
    await db.insert(Post).values({
      id: crypto.randomUUID(),
      content,
      userUuid,
      createdAt: new Date(),
    });
  }

  public async editPost(id: string, content: string) {
    await db
      .update(Post)
      .set({
        content,
      })
      .where(eq(Post.id, id));
  }

  public async deletePost(id: string) {
    await db.delete(Post).where(eq(Post.id, id));
  }
}

export default PostService;
