import PageHeader from '@/components/PageHeader'
import ProductForm from '@/components/Products/ProductForm'
import { Button } from '@/components/ui/button'
import { db } from '@/drizzle/db'
import { courseTable } from '@/drizzle/schema/cources'
import { productTable } from '@/drizzle/schema/product'
import { getCourseGlobalTag } from '@/features/Course/coursesCache'
import { getProductIdTag } from '@/features/Products/db/cache'
import { asc, eq } from 'drizzle-orm'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

const page = async ({params}:{params:Promise<{id:string}>}) => {

    const {id} = await params;

    const courses = await getCourses()

    const product = await getProduct(id);

    if(product == null) return notFound()
  return (
    <div className="container py-8">
        <PageHeader title='Add New Product'>
            <Button asChild>
                <Link href={'/admin/products'}>Back</Link>
            </Button>
        </PageHeader>
        <div className="bg-gray-300/50 p-4 shadow-lg rounded-lg">
          <ProductForm product={{ ...product,courseIds:product.courseProduct.map(cp => cp.courseId) }} courses={courses}  />
        </div>
    </div>
  )
}

async function getCourses() {
    'use cache'

        cacheTag(getCourseGlobalTag())
    return await db.query.courseTable.findMany({
        columns:{id:true,name:true},
        orderBy:asc(courseTable.name)
    })
}


async function getProduct(id:string){
    'use cache';

    cacheTag(getProductIdTag(id));
    const product = await db.query.productTable.findFirst(
        {
            columns:{id:true,name:true,description:true,priceInDollars:true,status:true,imageUrl:true},
            where: eq(productTable.id,id),
            with: { courseProduct: { columns: { courseId: true } } }
        }
);

    return product
}


export default page