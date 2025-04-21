"use server";

import { HUMANIZED_MESSAGES } from "@/lib/constants";
import { ActionResult } from "@/lib/types/response";
import AuthService from "@/services/auth.service";
import { NotificationService } from "@/services/notification.service";

const notificationService = new NotificationService();

export const countUnreadNotifications = async () => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const count = await notificationService.countUnreadNotifications(user.id);

    return { count };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const getNotifications = async () => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const notifications = await notificationService.getNotifications(
      {
        receiverUuid: user.id,
        isRead: false,
      },
      true
    );

    return { notifications };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const markAsRead = async (
  notificationId: string
): Promise<ActionResult> => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await notificationService.markAsRead(notificationId);

    return { success: "The notification marked as read" };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};
