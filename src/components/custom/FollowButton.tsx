"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import {
  follow,
  isFollowedByCurrentUser,
  unFollow,
} from "@/actions/network.actions";
import useMessages from "@/lib/hooks/useMessages";

const FollowButton = ({ userUuid }: { userUuid: string }) => {
  console.log("user uuid - ", userUuid);

  const queryClient = useQueryClient();
  const { showMessage } = useMessages();
  const { data } = useQuery({
    queryKey: [`isFollowedBy-${userUuid}`],
    queryFn: () => isFollowedByCurrentUser({ userUuid }),
  });
  const queryFilterIsFollowedBy = {
    queryKey: [`isFollowedBy-${userUuid}`],
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const result = data?.isFollowedBy
        ? await unFollow({ userUuid })
        : await follow({ userUuid });

      if (result?.error) {
        throw new Error(result?.error);
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries(queryFilterIsFollowedBy);

      const previousIsFollowedByState = queryClient.getQueryData<{
        isFollowedBy: boolean;
      }>(queryFilterIsFollowedBy.queryKey ?? []);

      queryClient.setQueryData<{
        isFollowedBy: boolean;
      }>(queryFilterIsFollowedBy.queryKey ?? [], () => ({
        isFollowedBy: !previousIsFollowedByState?.isFollowedBy,
      }));

      if (previousIsFollowedByState?.isFollowedBy) {
        showMessage("you have unfollowed this user", "success");
      } else {
        showMessage("you are following this user", "success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-stats"],
      });
    },
    onError: async (error: Error) => {
      showMessage(error.message, "error");

      await queryClient.cancelQueries(queryFilterIsFollowedBy);

      queryClient.setQueriesData<{ isFollowedBy: boolean }>(
        queryFilterIsFollowedBy,
        (oldData) => {
          return oldData;
        }
      );
    },
  });
  console.log("** data", data);

  return (
    <Button
      onClick={() => mutate()}
      variant={"link"}
      className="hover:cursor-pointer"
      disabled={isPending}
    >
      {data?.isFollowedBy ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
