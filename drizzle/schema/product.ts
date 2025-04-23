import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, name, updatedAt } from "../schemaHelper";
import { courseProductTable } from "./courseProduct";

export const productStatuses = ["public","private"] as const
export type ProductStatus = (typeof productStatuses)[number]
export const productStatusEnum = pgEnum("productStatuses",productStatuses)

export const productTable = pgTable("courses", {
    id:id,
    name,
    description:text().notNull(),
    imageUrl:text().notNull(),
    priceInDollars:integer().notNull(),
    statue:productStatusEnum().notNull().default("private"),
    createdAt,
    updatedAt 
})   

export const courseRelationShips = relations(productTable, ({ many }) => ({
  courseProduct:many(courseProductTable)
}))