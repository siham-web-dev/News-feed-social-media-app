import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { User } from "./user.schema";

export const EmailOTP = pgTable("email_otps", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  otpCode: text("otp_code").notNull(),
  isUsed: boolean("is_used").notNull().default(false),
  nbTries: integer("nb_tries").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userUuid: text("user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
});
