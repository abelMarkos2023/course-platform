import CourseForm from '@/components/Courses/CourseForm'
import PageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="container py-8">
        <PageHeader title='Add New Course'>
            <Button asChild>
                <Link href={'/admin/courses'}>Back</Link>
            </Button>
        </PageHeader>
        <div className="bg-gray-300 p-4 shadow-lg rounded-lg">
          <CourseForm />
        </div>
    </div>
  )
}

export default page