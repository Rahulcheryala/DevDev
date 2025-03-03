import React from 'react'
import {useButtonThemeStore} from "~/modules/theme-builder"
import { ScrollArea} from "@zeak/react"
import { ColorProperty, NumberInput } from "~/modules/theme-builder"
import {AccordionItem, AccordionTrigger, AccordionContent, Accordion} from "@zeak/react"

export default function ButtonsControls() {
  const {primaryBackground, setButtonPrimaryBackground, primaryText, setButtonPrimaryText, secondaryBackground, setSecondaryBackground, warningBackground, setWarningBackground, destructiveBackground, setDestructiveBackground, borderRadius, setBorderRadius, borderWidth, setBorderWidth, borderColor, setBorderColor, height, setHeight, fontSize, setFontSize} = useButtonThemeStore()
  return (
    <div className=" w-full px-4">
    <Accordion type="multiple" >
      <AccordionItem value="color">
        <AccordionTrigger className="w-full px-2 hover:bg-white rounded-md">Colors</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2 bg-gray-100 px-5 py-2 w-full h-full">
        <ColorProperty label="Primary Background" value={primaryBackground} onChange={(value) => setButtonPrimaryBackground(value)} />
        <ColorProperty label="Primary Text" value={primaryText} onChange={(value) => setButtonPrimaryText(value)} />
        <ColorProperty label="Secondary Background" value={secondaryBackground} onChange={(value) => setSecondaryBackground(value)} />
        <ColorProperty label="Warning Background" value={warningBackground} onChange={(value) => setWarningBackground(value)} />
        <ColorProperty label="Destructive Background" value={destructiveBackground} onChange={(value) => setDestructiveBackground(value)} />
      </div>
      </AccordionContent>

    </AccordionItem>
      <AccordionItem value="size"> 
        <AccordionTrigger className="w-full px-2 hover:bg-white rounded-md">Size</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2 bg-gray-100 px-5 py-2 w-full h-full">
        <NumberInput label="Height" value={height} onChange={setHeight} />
        <NumberInput label="Font Size" value={fontSize} onChange={setFontSize} />
      </div>
      </AccordionContent>
      </AccordionItem>
      <AccordionItem value="border">
      <AccordionTrigger className="w-full px-2 hover:bg-white rounded-md">Border</AccordionTrigger>
      <AccordionContent>
        <div className="">
        <NumberInput label="Border Radius" value={borderRadius} onChange={setBorderRadius} />
        <NumberInput label="Border Width" value={borderWidth} onChange={setBorderWidth} />
        <ColorProperty label="Border Color" value={borderColor} onChange={setBorderColor} />
      </div>
      </AccordionContent>
    </AccordionItem>
  
    </Accordion>
    </div>
  )
}