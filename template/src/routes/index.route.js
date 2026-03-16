import { specs, swaggerUi, theme } from "../config/swagger.config.js";
import { APP_NAME } from "../constants/app.constants.js";
import ApiResponse from "../core/http/api.response.js";
import createRouter from "./createRoute.js";
import healthRoute from "./health.route.js";

const router = createRouter();

// Swagger UI for API documentation
router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, theme));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     description: Welcome message for the API service
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Welcome to the ${APP_NAME} API service
 *               data: null
 */
router.get("/", (_, res) => {
    return ApiResponse.ok(null, `Welcome to the ${APP_NAME} API Service`).send(
        res
    );
});

router.use("/health", healthRoute);

export default router;
