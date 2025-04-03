"use client";
import PostDialog from "./PostDialog";
import { editPost } from "@/actions/post.actions";
import { PostDto } from "@/lib/dtos/post.dto";
import useMessages from "@/lib/hooks/useMessages";
import { ActionResult } from "@/lib/types/response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const EditPostDialog = ({
  uuid,
  content,
}: {
  uuid: string;
  content: string;
}) => {
  const { showMessage } = useMessages();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  const { mutate, isPending, status } = useMutation<
    ActionResult,
    Error,
    { uuid: string; postDto: PostDto }
  >({
    mutationFn: async ({ uuid, postDto }) => {
      return await editPost(uuid, postDto);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      showMessage("Post updated", "success");
    },
    onError: (error) => {
      showMessage(error.message, "error");
    },
  });

  const onClose = () => setOpen(false);

  useEffect(() => {
    if (status === "success") {
      onClose();
    }
  }, [status]);

  return (
    <PostDialog
      open={open}
      setOpen={setOpen}
      content={content}
      isPending={isPending}
      onSubmit={async (values) =>
        mutate({ uuid, postDto: { content: values.content } })
      }
    />
  );
};

export default EditPostDialog;
