import { roleType } from "@/drizzle/schema/user";

export function canCreateCourse({role}:{role:roleType | undefined | unknown}){
    return role == "admin" 
}