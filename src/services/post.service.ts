import { db } from "@/db";
import { Post, Profile, User } from "@/db/schemas";
import { desc, eq, InferSelectModel } from "drizzle-orm";

class PostService {
  public async getAllPosts(): Promise<
    {
      posts: InferSelectModel<typeof Post>;
      users: InferSelectModel<typeof User> | null;
      profiles: InferSelectModel<typeof Profile>;
    }[]
  > {
    const result = await db
      .select()
      .from(Post)
      .leftJoin(User, eq(User.id, Post.userUuid))
      .innerJoin(Profile, eq(Profile.userId, User.id))
      .orderBy(desc(Post.createdAt));

    return result;
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
