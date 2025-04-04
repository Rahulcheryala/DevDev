import React from 'react'
import {Badge} from "@zeak/react"
export default function BadgesPreview() {
  return (
    <div className="flex flex-col gap-5 items-center w-3/4 ">
        <h1 className="text-2xl font-medium my-5">Badges Preview</h1>
        <Badge className="text-white" variant="default">Default</Badge>
        <Badge className="text-white" variant="secondary">Secondary</Badge>
        <Badge className="" variant="destructive">Destructive</Badge>
        <Badge className="" variant="outline">Outline</Badge>
        <Badge className="" variant="green">Green</Badge>
        <Badge className="" variant="greenishBlue">Greenish Blue</Badge>
        <Badge variant="yellow">Yellow</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="orange">Orange</Badge>
        <Badge variant="red">Red</Badge>
        <Badge variant="blue">Blue</Badge>
        <Badge variant="gray">Gray</Badge>
        <Badge variant="muted">Muted</Badge>
    </div>
  )
}
