import { app } from "./app.js";
import { PORT } from "./config/env.config.js";
import PrismaConnection from "./core/db/prisma.connection.js";
import { logger } from "./core/utils/logger.utils.js";

async function startServer() {
  try {
    await PrismaConnection.connect();

    app.listen(PORT, () => {
      logger.info(`🚀 Server started successfully on port ${PORT}`);
    });
  } catch (error) {
    logger.error("❌ Startup failed:", error);
    process.exit(1);
  }
}

async function gracefulShutdown(signal) {
  logger.warn(`⚠️ Shutdown initiated due to: ${signal}`);
  try {
    await PrismaConnection.disconnect();
    logger.info("👋 Graceful shutdown completed.");

    logger.info("🔌 Server stopped successfully.");
    process.exit(0);
  } catch (error) {
    logger.error("❌ Error during shutdown:", error);
    process.exit(1);
  }
}

/**
 * Process Signals
 */
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

/**
 * Critical Failures
 */
// process.on("uncaughtException", (error) => {
//     logger.error("💥 Uncaught Exception:", error);
//     gracefulShutdown("uncaughtException");
// });

// process.on("unhandledRejection", (reason) => {
//     logger.error("💥 Unhandled Rejection:", reason);
//     gracefulShutdown("unhandledRejection");
// });

startServer();
