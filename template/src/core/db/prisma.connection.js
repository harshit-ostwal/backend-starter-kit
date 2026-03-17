import ApiError from "../http/api.error.js";
import { logger } from "../utils/logger.utils.js";
import prisma from "./prisma.js";

class PrismaConnection {
  constructor(prismaClient = prisma) {
    this.prisma = prismaClient;
  }

  async connect() {
    try {
      logger.info("🔌 Connecting to the database...");
      await this.prisma.$connect();

      // Simple query to verify connection
      await this.prisma.$queryRaw`SELECT 1`;

      logger.info("✅ Successfully connected to the database.");
    } catch (error) {
      logger.error("❌ Database connection failed.");
      throw ApiError.badGateway("Failed to connect to the database.", [error]);
    }
  }

  async disconnect() {
    try {
      logger.info("🔌 Disconnecting from the database...");
      await this.prisma.$disconnect();
      logger.info("✅ Successfully disconnected from the database.");
    } catch (error) {
      logger.error("❌ Database disconnection failed.");
      throw ApiError.badGateway("Failed to disconnect from the database.", [
        error,
      ]);
    }
  }

  getClient() {
    return this.prisma;
  }

  async transaction(callback) {
    try {
      return await this.prisma.$transaction(callback);
    } catch (error) {
      logger.error("❌ Database transaction failed.");
      throw ApiError.badGateway("Database transaction failed.", [error]);
    }
  }
}

export default new PrismaConnection();
