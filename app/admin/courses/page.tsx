import CoursesTable from '@/components/Courses/CoursesTable'
import PageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { db } from '@/drizzle/db'
import { courseTable } from '@/drizzle/schema/cources'
import { courseSectionTable } from '@/drizzle/schema/courseSection'
import { lessonTable } from '@/drizzle/schema/lesson'
import { userCourseAccessTable } from '@/drizzle/schema/userCourseAccess'
import { getCourseGlobalTag } from '@/features/Course/coursesCache'
import { getUserCourseAccessGlobalTag } from '@/features/Course/db/cache/userCourseAccess'
import { asc, countDistinct, eq } from 'drizzle-orm'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import Link from 'next/link'
import React from 'react'

const page = async () => {

  const courses = await getCourses()
  return (
    <div className="container py-8">
        <PageHeader title='Courses'>
            <Button asChild>
                <Link href={'/admin/courses/new'}>New Course</Link>
            </Button>
        </PageHeader>
        <CoursesTable courses={courses}/>
    </div>
  )
}

async function getCourses() {
    'use cache'

    cacheTag(getCourseGlobalTag(),getUserCourseAccessGlobalTag())

    return db.select({
      id: courseTable.id,
      name: courseTable.name,
      description: courseTable.description,
      sectionsCount: countDistinct(courseSectionTable),
      lessonsCount: countDistinct(lessonTable),
      studentsCount: countDistinct(userCourseAccessTable)
    }).from(courseTable)
    .leftJoin(courseSectionTable,eq(courseTable.id,courseSectionTable.courseId))
    .leftJoin(lessonTable,eq(courseSectionTable.id,lessonTable.sectionId))
    .leftJoin(userCourseAccessTable,eq(courseTable.id,userCourseAccessTable.courseId))
    .orderBy(asc(courseTable.name))
    .groupBy(courseTable.id)
}

export default page