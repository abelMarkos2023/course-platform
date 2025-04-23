import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, name, updatedAt } from "../schemaHelper";
import { courseProductTable } from "./courseProduct";
import { userCourseAccessTable } from "./userCourseAccess";

export const courseTable = pgTable("courses", {
    id,
    name,
    description:text().notNull(),
    createdAt,
    updatedAt 
})   

export const courseTableRelation = relations(courseTable, ({ many }) => ({
    courseProduct:many(courseProductTable),
    userCourseAccess: many(userCourseAccessTable)
}))