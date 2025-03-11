import Image from "next/image";
import { twMerge } from "tailwind-merge";

const Logo = ({ hidden }: { hidden: boolean }) => {
  return (
    <div className="flex gap-2 items-center">
      <Image src={"/logo.png"} width={50} height={50} alt="logo image" />
      <p
        className={twMerge(
          "text-xl text-primary font-semibold",
          hidden ? "hidden lg:block" : ""
        )}
      >
        NEWS FEED
      </p>
    </div>
  );
};

export default Logo;
