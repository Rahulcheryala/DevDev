import React from 'react'
import { useThemeBuilderStore } from "~/modules/theme-builder"
import NavItem from "./NavItem"
import {ScrollArea} from "@zeak/react"
export default function LeftPanel() {
  const {setComponent, component} = useThemeBuilderStore()
  return (
   <div className="flex flex-col w-[200px] p-2 h-full  bg-background border-r">
      <ScrollArea className="h-[calc(100vh-100px)]">
      <nav className="space-y-3 relative">
       <NavItem title="Badges" onClick={() => setComponent("badges")} active={component === "badges"} />
       <NavItem title="Buttons" onClick={() => setComponent("buttons")} active={component === "buttons"} />
       <NavItem title="Inputs" onClick={() => setComponent("inputs")} active={component === "inputs"} />
       <NavItem title="DataTable" onClick={() => setComponent("datatable")} active={component === "datatable"} />
      </nav>
      </ScrollArea>
          </div>
  )
}
