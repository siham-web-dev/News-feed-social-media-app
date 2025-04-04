"use client";
import React from "react";
import CustomAvatar from "./CustomAvatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostDropdownMenu from "./PostDropDown";
import { useSession } from "./SessionProvider";

dayjs.extend(relativeTime);

interface AvatarPostProps {
  avatarUrl: string;
  displayName: string;
  createdAt: string | Date;
  userUuid: string | undefined;
  uuid: string;
  content: string;
}

const AvatarPost: React.FC<AvatarPostProps> = ({
  avatarUrl,
  displayName,
  createdAt,
  content,
  userUuid,
  uuid,
}) => {
  const { user } = useSession();

  return (
    <div className="flex gap-2 items-center">
      <CustomAvatar url={avatarUrl} />
      <div className="flex justify-between gap-1 flex-1">
        <div className="flex flex-col">
          <p className="text-[12px] font-semibold">{displayName}</p>
          <small className="text-[10px]">{dayjs(createdAt).fromNow()}</small>
        </div>
        {user?.id == userUuid && (
          <PostDropdownMenu content={content} uuid={uuid} />
        )}
      </div>
    </div>
  );
};

export default AvatarPost;
