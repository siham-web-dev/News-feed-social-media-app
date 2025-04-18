import { FaUserEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import UserProfileStatistics from "./UserProfileStatistics";
import { UserResult } from "@/lib/types/response";
import FollowButton from "./FollowButton";

const ProfileInfo = ({
  user,
  isEditable,
}: {
  user: UserResult;
  isEditable: boolean;
}) => {
  return (
    <div className="flex flex-col gap-3 flex-1">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-xl md:text-2xl font-semibold">@{user.username}</h2>
        {isEditable ? (
          <Button
            variant={"outline"}
            className="btn btn-primary hover:cursor-pointer"
          >
            <FaUserEdit /> Edit profile
          </Button>
        ) : (
          <FollowButton userUuid={user.id} />
        )}
      </div>
      <UserProfileStatistics userId={user.id} />
      <p className="font-semibold">{user?.profile?.displayName}</p>
      <p className="text-sm text-gray-800">
        <b>Bio</b> - {user?.profile?.bio || "No bio"}
      </p>
    </div>
  );
};

export default ProfileInfo;
