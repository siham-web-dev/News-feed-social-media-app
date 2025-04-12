"use client";
import Post from "./Post";
import dayjs from "dayjs";
import LoadingPosts from "./LoadingPosts";
import { twMerge } from "tailwind-merge";
import usePostQuery from "@/lib/hooks/usePostQuery";
import React from "react";
import { PostFilterDto } from "@/lib/dtos/post.dto";
import { PostPagination } from "@/lib/types/response";

const Posts = ({
  height = "full-screen",
  callBack,
}: {
  height?: "full-screen" | "fit-screen";
  callBack: (dto: PostFilterDto) => PostPagination;
}) => {
  const {
    scrollContainerRef,
    data,
    error,
    handleScroll,
    status,
    hasNextPage,
    isFetchingNextPage,
  } = usePostQuery({ callBack });

  return (
    <div
      ref={scrollContainerRef}
      className={twMerge(
        "flex-1 flex flex-col gap-2 p-3 overflow-y-scroll",
        height === "full-screen" ? "h-screen" : "h-[calc(100vh-350px)]"
      )}
      onScroll={handleScroll}
    >
      {status === "pending" ? (
        <LoadingPosts />
      ) : status === "error" ? (
        <p className="text-red-500">
          Something went wrong {`"${error?.message}"`}
        </p>
      ) : (
        data?.pages.map(({ result }, i) => (
          <React.Fragment key={i}>
            {result.length > 0 ? (
              result.map((post) => (
                <Post
                  userUuid={post.userUuid}
                  uuid={post.id}
                  avatarUrl={post.user.profile.avatarUrl}
                  content={post.content}
                  displayName={post.user.profile.displayName}
                  key={post.id}
                  createdAt={dayjs(post.createdAt).toString()}
                />
              ))
            ) : (
              <p className="text-center my-4">No Posts for the moment</p>
            )}
          </React.Fragment>
        ))
      )}
      {hasNextPage && isFetchingNextPage && <LoadingPosts />}
    </div>
  );
};

export default Posts;
