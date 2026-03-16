import { NODE_ENV } from "../config/env.config.js";

const sharedCookieBase = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite:
        NODE_ENV === "production" ? "none" : NODE_ENV === "testing" ? "" : "",
    path: "/",
};

const cookieAccessOptions = {
    ...sharedCookieBase,
    maxAge: 15 * 60 * 1000, // 15 minutes
};

const cookieRefreshOptions = {
    ...sharedCookieBase,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export { cookieAccessOptions, cookieRefreshOptions };
