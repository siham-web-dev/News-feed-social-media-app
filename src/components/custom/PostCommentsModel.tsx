import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import PostComment from "./PostComment";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/actions/comment.actions";

const PostCommentsModel = ({ postUuid }: { postUuid: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useQuery({
    queryKey: ["comments", postUuid],
    queryFn: () =>
      getComments({
        postId: postUuid,
      }),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="hover:underline hover:cursor-pointer w-fit">
          Show all {data?.comments?.length || 0} comments
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogTitle>Comments</DialogTitle>
        {data?.comments && data?.comments?.length > 0 ? (
          data?.comments?.map((comment, index) => (
            <div key={index}>
              <PostComment
                avatarUrl={comment.user.profile.avatarUrl}
                displayName={comment.user.profile.displayName}
                content={comment.content}
                createdAt={comment.createdAt}
                userUuid={comment.user.id}
                hasSeparator={index < data?.comments?.length - 1}
              />
            </div>
          ))
        ) : (
          <p>No comments for this post</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostCommentsModel;
