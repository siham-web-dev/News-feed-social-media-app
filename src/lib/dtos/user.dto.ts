export type FindUserDto =
  | { username: string }
  | { email: string }
  | { id: string };
