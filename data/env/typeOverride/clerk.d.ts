import { roleType } from "@/drizzle/schema/user";

export {}
declare global {

    interface CustomeJwtSessionClais {
        dbID:string;
        role: roleType
    }

    interface UserPublicMetadata {
        dbID:string;
        role: roleType
    }
}