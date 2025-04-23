import { defineConfig } from "drizzle-kit"
import { env } from "./data/env/server"

export default defineConfig({
    out:"./drizzle/migrations",
    schema: "./drizzle/schema/schema.ts",
    dialect: "postgresql",
    strict: true,
    verbose:true,
    dbCredentials: {
        password: env.DATABASE_PASSWORD,
        host: env.DATABASE_HOST,
        user: env.DATABASE_USER,
        database:env.DATABASE_NAME,
        ssl: false
    }
})