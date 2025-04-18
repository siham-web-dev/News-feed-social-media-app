import { pgTable, text } from "drizzle-orm/pg-core";
import { User } from "@/db/schemas/user.schema";
import { relations } from "drizzle-orm";
import { Post, SavedPost } from "./post.schema";
import { UserFollowings } from "./network.schema";

export const Profile = pgTable("profiles", {
  uuid: text("uuid").primaryKey(),
  displayName: text("display_name").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  bio: text("bio"),
});

export const ProfileRelations = relations(Profile, ({ one }) => ({
  user: one(User, { fields: [Profile.userId], references: [User.id] }),
}));

export const userRelations = relations(User, ({ many, one }) => ({
  savedPosts: many(SavedPost),
  posts: many(Post),
  followers: many(UserFollowings, { relationName: "follower" }),
  followings: many(UserFollowings, { relationName: "following" }),
  profile: one(Profile, { fields: [User.id], references: [Profile.userId] }),
}));
