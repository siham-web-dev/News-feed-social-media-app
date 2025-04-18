import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { User } from "./user.schema";
import { Post } from "./post.schema";
import { relations } from "drizzle-orm";

export const LikedPost = pgTable(
  "liked_posts",
  {
    userUuid: text("user_id")
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    postId: text("post_id")
      .notNull()
      .references(() => Post.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.userUuid, t.postId] })]
);

export const LikedPostsRelations = relations(LikedPost, ({ one }) => ({
  post: one(Post, {
    fields: [LikedPost.postId],
    references: [Post.id],
  }),
  user: one(User, {
    fields: [LikedPost.userUuid],
    references: [User.id],
  }),
}));
