"use server";

import { z } from "zod";
import { createCourseSchema } from "../Schemal/courseSchema";
import { insertCourse } from "../db/courseTransactions";
import { redirect } from "next/navigation";
import { canCreateCourse } from "../coursesPermission";
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