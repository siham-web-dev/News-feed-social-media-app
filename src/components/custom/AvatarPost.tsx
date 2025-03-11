import React from "react";
import CustomAvatar from "./CustomAvatar";
import { Button } from "../ui/button";
import { BsThreeDots } from "react-icons/bs";

const AvatarPost = () => {
  return (
    <div className="flex gap-2 items-center">
      <CustomAvatar />
      <div className=" flex justify-between gap-1 flex-1">
        <div className="flex flex-col ">
          <p className="text-[12px] font-semibold">Full Name</p>
          <small className="text-[10px]">15 h</small>
        </div>
        <Button variant={"ghost"}>
          <BsThreeDots />
        </Button>
      </div>
    </div>
  );
};

export default AvatarPost;
