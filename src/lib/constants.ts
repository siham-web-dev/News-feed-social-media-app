export const HUMANIZED_MESSAGES = {
  ERROR: {
    INTERNAL_SERVER_ERR: "Internal server error",
    EMAIL_ALREADY_TAKEN: "This email is already taken",
    USERNAME_ALREADY_TAKEN: "This username is already taken",
    INVALID_CREDENTIALS: "Username or password is invalid",
  },
  SUCCESS: {},
};

export const PASSWORD_HASH_OPTIONS = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};
