import React from "react";
import Logo from "./Logo";
import ProfileAvatar from "./ProfileAvatar";
import CreatePost from "./CreatePost";

const NavBar = () => {
  return (
    <div className="sm:hidden w-full bg-white px-3.5 py-2 flex justify-between">
      <Logo hidden />
      <div className="flex gap-2 items-center">
        <CreatePost />
        <ProfileAvatar />
      </div>
    </div>
  );
};

export default NavBar;
