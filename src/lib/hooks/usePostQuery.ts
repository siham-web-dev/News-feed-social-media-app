import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { PostFilterDto } from "../dtos/post.dto";
import { PostPagination } from "../types/response";

const usePostQuery = ({
  callBack,
  postQueryKey = "posts",
}: {
  callBack: (dto: PostFilterDto) => PostPagination;
  postQueryKey?: "posts" | "saved-posts";
}) => {
  const THRESHOLD = 200;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching,
  } = useInfiniteQuery({
    queryKey: [postQueryKey, "user-stats"],
    queryFn: ({ pageParam = 1 }) => callBack({ page: pageParam, size: 10 }),
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
  return {
    handleScroll,
    scrollContainerRef,
    error,
    data,
    status,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  };
};

export default usePostQuery;
