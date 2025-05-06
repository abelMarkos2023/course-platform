import PageHeader from '@/components/PageHeader'
import ProductForm from '@/components/Products/ProductForm'
import { Button } from '@/components/ui/button'
import { db } from '@/drizzle/db'
import { courseTable } from '@/drizzle/schema/cources'
import { getCourseGlobalTag } from '@/features/Course/coursesCache'
import { asc } from 'drizzle-orm'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import Link from 'next/link'
import React from 'react'

const page = async () => {

    const courses = await getCourses()
  return (
    <div className="container py-8">
        <PageHeader title='Add New Product'>
            <Button asChild>
                <Link href={'/admin/products'}>Back</Link>
            </Button>
        </PageHeader>
        <div className="bg-gray-300/50 p-4 shadow-lg rounded-lg">
          <ProductForm courses={courses}  />
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



export default page