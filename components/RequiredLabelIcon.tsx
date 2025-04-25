import { cn } from '@/lib/utils'
import { AsteriskIcon } from 'lucide-react'
import React, { ComponentPropsWithRef } from 'react'

const RequiredLabelIcon = ({className,...props}: ComponentPropsWithRef<typeof AsteriskIcon>) => {
  return (
    <AsteriskIcon className={cn('text-destructive',className)} {...props}/>
  )
}

export default RequiredLabelIcon