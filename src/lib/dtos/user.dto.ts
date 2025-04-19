import {
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

export type UpdateUserDto = {
  username?: string;
  email?: string;
  hashedPassword?: string;
};
