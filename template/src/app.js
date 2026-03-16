import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import {
  API_PREFIX,
  API_VERSION,
  REQUEST_SIZE_LIMIT,
} from "./constants/api.constants.js";
import { APP_NAME } from "./constants/app.constants.js";
import { CORS_OPTIONS } from "./constants/security.constants.js";
import errorHandler from "./core/middlewares/error.middleware.js";
import notFound from "./core/middlewares/notFound.middleware.js";
import { logger } from "./core/utils/logger.utils.js";
import routes from "./routes/index.route.js";

const app = express();

app.set("title", `${APP_NAME} API Server (${API_VERSION})`);

app.set("trust proxy", 1);
app.set("json spaces", 2);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream: logger.stream,
  }),
);

app.use(express.json({ limit: REQUEST_SIZE_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: REQUEST_SIZE_LIMIT }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));

// Helmet for security headers
// -- Disable contentSecurityPolicy for development to avoid issues with Swagger UI
app.use(helmet({ contentSecurityPolicy: false }));

// API routes
app.use(`${API_PREFIX}`, routes);

app.use(notFound);
app.use(errorHandler);

export { app };
