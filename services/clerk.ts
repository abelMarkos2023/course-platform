import { roleType } from "@/drizzle/schema/user"
import { clerkClient } from "@clerk/nextjs/server"

const clerk = await clerkClient()

export async function syncClerkUserData(user:{
    id:string,
    clerkUserId:string,
   
    role:roleType
}){
    clerk.users.updateUserMetadata(user.clerkUserId, {
        publicMetadata:{
            role:user.role,
            dbID:user.id
        }
    })
}