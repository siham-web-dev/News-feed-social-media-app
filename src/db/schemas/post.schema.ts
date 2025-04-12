import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { User } from "@/db/schemas/user.schema";
import { relations } from "drizzle-orm";

export const Post = pgTable("posts", {
  id: text("uuid").primaryKey(),
  content: text("content").notNull(),
  userUuid: text("user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const SavedPost = pgTable(
  "saved_posts",
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

export const postsRelations = relations(Post, ({ many, one }) => ({
  savedBy: many(SavedPost),
  user: one(User, {
    fields: [Post.userUuid],
    references: [User.id],
  }),
}));

export const savedPostsRelations = relations(SavedPost, ({ one }) => ({
  post: one(Post, {
    fields: [SavedPost.postId],
    references: [Post.id],
  }),
  user: one(User, {
    fields: [SavedPost.userUuid],
    references: [User.id],
  }),
}));
