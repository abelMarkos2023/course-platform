import { integer, jsonb, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { productTable } from "./product";
import { userTable } from "./user";
import { relations } from "drizzle-orm";


export const purchaseTable = pgTable("purchase", {
    id,
    pricePaidInCents:integer().notNull(),
    productDetails:jsonb().notNull().$type<{name : string,description:string,imageUrl:string}>(),

    userId:uuid().notNull().references(() => userTable.id,{onDelete:"restrict"}),
    productId:uuid().notNull().references(() => productTable.id,{onDelete:"cascade"}),
    stripeSessionId:text().notNull().unique(),
    refundedAt:timestamp({withTimezone: true}),
    createdAt,
    updatedAt
}, t => [primaryKey({columns:[t.userId,t.productId]})])

export const purchaserelation = relations(purchaseTable, ({one}) => ({
    user : one(userTable,{fields:[purchaseTable.userId],references:[userTable.id]}),
    product : one(productTable,{fields:[purchaseTable.productId],references:[productTable.id]})
}))