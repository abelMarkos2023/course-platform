"use client"

import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import Link from 'next/link'
import React, { Suspense } from 'react'

const Navbar = () => {
  return (
    <div className='flex z-10 h-12 bg-gray-300  items-center shadow-lg '>
        <nav className="flex gap-4 container">
            <Link href="/" className="mr-auto px-2 hover:underline">Home</Link>
            <Suspense fallback={<div>Loading...</div>}>
              <SignedIn>
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
            </Suspense>
        </nav>
    </div>
  )
}

export default Navbar