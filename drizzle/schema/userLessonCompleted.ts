import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelper";
import {  relations } from "drizzle-orm";
import { userTable } from "./user";
import { lessonTable } from "./lesson";

export const userLessonCompleteTable = pgTable("userLessonComplete", {
    lessonId:uuid().notNull().references(() => lessonTable.id,{onDelete:"restrict"}),
    userId:uuid().notNull().references(() => userTable.id,{onDelete:"cascade"}),
    createdAt,
    updatedAt

}, t => [primaryKey({columns:[t.lessonId,t.userId]})])

export const courseLessonTableRelation = relations(userLessonCompleteTable, ({one}) => ({
    lesson: one(lessonTable,{
        fields:[userLessonCompleteTable.lessonId],
        references:[lessonTable.id]
    }),
    user: one(userTable,{
        fields:[userLessonCompleteTable.userId],
        references:[userTable.id]
    })
}))

