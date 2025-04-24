"use server";
import {
  HUMANIZED_MESSAGES,
  MAX_NUMBER_OF_OTP_ATTEMPTS,
  PASSWORD_HASH_OPTIONS,
} from "@/lib/constants";
import {
  OTPDto,
  UpdateEmailDto,
  UpdatePasswordDto,
  UpdateProfileDto,
  UpdateUsernameDto,
} from "@/lib/dtos/user.dto";
import { sendMail } from "@/lib/nodmailer";
import { ActionResult } from "@/lib/types/response";
import {
  EmailSchema,
  OTPSchema,
  PasswordSchema,
  ProfileSchema,
  UsernameSchema,
} from "@/lib/validators/user.validators";
import AuthService from "@/services/auth.service";
import { EmailOTPService } from "@/services/emailOtp.service";
import UserService from "@/services/user.service";
import { hash, verify } from "@node-rs/argon2";

const userService = new UserService();
const emailOTPService = new EmailOTPService();

export const searchUsers = async (search: string, page: number) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const result = await userService.searchUsers(search, page, user.id);
    return result;
  } catch (error) {
    console.error(error);
    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

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

export const checkOTPAndUpdateEmail = async (dto: OTPDto) => {
  // check otp if invalid than update email
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const formData = OTPSchema.parse(dto);
    const findEmailOTP = await emailOTPService.getEmailOtpByUserUuid(user.id);
    if (!findEmailOTP || findEmailOTP.otpCode !== formData.otpCode) {
      return { error: HUMANIZED_MESSAGES.ERROR.INVALID_OTP };
    } else {
      if (findEmailOTP.isUsed) {
        return { error: "This OTP was already used" };
      }
    }

    await emailOTPService.markAsUsed(findEmailOTP.id);

    // update email
    const newData = await userService.updateUser(user.id, {
      email: findEmailOTP.email,
    });

    return { success: "Your email was updated", data: newData };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const checkAndSendOTPEmail = async (dto: UpdateEmailDto) => {
  // Check if email is already in use than send verification email
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const formData = EmailSchema.parse(dto);

    const findUser = await userService.findUser({
      email: formData.email,
    });

    if (findUser) {
      return { error: HUMANIZED_MESSAGES.ERROR.EMAIL_ALREADY_TAKEN };
    }

    // check number of tries
    const emailOTP = await emailOTPService.getEmailOtpByEmail(formData.email);
    if (emailOTP) {
      if (emailOTP.nbTries >= MAX_NUMBER_OF_OTP_ATTEMPTS) {
        return {
          error: "You have reached the maximum number of tries with this email",
        };
      }
    }

    // create email otp
    const newEmailOTP = await emailOTPService.createEmailOtp(
      formData.email,
      user.id
    );

    // send email with nodmailer
    await sendMail(
      formData.email,
      "Email Verification code",
      `Your verification code is ${newEmailOTP.otpCode}`
    );

    return { success: "Verification code was sent . Check your inbox" };
  } catch (error) {
    console.error(error);
    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

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
        findUser?.hashedPassword ?? "",
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
