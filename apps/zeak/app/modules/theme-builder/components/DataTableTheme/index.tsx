import React from 'react'
import DataTablePreview from './DataTablePreview'
import {ScrollArea} from "@zeak/react"
import {Controls} from './Controls'
import {makeData} from "./data"
import PinableTable from "./PinableTable"
import columns from "./columns"
export default function DataTableTheme() {
  return (
    <div className="flex  w-full h-full px-5 pt-3">
      <ScrollArea className="h-[calc(100vh-100px)] w-3/4  ">
      <div className="w-full  ">
        {/* <PinableTable/> */}
        <DataTablePreview data={makeData(5)} columns={columns} />
      </div>
      </ScrollArea>
      <div className="w-1/4"> 
        <Controls />
      </div>
    </div>
  )
}
