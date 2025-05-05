import { roleType } from "@/drizzle/schema/user";

export function canCreateProduct({role}:{role:roleType | undefined | unknown}){
    return role == "admin" 
}

export function canDeleteProduct({role}:{role:roleType | undefined | unknown}){
    return role == "admin" 
}
export function canUpdateProduct({role}:{role:roleType | undefined | unknown}){
    return role == "admin" 
}