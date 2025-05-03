import { roleType } from "@/drizzle/schema/user";

export function canCreateLesson({role}:{role:roleType | undefined | unknown}){
    return role == "admin" 
}

export function canDeleteLesson({role}:{role:roleType | undefined | unknown}){
    return role == "admin" 
}
export function canUpdateLesson({role}:{role:roleType | undefined | unknown}){
    return role == "admin" 
}