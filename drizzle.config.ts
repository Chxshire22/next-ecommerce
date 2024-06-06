import "./src/app/db/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/app/db/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.POSTGRES_URL,
    database: process.env.POSTGRES_DATABASE!,
    password: process.env.POSTGRES_PASSWORD!,
    user: process.env.POSTGRES_USER!,
    host: process.env.POSTGRES_HOST!,
  },
});
