"use server";

import { HUMANIZED_MESSAGES } from "@/lib/constants";
import { NotificationType } from "@/lib/dtos/notification.dto";
import AuthService from "@/services/auth.service";
import { CommentService } from "@/services/comment.service";
import { NotificationService } from "@/services/notification.service";
import PostService from "@/services/post.service";
import UserService from "@/services/user.service";
import { randomUUID } from "crypto";

const commentService = new CommentService();
const postService = new PostService();
const notificationService = new NotificationService();
const userService = new UserService();

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

    const post = await postService.getPostById(postId);

    if (post?.userUuid !== user.id) {
      const senderProfile = await userService.getProfileByUserId(user.id);

      await notificationService.createAndSendNotification({
        receiverUuid: post?.userUuid ?? "",
        type: NotificationType.COMMENT,
        sender: {
          uuid: user.id,
          displayName: senderProfile?.displayName || "",
        },
        content: `${post?.content.substring(0, 10)} ...`,
        refrenceUuid: postId,
        id: randomUUID(),
      });
    }
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};
