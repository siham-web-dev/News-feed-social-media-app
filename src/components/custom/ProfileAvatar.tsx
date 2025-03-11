import Link from "next/link";
import CustomAvatar from "./CustomAvatar";

const ProfileAvatar = () => {
  return (
    <Link
      href={"/profile"}
      className="flex gap-3 lg:w-full items-center text-[16px] hover:text-black hover:font-medium transition-all"
    >
      <CustomAvatar />
      <p className="hidden lg:block">Profile</p>
    </Link>
  );
};

export default ProfileAvatar;
