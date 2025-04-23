import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { courseTable } from "./cources";
import { productTable } from "./product";
import { createdAt, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";

export const courseProductTable = pgTable("courseProduct", {
    courseId:uuid().notNull().references(() => courseTable.id,{onDelete:"restrict"}),
    productId:uuid().notNull().references(() => productTable.id,{onDelete:"cascade"}),
    createdAt,
    updatedAt

}, t => [primaryKey({columns:[t.courseId,t.productId]})])

export const courseProductTableRelation = relations(courseProductTable, ({one}) => ({
    course: one(courseTable,{
        fields:[courseProductTable.courseId],
        references:[courseTable.id]
    }),
    product: one(productTable,{
        fields:[courseProductTable.productId],
        references:[productTable.id]
    })
}))