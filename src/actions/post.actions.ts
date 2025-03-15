"use server";
import { HUMANIZED_MESSAGES } from "@/lib/constants";
import { PostDto } from "@/lib/dtos/post.dto";
import { ActionResult } from "@/lib/types/response";
import { PostSchema } from "@/lib/validators/post.validators";
import AuthService from "@/services/auth.service";
import PostService from "@/services/post.service";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

const postService = new PostService();

export const getAllPosts = async () => {
  return await postService.getAllPosts();
};

export const createPost = async (postDto: PostDto): Promise<ActionResult> => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const formData = PostSchema.parse(postDto);

    await postService.creatPost(formData.content, user?.id);

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error instanceof Error) {
      console.error(error.stack);
    } else {
      console.error(error);
    }
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

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error instanceof Error) {
      console.error(error.stack);
    } else {
      console.error(error);
    }
    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const deletePost = async (uuid: string): Promise<ActionResult> => {
  try {
    await postService.deletePost(uuid);

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error instanceof Error) {
      console.error(error.stack);
    } else {
      console.error(error);
    }
    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};
