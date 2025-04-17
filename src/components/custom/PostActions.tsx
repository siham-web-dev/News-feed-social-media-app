import { FaRegComment } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import PostLikesModel from "./PostLikesModel";
import PostCommentsModel from "./PostCommentsModel";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";

const PostActions = ({ postUuid }: { postUuid: string }) => {
  const [toggleComment, setToggleComment] = useState<boolean>(false);

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
          type="text"
          placeholder="Comment here and press enter ... "
          className="bg-foreground"
        />
      )}
    </div>
  );
};

export default PostActions;
