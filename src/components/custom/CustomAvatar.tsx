import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type CustomAvatarProps = {
  url: string | undefined;
};

const CustomAvatar: React.FC<CustomAvatarProps> = ({ url }) => {
  return (
    <Avatar>
      {url ? (
        <AvatarImage src={url} alt="avatar url" />
      ) : (
        <AvatarFallback className="bg-[#4759f7] text-white">P</AvatarFallback>
      )}
    </Avatar>
  );
};

export default CustomAvatar;
