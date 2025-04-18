import { db } from "@/db";
import { Post, Profile, User, UserFollowings } from "@/db/schemas";
import { count, eq, InferInsertModel, InferSelectModel } from "drizzle-orm";
import { FindUserDto } from "@/lib/dtos/user.dto";
import { CreatUserDto } from "@/lib/dtos/auth.dto";
import { generateId } from "lucia";
import { UserResult, UserStatisticsResult } from "@/lib/types/response";

class UserService {
  public async findUser(
    findUserDto: FindUserDto
  ): Promise<InferSelectModel<typeof User> | undefined> {
    const where =
      "email" in findUserDto
        ? eq(User.email, findUserDto.email)
        : "id" in findUserDto
        ? eq(User.id, findUserDto.id)
        : eq(User.username, findUserDto.username);

    const user = await db.query.User.findFirst({
      where,
    });

    return user;
  }

  public async getUserStatistics(
    userUuid: string
  ): Promise<UserStatisticsResult> {
    const nbPosts = await db
      .select({ count: count() })
      .from(Post)
      .where(eq(Post.userUuid, userUuid));

    const nbFollowers = await db
      .select({ count: count() })
      .from(UserFollowings)
      .where(eq(UserFollowings.followingId, userUuid));

    const followers = await db.query.UserFollowings.findMany({
      where: eq(UserFollowings.followingId, userUuid),
      with: {
        follower: {
          with: {
            profile: true,
          },
        },
      },
    });

    const formattedFollowers: UserResult[] = followers.map((f) => ({
      id: f.follower.id,
      username: f.follower.username,
      profile: {
        avatarUrl: f.follower.profile.avatarUrl,
        displayName: f.follower.profile.displayName,
      },
    }));

    const followings = await db.query.UserFollowings.findMany({
      where: eq(UserFollowings.userUuid, userUuid),
      with: {
        following: {
          with: {
            profile: true,
          },
        },
      },
    });

    const formattedFollowings: UserResult[] = followings.map((f) => ({
      id: f.following.id,
      username: f.following.username,
      profile: {
        avatarUrl: f.following.profile.avatarUrl,
        displayName: f.following.profile.displayName,
      },
    }));

    const nbFollowing = await db
      .select({ count: count() })
      .from(UserFollowings)
      .where(eq(UserFollowings.userUuid, userUuid));

    return {
      nbPosts: nbPosts[0].count,
      nbFollowers: nbFollowers[0].count,
      nbFollowing: nbFollowing[0].count,
      followers: formattedFollowers,
      followings: formattedFollowings,
    };
  }

  public async getUserProfileInfoByUserUuid(
    userUuid: string
  ): Promise<UserResult | undefined> {
    const userInfo = await db.query.User.findFirst({
      where: eq(User.id, userUuid),
      with: {
        profile: true,
      },
      columns: {
        username: true,
        id: true,
      },
    });

    return userInfo
      ? {
          ...userInfo,
          profile: {
            ...userInfo.profile,
            bio: userInfo.profile.bio ?? undefined,
          },
        }
      : undefined;
  }

  public async getProfileByUserId(
    userId: string
  ): Promise<InferSelectModel<typeof Profile> | undefined> {
    const profile = await db.query.Profile.findFirst({
      where: eq(Profile.userId, userId),
    });

    return profile;
  }

  public async createUser(
    createUserDto: CreatUserDto
  ): Promise<InferInsertModel<typeof User>> {
    const { displayName } = createUserDto;
    const [newUser] = await db
      .insert(User)
      .values({
        ...createUserDto,
        hashedPassword: createUserDto.password,
      })
      .returning();

    const avatarUrl = `https://avatar.iran.liara.run/username?username=${displayName}`;
    console.log("newUser", newUser);

    await db.insert(Profile).values({
      uuid: generateId(10),
      avatarUrl: avatarUrl,
      userId: newUser.id,
      displayName,
    });

    return newUser;
  }
}

export default UserService;
