import React from "react";
import CustomAvatar from "./CustomAvatar";
import { Button } from "../ui/button";

const ProfileSuggestion = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <CustomAvatar />
        <div className="flex flex-col ">
          <p className="text-[14px]">DisplayName</p>
          <small className="text-[12px]">@Username</small>
        </div>
      </div>
      <Button variant={"link"}>Follow</Button>
    </div>
  );
};

export default ProfileSuggestion;
