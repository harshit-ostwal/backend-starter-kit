import { specs, swaggerUi, theme } from "../config/swagger.config.js";
import { APP_NAME } from "../constants/app.constants.js";
import ApiResponse from "../core/http/api.response.js";
import createRouter from "./createRoute.js";
import healthRoute from "./health.route.js";

const router = createRouter();

// Swagger UI for API documentation
router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, theme));

/**
 * @route GET /
 * @desc  Welcome message for the API
 * @access Public
 */
router.get("/", (_, res) => {
  return ApiResponse.ok(null, `Welcome to the ${APP_NAME} API Service`).send(
    res,
  );
});

/**
 * @route GET /health *
 * @desc  Health check endpoint
 * @access Public
 */
router.use("/health", healthRoute);

export default router;
