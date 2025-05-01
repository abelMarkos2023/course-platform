import { db } from "@/drizzle/db";
import { courseTable } from "@/drizzle/schema/cources";
import { revalidateCourseCache } from "../coursesCache";
import { eq } from "drizzle-orm";

export async function insertCourse(data: typeof courseTable.$inferInsert) {
    const [course] = await db.insert(courseTable).values(data).returning()

    if (!course) throw new Error("Course not created")
        revalidateCourseCache(course.id)

    return course
}
export async function destroyCourse(id:string) {
    const [course] = await db.delete(courseTable).where(eq(courseTable.id,id)).returning()

    if (!course) throw new Error("Course not created")
        revalidateCourseCache(course.id)

    return course
}

export async function updateCourse(id:string, data: typeof courseTable.$inferInsert){

    const [updatedCourse] = await db.update(courseTable).set(data).where(eq(courseTable.id,id)).returning()

    if(!updatedCourse) throw new Error("Course didn't update")
 
        revalidateCourseCache(updatedCourse.id)

    return updatedCourse
}