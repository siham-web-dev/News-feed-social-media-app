import { db } from "@/db";
import { Post, SavedPost } from "@/db/schemas";
import { PostFilterDto, SavedPostDto } from "@/lib/dtos/post.dto";
import { PostPagination, PostResult } from "@/lib/types/response";
import { and, desc, eq } from "drizzle-orm";

class PostService {
  private readonly relations = {
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
  };

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
          with: this.relations,
        },
      },
    });

    const formattedResult = result.map((value) => ({
      ...value.post,
      user: {
        ...value.post.user,
        profile: { ...value.post.user.profile },
      },
    }));

    const nextPage = result.length === size ? page + 1 : null;

    return { result: formattedResult as unknown as PostResult[], nextPage };
  }

  async getPosts(filterDto: PostFilterDto): PostPagination {
    const { page = 1, size = 10 } = filterDto;
    const offset = (page - 1) * size;

    const result = await db.query.Post.findMany({
      limit: size,
      offset: offset,
      with: this.relations,
      where: filterDto.userUuid
        ? eq(Post.userUuid, filterDto.userUuid)
        : undefined,
      orderBy: desc(Post.createdAt),
    });

    const nextPage = result.length === size ? page + 1 : null;

    return { result: result as unknown as PostResult[], nextPage };
  }

  public async creatPost(content: string, userUuid: string) {
    await db.insert(Post).values({
      id: crypto.randomUUID(),
      content,
      userUuid,
      createdAt: new Date(),
    });
  }

  public async isSavedByUser(dto: SavedPostDto) {
    const result = await db.query.SavedPost.findFirst({
      where: and(
        eq(SavedPost.postId, dto.postUuid),
        eq(SavedPost.userUuid, dto.userUuid)
      ),
    });

    return !!result;
  }

  public async savePost(dto: SavedPostDto) {
    console.log("hello im saving the post ..");

    await db.insert(SavedPost).values({
      userUuid: dto.userUuid,
      postId: dto.postUuid,
    });
  }

  public async unSavePost(dto: SavedPostDto) {
    await db
      .delete(SavedPost)
      .where(
        and(
          eq(SavedPost.postId, dto.postUuid),
          eq(SavedPost.userUuid, dto.userUuid)
        )
      );
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
