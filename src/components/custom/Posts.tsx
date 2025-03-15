import { getAllPosts } from "@/actions/post.actions";
import Post from "./Post";
import dayjs from "dayjs";

const Posts = async () => {
  const posts = await getAllPosts();

  return (
    <div className="flex-1 flex flex-col gap-2 p-3 h-screen overflow-y-scroll">
      {posts.map((post) => (
        <Post
          userUuid={post.users?.id}
          uuid={post.posts.id}
          avatarUrl={post.profiles.avatarUrl}
          content={post.posts.content}
          displayName={post.profiles.displayName}
          key={post.posts.id}
          createdAt={dayjs(post.posts.createdAt).toString()}
        />
      ))}
    </div>
  );
};

export default Posts;
