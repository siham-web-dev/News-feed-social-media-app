import React from "react";
import AvatarPost from "./AvatarPost";
import PostContent from "./PostContent";
import PostActions from "./PostActions";

const Post = () => {
  return (
    <div className="bg-white rounded-sm p-3 flex flex-col gap-2">
      <AvatarPost />
      <PostContent />
      <PostActions />
    </div>
  );
};

export default Post;
