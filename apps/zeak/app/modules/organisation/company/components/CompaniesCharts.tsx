import React from 'react'
import { ChevronDown } from 'lucide-react'
import { ChartLine } from 'lucide-react'

export default function CompaniesCharts() {
  return (
      <div className="w-full h-[60px] rounded-[12px]  my-4 bg-white flex items-center justify-between px-4">
      <div className="flex items-center justify-between w-full">
       
        <h1 className="text-lg font-medium flex items-center gap-2">  <ChartLine className="w-4 h-4" />Charts</h1>
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  )
}
