import { db } from "@/db";
import { Post, SavedPost } from "@/db/schemas";
import { PostFilterDto } from "@/lib/dtos/post.dto";
import { PostPagination } from "@/lib/types/response";
import { eq } from "drizzle-orm";

class PostService {
  async getAllSavedPosts(filterDto: PostFilterDto): PostPagination {
    const { page = 1, size = 10 } = filterDto;
    const offset = (page - 1) * size;

    if (!filterDto.userUuid) {
      throw new Error("Can't get saved posts without knowing the user");
    }

    const result = await db.query.SavedPost.findMany({
      where: eq(SavedPost.userUuid, filterDto.userUuid),
      offset: offset,
      limit: size,
      with: {
        post: {
          with: {
            user: {
              with: {
                profile: true,
              },
            },
          },
        },
      },
    });

    const formattedResult = result.map((value) => ({
      ...value.post,
      user: value.post.user,
    }));

    const nextPage = result.length === size ? page + 1 : null;

    return { result: formattedResult, nextPage };
  }

  async getPosts(filterDto: PostFilterDto): PostPagination {
    const { page = 1, size = 10 } = filterDto;
    const offset = (page - 1) * size;

    const result = await db.query.Post.findMany({
      limit: size,
      offset: offset,
      with: {
        user: {
          with: {
            profile: true,
          },
        },
      },
      where: filterDto.userUuid
        ? eq(Post.userUuid, filterDto.userUuid)
        : undefined,
    });

    const nextPage = result.length === size ? page + 1 : null;

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
