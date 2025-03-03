import React from 'react'
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@zeak/react'
import VariablesTabContent from './VariablesTabContent'

export default function DynamicInsertsTabs() {
  return (
   <Tabs defaultValue="fields" className=''>
          <TabsList className="bg-[#F0F4FD] flex rounded-t-zeak ">
            <TabsTrigger className="flex w-1/2 flex-col items-center data-[state=active]:border-0  group data-[state=active]:py-0" value="fields">
            <div className="px-[14px] pt-[10px] pb-1 leading-[20px] ">
              Dynamic Fields
            </div>
            <div className="w-full h-[6px] bg-[#ACBBD6] rounded-t-[3px] hidden group-data-[state=active]:block"></div>
          </TabsTrigger>
            <TabsTrigger className="flex w-1/2  flex-col items-center data-[state=active]:border-0  group data-[state=active]:py-0" value="variables">
            <div className="px-[14px] text-center pt-[10px] pb-1 leading-[20px] ">
              Variables
            </div>
            <div className="w-full h-[6px]  bg-[#ACBBD6] rounded-t-[3px] hidden group-data-[state=active]:block"></div>
          </TabsTrigger>
          </TabsList>
          <TabsContent value="fields">
            <div className="flex flex-col gap-2">
    
                <h3 className="text-sm font-medium text-gray-600 mb-2">
            FREQUENTLY USED VARIABLES
            
          </h3>
            </div>
          </TabsContent>
          <TabsContent value="variables">
            <VariablesTabContent/>
          </TabsContent>
        </Tabs>
  )
}