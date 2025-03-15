"use client";
import useMessages from "@/lib/hooks/useMessages";
import PostDialog from "./PostDialog";
import { createPost } from "@/actions/post.actions";
import { PostDto } from "@/lib/dtos/post.dto";

const CreatePostDialog = () => {
  const { showMessage } = useMessages();

  const handleSubmit = async (values: PostDto) => {
    const { error } = await createPost(values);
    if (error) {
      showMessage(error, "error");
    }
  };

  return <PostDialog onSubmit={handleSubmit} />;
};

export default CreatePostDialog;
