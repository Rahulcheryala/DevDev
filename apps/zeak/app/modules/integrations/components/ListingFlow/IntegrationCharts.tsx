import React from 'react'
import { ChevronDown } from 'lucide-react'
import { PiChartLineUpLight } from "react-icons/pi";

export default function IntegrationCharts() {
  return (
      <div className="w-full h-[60px] rounded-[12px]  my-4 bg-white flex items-center justify-between px-5">
      <div className="flex items-center justify-between w-full">
       
        <h1 className="flex items-center gap-2">  <PiChartLineUpLight className="w-4 h-4" />Charts</h1>
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  )
}
