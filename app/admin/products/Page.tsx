import PageHeader from '@/components/PageHeader'
import ProductsTable from '@/components/Products/ProductsTable'
import { Button } from '@/components/ui/button'
import { db } from '@/drizzle/db'
import { courseProductTable } from '@/drizzle/schema/courseProduct'
import { productTable } from '@/drizzle/schema/product'
import { purchaseTable } from '@/drizzle/schema/purchase'
import { getProductsGlobalTag } from '@/features/Products/db/cache'
import { asc, countDistinct, eq } from 'drizzle-orm'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import Link from 'next/link'
import React from 'react'

const page = async () => {

  const products = await getProducts()
  return (
    <div className="container py-8">
        <PageHeader title='Products '>
            <Button asChild>
                <Link href={'/admin/products/new'}>New Product</Link>
            </Button>
        </PageHeader>
        <ProductsTable products={products}/>
    </div>
  )
}

async function getProducts() {
    'use cache'

    cacheTag(getProductsGlobalTag())

    return db.select({
        id: productTable.id,
        name: productTable.name,
        description: productTable.description,
        priceInDollars: productTable.priceInDollars,
        status: productTable.status,
        imageUrl: productTable.imageUrl,
        customersCount: countDistinct(purchaseTable.userId),
        coursesCount: countDistinct(courseProductTable.courseId), 
     
    }).from(productTable)
    .leftJoin(courseProductTable,eq(courseProductTable.productId, productTable.id))
    .leftJoin(purchaseTable,eq(purchaseTable.productId,productTable.id))
    .orderBy(asc(productTable.name))
    .groupBy(productTable.id)
}

export default page