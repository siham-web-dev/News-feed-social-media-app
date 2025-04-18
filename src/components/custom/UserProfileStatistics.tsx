"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserStatisticsByUserUuid } from "@/actions/user.actions";
import FollowModel from "./FollowersModel";

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
      <FollowModel
        type="followers"
        count={data?.nbFollowers as number}
        data={data?.followers}
      />
      <FollowModel
        type="followings"
        count={data?.nbFollowing as number}
        data={data?.followings}
      />
    </div>
  );
};

export default UserProfileStatistics;
