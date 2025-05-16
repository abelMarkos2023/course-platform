import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createdAt, id, name, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { userCourseAccessTable } from "./userCourseAccess";
import { userLessonCompleteTable } from "./userLessonCompleted";

export const role = ["user","admin"] as const
export type roleType = (typeof role)[number]
export const roleEnum = pgEnum("roles",role)

export const userTable = pgTable("users", {
    id,
    clerkUserId:text().notNull().unique(),
    name,
    email:text().notNull().unique(),
    role:roleEnum().notNull().default("user"),
    imageUrl:text(),
    deletedAt:timestamp({withTimezone: true}),
    createdAt,
    updatedAt
})

export const userRelationShips = relations(userTable, ({ many }) => ({
    userCourseAccess:many(userCourseAccessTable),
    lessonComplete: many(userLessonCompleteTable)
}))