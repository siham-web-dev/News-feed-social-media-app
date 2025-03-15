import React from "react";
import AvatarPost from "./AvatarPost";
import PostContent from "./PostContent";
import PostActions from "./PostActions";

const Post = ({
  avatarUrl,
  displayName,
  createdAt,
  content,
  userUuid,
  uuid,
}: {
  avatarUrl: string;
  displayName: string;
  createdAt: string;
  content: string;
  userUuid: string | undefined;
  uuid: string;
}) => {
  return (
    <div className="bg-white rounded-sm p-3 flex flex-col gap-2">
      <AvatarPost
        content={content}
        avatarUrl={avatarUrl}
        displayName={displayName}
        createdAt={createdAt}
        uuid={uuid}
        userUuid={userUuid}
      />
      <PostContent content={content} />
      <PostActions />
    </div>
  );
};

export default Post;
