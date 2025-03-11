import { pgTable, text } from "drizzle-orm/pg-core";
import { User } from "@/db/schemas/user.schema";
import { relations } from "drizzle-orm";

export const Profile = pgTable("profiles", {
  uuid: text("uuid").primaryKey(),
  displayName: text("display_name").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  bio: text("bio"),
});

export const UserRelations = relations(User, ({ one }) => ({
  profile: one(Profile, { fields: [User.id], references: [Profile.userId] }),
}));

export const ProfileRelations = relations(Profile, ({ one }) => ({
  user: one(User, { fields: [Profile.userId], references: [User.id] }),
}));
