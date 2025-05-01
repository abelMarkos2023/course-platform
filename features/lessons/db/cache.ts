import { getGlobalTag, getIdTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache"

export function getLessonsGlobalTag(){
    return getGlobalTag('lessons')
}

export function getLessonsIdTag(id:string){
    return getIdTag('lessons',id)
}

export function getLessonsCourseTag(courseId:string){
    return getIdTag('lessons',courseId)
}

export function revalidateLessonsCache({id,courseId}:{id:string,courseId:string}){
    revalidateTag(getLessonsIdTag(id));
    revalidateTag(getLessonsGlobalTag());
    revalidateTag(getLessonsCourseTag(courseId));
}