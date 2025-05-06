"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import  {Badge}  from "../badge"


export function MultiSelect<Option>({
    options,getValue,getLabel,selectedValues,onSelectedValuesChange,
    selectPlaceHolder,searchPlaceHolder,selectPlaceHolderChange,
    noSearchResultMessage="No result found",
}:{
    options:Option[],
    selectedValues:string[],
    selectPlaceHolder?:string,
    searchPlaceHolder?:string,
    noSearchResultMessage?:string,
    selectPlaceHolderChange?:(selectPlaceHolder:string)=>void,
    getValue:(option:Option)=>string,
    getLabel:(option:Option)=>React.ReactNode,
    onSelectedValuesChange:(selectedValues:string[])=>void,

}
) {
  const [open, setOpen] = React.useState(false)
//   const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between p-2 h-auto min-h-9 hover:bg-background"
        >
           <div className="flex gap-1 flex-wrap w-full">
            {
                selectedValues.length > 0 ? (
                    selectedValues.map(value => {
                        const option = options.find((option) => getValue(option) === value)
                        if(option == null) return
                        return (
                            <Badge key={value} className="text-xs" variant="outline">
                                {getLabel(option)}
                            </Badge>
                        )
                    })
                ) : (
                    <span className="text-muted-foreground">{selectPlaceHolder}</span>
                )
            }
           </div>
          {/* {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."} */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={getValue(option)}
                  value={getValue(option)}
                  onSelect={(currentValue) => {
                    if(selectedValues.includes(currentValue)){
                        onSelectedValuesChange(selectedValues.filter((value) => value !== currentValue))
                    }else{
                        
                        onSelectedValuesChange([...selectedValues, currentValue])
                    }
                    }
                  }
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(getValue(option)) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {getLabel(option)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
