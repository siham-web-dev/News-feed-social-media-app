/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { Notification } from "@/db/schemas";
import {
  GetNotificationDto,
  NotificationDTO,
  NotificationType,
} from "@/lib/dtos/notification.dto";
import { sendBeamsNotification } from "@/lib/sendBeamsNotification";
import { and, eq, sql } from "drizzle-orm";

export class NotificationService {
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

  async getNotifications(dto: GetNotificationDto) {
    const whereClause = [
      eq(Notification.receiverUuid, dto.receiverUuid),
      eq(Notification.senderUuid, dto.senderUuid),
    ];

    if (dto.refrenceUuid) {
      whereClause.push(sql`meta_data ->> 'refrenceUuid' = ${dto.refrenceUuid}`);
    }

    const notifications = await db.query.Notification.findFirst({
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
