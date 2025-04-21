import {
  boolean,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { User } from "./user.schema";
import { relations } from "drizzle-orm";

export const notificationEnum = pgEnum("notification_type", [
  "like",
  "comment",
  "follow",
]);

export const Notification = pgTable("notifications", {
  id: text("id").primaryKey(),
  type: notificationEnum("notification_type").notNull(),
  content: text("content"),
  senderUuid: text("sender_user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  metaData: json("meta_data").default({ refrenceUuid: null }),
  receiverUuid: text("receiver_user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// relations
export const notificationRelation = relations(Notification, ({ one }) => ({
  sender: one(User, {
    fields: [Notification.senderUuid],
    references: [User.id],
    relationName: "sender",
  }),
  receiver: one(User, {
    fields: [Notification.receiverUuid],
    references: [User.id],
    relationName: "recieved_notifications",
  }),
}));
