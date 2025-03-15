import { z } from "zod";
import { PostSchema } from "../validators/post.validators";

export type PostDto = z.infer<typeof PostSchema>;
