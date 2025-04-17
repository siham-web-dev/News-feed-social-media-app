"use client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { getUserStatisticsByUserUuid } from "@/actions/user.actions";

const UserProfileStatistics = ({ userId }: { userId: string }) => {
  const { data } = useQuery({
    queryKey: ["user-stats"],
    queryFn: () => getUserStatisticsByUserUuid(userId),
  });

  return (
    <div className="flex gap-2 items-center flex-wrap">
      <div className="flex gap-1 items-center  text-[12px] md:text-[16px]">
        <span>{data?.nbPosts}</span>
        <span className="text-gray-500 font-semibold">Posts</span>
      </div>
      <Button
        variant={"link"}
        className="flex gap-1 items-center cursor-pointer  text-[12px] md:text-[16px]"
      >
        <span>{data?.nbFollowing}</span>
        <span className="text-gray-500 font-semibold ">Following</span>
      </Button>
      <Button
        variant={"link"}
        className="flex gap-1 items-center cursor-pointer  text-[12px] md:text-[16px]"
      >
        <span>{data?.nbFollowers}</span>
        <span className="text-gray-500 font-semibold">Followers</span>
      </Button>
    </div>
  );
};

export default UserProfileStatistics;
