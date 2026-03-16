import winston from "winston";
import { NODE_ENV } from "../../config/env.config.js";

const { combine, timestamp, errors, colorize, printf, prettyPrint } =
  winston.format;

const logFormat = printf(({ timestamp, level, message, stack }) => {
  return `\n[${timestamp}] \n ${level} :- ${stack || message}\n`;
});

export const logger = winston.createLogger({
  level: NODE_ENV === "development" ? "debug" : "info",
  handleExceptions: true,
  handleRejections: true,
  defaultMeta: { service: "backend" },
  silent: NODE_ENV === "test",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat,
    prettyPrint()
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      handleRejections: true,
      format: combine(
        colorize({
          all: true,
          message: true,
          colors: {
            info: "blue",
            warn: "yellow",
            error: "red",
            debug: "magenta",
            verbose: "cyan",
            silly: "green",
            http: "magenta",
            critical: "red",
            alert: "red",
            emergency: "red",
            notice: "blue",
            warning: "yellow",
          },
          level: true,
        }),
        logFormat
      ),
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};
