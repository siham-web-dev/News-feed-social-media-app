import { FaUserEdit } from "react-icons/fa";
import { Button } from "../ui/button";
//import FollowButton from "./FollowButton";

const ProfileInfo = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-xl md:text-2xl font-semibold">@Username</h2>
        <Button
          variant={"outline"}
          className="btn btn-primary hover:cursor-pointer"
        >
          <FaUserEdit /> Edit profile
        </Button>
        {/* <FollowButton /> */}
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <div className="flex gap-1 items-center  text-[12px] md:text-[16px]">
          <span>0</span>
          <span className="text-gray-500 font-semibold">Posts</span>
        </div>
        <Button
          variant={"link"}
          className="flex gap-1 items-center cursor-pointer  text-[12px] md:text-[16px]"
        >
          <span>0</span>
          <span className="text-gray-500 font-semibold ">Following</span>
        </Button>
        <Button
          variant={"link"}
          className="flex gap-1 items-center cursor-pointer  text-[12px] md:text-[16px]"
        >
          <span>0</span>
          <span className="text-gray-500 font-semibold">Followers</span>
        </Button>
      </div>
      <p className="font-semibold">full Name</p>
      <p className="text-sm text-gray-800">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna
        ac nisi facilisis convallis.
      </p>
    </div>
  );
};

export default ProfileInfo;
