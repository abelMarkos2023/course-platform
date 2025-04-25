import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
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




const Navbar = () => {
  return (
    <div className='flex z-10 h-12 bg-gray-300  items-center shadow-lg '>
        <nav className="flex gap-4 container items-center justify-between">
            <div className="flex items-center gap-4">
            <Link href="/" className="mr-auto px-2 hover:underline">Home</Link>
            <Badge>Admin</Badge>
            </div>

            <div className="flex items-center gap-3">
            <Link href="/admin/courses" className="mr-auto px-2 hover:underline">Courses</Link>
            <Link href="/admin/products" className="mr-auto px-2 hover:underline">Products</Link>
            <Link href="/admin/sales" className="mr-auto px-2 hover:underline">Sales</Link>
            </div>
         
                <div className="size-8 self-center">
                    <UserButton appearance={{ elements:{
                        userButtonAvatarBox:{
                            width:"100%",
                            height:"100%"
                        }
                    } }} />
                </div>
              <SignedOut>
                <Button className='self-center' asChild>
                    <SignInButton>Sign In</SignInButton>
                </Button>
              </SignedOut>
        </nav>
    </div>
  )
}

