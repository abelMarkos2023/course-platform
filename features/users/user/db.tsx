import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema/user";
import { eq } from "drizzle-orm";

export async function createUser(data: typeof userTable.$inferInsert){
    const [user] = await db.insert(userTable).values(data).returning().onConflictDoUpdate({
        target:[userTable.clerkUserId],
        set: data
    })
    if(!user) throw new Error("User not created")
    return user
}

export async function updateUser({clerkUserId}:{clerkUserId:string},data: Partial<typeof userTable.$inferInsert>){
    const [updatedUser] = await db.update(userTable).set(data).where(eq(userTable.clerkUserId,clerkUserId)).returning()
    if(!updatedUser) throw new Error("User not updated")
    return updatedUser
}
export async function deleteUser({clerkUserId}:{clerkUserId:string}){
  
    try {
        const [deletedUser] = await db.update(userTable).set({
            deletedAt: new Date(),
            clerkUserId:"Deleted",
            email:"Deleted@reacted.com",
            name:"Deleted User",
            imageUrl: null
        }).where(eq(userTable.clerkUserId,clerkUserId)).returning()
       // if(!deletedUser) throw new Error("User not updated")
    
        return deletedUser
    } catch (error) {
        console.log(error)
    }
}