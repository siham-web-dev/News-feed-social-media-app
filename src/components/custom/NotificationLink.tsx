"use client";
import Link from "next/link";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useSession } from "./SessionProvider";
import { useQuery } from "@tanstack/react-query";
import { countUnreadNotifications } from "@/actions/notification.actions";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const NotificationLink = () => {
  const { user } = useSession();
  const { data } = useQuery({
    queryKey: [`count-unread-notifications-${user?.id}`],
    queryFn: () => countUnreadNotifications(),
    staleTime: Infinity,
    enabled: !!user,
  });

  return (
    <Link
      href={"/notifications"}
      className={cn(
        "flex gap-2 lg:w-full items-center text-[16px] hover:text-black hover:font-medium transition-all",
        data?.count && data?.count > 0 && "font-semibold"
      )}
    >
      <MdOutlineNotificationsActive size={24} />
      <p className="hidden lg:block">Notifications</p>
      {(data?.count ?? 0) > 0 && (
        <Badge variant={"destructive"} className="rounded-full">
          {data?.count}
        </Badge>
      )}
    </Link>
  );
};

export default NotificationLink;
