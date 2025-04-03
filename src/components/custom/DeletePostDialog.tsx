"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import useMessages from "@/lib/hooks/useMessages";
import { deletePost } from "@/actions/post.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InfiniteDataPosts, QueryFiltersPost } from "@/lib/types/react-query";
import { useState } from "react";

const DeletePostDialog = ({ uuid }: { uuid: string }) => {
  const [open, setOpen] = useState(false);
  const { showMessage } = useMessages();
  const queryClient = useQueryClient();

  const { mutate, isPending, status } = useMutation<void, Error>({
    mutationFn: async () => {
      const result = await deletePost(uuid);
      if (result.error) {
        throw new Error(result.error);
      }
    },
    onSuccess: async () => {
      const queryFilter: QueryFiltersPost = { queryKey: ["posts"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteDataPosts>(queryFilter, (oldData) => {
        if (!oldData) return oldData;

        const pages = oldData.pages.map((page) => ({
          nextPage: page.nextPage,
          result: page.result.filter((p) => p.posts.id !== uuid),
        }));

        return {
          pageParams: oldData.pageParams,
          pages,
        };
      });

      showMessage("Post deleted", "success");
      onClose();
    },
    onError: (error: Error) => {
      showMessage(error.message, "error");
    },
  });

  const onClose = () => setOpen(false);

  const handleOpen = () => {
    if (status === "success") onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="p-2 hover:font-semibold hover:cursor-pointer"
        >
          Delete
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl font-semibold">Delete post</DialogTitle>
        <p className="text-[14px]">
          Are you sure you want to delete this post?
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant={"secondary"} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={isPending}
            onClick={() => mutate()}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePostDialog;
