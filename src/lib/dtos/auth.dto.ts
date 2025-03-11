import { LoginSchema, RegisterSchema } from "@/lib/validators/auth.validators";
import { z } from "zod";

// extract the inferred type
export type UserRegistrationDto = z.infer<typeof RegisterSchema>;
export type UserLoginDto = z.infer<typeof LoginSchema>;
export type CreatUserDto = UserRegistrationDto & { id: string };
