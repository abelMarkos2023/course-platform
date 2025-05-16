import { integer, pgEnum, pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, name, updatedAt } from "../schemaHelper";
import { courseTable } from "./cources";
import { relations } from "drizzle-orm";
import { lessonTable } from "./lesson";


export const courseSectionStatus = ["public","private"] as const

export type courseSectionType = (typeof courseSectionStatus)[number]
export const courseSectionEnum = pgEnum("course_SectionStatus",courseSectionStatus)

export const courseSectionTable = pgTable("courseSection", {
    id,
    courseId:uuid().notNull().references(() => courseTable.id,{onDelete:"restrict"}),
    order: integer().notNull(),
    name,
    status:courseSectionEnum().notNull().default("private"),
    createdAt,
    updatedAt
})

export const courseSectionrelation = relations(courseSectionTable, ({one,many}) => ({
    course: one(courseTable,{
        fields:[courseSectionTable.courseId],
        references:[courseTable.id]
    }),
    lessons: many(lessonTable)
}))