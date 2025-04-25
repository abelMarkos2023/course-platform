import { db } from "@/drizzle/db";
import { courseTable } from "@/drizzle/schema/cources";
import { revalidateCourseCache } from "../coursesCache";

export async function insertCourse(data: typeof courseTable.$inferInsert) {
    const [course] = await db.insert(courseTable).values(data).returning()

    if (!course) throw new Error("Course not created")
        revalidateCourseCache(course.id)

    return course
}