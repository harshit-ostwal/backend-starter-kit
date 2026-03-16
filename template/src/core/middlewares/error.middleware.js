import { NODE_ENV } from "../../config/env.config.js";
import ApiError from "../http/api.error.js";
import { logger } from "../utils/logger.utils.js";

const errorHandler = (err, req, res, _next) => {
    const error = ApiError.from(err);
    const statusCode = error.statusCode || 500;

    const isProduction = NODE_ENV === "production";

    if (error.isOperational) {
        logger.warn({
            message: error.message,
            statusCode,
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
        });
    } else {
        logger.error({
            message: error.message,
            stack: error.stack,
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
        });
    }

    const body =
        isProduction && !error.isOperational
            ? {
                  success: false,
                  message: "Something went wrong",
              }
            : {
                  ...error.toJSON(),
                  ...(NODE_ENV === "development" && { stack: error.stack }),
              };

    res.status(statusCode).json(body);
};

export default errorHandler;
