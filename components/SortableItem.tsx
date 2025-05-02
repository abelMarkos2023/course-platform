import { cn } from '@/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import React from 'react'
import {CSS} from '@dnd-kit/utilities'
import { GripVerticalIcon } from 'lucide-react'

const SortableItem = ({id,className,children}:{id:string,className?:string,children:React.ReactNode}) => {

    const {setNodeRef,transform,transition,index,activeIndex,attributes,listeners} = useSortable({id:id})
    const isActive = activeIndex === index
  return (
    <div 
        ref={setNodeRef} 
        className={cn('flex items-center rounded-lg bg-background p-2',className, isActive && 'border z-10 shadow-md')}
        style={{ 
            transform: CSS.Transform.toString(transform),
            transition
         }}
        >
            <GripVerticalIcon className="text-muted-foreground size-6 p-1" {...attributes} {...listeners} />
            <div className={cn('flex-grow',className)}>
                {children}
            </div>
        
    </div>
  )
}

export default SortableItem