import { User } from "@/db/schemas/user.schema";
import {
  Post,
  SavedPost,
  postsRelations,
  savedPostsRelations,
} from "@/db/schemas/post.schema";
import { Profile, userRelations } from "@/db/schemas/profile.schema";
import { Session } from "@/db/schemas/session.schema";
import {
  UserFollowings,
  userFollowingsRelations,
} from "@/db/schemas/network.schema";
import { Comment, CommentRelations } from "@/db/schemas/comment.schema";
import { LikedPostsRelations, LikedPost } from "@/db/schemas/likedPost.schema";
import { EmailOTP } from "@/db/schemas/emailOtp.schema";
import {
  Notification,
  notificationRelation,
} from "@/db/schemas/notification.schema";

export {
  Session,
  Profile,
  Post,
  User,
  SavedPost,
  postsRelations,
  savedPostsRelations,
  Comment,
  CommentRelations,
  LikedPostsRelations,
  LikedPost,
  userRelations,
  UserFollowings,
  userFollowingsRelations,
  EmailOTP,
  Notification,
  notificationRelation,
};
