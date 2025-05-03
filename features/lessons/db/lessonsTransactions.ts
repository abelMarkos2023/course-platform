import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { courseSectionTable } from "@/drizzle/schema/courseSection";
import {  revalidateLessonsCache } from "./cache";
import { lessonTable } from "@/drizzle/schema/lesson";


export async function getnextLessonOrder(sectionId:string){

    const lesson = await db.query.lessonTable.findFirst({
        columns:{order:true},
        where: ({sectionId: sectionColId}, { eq}) => eq(sectionColId,sectionId),
        orderBy: ({order}, {desc}) => desc(order)
    });

    return lesson ? lesson.order + 1 : 1
}
export async function insertLesson(data: typeof lessonTable.$inferInsert) {

   const [newLesson,courseId] = await db.transaction(async trx => {
       const [[newLesson],section] = await Promise.all([
            await trx.insert(lessonTable).values(data).returning(),
            await trx.query.courseSectionTable.findFirst({columns:{courseId:true},where: eq(courseSectionTable.id,data.sectionId)})

        ]);

        if(section == null) return trx.rollback()
            return [newLesson,section.courseId]
    })
    if(!newLesson) throw new Error("Lesson not created")
  

    revalidateLessonsCache({id:newLesson.id,courseId})
}
export async function destroyLesson(id:string) {
    const [deletedLesson,courseId] = await db.transaction(async trx => {
        const [deletedLesson] = await trx.delete(lessonTable).where(eq(lessonTable.id,id)).returning();
        

        if(!deletedLesson) {
            throw new Error("Lesson not Deleted");
            trx.rollback()
        }


        const section = await trx.query.courseSectionTable.findFirst({columns:{courseId:true},where: eq(courseSectionTable.id,deletedLesson.sectionId)});

        if(section == null) return trx.rollback()
        return [deletedLesson,section.courseId]
     })
   
   
 
     revalidateLessonsCache({id:deletedLesson.id,courseId})
}

export async function updateLesson(id:string,data: Partial <typeof lessonTable.$inferInsert>) {

    const [updatedLesson,courseId] = await db.transaction(async trx => {
        const currentLesson = await trx.query.lessonTable.findFirst({where: eq(lessonTable.id,id)})
        if(data.sectionId != null && currentLesson?.sectionId != data.sectionId && data.order == null) {
            data.order = await getnextLessonOrder(data.sectionId)
        }

        const [updatedLesson] = await trx.update(lessonTable).set(data).where(eq(lessonTable.id,id)).returning();
        if(!updatedLesson) {
            throw new Error("Lesson not created");
            trx.rollback()
        }

        const section = await trx.query.courseSectionTable.findFirst({columns:{courseId:true},where: eq(courseSectionTable.id,updatedLesson.sectionId)});

        if(section == null) return trx.rollback()
        return [updatedLesson,section.courseId]
     })
   
   
 
     revalidateLessonsCache({id:updatedLesson.id,courseId})
 }

export async function updateLessonOrder(lessonIds:string[]){

    const [lessons,courseId] = await db.transaction(async trx => {
        const lessons = await Promise.all(
            lessonIds.map((id,index) => db.update(lessonTable).set({order:index}).where(eq(lessonTable.id,id)).returning({
                id:courseSectionTable.id,
                sectionId:lessonTable.sectionId
            }) )
           );

           const sectionId = lessons?.[0]?.[0]?.sectionId;
           if(sectionId == null) return trx.rollback();

           const section = await trx.query.courseSectionTable.findFirst({columns:{courseId:true},where: eq(courseSectionTable.id,sectionId)});

           if(section == null) return trx.rollback();
           
           return [lessons,section.courseId]
        
           });
           lessons.flat().forEach(({id}) =>{
            revalidateLessonsCache({id,courseId})
    })

   

}