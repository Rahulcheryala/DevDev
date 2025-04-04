import React from 'react'
import { AccordionItem, AccordionTrigger, AccordionContent } from "@zeak/react"
import { NumberInput, ColorProperty } from "~/modules/theme-builder"
import { useDataTableTheme } from '~/modules/theme-builder'
export default function Border() {
  const {setBorderRadius, setBorderWidth, setBorderColor, borderRadius, borderWidth, borderColor} = useDataTableTheme()
  return (
    <AccordionItem value="border">
          <AccordionTrigger>Border</AccordionTrigger>
          <AccordionContent>
            <div className="">
              <NumberInput label="Border Radius" value={borderRadius} onChange={setBorderRadius} />
        <NumberInput label="Border Width" value={borderWidth} onChange={setBorderWidth} />
        <ColorProperty label="Border Color" value={borderColor} onChange={setBorderColor} />
      </div>
      </AccordionContent>
      </AccordionItem>
  )
}
