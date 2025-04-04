import React from 'react'
import {Popover, PopoverTrigger, PopoverContent} from '@zeak/react'
import {Tabs, TabsList, TabsTrigger, TabsContent, Input} from '@zeak/react'
import {Button} from '@zeak/react'
import { ChevronDown, Search } from 'lucide-react'
import DynamicInsertsTabs from './DynamicInsertsTabs'


export default function DynamicInserts() {
  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex p-[12px] justify-center items-center rounded-[12px] text-[#007AF5] bg-[#F0F4FD]">
            <span className="text-[14px] font-[450] tracking-[0px]">
                {" { }" } Insert
            </span>
             <ChevronDown className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[410px] p-0">
        <DynamicInsertsTabs />
      </PopoverContent>
    </Popover>
  )
}
