"use client";
import Post from "./Post";
import dayjs from "dayjs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPosts } from "@/actions/post.actions";
import React, { useRef } from "react";
import LoadingPosts from "./LoadingPosts";

const Posts = () => {
  const THRESHOLD = 200;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => getAllPosts({ page: pageParam, size: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const handleScroll = () => {
    const div = scrollContainerRef.current;
    if (!div || isFetchingNextPage) return;

    const scrollPosition = div.scrollTop + div.clientHeight;
    const bottomPosition = div.scrollHeight - THRESHOLD;

    if (scrollPosition >= bottomPosition && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 flex flex-col gap-2 p-3 h-screen overflow-y-scroll"
      onScroll={handleScroll}
    >
      {status === "pending" ? (
        <LoadingPosts />
      ) : status === "error" ? (
        <p className="text-red-500">
          Something went wrong {`"${error.message}"`}
        </p>
      ) : (
        data.pages.map(({ result }, i) => (
          <React.Fragment key={i}>
            {result.map((post) => (
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
          </React.Fragment>
        ))
      )}
      {hasNextPage && isFetchingNextPage && <LoadingPosts />}
    </div>
  );
};

export default Posts;
