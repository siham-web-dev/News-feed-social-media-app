import { Post, Profile, User } from "@/db/schemas";
import { InferSelectModel } from "drizzle-orm";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ActionResult {
  error?: string;
  success?: string;
  data?: any;
}

type PostResult = InferSelectModel<typeof Post> & {
  user: InferSelectModel<typeof User> & {
    profile: InferSelectModel<typeof Profile>;
  };
};

export type PostPagination = Promise<{
  result: PostResult[];
  nextPage: number | null;
}>;
