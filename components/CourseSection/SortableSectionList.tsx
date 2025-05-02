"use client"

import { courseSectionType } from '@/drizzle/schema/courseSection'
import React from 'react'
import SortableList from '../SortableList'
import SortableItem from '../SortableItem'
import { cn } from '@/lib/utils'
import CourseSectionDialog from './CourseSectionDialog'
import { DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import ActionButton from '../ActionButton'
import { EyeClosedIcon, Trash2Icon } from 'lucide-react'
import { deleteCourseSectionAction, updateCourseSectionOrderAction } from '@/features/courseSection/action/course.action'

const SortableSectionList = ({courseId,sections}:{
    courseId: string,sections: {id: string,name:string,status:courseSectionType}[]
}) => {
  return (
    <SortableList items={sections} onOrderChange={updateCourseSectionOrderAction}>
        {items => items.map(section => <SortableItem id={section.id} key={section.id} className='flex items-center gap-1'>
            <div className={cn('font-semibold', section.status === 'private' && 'text-muted-foreground')}>
                                        <p className='flex items-center gap-1'> 
                                            {
                                            section.status === 'private' && <EyeClosedIcon />
                                        }.
                                        {  
                                          section.name
                                        }</p>
                                       
                                    </div>

                                    <div className="flex ml-auto items-center gap-2">
                                        <CourseSectionDialog courseId={courseId} section={section}>
                                            <DialogTrigger asChild>
                                                <Button variant='outline'>Edit</Button>
                                            </DialogTrigger>
                                        </CourseSectionDialog>
                                        <ActionButton requireAreYouSure size={'sm'} action={ deleteCourseSectionAction.bind(null,section.id)}>
                                            <Trash2Icon />
                                            Delete
                                        </ActionButton>
                                    </div>
        </SortableItem>)}
    </SortableList>
  )
}

export default SortableSectionList