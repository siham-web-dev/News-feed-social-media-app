"use server";
import { HUMANIZED_MESSAGES } from "@/lib/constants";
import { PostFilterDto, PostDto } from "@/lib/dtos/post.dto";
import { ActionResult, PostPagination } from "@/lib/types/response";
import { PostSchema } from "@/lib/validators/post.validators";
import AuthService from "@/services/auth.service";
import PostService from "@/services/post.service";

const postService = new PostService();

export const savePost = async ({ postUuid }: { postUuid: string }) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    console.log("hello im trying to save post " + user.id);

    await postService.savePost({
      postUuid,
      userUuid: user.id,
    });
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const isSavedByCurrentUser = async ({
  postUuid,
}: {
  postUuid: string;
}) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const result = await postService.isSavedByUser({
      postUuid,
      userUuid: user.id,
    });

    return { isSaved: result };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const unSavePost = async ({ postUuid }: { postUuid: string }) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await postService.unSavePost({
      postUuid,
      userUuid: user.id,
    });
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const getAllPosts = async ({
  page,
  size,
}: PostFilterDto): PostPagination => {
  return await postService.getPosts({ size, page });
};

export const getAllCurrentUserPosts = async ({
  page,
  size,
}: PostFilterDto): PostPagination => {
  const { user } = await AuthService.validateSession();
  return await postService.getPosts({ size, page, userUuid: user?.id });
};

export const getAllPostsByUserUuid = async ({
  page,
  size,
  userUuid,
}: PostFilterDto): PostPagination => {
  return await postService.getPosts({ size, page, userUuid });
};

export const getAllSavedPosts = async ({
  page,
  size,
}: PostFilterDto): PostPagination => {
  const { user } = await AuthService.validateSession();
  return await postService.getAllSavedPosts({ size, page, userUuid: user?.id });
};

export const getPostsByUserUuid = async ({
  page,
  size,
  userUuid,
}: PostFilterDto): PostPagination => {
  return await postService.getPosts({ size, page, userUuid });
};

export const createPost = async (postDto: PostDto): Promise<ActionResult> => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const formData = PostSchema.parse(postDto);

    await postService.creatPost(formData.content, user?.id);

    return { success: "The post was created successfully !" };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const editPost = async (
  uuid: string,
  postDto: PostDto
): Promise<ActionResult> => {
  try {
    const formData = PostSchema.parse(postDto);

    await postService.editPost(uuid, formData.content);

    return { success: "The post was updated successfully !", data: formData };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const deletePost = async (uuid: string): Promise<ActionResult> => {
  try {
    await postService.deletePost(uuid);

    return { success: "The post was deleted successfully !" };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};
