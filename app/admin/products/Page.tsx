import CoursesTable from '@/components/Courses/CoursesTable'
import PageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { db } from '@/drizzle/db'
import { courseTable } from '@/drizzle/schema/cources'
import { courseProductTable } from '@/drizzle/schema/courseProduct'
import { courseSectionTable } from '@/drizzle/schema/courseSection'
import { lessonTable } from '@/drizzle/schema/lesson'
import { productTable } from '@/drizzle/schema/product'
import { purchaseTable } from '@/drizzle/schema/purchase'
import { userCourseAccessTable } from '@/drizzle/schema/userCourseAccess'
import { getCourseGlobalTag } from '@/features/Course/coursesCache'
import { getUserCourseAccessGlobalTag } from '@/features/Course/db/cache/userCourseAccess'
import { getProductsGlobalTag } from '@/features/Products/db/cache'
import { asc, countDistinct, eq } from 'drizzle-orm'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import Link from 'next/link'
import React from 'react'

const page = async () => {

  const products = await getProducts()
  return (
    <div className="container py-8">
        <PageHeader title='Courses'>
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
        status: productTable.statue,
        imageUrl: productTable.imageUrl,
        purchaseCount: countDistinct(purchaseTable.userId),
        courseCount: countDistinct(courseProductTable.courseId), 
     
    }).from(productTable)
    .leftJoin(purchaseTable,eq(purchaseTable.id,productTable.id))
    .leftJoin(courseProductTable,eq(courseProductTable.productId, productTable.id))
    .orderBy(asc(productTable.name))
    .groupBy(productTable.id)
}

export default page