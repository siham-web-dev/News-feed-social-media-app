"use client";
import pusherClient from "@/lib/pusher";
import { useEffect } from "react";
import { useSession } from "./SessionProvider";
import { NotificationMetaData } from "@/lib/dtos/notification.dto";
import useMessages from "@/lib/hooks/useMessages";

const NotificationListener = () => {
  const { user } = useSession();
  const { showMessage } = useMessages();

  useEffect(() => {
    const channel = pusherClient.subscribe(`notification-channel-${user?.id}`);

    channel.bind("new-notification", (data: NotificationMetaData) => {
      showMessage(data.content, "notifications", {
        avatarUrl: data.avatarUrl,
        displayName: data.displayName,
        content: data.content,
      });
    });

    return () => {
      pusherClient.unsubscribe(`notification-channel-${user?.id}`);
    };
  }, []);

  return <></>;
};

export default NotificationListener;
