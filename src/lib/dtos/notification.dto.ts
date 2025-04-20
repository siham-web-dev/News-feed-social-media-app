export enum NotificationType {
  LIKE = "like",
  COMMENT = "comment",
  FOLLOW = "follow",
}

export interface NotificationDTO {
  id: string;
  type: NotificationType;
  content?: string;
  sender: {
    uuid: string;
    displayName: string;
  };
  receiverUuid: string;
  refrenceUuid?: string | null;
}

export interface GetNotificationDto {
  receiverUuid: string;
  senderUuid: string;
  refrenceUuid?: string;
}

export interface NotificationMetaData {
  avatarUrl: string;
  displayName: string;
  content: string;
}
