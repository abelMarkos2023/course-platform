import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, name, updatedAt } from "../schemaHelper";
import { courseSectionTable } from "./courseSection";
import { relations } from "drizzle-orm";

export const lessonStatuses = ["public","private","preview"] as const
export type lessonStatusType = (typeof lessonStatuses)[number]
export const lessonStatusEnum = pgEnum("lessonStatuses",lessonStatuses)

export const lessonTable = pgTable("lesson", {
    id,
    
    name,
    description:text(),
    youtubeVideoId:text(),
    order:integer().notNull(),
    status:lessonStatusEnum().notNull().default("private"),
    sectionId:uuid().notNull().references(() => courseSectionTable.id,{onDelete:"restrict"}),
    createdAt,
    updatedAt
})

export const lessonrelation = relations(lessonTable, ({one}) => ({
    courseSection: one(courseSectionTable,{
        fields:[lessonTable.sectionId],
        references:[courseSectionTable.id]
    })
}))