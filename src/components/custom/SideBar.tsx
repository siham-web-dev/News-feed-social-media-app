import React from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegMessage } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import Link from "next/link";
import ProfileAvatar from "./ProfileAvatar";
import CreatePostDialog from "./CreatePostDialog";
import PlusDropDown from "./PlusDropDown";
import NotificationLink from "./NotificationLink";

const SideBar = () => {
  const LINKS = [
    {
      id: 1,
      href: "/",
      icon: <IoHomeOutline size={20} />,
      label: "Home",
    },
    {
      id: 2,
      href: "/search",
      icon: <GrSearch size={20} />,
      label: "Search",
    },
    {
      id: 3,
      href: "/messages",
      icon: <FaRegMessage size={20} />,
      label: "Messages",
    },
  ];

  return (
    <div className="sticky w-full py-3 sm:w-fit bottom-0 sm:top-0 lg:w-[250px] xl:w-[350px] sm:h-screen border bg-white font-light border-r-gray-200 px-2 sm:px-5 pt-3.5  flex justify-center sm:flex-col gap-6 items-center text-gray-700">
      <div className="hidden sm:block">
        <Logo hidden />
      </div>
      <div className="flex sm:flex-col gap-7 items-center  justify-between sm:justify-start mx-3.5 lg:items-start w-full h-full">
        {LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.id}
            className="flex gap-2 lg:w-full items-center text-[16px] hover:text-black hover:font-medium transition-all"
          >
            {link.icon}
            <p className="hidden lg:block">{link.label}</p>
          </Link>
        ))}
        <NotificationLink />
        <CreatePostDialog />
        <div className="hidden sm:block">
          <ProfileAvatar />
        </div>
        <PlusDropDown />
      </div>
    </div>
  );
};

export default SideBar;
