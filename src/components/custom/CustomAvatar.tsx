import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CustomAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
