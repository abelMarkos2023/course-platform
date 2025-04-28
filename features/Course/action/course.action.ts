"use server";

import { z } from "zod";
import { createCourseSchema } from "../Schemal/courseSchema";
import { destroyCourse, insertCourse } from "../db/courseTransactions";
import { redirect } from "next/navigation";
import { canCreateCourse, canDeleteCourse } from "../coursesPermission";
import { getCurrentUser } from "@/services/clerk";

export async function createCourseAction(unsafeData: z.infer<typeof createCourseSchema>) {

    const {success,data} = createCourseSchema.safeParse(unsafeData);

    const user = await getCurrentUser({allData:true})
    const canCreate = canCreateCourse(user)
    console.log(success,data,canCreate)

    if(!success || !canCreate ) return {error:true, message:"Course not created"}

    console.log('first')

     const course =   await insertCourse(data)
    return redirect(`/courses/${course.id}/edit`)

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

