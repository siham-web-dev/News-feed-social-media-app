import { Post } from "@/db/schemas";
import { InferSelectModel } from "drizzle-orm";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ActionResult {
  error?: string;
  success?: string;
  data?: any;
}

export type LikedByResult = {
  user: UserResult;
}[];

export type PostResult = InferSelectModel<typeof Post> & {
  user: UserResult;
};

export type PostPagination = Promise<{
  result: PostResult[];
  nextPage: number | null;
}>;

export type UserResult = {
  id: string;
  username: string;
  email?: string;
  profile?: {
    uuid?: string;
    bio?: string;
    displayName: string;
    avatarUrl: string;
  };
};

export type UserStatisticsResult = {
  nbPosts: number;
  nbFollowers: number;
  nbFollowing: number;
  followings: UserResult[];
  followers: UserResult[];
};
