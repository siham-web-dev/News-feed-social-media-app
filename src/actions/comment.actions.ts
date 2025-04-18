"use server";

import { HUMANIZED_MESSAGES } from "@/lib/constants";
import AuthService from "@/services/auth.service";
import { CommentService } from "@/services/comment.service";

const commentService = new CommentService();

export const getComments = async ({ postId }: { postId: string }) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const comments = await commentService.getCommentsByPostUuid(postId);

    return { comments };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const addNewComment = async ({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await commentService.addComment({
      content,
      postId,
      userUuid: user.id,
    });
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};
