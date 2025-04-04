import React from 'react'
import {Button, Card, CardContent, ScrollArea, ScrollBar} from '@zeak/react'
import {ChevronDown} from 'lucide-react'
import TemplateCard from './TemplateCard'

export default function TemplateList() {
  const [template,setTemplate] = React.useState("green")
  return (
    <div className="">
         <div className=" ">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-semibold tracking-[0px] text-[#475467]">Templates List</h2>
            <Button variant="ghost" size="md">
              <ChevronDown className="w-5 h-5" />
            </Button>
          </div>
            <div className="flex gap-4   overflow-x-scroll ">
            <TemplateCard onClick={()=>setTemplate("green")} selected={template === "green"} name={"green"} />
            <TemplateCard onClick={()=>setTemplate("violet")} selected={template === "violet"} name={"violet"} />
            <TemplateCard onClick={()=>setTemplate("blue")} selected={template === "blue"} name={"blue"} />
     
            
            {/* Create New Card */}
            <Card className="min-w-[300px] w-[300px] snap-center flex items-center justify-center">
              <CardContent className="p-4">
                <Button variant="outline-primary">
                  Create New
                </Button>
              </CardContent>
            </Card>
            </div>



    </div>
    </div>
  )
}
