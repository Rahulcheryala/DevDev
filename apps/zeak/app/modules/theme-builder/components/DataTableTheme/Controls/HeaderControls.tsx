import React from 'react'
import { AccordionItem, AccordionTrigger, AccordionContent } from "@zeak/react"
import { NumberInput, ColorProperty } from "~/modules/theme-builder"
import { useDataTableTheme } from '~/modules/theme-builder'
export default function HeaderControls() {
  const {setHeaderBackgroundColor, setHeaderFontColor, setHeaderFontSize, setHeaderFontWeight, setHeaderBorderRadius, setHeaderBorderWidth, setHeaderBorderColor, headerBackgroundColor, headerFontColor, headerFontSize, headerBorderRadius, headerBorderWidth, headerBorderColor} = useDataTableTheme()
  return (
    <AccordionItem value="header">
          <AccordionTrigger>Header</AccordionTrigger>
          <AccordionContent>
            <div className="">
              <ColorProperty label="Background Color" value={headerBackgroundColor} onChange={setHeaderBackgroundColor} />
              <ColorProperty label="Font Color" value={headerFontColor} onChange={setHeaderFontColor} />
              <NumberInput label="Font Size" value={headerFontSize} onChange={setHeaderFontSize} />
              <NumberInput label="Border Radius" value={headerBorderRadius} onChange={setHeaderBorderRadius} />
              <NumberInput label="Border Width" value={headerBorderWidth} onChange={setHeaderBorderWidth} />
              <ColorProperty label="Border Color" value={headerBorderColor} onChange={setHeaderBorderColor} />
            </div>
      </AccordionContent>
      </AccordionItem>
  )
}