import { z } from "zod";

const requiredString = z.string().trim().min(1, "this field is required");

const RegisterSchema = z.object({
  username: requiredString,
  password: requiredString,
  email: requiredString.email("the email format is invalid"),
  displayName: requiredString,
});

const LoginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

// RegisterSchema.parse({ username: "Ludwig" });
// LoginSchema.parse({ username: "Ludwig" });

export { RegisterSchema, LoginSchema };
