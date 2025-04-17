import React from "react";

const PostCommentsModel = ({ postUuid }: { postUuid: string }) => {
  return (
    <span className="hover:underline hover:cursor-pointer">
      Show all 405 comments
    </span>
  );
};

export default PostCommentsModel;
