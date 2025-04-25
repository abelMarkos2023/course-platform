// app/api/webhooks/clerk/route.ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { env } from "@/data/env/server";
import { createUser, deleteUser, updateUser } from "@/features/users/user/db";
import { syncClerkUserData } from "@/services/clerk";

const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse("Error occurred -- missing svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return new NextResponse("Error occurred", { status: 400 });
  }

  // 🔔 Handle events here
  switch (event.type) {
    case "user.created":
    case "user.updated":{
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const emailObj = event.data.email_addresses.find(
            email => email.id === event.data.primary_email_address_id
        );
        const email = emailObj?.email_address;
        const name = `${event.data.first_name} ${event.data.last_name}`.trim();

        if(email === null || email === undefined) return new Response("Email not found", { status: 400 });
        if(name === null) return new Response("Name not found", { status: 400 });


        if(event.type === "user.created"){
            console.log('creating user',event.data.id)
            const user = await createUser({
                email,
                name,
                clerkUserId: event.data.id,
                imageUrl: event.data.image_url,
                role:"user"
            })
    
            await syncClerkUserData(user)
        }
        else{
            await updateUser({clerkUserId:event.data.id}, 
                {
                    email,
                    name,
                    imageUrl:event.data.image_url,
                    role:event.data.public_metadata.role
                });
        }
        
        
    }

      break;
    case "user.deleted":
        if(event.data.id != null){
            console.log('deleting user',event.data.id)

            await deleteUser({clerkUserId:event.data.id})
        }else {
            console.log("No user ID provided for deletion");
            return NextResponse.json({ success: false, message: "No user ID provided" }, { status: 400 });
        }
    break;
    // Add more cases as needed
    default:
      console.log("Unhandled event:", event.type);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
