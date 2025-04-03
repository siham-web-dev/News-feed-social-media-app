import { InfiniteData, QueryFilters } from "@tanstack/react-query";

export type InfiniteDataPosts = InfiniteData<
  { nextPage: string | null; result: { posts: { id: string } }[] },
  string | null
>;

export type QueryFiltersPost = QueryFilters<InfiniteDataPosts>;
