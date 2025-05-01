"use server";

import { z } from "zod";

import { redirect } from "next/navigation";
import {  canCreateCourseSection, canDeleteCourseSection, canUpdateCourseSection } from "../courseSectionPermission";
import { getCurrentUser } from "@/services/clerk";
import { createCourseSectionSchema } from "../courseSectionSchema";
import { destroyCourseSection, getnextCourseSectionOrder, insertCourseSection, updateCourseSection } from "../db/courseSectionTransactions";

export async function createCourseSectionAction(courseId:string,unsafeData: z.infer<typeof createCourseSectionSchema>) {

    const {success,data} = createCourseSectionSchema.safeParse(unsafeData);

    const user = await getCurrentUser({allData:true})
    const canCreate = canCreateCourseSection(user)
    console.log(success,data,canCreate,user)

    if(!success || !canCreate ) return {error:true, message:"Course not created"}

    console.log('first')
    const order = await getnextCourseSectionOrder(courseId)
     const course =   await insertCourseSection({...data,courseId,order})
    return redirect(`/admin/courses/${courseId}/edit`)

}

export async function deleteCourseSectionAction(id:string) {


    const user = await getCurrentUser({allData:true})
    const canDelete = canDeleteCourseSection(user)
    // console.log(success,data,canCreate)

    if(!canDelete) return {error:true, message:"Course not created"}

    console.log('first')
    const section = await destroyCourseSection(id)

    return redirect(`/admin/courses/${section.courseId}/edit`)

}

export async function updateCourseSectionAction(id:string,unsafeData: z.infer< typeof createCourseSectionSchema>){

    const {success,data} = createCourseSectionSchema.safeParse(unsafeData);

    const user = await getCurrentUser({allData:true})
    const canUpdate = canUpdateCourseSection(user)
    console.log(success,data,canUpdate)

    if(!success || !canUpdate ) return {error:true, message:"Course not updated"}

    console.log('first')

     const course =   await updateCourseSection(id,{...data});

     console.log('updated course', course)
    return redirect(`/admin/courses/${course.courseId}/edit`)
}
