"use server";
import { ActionResult } from "@/lib/types/response";
import { UserLoginDto, UserRegistrationDto } from "@/lib/dtos/auth.dto";
import { LoginSchema, RegisterSchema } from "@/lib/validators/auth.validators";
import UserService from "@/services/user.service";
import { HUMANIZED_MESSAGES, PASSWORD_HASH_OPTIONS } from "@/lib/constants";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import AuthService from "@/services/auth.service";
import { auth } from "@/lib/auth";
import { CreatGooglesUserDto } from "@/lib/dtos/user.dto";

const userService = new UserService();

export async function signUp(dto: UserRegistrationDto): Promise<ActionResult> {
  try {
    const formData = RegisterSchema.parse(dto);
    const userEmailExist = await userService.findUser({
      email: formData.email,
    });
    const userUsernameExist = await userService.findUser({
      username: formData.username,
    });

    if (userEmailExist) {
      return { error: HUMANIZED_MESSAGES.ERROR.EMAIL_ALREADY_TAKEN };
    }

    if (userUsernameExist) {
      return { error: HUMANIZED_MESSAGES.ERROR.USERNAME_ALREADY_TAKEN };
    }

    const hashedPassword = await hash(formData.password, PASSWORD_HASH_OPTIONS);
    const userId = generateIdFromEntropySize(10);

    const newUser = await userService.createUser({
      ...formData,
      password: hashedPassword,
      id: userId,
    });
    const newSession = await AuthService.createSession(newUser.id);

    await AuthService.createCookieSession(newSession);

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error instanceof Error) {
      console.error(error.stack);
    } else {
      console.error(error);
    }
    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
}

export async function googleSignIn({ googleId }: { googleId: string }) {
  try {
    const user = await userService.findUserBygoogleId(googleId);

    if (!user) {
      return { error: HUMANIZED_MESSAGES.ERROR.INVALID_CREDENTIALS };
    }

    const newSession = await AuthService.createSession(user.id);

    await AuthService.createCookieSession(newSession);

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.error(error);
    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
}

export async function googleSignUp(
  dto: CreatGooglesUserDto
): Promise<ActionResult> {
  try {
    const user = await userService.findUser({
      email: dto.email,
    });

    if (user) {
      return { error: HUMANIZED_MESSAGES.ERROR.EMAIL_ALREADY_TAKEN };
    }

    const newUser = await userService.googleSignUp(dto);
    const newSession = await AuthService.createSession(newUser.id);

    await AuthService.createCookieSession(newSession);

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.error(error);
    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
}

export async function signIn(dto: UserLoginDto): Promise<ActionResult> {
  try {
    const formData = LoginSchema.parse(dto);

    const user = await userService.findUser({
      username: formData.username,
    });

    if (!user) {
      return { error: HUMANIZED_MESSAGES.ERROR.INVALID_CREDENTIALS };
    }

    const isSamePassword = await verify(
      user?.hashedPassword ?? "",
      formData.password,
      PASSWORD_HASH_OPTIONS
    );

    if (!isSamePassword) {
      return { error: HUMANIZED_MESSAGES.ERROR.INVALID_CREDENTIALS };
    }

    const newSession = await AuthService.createSession(user.id);

    await AuthService.createCookieSession(newSession);

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.error(error);
    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
}

export async function logout(): Promise<ActionResult> {
  try {
    const { session } = await AuthService.validateSession();

    if (!session) {
      return { error: HUMANIZED_MESSAGES.ERROR.UNAUTHORIZED };
    }

    await auth.invalidateSession(session.id);
    await AuthService.createBlankSession();

    return redirect("/login");
  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.error(error);
    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
}
