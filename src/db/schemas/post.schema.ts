import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { User } from "@/db/schemas/user.schema";

export const Post = pgTable("posts", {
  id: text("uuid").primaryKey(),
  content: text("content").notNull(),
  userUuid: text("user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
