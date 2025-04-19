"use server";
import { HUMANIZED_MESSAGES, PASSWORD_HASH_OPTIONS } from "@/lib/constants";
import {
  UpdatePasswordDto,
  UpdateProfileDto,
  UpdateUsernameDto,
} from "@/lib/dtos/user.dto";
import { ActionResult } from "@/lib/types/response";
import {
  PasswordSchema,
  ProfileSchema,
  UsernameSchema,
} from "@/lib/validators/user.validators";
import AuthService from "@/services/auth.service";
import UserService from "@/services/user.service";
import { hash, verify } from "@node-rs/argon2";

const userService = new UserService();

export const getUserProfileInfoByUserUuid = async (userId: string) => {
  return await userService.getUserProfileInfoByUserUuid(userId);
};

export const getUserStatisticsByUserUuid = async (userId: string) => {
  return await userService.getUserStatistics(userId);
};

export const updateProfile = async (
  dto: UpdateProfileDto
): Promise<ActionResult> => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const formData = ProfileSchema.parse(dto);

    const data = await userService.updateProfile(user.id, formData);
    return { success: "Your profile was updated", data };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const updateUsername = async (dto: UpdateUsernameDto) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const formData = UsernameSchema.parse(dto);
    const findUser = await userService.findUser({
      username: formData.username,
    });

    if (findUser) {
      return { error: HUMANIZED_MESSAGES.ERROR.USERNAME_ALREADY_TAKEN };
    }

    const data = await userService.updateUser(user.id, {
      username: formData.username,
    });

    return { success: "Your username was updated", data };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

// export const updateEmail = async (dto: ) => {

// }

// export const checkAndSendOTPEmail = async (dto: ) => {
//   // Check if email is already in use than send verification email

// }

export const updatePassword = async (dto: UpdatePasswordDto) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const formData = PasswordSchema.parse(dto);

    const findUser = await userService.findUser({
      id: user.id,
    });

    if (findUser) {
      // check old password
      const isSamePassword = await verify(
        findUser?.hashedPassword,
        formData.oldPassword,
        PASSWORD_HASH_OPTIONS
      );

      if (!isSamePassword) {
        return { error: HUMANIZED_MESSAGES.ERROR.SINVALID_OLD_PASSWORD };
      }
    }

    const hashedPassword = await hash(
      formData.newPassword,
      PASSWORD_HASH_OPTIONS
    );

    const data = await userService.updateUser(user.id, {
      hashedPassword,
    });

    return { success: "Your password was updated", data };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};
