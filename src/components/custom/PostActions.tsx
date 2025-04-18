import { FaRegComment } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import PostLikesModel from "./PostLikesModel";
import PostCommentsModel from "./PostCommentsModel";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewComment } from "@/actions/comment.actions";
import useMessages from "@/lib/hooks/useMessages";

const PostActions = ({ postUuid }: { postUuid: string }) => {
  const [toggleComment, setToggleComment] = useState<boolean>(false);
  const { showMessage } = useMessages();
  const [commentContent, setCommentContent] = useState<string>("");
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const result = await addNewComment({
        content: commentContent,
        postId: postUuid,
      });

      if (result?.error) throw new Error(result?.error);
    },
    onSuccess: () => {
      showMessage(
        "A new comment was added click 'show all comments' to see it",
        "success"
      );
      setCommentContent("");
      queryClient.invalidateQueries({
        queryKey: ["comments", postUuid],
      });
    },
    onError: (error) => {
      showMessage(error?.message, "error");
      setCommentContent("");
    },
  });

  const onComment = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && commentContent.trim() !== "") {
      console.log("Enter key pressed!");
      mutate();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1 text-[10px] font-medium text-gray-500">
        <PostLikesModel postUuid={postUuid} />
        <PostCommentsModel postUuid={postUuid} />
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex gap-1 items-center">
          <LikeButton postUuid={postUuid} />
          <Button
            variant={"ghost"}
            onClick={() => setToggleComment(!toggleComment)}
          >
            <FaRegComment size={34} />
          </Button>
        </div>
        <SaveButton postUuid={postUuid} />
      </div>
      {toggleComment && (
        <Input
          onChange={(e) => setCommentContent(e.target.value)}
          value={commentContent}
          onKeyDown={onComment}
          type="text"
          placeholder="Comment here and press enter ... "
          className="bg-foreground"
        />
      )}
    </div>
  );
};

export default PostActions;
