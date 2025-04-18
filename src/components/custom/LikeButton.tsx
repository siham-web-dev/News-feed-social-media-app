"use client";
import { Button } from "../ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useMessages from "@/lib/hooks/useMessages";
import {
  isLikedByCurrentUser,
  likePost,
  unLikePost,
} from "@/actions/like.actions";
import { Likes } from "@/lib/types/react-query";
import { useSession } from "./SessionProvider";

const LikeButton = ({ postUuid }: { postUuid: string }) => {
  const { showMessage } = useMessages();
  const queryClient = useQueryClient();
  const { user } = useSession();

  const queryFilterPostLikes = {
    queryKey: [`post-likes-${postUuid}`],
  };

  const queryFilterIsLikedBy = {
    queryKey: [`liked-by-${user?.id}-${postUuid}`],
  };

  const { data } = useQuery({
    queryKey: [`liked-by-${user?.id}-${postUuid}`],
    queryFn: () => isLikedByCurrentUser({ postUuid }),
    staleTime: Infinity,
    enabled: !!user,
  });

  const mutationFn = async () => {
    const result = data?.isLikedBy
      ? await unLikePost({ postUuid })
      : await likePost({ postUuid });

    if (result?.error) {
      throw new Error(result.error);
    }
  };

  const { mutate, isPending } = useMutation<void, Error>({
    mutationFn,
    onMutate: async () => {
      await queryClient.cancelQueries(queryFilterPostLikes);

      queryClient.setQueriesData<Likes>(queryFilterPostLikes, (oldData) => {
        if (!oldData) return { likes: [] };

        let result = null;
        if (data?.isLikedBy) {
          result = {
            likes: oldData.likes.filter(
              ({ user: userL }) => userL.id !== user?.id
            ),
          };
        } else {
          result = {
            likes: [
              ...oldData.likes,
              {
                user: {
                  profile: user?.profile,
                  id: user?.id ?? "",
                  username: user?.username || "",
                },
              },
            ],
          };
        }

        return result;
      });

      const previousIsLikedState = queryClient.getQueryData<{
        isLikedBy: boolean;
      }>(queryFilterIsLikedBy.queryKey);

      queryClient.setQueryData<{
        isLikedBy: boolean;
      }>(queryFilterIsLikedBy.queryKey ?? [], () => ({
        isLikedBy: !previousIsLikedState?.isLikedBy,
      }));
    },
    onError: async (error: Error) => {
      showMessage(error.message, "error");

      await queryClient.cancelQueries(queryFilterPostLikes);
      await queryClient.cancelQueries(queryFilterIsLikedBy);

      queryClient.setQueriesData<Likes>(queryFilterPostLikes, (oldData) => {
        return oldData;
      });

      const previousIsLikedState = queryClient.getQueryData<{
        isLikedBy: boolean;
      }>(queryFilterIsLikedBy.queryKey ?? []);

      queryClient.setQueryData<{
        isLikedBy: boolean;
      }>(queryFilterIsLikedBy.queryKey ?? [], () => previousIsLikedState);
    },
  });

  console.log(data?.isLikedBy);

  return (
    <Button variant={"ghost"} onClick={() => mutate()} disabled={isPending}>
      {data?.isLikedBy ? (
        <FaHeart size={34} color="red" />
      ) : (
        <FaRegHeart size={34} />
      )}
    </Button>
  );
};

export default LikeButton;
