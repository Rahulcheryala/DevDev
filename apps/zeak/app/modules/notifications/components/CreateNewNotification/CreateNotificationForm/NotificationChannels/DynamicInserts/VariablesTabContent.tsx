import React from 'react'
import {Input} from '@zeak/react'
import {Search} from 'lucide-react'
import VariableItem from './VariableItem'
import {AtIcon} from '@zeak/icons'
export default function VariablesTabContent() {
  return (
     <div className="flex flex-col gap-2 px-4">
                           {/* Search */}
           <div className=" relative my-3">
            <Input placeholder="Search" className="w-full pr-4 pl-12 h-[36px] py-2 bg-[#F0F4FD]" />
            <Search className="absolute left-4 h-5 w-5 top-1/2 -translate-y-1/2" />
           </div>
           <div className="flex flex-col gap-2 mt-2 px-4">

                <h3 className="text-[12px] font-[450] text-[#9BA2AC] tracking-[0px]">
                    FREQUENTLY USED VARIABLES
                </h3>
                <div className="">
           <VariableItem title="Vendor E-mail" description="From Prospect" icon={<AtIcon/>}/>
           <VariableItem title="Customer E-Mail" description="From Prospect" icon={<AtIcon/>}/>
           <VariableItem title="Vendor E-mail" description="From Prospect" icon={<AtIcon/>}/>
                </div>
                </div>
                <div className="px-4 mt-5">
                  <h3 className="text-[12px] font-[450] text-[#9BA2AC] tracking-[0px]">
                    VARIABLES
                  </h3>
                  <div className="">
                    <VariableItem title="First Variable" description="From Prospect" icon={<AtIcon/>}/>
                    <VariableItem title="Second Variable" description="From Prospect" icon={<AtIcon/>}/>
                    <VariableItem title="Third Variable" description="From Prospect" icon={<AtIcon/>}/>
                  </div>
                </div>
                  </div>
  )
}
