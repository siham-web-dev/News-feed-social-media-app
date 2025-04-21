"use server";

import { HUMANIZED_MESSAGES } from "@/lib/constants";
import AuthService from "@/services/auth.service";
import NetworkService from "@/services/network.service";
import UserService from "@/services/user.service";
import { NotificationService } from "@/services/notification.service";
import { randomUUID } from "crypto";
import { NotificationType } from "@/lib/dtos/notification.dto";
import PusherServer from "@/lib/pusherServer";

const networkService = new NetworkService();
const notificationService = new NotificationService();
const userService = new UserService();

export const getUsersSugesstions = async () => {
  const { user } = await AuthService.validateSession();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const sugesstions = await networkService.getSugesstions(user.id);

  return sugesstions;
};

export const isFollowedByCurrentUser = async ({
  userUuid,
}: {
  userUuid: string;
}) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const isFollowedBy = await networkService.isFollowedBy({
      followingUuid: userUuid,
      userUuid: user.id,
    });

    return { isFollowedBy };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const follow = async ({ userUuid }: { userUuid: string }) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await networkService.follow({
      followingUuid: userUuid,
      userUuid: user.id,
    });

    const userProfile = await userService.getProfileByUserId(user.id);

    await notificationService.createAndSendNotification({
      receiverUuid: userUuid,
      type: NotificationType.FOLLOW,
      sender: {
        uuid: user.id,
        displayName: userProfile?.displayName || "",
      },
      content: `${userProfile?.displayName} started following you`,
      id: randomUUID(),
    });

    // notify the user about the new follow
    PusherServer.getInstance().trigger(
      `notification-channel-${userUuid}`,
      "new-notification",
      {
        content: `${userProfile?.displayName} started following you`,
        avatarUrl: userProfile?.avatarUrl,
        displayName: userProfile?.displayName,
      }
    );

    PusherServer.getInstance().trigger(
      `notification-count-${userUuid}`,
      "count-unread-notifications",
      {}
    );
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const unFollow = async ({ userUuid }: { userUuid: string }) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await networkService.unFollow({
      followingUuid: userUuid,
      userUuid: user.id,
    });

    const notifications = await notificationService.getNotifications({
      receiverUuid: userUuid,
      senderUuid: user.id,
    });

    if (
      notifications?.length > 0 &&
      notifications[0].type === NotificationType.FOLLOW
    ) {
      await notificationService.deleteNotification(notifications[0].id);

      PusherServer.getInstance().trigger(
        `notification-count-${userUuid}`,
        "count-unread-notifications",
        {}
      );
    }
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};
