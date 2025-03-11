import { db } from "@/db";
import { Profile, User } from "@/db/schemas";
import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";
import { FindUserDto } from "@/lib/dtos/user.dto";
import { CreatUserDto } from "@/lib/dtos/auth.dto";
import { generateId } from "lucia";

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
