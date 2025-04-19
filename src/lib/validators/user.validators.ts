import { z } from "zod";

const requiredString = z.string().trim().min(1, "this field is required");

const ProfileSchema = z.object({
  displayName: requiredString,
  bio: requiredString,
});

const UsernameSchema = z.object({
  username: requiredString,
});

const PasswordSchema = z
  .object({
    oldPassword: requiredString,
    newPassword: requiredString,
    confirmedNewPassword: requiredString,
  })
  .refine((data) => data.newPassword === data.confirmedNewPassword, {
    path: ["confirmedNewPassword"],
    message: "Passwords do not match",
  });

// RegisterSchema.parse({ username: "Ludwig" });
// LoginSchema.parse({ username: "Ludwig" });

export { ProfileSchema, UsernameSchema, PasswordSchema };
