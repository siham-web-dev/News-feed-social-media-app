import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { twMerge } from "tailwind-merge";

type CustomAvatarProps = {
  url: string | undefined;
  size?: "small" | "large";
};

const CustomAvatar: React.FC<CustomAvatarProps> = ({ url, size = "small" }) => {
  return (
    <Avatar
      className={
        size === "large" ? "w-[100px] h-[100px] md:w-[200px] md:h-[200px]" : ""
      }
    >
      {url ? (
        <AvatarImage src={url} alt="avatar url" />
      ) : (
        <AvatarFallback
          className={twMerge(
            "bg-[#4759f7] text-white",
            size === "large" ? "text-[32px]" : ""
          )}
        >
          P
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default CustomAvatar;
