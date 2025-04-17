import { LuBookmark } from "react-icons/lu";
import { Button } from "../ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "./SessionProvider";
import {
  isSavedByCurrentUser,
  savePost,
  unSavePost,
} from "@/actions/post.actions";
import { IoIosBookmark } from "react-icons/io";
import useMessages from "@/lib/hooks/useMessages";
import { InfiniteDataPosts } from "@/lib/types/react-query";

const SaveButton = ({ postUuid }: { postUuid: string }) => {
  const { user } = useSession();
  const { showMessage } = useMessages();
  const queryClient = useQueryClient();
  const queryFilterIsSaved = {
    queryKey: [`saved-by-${postUuid}-${user?.id}`],
  };
  const queryFilterSavedPosts = {
    queryKey: [`saved-posts`],
  };
  const { data, isPending } = useQuery({
    queryKey: [`saved-by-${postUuid}-${user?.id}`],
    queryFn: () => isSavedByCurrentUser({ postUuid }),
    staleTime: Infinity,
  });

  const mutationFn = async () => {
    const result = data?.isSaved
      ? await unSavePost({ postUuid })
      : await savePost({ postUuid });

    if (result?.error) {
      throw new Error(result.error);
    }
  };

  const { mutate } = useMutation({
    mutationFn,
    onMutate: async () => {
      await queryClient.cancelQueries(queryFilterIsSaved);
      await queryClient.cancelQueries(queryFilterSavedPosts);

      const previousIsSavedState = queryClient.getQueryData<{
        isSaved: boolean;
      }>(queryFilterIsSaved.queryKey ?? []);

      queryClient.setQueryData<{
        isSaved: boolean;
      }>(queryFilterIsSaved.queryKey ?? [], () => ({
        isSaved: !previousIsSavedState?.isSaved,
      }));

      queryClient.setQueriesData<InfiniteDataPosts>(
        queryFilterSavedPosts,
        (oldData) => {
          console.log("oldData", oldData);

          if (!oldData) return oldData;

          if (previousIsSavedState?.isSaved) {
            const pages = oldData.pages.map((page) => ({
              nextPage: page.nextPage,
              result: page.result.filter((p) => p.id !== postUuid),
            }));

            return {
              pageParams: oldData.pageParams,
              pages,
            };
          }

          return oldData;
        }
      );
      if (!data?.isSaved) showMessage("the post was saved", "success");
    },
    onError: async (error: Error) => {
      showMessage(error?.message, "error");

      await queryClient.cancelQueries(queryFilterIsSaved);
      await queryClient.cancelQueries(queryFilterSavedPosts);

      const previousIsSavedState = queryClient.getQueryData<{
        isSaved: boolean;
      }>(queryFilterIsSaved.queryKey ?? []);

      queryClient.setQueryData<{
        isSaved: boolean;
      }>(queryFilterIsSaved.queryKey ?? [], () => previousIsSavedState);

      queryClient.invalidateQueries(queryFilterSavedPosts);
    },
  });

  console.log("hi im data => ", data);

  return (
    <Button variant={"ghost"} onClick={() => mutate()} disabled={isPending}>
      {data?.isSaved ? (
        <IoIosBookmark color="blue" size={34} />
      ) : (
        <LuBookmark size={34} />
      )}
    </Button>
  );
};

export default SaveButton;
