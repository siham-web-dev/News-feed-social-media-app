import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { User } from "./user.schema";
import { Post } from "./post.schema";
import { relations } from "drizzle-orm";

export const Comment = pgTable(
  "comments",
  {
    userUuid: text("user_id")
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    postId: text("post_id")
      .notNull()
      .references(() => Post.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
  },
  (t) => [primaryKey({ columns: [t.userUuid, t.postId] })]
);

export const CommentRelations = relations(Comment, ({ one }) => ({
  post: one(Post, {
    fields: [Comment.postId],
    references: [Post.id],
  }),
  user: one(User, {
    fields: [Comment.userUuid],
    references: [User.id],
  }),
}));
