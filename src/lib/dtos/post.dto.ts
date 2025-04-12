import { z } from "zod";
import { PostSchema } from "../validators/post.validators";

export type PostDto = z.infer<typeof PostSchema>;
export type PostFilterDto = {
  page: number;
  size: number;
  userUuid?: string;
  description?: string;
};
