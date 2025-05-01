import { roleType } from "@/drizzle/schema/user";

export function canCreateCourse({role}:{role:roleType | undefined | unknown}){
    return role == "admin" 
}

export function canDeleteCourse({role}:{role:roleType | undefined | unknown}){
    return role == "admin" 
}
export function canUpdateCourse({role}:{role:roleType | undefined | unknown}){
    return role == "admin" 
}