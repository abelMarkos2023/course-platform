import PageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="container py-8">
        <PageHeader title='Courses'>
            <Button asChild>
                <Link href={'/admin/courses/new'}>New Course</Link>
            </Button>
        </PageHeader>
    </div>
  )
}

export default page