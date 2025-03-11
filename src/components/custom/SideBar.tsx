import React from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import ProfileAvatar from "./ProfileAvatar";
import CreatePost from "./CreatePost";

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
    {
      id: 4,
      href: "/notifications",
      icon: <MdOutlineNotificationsActive size={24} />,
      label: "Notifications",
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
        <div className="hidden sm:block">
          <CreatePost />
        </div>
        <div className="hidden sm:block">
          <ProfileAvatar />
        </div>
        <button className="flex gap-3 lg:w-full items-center text-[16px] text-black font-semibold transition-all hover:font-bold sm:mt-auto sm:mb-4">
          <AiOutlineMenu />
          <p className="hidden lg:block">Plus</p>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
