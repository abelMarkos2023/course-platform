import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { courseTable } from "./cources";
import { productTable } from "./product";
import { createdAt, updatedAt } from "../schemaHelper";
import {  relations } from "drizzle-orm";
import { userTable } from "./user";

export const userCourseAccessTable = pgTable("userCourseAccess", {
    courseId:uuid().notNull().references(() => courseTable.id,{onDelete:"restrict"}),
    userId:uuid().notNull().references(() => productTable.id,{onDelete:"cascade"}),
    createdAt,
    updatedAt

}, t => [primaryKey({columns:[t.courseId,t.userId]})])

export const courseProductTablerelation = relations(userCourseAccessTable, ({one}) => ({
    course: one(courseTable,{
        fields:[userCourseAccessTable.courseId],
        references:[courseTable.id]
    }),
    user: one(userTable,{
        fields:[userCourseAccessTable.userId],
        references:[userTable.id]
    })
}))

