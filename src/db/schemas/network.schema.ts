import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { User } from "./user.schema";
import { relations } from "drizzle-orm";

export const UserFollowings = pgTable(
  "network",
  {
    userUuid: text("user_id")
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    followingId: text("following_id")
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    followedAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userUuid, t.followingId] })]
);

export const userFollowingsRelations = relations(UserFollowings, ({ one }) => ({
  following: one(User, {
    fields: [UserFollowings.followingId],
    references: [User.id],
    relationName: "following",
  }),
  follower: one(User, {
    fields: [UserFollowings.userUuid],
    references: [User.id],
    relationName: "follower",
  }),
}));
