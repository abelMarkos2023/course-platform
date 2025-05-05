import { db } from "@/drizzle/db"
import { productTable } from "@/drizzle/schema/product"
import { eq } from "drizzle-orm"
import { revalidateProductsCache } from "./cache"

export async function insertProduct( data: Partial< typeof productTable.$inferInsert > & {courseIds:string[]}){}

export async function updateProduct(id:string, data: Partial< typeof productTable.$inferInsert > & {courseIds:string[]}){}

export async function destroyProduct(id:string) {
    const [product] = await db.delete(productTable).where(eq(productTable.id,id)).returning()

    if (!product) throw new Error("Product not created")
        revalidateProductsCache({id:product.id})

    return product
}