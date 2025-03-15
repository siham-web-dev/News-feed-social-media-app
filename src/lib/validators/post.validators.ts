import { z } from "zod";

const requiredString = z.string().trim().min(1, "this field is required");

const PostSchema = z.object({
  content: requiredString,
});

// RegisterSchema.parse({ username: "Ludwig" });
// LoginSchema.parse({ username: "Ludwig" });

export { PostSchema };
