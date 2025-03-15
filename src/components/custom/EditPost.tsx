import React from "react";
import PostDialog from "./PostDialog";
import { editPost } from "@/actions/post.actions";
import { PostDto } from "@/lib/dtos/post.dto";
import useMessages from "@/lib/hooks/useMessages";

const EditPost = ({ uuid, content }: { uuid: string; content: string }) => {
  const { showMessage } = useMessages();

  const onSubmit = async (values: PostDto) => {
    const { error } = await editPost(uuid, values);
    if (error) {
      showMessage(error, "error");
    }
  };

  return <PostDialog content={content} onSubmit={onSubmit} />;
};

export default EditPost;
