import React from 'react'
import {useDataTableTheme, ColorProperty, NumberInput} from "~/modules/theme-builder"
import {AccordionItem, AccordionTrigger, AccordionContent} from "@zeak/react"

export default function CellControls() {
  const {cellVerticalPadding, cellHorizontalPadding, setCellVerticalPadding, setCellHorizontalPadding, cellTextColor, setCellTextColor} = useDataTableTheme()
  return (
    <AccordionItem value="cell">
      <AccordionTrigger>Cell</AccordionTrigger>
      <AccordionContent>
        <div>
          <ColorProperty label="Text Color" value={cellTextColor} onChange={setCellTextColor} />
          <NumberInput label="Vertical Padding" value={cellVerticalPadding} onChange={setCellVerticalPadding} />
          <NumberInput label="Horizontal Padding" value={cellHorizontalPadding} onChange={setCellHorizontalPadding} />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}