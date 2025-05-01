import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { courseSectionTable } from "@/drizzle/schema/courseSection";
import { revalidateCourseSectionsCache } from "./cache";


export async function getnextCourseSectionOrder(courseId:string){

    const section = await db.query.courseSectionTable.findFirst({
        columns:{order:true},
        where: ({courseId: courseColId}, { eq}) => eq(courseColId,courseId),
        orderBy: ({order}, {desc}) => desc(order)
    });

    return section ? section.order + 1 : 1
}
export async function insertCourseSection(data: typeof courseSectionTable.$inferInsert) {
    const [section] = await db.insert(courseSectionTable).values(data).returning()

    if (!section) throw new Error("Course Section not created")
       revalidateCourseSectionsCache({id:section.id,courseId:data.courseId})

    return section
}
export async function destroyCourseSection(id:string) {
    const [section] = await db.delete(courseSectionTable).where(eq(courseSectionTable.id,id)).returning()

    if (!section) throw new Error("Course Section not Deleted")
        revalidateCourseSectionsCache({id:section.id,courseId:section.courseId})

    return section
}

export async function updateCourseSection(id:string, data: Partial< typeof courseSectionTable.$inferInsert >){

    const [updatedCourseSection] = await db.update(courseSectionTable).set(data).where(eq(courseSectionTable.id,id)).returning()

    if(!updatedCourseSection) throw new Error("Course didn't update")
 
        revalidateCourseSectionsCache({id:updatedCourseSection.id,courseId:updatedCourseSection.courseId})

    return updatedCourseSection
}