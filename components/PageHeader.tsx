import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

const PageHeader = ({title,children,className}:{title:string,children?:ReactNode,className?:string}) => {
  return (
    <div className={cn('flex justify-between bg-gray-300/75 mb-8 shadow-lg p-4',className)}>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {children && <div>{children}</div>}
    </div>
  )
}

export default PageHeader