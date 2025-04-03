"use client";
import { AiOutlineMenu } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { MdOutlineDarkMode } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { logout } from "@/actions/auth.actions";
import useMessages from "@/lib/hooks/useMessages";

const PlusDropDown = () => {
  const { showMessage } = useMessages();

  const handleLogout = async () => {
    showMessage("logged out", "info");

    const { error } = await logout();
    // handle logout
    if (error) {
      showMessage(error, "error");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex  gap-3 lg:w-full items-center text-[16px] text-black font-semibold transition-all hover:font-bold sm:mt-auto sm:mb-4">
          <AiOutlineMenu />
          <p className="hidden lg:block">Plus</p>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup className="flex flex-col gap-1 items-start p-1 text-[14px] w-full">
          <DropdownMenuItem className="w-full">
            <Link
              href={"/setting"}
              className="flex gap-0.5 items-center cursor-pointer"
            >
              <CiSettings />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="w-full">
            <button className="flex gap-0.5 items-center cursor-pointer">
              <MdOutlineDarkMode />
              <span>Dark Mode</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="w-full">
            <button
              className="flex gap-0.5 items-center cursor-pointer"
              onClick={handleLogout}
            >
              <PiSignOut />
              <span>Logout</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlusDropDown;
