import { roleType } from "@/drizzle/schema/user";

export function canAccessAdminPage(role:roleType | undefined | unknown){

    return role === "admin"
}