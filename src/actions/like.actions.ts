"use server";

import { HUMANIZED_MESSAGES } from "@/lib/constants";
import { NotificationType } from "@/lib/dtos/notification.dto";
import PusherServer from "@/lib/pusherServer";
import AuthService from "@/services/auth.service";
import { LikeService } from "@/services/like.service";
import { NotificationService } from "@/services/notification.service";
import PostService from "@/services/post.service";
import UserService from "@/services/user.service";
import { randomUUID } from "crypto";

const likeService = new LikeService();
const postService = new PostService();
const notificationService = new NotificationService();
const userService = new UserService();

export const isLikedByCurrentUser = async ({
  postUuid,
}: {
  postUuid: string;
}) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const isLikedBy = await likeService.isLikedBy({
      postUuid,
      userUuid: user.id,
    });

    return { isLikedBy };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const getLikes = async ({ postUuid }: { postUuid: string }) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const likes = await likeService.getLikes(postUuid);

    return { likes };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const likePost = async ({ postUuid }: { postUuid: string }) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await likeService.like({
      postUuid,
      userUuid: user.id,
    });

    const post = await postService.getPostById(postUuid);

    if (post?.userUuid !== user.id) {
      const senderProfile = await userService.getProfileByUserId(user.id);

      await notificationService.createAndSendNotification({
        receiverUuid: post?.userUuid ?? "",
        type: NotificationType.LIKE,
        sender: {
          uuid: user.id,
          displayName: senderProfile?.displayName || "",
        },
        content: `${
          senderProfile?.displayName
        } liked your post "${post?.content.substring(0, 30)} ..."`,
        refrenceUuid: postUuid,
        id: randomUUID(),
      });

      // Notify the receiver about the new notification
      PusherServer.getInstance().trigger(
        `notification-channel-${post?.userUuid}`,
        "new-notification",
        {
          content: `${senderProfile?.displayName} liked your post`,
          avatarUrl: senderProfile?.avatarUrl,
          displayName: senderProfile?.displayName,
        }
      );

      PusherServer.getInstance().trigger(
        `notification-count-${post?.userUuid}`,
        "count-unread-notifications",
        {}
      );
    }
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const unLikePost = async ({ postUuid }: { postUuid: string }) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await likeService.unlike({
      postUuid,
      userUuid: user.id,
    });

    const post = await postService.getPostById(postUuid);

    const notification = await notificationService.getNotifications({
      receiverUuid: post?.userUuid ?? "",
      senderUuid: user.id,
      refrenceUuid: postUuid,
    });

    if (
      notification?.length > 0 &&
      notification[0].type === NotificationType.LIKE
    ) {
      await notificationService.deleteNotification(notification[0].id);

      PusherServer.getInstance().trigger(
        `notification-count-${post?.userUuid}`,
        "count-unread-notifications",
        {}
      );
    }
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};
