"use client";
import { FaRegComment, FaRegHeart } from "react-icons/fa6";
import { Button } from "../ui/button";
import { LuBookmark } from "react-icons/lu";
import { Input } from "../ui/input";
import { useState } from "react";

const PostActions = () => {
  const [toggleComment, setToggleComment] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1 text-[10px] font-medium text-gray-500">
        <p>104 Likes</p>
        <span className="hover:underline hover:cursor-pointer">
          Show all 405 comments
        </span>
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex gap-1 items-center">
          <Button variant={"ghost"}>
            <FaRegHeart size={34} />
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => setToggleComment(!toggleComment)}
          >
            <FaRegComment size={34} />
          </Button>
        </div>
        <Button variant={"ghost"}>
          <LuBookmark size={34} />
        </Button>
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
