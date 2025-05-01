import { getGlobalTag, getIdTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache"

export function getCourseSectionGlobalTag(){
    return getGlobalTag('courseSections')
}

export function getCourseSectionsIdTag(id:string){
    return getIdTag('courseSections',id)
}

export function getCourseSectionsCourseTag(courseId:string){
    return getIdTag('courseSections',courseId)
}

export function revalidateCourseSectionsCache({id,courseId}:{id:string,courseId:string}){
    revalidateTag(getCourseSectionsIdTag(id));
    revalidateTag(getCourseSectionGlobalTag());
    revalidateTag(getCourseSectionsCourseTag(courseId));
}