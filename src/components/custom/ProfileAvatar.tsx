"use client";
import Link from "next/link";
import CustomAvatar from "./CustomAvatar";
import { useSession } from "./SessionProvider";

const ProfileAvatar = () => {
  const session = useSession();

  return (
    <Link
      href={"/profile"}
      className="flex gap-3 lg:w-full items-center text-[16px] hover:text-black hover:font-medium transition-all"
    >
      <CustomAvatar url={session.user?.profile.avatarUrl} />
      <p className="hidden lg:block">Profile</p>
    </Link>
  );
};

export default ProfileAvatar;
