
"use client"

import React, { useOptimistic, useTransition } from 'react'

import {DndContext, DragEndEvent} from '@dnd-kit/core'
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import { toast } from 'sonner'

const SortableList = < T extends {id: string}>({items,onOrderChange,children}:{
    items: T[],
    onOrderChange: (newOrder: string[]) => Promise<{error:boolean,message:string}>,
    children: (item: T[]) => React.ReactNode
}) => {

    const [optimisticItems, setOptimisticItems] = useOptimistic(items)
    const [,startTransition] = useTransition()
    const handleDragEnd =  (event: DragEndEvent) => {
        const {active,over} = event

        const activeId = active.id.toString()
        const overId = over?.id.toString()
        if(activeId == null || overId == null) return

         function getNewArray(array:T[],activeId:string,overId:string){
            const oldId = array.findIndex(item => item.id === activeId)
            const newId = array.findIndex(item => item.id === overId)

            return arrayMove(array,oldId,newId)

        }

        startTransition(async () => {
            setOptimisticItems(items => getNewArray(items,activeId,overId));
            const actionData = await onOrderChange(getNewArray(optimisticItems,activeId,overId).map(sec => sec.id) )

            if(actionData.error){
                toast.error(actionData.message);
            }else{
                toast.success(actionData.message);
            }

        })


    }
  return (
    <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={optimisticItems} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col">
                {
                    children(optimisticItems)
                }
            </div>
        </SortableContext>
    </DndContext>
  )
}

export default SortableList