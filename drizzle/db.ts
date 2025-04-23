import {drizzle} from 'drizzle-orm/node-postgres'
import * as schema from './schema/schema'
import { env } from '@/data/env/server'
export const db = drizzle({
schema,
connection:{
    password: env.DATABASE_PASSWORD,
    host: env.DATABASE_HOST,
    user: env.DATABASE_USER,
    database:env.DATABASE_NAME
}
})