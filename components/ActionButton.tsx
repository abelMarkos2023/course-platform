"use client"

import React, { ComponentPropsWithRef, useTransition } from 'react'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Loader2Icon } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'

const ActionButton = ({
    action,
    requireAreYouSure,
    ...props
}:Omit<ComponentPropsWithRef<typeof Button>,'onClick'> & {
    action: () => Promise<{error:boolean,message:string}>
    requireAreYouSure?:boolean
}) => {

    const [isLoading,startTransition] = useTransition()
    console.log('requireAreYouSure',requireAreYouSure)
    const performAction = async () => {
        startTransition(async () => {
            
           const data = await action();

            if(data?.error){
                toast.error(data.message);
            }
        })
    }

    if(requireAreYouSure){
        return (
            <AlertDialog open={isLoading ? true : undefined} >
                <AlertDialogTrigger asChild>
                    <Button {...props} ></Button>
                </AlertDialogTrigger>
                  <AlertDialogContent>
                  <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={performAction} disabled={isLoading}>
                            <LoadingTextSwap isLoading={isLoading}>Continue</LoadingTextSwap>
                                
                        </AlertDialogAction>
                     </AlertDialogFooter>
                  </AlertDialogContent>
            </AlertDialog>
        )
    }
  return (
    <Button {...props} onClick={performAction} disabled={isLoading}>
        <LoadingTextSwap isLoading={isLoading}>
            {props.children}
        </LoadingTextSwap>
    </Button>
  )
}

export default ActionButton


function LoadingTextSwap({isLoading,children}:{isLoading:boolean,children:React.ReactNode}) {
    return(
        <div className="grid items-center justify-items-center">
            <div className={cn('col-start-1 col-end-2 row-start-1 row-end-2 text-center',isLoading ? 'opacity-0' : 'opacity-100')}>{children}</div>
            <div className={cn('col-start-1 col-end-2 row-start-1 row-end-2 text-center',isLoading ? 'opacity-100' : 'opacity-0')}>
                 <Loader2Icon className="animate-spin" />
            </div>
        </div>
    )
}