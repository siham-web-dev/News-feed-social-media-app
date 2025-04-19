export const HUMANIZED_MESSAGES = {
  ERROR: {
    INTERNAL_SERVER_ERR: "Internal server error",
    EMAIL_ALREADY_TAKEN: "This email is already taken",
    USERNAME_ALREADY_TAKEN: "This username is already taken",
    INVALID_CREDENTIALS: "Username or password is invalid",
    UNAUTHORIZED: "Unauthorized",
    INVALID_OTP: "Invalid OTP",
    SINVALID_OLD_PASSWORD: "Invalid old password",
  },
  SUCCESS: {},
};

export const PASSWORD_HASH_OPTIONS = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const MAX_NUMBER_OF_OTP_ATTEMPTS = 3;
