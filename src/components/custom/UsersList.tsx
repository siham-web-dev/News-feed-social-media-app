import React from "react";
import CustomAvatar from "./CustomAvatar";
//import { Button } from "../ui/button";
import FollowButton from "./FollowButton";
import Link from "next/link";

type UsersListProps = {
  avatarUrl: string;
  username: string;
  displayName: string;
  id: string;
  isCurrentUser?: boolean;
};

const UsersList: React.FC<UsersListProps> = ({
  avatarUrl,
  username,
  displayName,
  id,
  isCurrentUser = false,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <CustomAvatar url={avatarUrl} />
        <div className="flex flex-col ">
          <Link
            href={`/profile/${id}`}
            className="text-[14px] hover:font-semibold"
          >
            {displayName}
          </Link>
          <small className="text-[12px]">@{username}</small>
        </div>
      </div>
      {!isCurrentUser && <FollowButton userUuid={id} />}
    </div>
  );
};

export default UsersList;
