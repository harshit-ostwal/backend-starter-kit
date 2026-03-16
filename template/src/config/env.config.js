import { config } from "dotenv";

config({
    path: `.env.${process.env.NODE_ENV || "development"}`,
    debug: process.env.NODE_ENV === "development",
    encoding: "utf8",
    override: false,
    quiet: false,
});

export const {
    NODE_ENV,
    PORT,

    // CORS
    ALLOWED_ORIGINS,

    // URL's
    BACKEND_URL,
    FRONTEND_URL,

    // Database
    DATABASE_URL,

    // Redis
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,

    // JWT
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY,

    // Mail
    SMPT_HOST,
    SMPT_PORT,
    SMPT_USER,
    SMPT_PASSWORD,
    SMPT_SECURE,
    SMPT_SERVICE,
} = process.env;
