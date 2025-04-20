import { DATABASE_URL } from "@/lib/constants";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });
export default defineConfig({
  schema: "./src/db/schemas",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL!,
  },
});
