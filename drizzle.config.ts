import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env.local' });

export default defineConfig({
    schema: [
        "./src/drizzy/schema/users.ts",
        "./src/drizzy/schema/projects.ts"
    ],
    out: "./migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});