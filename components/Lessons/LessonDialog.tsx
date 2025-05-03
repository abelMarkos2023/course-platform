"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { courseSectionType } from '@/drizzle/schema/courseSection'
import { lessonStatusType } from '@/drizzle/schema/lesson'
import LessonForm from './LessonForm'

const LessonDialog = (
  {defaultSectionId,sections,lesson,children}:{
    defaultSectionId?: string,
    sections: {id: string,name:string,status:courseSectionType}[],
    lesson?:{id:string,name:string,status:lessonStatusType,description:string|null,
    youtubeVideoId:string,sectionId:string},
    children: React.ReactNode
  }) => {

  const [open,setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent>
      <DialogHeader>
        <DialogTitle>{lesson == null ? 'Add Lesson' : `Edit Lesson ${lesson?.name}`}</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <LessonForm sections={sections} defaultSectionId={defaultSectionId ?? sections[0]?.id ?? ""} lesson={lesson} onSuccess={() => setOpen(false)}/>
      </div>
      </DialogContent>
    </Dialog>
  )
}

export default LessonDialog