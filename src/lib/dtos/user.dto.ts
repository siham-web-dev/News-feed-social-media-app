import {
  EmailSchema,
  OTPSchema,
  PasswordSchema,
  ProfileSchema,
  UsernameSchema,
} from "../validators/user.validators";
import { z } from "zod";

export type FindUserDto =
  | { username: string }
  | { email: string }
  | { id: string };

export type UpdateProfileDto = z.infer<typeof ProfileSchema>;
export type UpdateUsernameDto = z.infer<typeof UsernameSchema>;
export type UpdatePasswordDto = z.infer<typeof PasswordSchema>;
export type UpdateEmailDto = z.infer<typeof EmailSchema>;
export type OTPDto = z.infer<typeof OTPSchema>;

export type UpdateUserDto = {
  username?: string;
  email?: string;
  hashedPassword?: string;
};
