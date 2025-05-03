"use client"

import { courseSectionType } from '@/drizzle/schema/courseSection'
import React from 'react'
import SortableList from '../SortableList'
import SortableItem from '../SortableItem'
import { cn } from '@/lib/utils'
import { DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import ActionButton from '../ActionButton'
import { EyeClosedIcon, Trash2Icon, VideoIcon } from 'lucide-react'
import { lessonStatusType } from '@/drizzle/schema/lesson'
import LessonDialog from './LessonDialog'
import { deleteLessonAction, updateLessonOrderAction } from '@/features/lessons/action/lesson.action'

const SortableLessonList = ({lessons,sections}:{
    lessons: {
        id: string,name:string,status:lessonStatusType,description:string|null,youtubeVideoId:string,sectionId:string
    }[],
    sections: {id: string,name:string,status:courseSectionType}[]
}) => {
  return (
    <SortableList items={lessons} onOrderChange={updateLessonOrderAction}>
        {items => items.map(lesson => <SortableItem id={lesson.id} key={lesson.id} className='flex items-center gap-1'>
            <div className={cn('font-semibold', lesson.status === 'private' && 'text-muted-foreground')}>
                                        <p className='flex items-center gap-1'> 
                                            {
                                            lesson.status === 'private' && <EyeClosedIcon />
                                         
                                            }.
                                            {
                                                   lesson.status === 'preview' && <VideoIcon />
                                            }
                                            {  
                                          lesson.name
                                            }
                                        </p>
                                       
                                    </div>

                                    <div className="flex ml-auto items-center gap-2">
                                        <LessonDialog lesson={lesson} sections={sections}>
                                            <DialogTrigger asChild>
                                                <Button variant='outline'>Edit</Button>
                                            </DialogTrigger>
                                        </LessonDialog>
                                        <ActionButton requireAreYouSure size={'sm'} action={ deleteLessonAction.bind(null,lesson.id)}>
                                            <Trash2Icon />
                                            Delete
                                        </ActionButton>
                                    </div>
        </SortableItem>)}
    </SortableList>
  )
}

export default SortableLessonList