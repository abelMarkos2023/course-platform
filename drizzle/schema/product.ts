import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, name, updatedAt } from "../schemaHelper";
import { courseProductTable } from "./courseProduct";

export const productStatuses = ["public","private"] as const
export type ProductStatus = (typeof productStatuses)[number]
export const productStatusEnum = pgEnum("product_Statuses",productStatuses)

export const productTable = pgTable("products", {
    id:id,
    name,
    description:text().notNull(),
    imageUrl:text().notNull(),
    priceInDollars:integer().notNull(),
    status:productStatusEnum().notNull().default("private"),
    createdAt,
    updatedAt 
})   

export const productRelationShips = relations(productTable, ({ many }) => ({
  courseProduct:many(courseProductTable),
  //  purchase: many(purchaseTable)
}))