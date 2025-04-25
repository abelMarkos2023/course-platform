import { db } from "@/drizzle/db"
import { roleType, userTable } from "@/drizzle/schema/user"
import { getUserIdTag } from "@/features/users/user/cache"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"

const clerk = await clerkClient()


export async function getCurrentUser({allData = false}={}){
    const {userId,sessionClaims,redirectToSignIn} = await auth()



    return {
        clerkUserId:userId,
        id:sessionClaims?.dbID,
        user: allData && sessionClaims?.dbID != null ? await getUser(sessionClaims.dbID as string) : undefined,
        role:sessionClaims?.role,
        redirectToSignIn
    }
}
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

export async function getUser(id:string){
"use cache"

    cacheTag(getUserIdTag(id))
    return db.query.userTable.findFirst({
        where: eq(userTable.id,id)
    })
}