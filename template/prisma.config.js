import { defineConfig } from "prisma/config";
import { NODE_ENV } from "./src/config/env.config.js";

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: NODE_ENV,
    },
});
