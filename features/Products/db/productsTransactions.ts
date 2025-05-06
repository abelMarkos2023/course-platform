import { db } from "@/drizzle/db"
import { productTable } from "@/drizzle/schema/product"
import { eq } from "drizzle-orm"
import { revalidateProductsCache } from "./cache"
import { courseProductTable } from "@/drizzle/schema/courseProduct"

export async function insertProduct( data:  typeof productTable.$inferInsert & {courseIds:string[]}){

    const newProduct = await db.transaction(async trx => {
        const [newProduct] = await trx.insert(productTable).values(data).returning()
        if (newProduct == null) {
            trx.rollback()

            throw new Error("Product not created")
            return 
        }

        console.log(newProduct,data)

       

            await trx.insert(courseProductTable).values(data.courseIds.map(id => ({productId:newProduct.id,courseId:id})))
             return newProduct
         })
         if (newProduct == null) {

            throw new Error("Product not created")
            return 
        }

    revalidateProductsCache({id:newProduct.id})

    return newProduct
}

export async function updateProduct(id:string, data: Partial< typeof productTable.$inferInsert > & {courseIds:string[]}){
    const updatedProduct = await db.transaction(async trx => {
        const [updatedProduct] = await trx.update(productTable).set(data).where(eq(productTable.id,id)).returning()
        if (!updatedProduct) {
            throw new Error("Product not created")
            trx.rollback()
        }
        await trx.delete(courseProductTable).where(eq(courseProductTable.productId,id))
        await db.transaction(async trx => {

            await trx.insert(courseProductTable).values(data.courseIds.map(id => ({productId:updatedProduct.id,courseId:id})))
             return updatedProduct
         })


        return updatedProduct 
    })
    revalidateProductsCache({id:updatedProduct.id})

    return updatedProduct
}

export async function destroyProduct(id:string) {
    const [product] = await db.delete(productTable).where(eq(productTable.id,id)).returning()

    if (!product) throw new Error("Product not created")
        revalidateProductsCache({id:product.id})

    return product
}