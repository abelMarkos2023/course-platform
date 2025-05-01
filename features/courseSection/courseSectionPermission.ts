import { roleType } from "@/drizzle/schema/user";

export function canCreateCourseSection({role}:{role:roleType | undefined | unknown}){
    return role == "admin" 
}

export function canDeleteCourseSection({role}:{role:roleType | undefined | unknown}){
    return role == "admin" 
}
export function canUpdateCourseSection({role}:{role:roleType | undefined | unknown}){
    return role == "admin" 
}