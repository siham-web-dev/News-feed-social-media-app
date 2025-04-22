/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { Notification } from "@/db/schemas";
import {
  GetNotificationDto,
  NotificationDTO,
  NotificationType,
} from "@/lib/dtos/notification.dto";
import { sendBeamsNotification } from "@/lib/sendBeamsNotification";
import { and, count, eq, sql } from "drizzle-orm";

export class NotificationService {
  async markAsRead(notificationId: string) {
    const notification = await db.query.Notification.findFirst({
      where: eq(Notification.id, notificationId),
    });

    if (!notification) {
      throw new Error("Notification not found");
    }

    await db
      .update(Notification)
      .set({ isRead: true })
      .where(eq(Notification.id, notificationId));
  }

  async countUnreadNotifications(userId: string) {
    const result = await db
      .select({
        count: count(),
      })
      .from(Notification)
      .where(
        and(
          eq(Notification.receiverUuid, userId),
          eq(Notification.isRead, false)
        )
      );

    return result[0].count;
  }

  async createAndSendNotification(notificationDTO: NotificationDTO) {
    const { receiverUuid, type, sender, content } = notificationDTO;
    const values: any = {
      id: crypto.randomUUID(),
      type,
      content,
      senderUuid: sender.uuid,
      receiverUuid,
    };

    if (type === NotificationType.COMMENT || NotificationType.LIKE) {
      values.metaData = { refrenceUuid: notificationDTO.refrenceUuid };
    }

    await db.insert(Notification).values(values);

    await sendBeamsNotification({
      userId: receiverUuid,
      type,
      fromUser: { displayName: sender.displayName },
      content,
    });
  }

  async getNotifications(dto: GetNotificationDto, filter = false) {
    const whereClause = [eq(Notification.receiverUuid, dto.receiverUuid)];

    if (dto.refrenceUuid) {
      whereClause.push(sql`meta_data ->> 'refrenceUuid' = ${dto.refrenceUuid}`);
    }

    if (dto.senderUuid) {
      whereClause.push(eq(Notification.senderUuid, dto.senderUuid));
    }

    if (filter) {
      whereClause.push(eq(Notification.isRead, dto.isRead ?? false));
    }

    const notifications = await db.query.Notification.findMany({
      where: and(...whereClause),
      with: {
        sender: {
          with: {
            profile: true,
          },
        },
      },
    });

    return notifications;
  }

  async deleteNotification(notificationId: string) {
    const notification = await db.query.Notification.findFirst({
      where: eq(Notification.id, notificationId),
    });

    if (!notification) {
      throw new Error("Notification not found");
    }

    await db.delete(Notification).where(eq(Notification.id, notificationId));
  }
}
