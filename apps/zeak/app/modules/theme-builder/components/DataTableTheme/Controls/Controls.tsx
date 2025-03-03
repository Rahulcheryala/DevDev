import React from 'react'
import { Accordion } from "@zeak/react"
import General from "./General"
import HeaderControls from "./HeaderControls"
import BorderControls from "./BorderControls"
import CellControls from "./CellControls"
import PaginationControls from "./PaginationControls"
export default function Controls() {
  return (
    <div className="bg-gray-100 w-full h-full px-3 py-2">
      <Accordion type="multiple">
       <General/>
    <BorderControls/>
    <HeaderControls/>
    <CellControls/>
    <PaginationControls/>
      </Accordion>
    </div>
  )
}
