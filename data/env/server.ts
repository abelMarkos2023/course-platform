import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_PASSWORD: z.string().min(1),
        DATABASE_HOST: z.string().min(1),
        DATABASE_USER: z.string().min(1),
        DATABASE_NAME: z.string().min(1),
        CLERK_WEBHOOK_SECRET: z.string().min(1),
    },
    runtimeEnv: {
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_USER: process.env.DATABASE_USER,
        DATABASE_NAME: process.env.DATABASE_NAME,
        CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,

      }
})