import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schemas from "@/db/schemas";
import { DATABASE_URL } from "@/lib/constants";

config({ path: ".env" });

const sql = neon(DATABASE_URL!);
export const db = drizzle({ client: sql, schema: schemas });
