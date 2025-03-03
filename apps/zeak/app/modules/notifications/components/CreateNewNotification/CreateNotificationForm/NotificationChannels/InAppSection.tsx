import React from 'react'
import { RadioGroup, RadioGroupItem, Label, ScrollArea } from '@zeak/react'
import { Info, Save } from 'lucide-react'
import DynamicInserts from './DynamicInserts'
import TemplateList from './TemplateList'
export default function InAppSection() {
  return (
    <div>
        <div className="space-y-6 p-6">
       <TemplateList/>
          
          
      {/* Editor */}
     <div className="mt-8 bg-white p-2 rounded-zeak">
      <div className="bg-[#f4f6fa] rounded-zeak">
      <ScrollArea className="h-[250px] bg-[#f4f6fa] rounded-zeak">
        <div className="flex items-center flex-col gap-6 justify-center">
      <h1 className="text-2xl ">Creative agency</h1>
      <p className="text-muted-foreground">Some kind of a lorem ipsum description</p>
      <p className="text-sm">*CTA*</p>
      </div>
      </ScrollArea>
      </div>
        <div className="flex items-center justify-between mt-[6px]">
          <DynamicInserts/>
          <Save className="w-6 h-6" />

        </div>
</div>
        {/* Display and Position */}
        <div className="space-y-3 mt-8">
          <h3 className="text-[14px] font-semibold tracking-[0px]">Display and Position</h3>
          <RadioGroup defaultValue="popup" className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="popup" id="popup" />
              <Label htmlFor="popup">Popup-Modal</Label>
              <Info className="w-5 h-5" color="#9BA2AC" />
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="banner" id="banner" />
              <Label htmlFor="banner">Banner/Toast</Label>
              <Info className="w-5 h-5" color="#9BA2AC" />
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="inline" id="inline" />
              <Label htmlFor="inline">Inline</Label>
              <Info className="w-5 h-5" color="#9BA2AC" />
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="badge" id="badge" />
              <Label htmlFor="badge">Badge Alert</Label>
              <Info className="w-5 h-5" color="#9BA2AC" />
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="fullscreen" id="fullscreen" />
              <Label htmlFor="fullscreen">Full-Screen Overlay</Label>
              <Info className="w-5 h-5" color="#9BA2AC" />
            </div>
          </RadioGroup>
        </div>  
      </div>
        </div>
    
  )
}
