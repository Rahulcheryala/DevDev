import React from 'react'
import { ChevronDown } from 'lucide-react'

export default function NotificationCharts() {
  return (
      <div className="w-full h-[60px] rounded-[12px]  my-4 bg-white flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-medium">Charts</h1>
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  )
}
