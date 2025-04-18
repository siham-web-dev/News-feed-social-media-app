"use client";
import PostDialog from "./PostDialog";
import { createPost } from "@/actions/post.actions";
import { PostDto } from "@/lib/dtos/post.dto";
import useMessages from "@/lib/hooks/useMessages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const CreatePostDialog = () => {
  const { showMessage } = useMessages();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  const { mutate, isPending, status } = useMutation({
    mutationFn: async (formData: PostDto) => {
      const { error } = await createPost(formData);
      if (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      showMessage("The post was created successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-stats"] });
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
      isPending={isPending}
      onSubmit={async (values) => mutate(values)}
    />
  );
};

export default CreatePostDialog;
