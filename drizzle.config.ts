import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
 path: ".env.local",
});

export default defineConfig({
  dialect: "turso",
  schema: "./db/schema.ts",
  out: "./migrations",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});