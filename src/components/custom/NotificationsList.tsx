"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card } from "../ui/card";
import { useSession } from "./SessionProvider";
import { getNotifications, markAsRead } from "@/actions/notification.actions";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { FaRegCheckCircle } from "react-icons/fa";
import useMessages from "@/lib/hooks/useMessages";

const NotificationsList = () => {
  const { user } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: [`notifications-${user?.id}`],
    queryFn: () => getNotifications(),
    staleTime: Infinity,
    enabled: !!user,
  });
  const queryClient = useQueryClient();
  const { showMessage } = useMessages();

  const { mutate } = useMutation({
    mutationFn: (notificationId: string) => markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`notifications-${user?.id}`],
      });

      queryClient.invalidateQueries({
        queryKey: [`count-unread-notifications-${user?.id}`],
      });

      showMessage("Notification marked as read", "success");
    },
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col gap-3 h-screen  mx-2 my-3">
        {data?.notifications && data?.notifications?.length > 0 ? (
          data?.notifications?.map((notification) => (
            <Card
              key={notification.id}
              className=" flex flex-row justify-between p-4 bg-white shadow-md rounded-lg flex-wrap"
            >
              <p>{notification.content}</p>
              <div className="flex items-center gap-3">
                <small className="text-[10px] text-gray-500 text-sm">
                  {dayjs(notification.createdAt).fromNow()}
                </small>
                <Button
                  className="text-[10px]"
                  variant={"outline"}
                  onClick={() => mutate(notification.id)}
                >
                  <FaRegCheckCircle />
                  Mark as read
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No notifications yet.</p>
        )}

        {/* <p className="text-gray-500">No notifications yet.</p> */}
      </div>
    </div>
  );
};

export default NotificationsList;
