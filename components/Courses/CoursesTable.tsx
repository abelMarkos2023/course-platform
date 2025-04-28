import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { formatPlural } from '@/lib/fotmatter'
import { Button } from '../ui/button'
import { EditIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import ActionButton from '../ActionButton'
import { deleteCourseAction } from '@/features/Course/action/course.action'

const CoursesTable = ({courses}:{courses:{ id: string; name: string; sectionsCount: number; lessonsCount: number; studentsCount: number; }[]}) => {
return (
<Table>
    <TableHeader>
        <TableRow>
            <TableHead>{formatPlural(courses.length,'Course','Courses')}</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Actions</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {
            courses.map((course) => (
                <TableRow key={course.id}>
                    <TableCell className="font-medium">
                        <div className="flex flex-row gap-1">
                            <p className="font-semibold">{course.name}</p>
                            <p className="text-muted-foreground">
                                {formatPlural(course.sectionsCount,'Section','Sections')} - {formatPlural(course.lessonsCount,'Lesson','Lessons')}
                            </p>
                        </div>
                    </TableCell>
                    <TableCell>{course.studentsCount}</TableCell>
                    <TableCell>
                        <div className="flex flex-row gap-1">
                            <Button className='flex items-center gap-1' asChild>
                                <Link href={`/admin/courses/${course.id}/edit`}>
                                    <EditIcon className='w-4 h-4' />
                                    Edit                                       
                                </Link>
                            </Button>
                            <ActionButton className='cursor-pointer' variant={'destructive'} action={deleteCourseAction.bind(null,course.id)} requireAreYouSure>
                                <Trash2Icon className='w-4 h-4' />
                                <span className='sr-only'>Delete</span>
                            </ActionButton>
                        </div>
                    </TableCell>
                </TableRow>
            ))
        }
    </TableBody>
</Table>
)
}

export default CoursesTable