import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const User = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  googleId: text("googleId"),
});
