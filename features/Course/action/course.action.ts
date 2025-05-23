"use server";

import { z } from "zod";
import { createCourseSchema } from "../Schemal/courseSchema";
import { destroyCourse, insertCourse, updateCourse } from "../db/courseTransactions";
import { redirect } from "next/navigation";
import { canCreateCourse, canDeleteCourse, canUpdateCourse } from "../coursesPermission";
import { getCurrentUser } from "@/services/clerk";

export async function createCourseAction(unsafeData: z.infer<typeof createCourseSchema>) {

    const {success,data} = createCourseSchema.safeParse(unsafeData);

    const user = await getCurrentUser({allData:true})
    const canCreate = canCreateCourse(user)
    console.log(success,data,canCreate)

    if(!success || !canCreate ) return {error:true, message:"Course not created"}


     const course =   await insertCourse(data)
    return redirect(`/admin/courses/${course.id}/edit`)
//https://z5xcq4b0-3000.euw.devtunnels.ms/
//https://z5xcq4b0-3000.euw.devtunnels.ms
}

export async function deleteCourseAction(id:string) {


    const user = await getCurrentUser({allData:true})
    const canDelete = canDeleteCourse(user)
    // console.log(success,data,canCreate)

    if(!canDelete) return {error:true, message:"Course not created"}

    console.log('first')
    await destroyCourse(id)

    return redirect(`/admin/courses`)

}

export async function updateCourseAction(id:string,unsafeData: z.infer< typeof createCourseSchema>){

    const {success,data} = createCourseSchema.safeParse(unsafeData);

    const user = await getCurrentUser({allData:true})
    const canUpdate = canUpdateCourse(user)
    console.log(success,data,canUpdate)

    if(!success || !canUpdate ) return {error:true, message:"Course not updated"}

    console.log('first')

     const course =   await updateCourse(id,data);

     console.log('updated course', course)
    return redirect(`/admin/courses/${course.id}/edit`)
}
