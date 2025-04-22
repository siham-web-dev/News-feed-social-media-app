"use client";
import pusherClient from "@/lib/pusherClient";
import { useEffect } from "react";
import { useSession } from "./SessionProvider";
import { NotificationMetaData } from "@/lib/dtos/notification.dto";
import useMessages from "@/lib/hooks/useMessages";
import { useQueryClient } from "@tanstack/react-query";

const NotificationListener = () => {
  const { user } = useSession();
  const { showMessage } = useMessages();
  const queryClient = useQueryClient();

  useEffect(() => {
    const notificationsChannel = pusherClient.subscribe(
      `notification-channel-${user?.id}`
    );
    const countUnreadNChannel = pusherClient.subscribe(
      `notification-count-${user?.id}`
    );

    notificationsChannel.bind(
      "new-notification",
      (data: NotificationMetaData) => {
        showMessage(data.content, "notifications", {
          avatarUrl: data.avatarUrl,
          displayName: data.displayName,
          content: data.content,
        });
      }
    );

    countUnreadNChannel.bind("count-unread-notifications", () => {
      queryClient.invalidateQueries({
        queryKey: [`count-unread-notifications-${user?.id}`],
      });

      queryClient.invalidateQueries({
        queryKey: [`notifications-${user?.id}`],
      });
    });

    return () => {
      pusherClient.unsubscribe(`notification-channel-${user?.id}`);
      pusherClient.unsubscribe(`notification-count-${user?.id}`);
    };
  }, []);

  return <></>;
};

export default NotificationListener;
