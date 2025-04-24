import { db } from "@/db";
import { Post, Profile, User, UserFollowings } from "@/db/schemas";
import {
  count,
  eq,
  ilike,
  InferInsertModel,
  InferSelectModel,
  or,
} from "drizzle-orm";
import {
  CreatGooglesUserDto,
  FindUserDto,
  UpdateProfileDto,
  UpdateUserDto,
} from "@/lib/dtos/user.dto";
import { CreatUserDto } from "@/lib/dtos/auth.dto";
import { generateId } from "lucia";
import {
  SearchUsersResult,
  UserResult,
  UserStatisticsResult,
} from "@/lib/types/response";

class UserService {
  public async searchUsers(
    search: string,
    page: number = 1,
    userId: string
  ): Promise<SearchUsersResult> {
    const skip = (page - 1) * 3;
    const regex = or(
      ilike(User.username, `%${search}%`),
      ilike(User.email, `%${search}%`)
    );

    const users = await db.query.User.findMany({
      where: regex,
      with: {
        profile: true,
        followers: {
          with: {
            follower: true,
          },
        },
      },
      limit: 3,
      offset: skip,
    });

    const formattedUsers = users.map((user) => ({
      id: user.id,
      username: user.username || undefined,
      profile: {
        avatarUrl: user.profile.avatarUrl,
        displayName: user.profile.displayName,
      },
      isFollowedBy: user.followers.some((follower) => {
        return follower.follower.id === userId;
      }),
    }));

    const totalUsers = await db
      .select({ count: count() })
      .from(User)
      .where(regex);
    const totalUsersCount = totalUsers[0].count;
    const totalPages = Math.ceil(totalUsersCount / 3);
    const hasNextPage = page < totalPages;

    return {
      users: formattedUsers,
      pageInfo: {
        totalUsers: totalUsersCount,
        totalPages,
        hasNextPage,
        currentPage: page,
      },
    };
  }

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

  async findUserBygoogleId(
    googleId: string
  ): Promise<InferSelectModel<typeof User> | undefined> {
    const user = await db.query.User.findFirst({
      where: eq(User.googleId, googleId),
      columns: {
        id: true,
        email: true,
        googleId: true,
        username: true,
        hashedPassword: true,
        createdAt: true,
      },
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
      username: f.follower?.username || undefined,
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
      username: f.following?.username || undefined,
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
          username: userInfo.username ?? undefined,
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

  public async googleSignUp(dto: CreatGooglesUserDto) {
    const id = generateId(10);
    const user = await db
      .insert(User)
      .values({
        id,
        googleId: dto.googleId,
        email: dto.email,
        username: dto.email.split("@")[0],
      })
      .returning();

    await db.insert(Profile).values({
      uuid: generateId(10),
      avatarUrl: dto.avatarUrl,
      userId: id,
      displayName: dto.displayName,
    });

    return user[0];
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

  public async updateAvatarUrl(
    userId: string,
    avatarUrl: string
  ): Promise<InferInsertModel<typeof Profile>> {
    const [updatedProfile] = await db
      .update(Profile)
      .set({
        avatarUrl,
      })
      .where(eq(Profile.userId, userId))
      .returning();

    return updatedProfile;
  }

  public async updateProfile(userId: string, dto: UpdateProfileDto) {
    const { displayName, bio } = dto;

    const [updatedProfile] = await db
      .update(Profile)
      .set({
        displayName,
        bio,
      })
      .where(eq(Profile.userId, userId))
      .returning();

    return updatedProfile;
  }

  public async updateUser(userId: string, dto: UpdateUserDto) {
    const set = {
      ...dto,
    };

    const [updatedUser] = await db
      .update(User)
      .set(set)
      .where(eq(User.id, userId))
      .returning();

    return updatedUser;
  }
}

export default UserService;
