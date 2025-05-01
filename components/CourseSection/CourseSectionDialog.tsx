"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import CourseSectionForm from './CourseeSectionForm'
import { courseSectionType } from '@/drizzle/schema/courseSection'

const CourseSectionDialog = ({courseId,section,children}:{courseId: string,section?: {id: string,name:string,status:courseSectionType},children: React.ReactNode}) => {

  const [open,setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent>
      <DialogHeader>
        <DialogTitle>{section == null ? 'Add Section' : `Edit Section ${section.name}`}</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <CourseSectionForm section={section} courseId={courseId} onSuccess={() => setOpen(false)}/>
      </div>
      </DialogContent>
    </Dialog>
  )
}

export default CourseSectionDialog