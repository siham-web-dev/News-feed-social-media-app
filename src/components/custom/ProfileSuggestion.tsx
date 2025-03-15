import React from "react";
import CustomAvatar from "./CustomAvatar";
import { Button } from "../ui/button";

type ProfileSuggestionProps = {
  avatarUrl: string;
  username: string;
  displayName: string;
};

const ProfileSuggestion: React.FC<ProfileSuggestionProps> = ({
  avatarUrl,
  username,
  displayName,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <CustomAvatar url={avatarUrl} />
        <div className="flex flex-col ">
          <p className="text-[14px]">{displayName}</p>
          <small className="text-[12px]">@{username}</small>
        </div>
      </div>
      <Button variant={"link"}>Follow</Button>
    </div>
  );
};

export default ProfileSuggestion;
