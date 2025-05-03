"use server";

import { z } from "zod";

import { getCurrentUser } from "@/services/clerk";
import { createLessonSchema } from "../lessonSchema";
import {  destroyLesson, getnextLessonOrder, insertLesson, updateLesson, updateLessonOrder } from "../db/lessonsTransactions";
import { canCreateLesson, canDeleteLesson, canUpdateLesson } from "../lessonPermission";

export async function createLessonAction(unsafeData: z.infer<typeof createLessonSchema>) {

    const {success,data} = createLessonSchema.safeParse(unsafeData);

    const user = await getCurrentUser({allData:true})
    const canCreate = canCreateLesson(user)
    console.log(success,data,canCreate,user)

    if(!success || !canCreate ) return {error:true, message:"Course not created"}

    console.log('first')
    const order = await getnextLessonOrder(data.sectionId)
     const lesson =  await insertLesson({...data,order})
     console.log(lesson)

     if (lesson == null) return {error:true, message:"Lesson not deleted"}

     return {error:false, message:"Lesson deleted"}
}

export async function deleteLessonAction(id:string) {


    const user = await getCurrentUser({allData:true})
    const canDelete = canDeleteLesson(user)
    // console.log(success,data,canCreate)

    if(!canDelete) return {error:true, message:"Course not created"}

    console.log('first')
    const section = await destroyLesson(id)
    if (section == null) return {error:true, message:"Lesson not deleted"}

    return {error:false, message:"Lesson deleted"}

}

export async function updateLessonAction(id:string,unsafeData: z.infer< typeof createLessonSchema>){

    const {success,data} = createLessonSchema.safeParse(unsafeData);

    const user = await getCurrentUser({allData:true})
    const canUpdate = canUpdateLesson(user)
    console.log(success,data,canUpdate)

    if(!success || !canUpdate ) return {error:true, message:"Course not updated"}

    console.log('first')

     const course =   await updateLesson(id,{...data});

     console.log('updated course', course)
     if (course == null) return {error:true, message:"Lesson not updated"}

     return {error:false, message:"Lesson updated"}
}

export async function updateLessonOrderAction(sectionIds:string[]){


    const user = await getCurrentUser({allData:true})
    const canUpdate = canUpdateLesson(user)
    console.log(canUpdate)

    if(sectionIds.length === 0 || !canUpdate ) return {error:true, message:"Course not updated"}

    console.log('first')

    const updatedLesson =  await updateLessonOrder(sectionIds);
    
    if (updatedLesson == null) return {error:true, message:"Lesson not Updated"}

    return {error:false, message:"Course updated"}
}
