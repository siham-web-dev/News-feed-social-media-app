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

export const PUSHER_BEAM_INSTANCE_ID = process.env.NEXT_PUBLIC_BEAM_INSTANCE_ID;
export const PUSHER_BEAMS_SECRET_KEY = process.env.PUSHER_BEAMS_SECRET_KEY;

export const PUSHER_CHANNEL_CONFIG = {
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID || "",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || "",
  secret: process.env.NEXT_PUBLIC_PUSHER_SECRET || "",
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "",
  useTLS: true,
};

export const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const SMTP_FROM = process.env.SMTP_FROM;
export const SMTP_CONFIG = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

export const DATABASE_URL = process.env.DATABASE_URL;
