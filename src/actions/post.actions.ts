"use server";
import { HUMANIZED_MESSAGES } from "@/lib/constants";
import { PostDto } from "@/lib/dtos/post.dto";
import { ActionResult } from "@/lib/types/response";
import { PostSchema } from "@/lib/validators/post.validators";
import AuthService from "@/services/auth.service";
import PostService from "@/services/post.service";

const postService = new PostService();

export const getAllPosts = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  return await postService.getAllPosts({ pageSize: size, page });
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
