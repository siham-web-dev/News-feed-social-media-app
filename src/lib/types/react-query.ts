import { InfiniteData, QueryFilters } from "@tanstack/react-query";
import { LikedByResult } from "./response";

export type InfiniteDataPosts = InfiniteData<
  { nextPage: string | null; result: { id: string }[] },
  string | null
>;

export type QueryFiltersPost = QueryFilters<InfiniteDataPosts>;
export type Likes = { likes: LikedByResult };
export type QueryFiltersLikes = QueryFilters<Likes>;
export type QueryFiltersIsLikedBy = QueryFilters<{ isLikedBy: boolean }>;
