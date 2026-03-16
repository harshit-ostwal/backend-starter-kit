import { ALLOWED_ORIGINS } from "../config/env.config.js";

const CORS_OPTIONS = {
  origin: ALLOWED_ORIGINS?.split(",") || ["*"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const RATE_LIMIT = {
  WINDOW_MS: 60 * 60 * 1000,
  MAX_REQUESTS: 500,
};

const SALT_ROUNDS = 10;

const TOKEN_TYPE = {
  ACCESS: "access",
  REFRESH: "refresh",
};

const JWT_ALGORITHM = "HS256";

export { CORS_OPTIONS, RATE_LIMIT, SALT_ROUNDS, TOKEN_TYPE, JWT_ALGORITHM };
