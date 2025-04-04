import React from 'react'
import TemplateList from './TemplateList'
import {ScrollArea, Textarea} from '@zeak/react'
import {Button} from '@zeak/react'
import {Save} from 'lucide-react'
import DynamicInserts from './DynamicInserts'

export default function SmsSection() {
  return (
    <div className="p-6">
      <TemplateList />
      <div className="rounded-zeak bg-white p-3 mt-8">
       <div className="">
                <Textarea className="p-2 w-full h-[250px] border-none bg-white" defaultValue="Hello World"/>
            </div>
            <div className="flex items-center justify-between">

            <DynamicInserts/>
                <Save className="w-6 h-6" />
        
            </div>
      </div>
      
    </div>
  )
}
