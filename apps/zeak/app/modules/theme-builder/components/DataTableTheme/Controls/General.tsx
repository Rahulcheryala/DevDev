import React from 'react'
import { AccordionItem, AccordionTrigger, AccordionContent } from "@zeak/react"
import { NumberInput, ColorProperty, useDataTableTheme } from "~/modules/theme-builder"

export default function General() {
    const {setFontSize, setBackgroundColor, setFontColor, setForegroundColor, backgroundColor, fontColor,fontSize, foregroundColor} = useDataTableTheme()
  return (
    <AccordionItem value="general">
          <AccordionTrigger>General</AccordionTrigger>
          <AccordionContent>
            <div className="">
              <NumberInput label="Font Size" value={fontSize} onChange={setFontSize} />
        <ColorProperty label="Background Color" value={backgroundColor} onChange={setBackgroundColor} />
        <ColorProperty label="Font Color" value={fontColor} onChange={setFontColor} />
        <ColorProperty label="Foreground Color" value={foregroundColor} onChange={setForegroundColor} />
      </div>
      </AccordionContent>
      </AccordionItem>
  )
}
