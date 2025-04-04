'use client'

import { useState } from "react"
import { Button, Label,  Switch, cn } from "@zeak/react"
import { ChevronDown, Eye } from 'lucide-react'

import PreviewTemplate from "./Preview"
interface NotificationTemplateProps {
  title: string
  children: React.ReactNode
  
}

export default function NotificationTemplate({ title, children }: NotificationTemplateProps) {
  const [isEnabled, setIsEnabled] = useState(true)

  return (
    <section className={cn("w-full bg-[#F7F7F8] rounded-zeak ", {})}>
      {/* Header */}
      <div className={cn("flex items-center justify-between bg-[#E5EAF2] px-6 py-[15px] rounded-t-zeak",{
        "rounded-b-zeak": !isEnabled
      })}>
        <div className="flex items-center gap-2">
          <Switch 
            id="notifications" 
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
            className="bg-[#007AF5]"
          />
          <Label htmlFor="notifications">{title}</Label>
        </div>
        <div className="flex items-center gap-2">
            <h1 className="text-sm font-medium">Template Editors</h1>
        {/* Preview Template */}
          <PreviewTemplate/>
          <Button variant="ghost" size="md">
            <ChevronDown className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Templates Grid - Only visible when enabled */}
      {
        isEnabled && children
      }

    </section>
  )
}

