import { Button } from "@/components/ui/button";
import { canAccessAdminPage } from "@/permissions/general";
import { getCurrentUser } from "@/services/clerk";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div>
    <Navbar/>
    {children}
   </div>
  );
}


async function AdminLink(){

  const user = await getCurrentUser({allData:true});

  //console.log(user)

  if(!canAccessAdminPage(user.role)) return null

  return (
    <Link href="/admin" className="mr-auto px-2 hover:underline">Admin</Link>

  )
}


const Navbar = () => {
  return (
    <div className='flex z-10 h-12 bg-gray-300  items-center shadow-lg '>
        <nav className="flex gap-4 container">
            <Link href="/" className="mr-auto px-2 hover:underline">Home</Link>
              <SignedIn>
              <AdminLink />

                <Link className="flex items-center px-2" href='/courses'>Courses</Link>
                <Link className="flex items-center px-2" href='/purchase'>Purchase History</Link>
                <div className="size-8 self-center">
                    <UserButton appearance={{ elements:{
                        userButtonAvatarBox:{
                            width:"100%",
                            height:"100%"
                        }
                    } }} />
                </div>
              </SignedIn>
              <SignedOut>
                <Button className='self-center' asChild>
                    <SignInButton>Sign In</SignInButton>
                </Button>
              </SignedOut>
        </nav>
    </div>
  )
}

