import React from "react";
import { useDataTableTheme, ColorProperty, NumberInput } from "~/modules/theme-builder";
import {AccordionItem, Accordion, AccordionTrigger, AccordionContent} from "@zeak/react"


export default function PaginationControls() {
  const {paginationBgColor, paginationTextColor, paginationBorderRadius, paginationBorderWidth, paginationBorderColor, paginationHorizontalPadding, paginationVerticalPadding, setPaginationBgColor, setPaginationTextColor, setPaginationBorderRadius, setPaginationBorderWidth, setPaginationBorderColor, setPaginationHorizontalPadding, setPaginationVerticalPadding} = useDataTableTheme()
  return <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Pagination</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-2">
          <ColorProperty value={paginationBgColor} onChange={(color) => setPaginationBgColor(color)} label="Background Color" />
          <ColorProperty value={paginationTextColor} onChange={(color) => setPaginationTextColor(color)} label="Text Color" />
          <NumberInput value={paginationBorderRadius} onChange={(radius) => setPaginationBorderRadius(radius)} label="Border Radius" />
          <NumberInput value={paginationBorderWidth} onChange={(width) => setPaginationBorderWidth(width)} label="Border Width" />
          <ColorProperty value={paginationBorderColor} onChange={(color) => setPaginationBorderColor(color)} label="Border Color" />
          <NumberInput value={paginationHorizontalPadding} onChange={(padding) => setPaginationHorizontalPadding(padding)} label="Horizontal Padding" />
          <NumberInput value={paginationVerticalPadding} onChange={(padding) => setPaginationVerticalPadding(padding)} label="Vertical Padding" />
         </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>;
}
