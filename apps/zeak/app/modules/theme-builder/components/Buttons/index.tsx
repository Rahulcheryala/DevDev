
import { Button, Badge } from "@zeak/react"
import ButtonsControls from "./Controls"
import { useButtonThemeStore, ControlsContainer } from "~/modules/theme-builder"


export default function Buttons() {
  const {primaryBackground, primaryText, secondaryBackground, warningBackground, destructiveBackground, borderRadius, borderWidth, borderColor, height, fontSize} = useButtonThemeStore()
  return (
    <div className="flex  w-full h-full gap-5">
      <div className="flex flex-col p-5 gap-5 w-3/4 items-center">
      <Button style={{backgroundColor:primaryBackground, color:primaryText, borderRadius:borderRadius, borderWidth:borderWidth, borderColor:borderColor, height, fontSize}} className="w-60" variant="primary">Primary</Button>
      <Button style={{backgroundColor:secondaryBackground, color:primaryText, borderRadius:borderRadius, borderWidth:borderWidth, borderColor:borderColor, height, fontSize}} className="w-60" variant="secondary">Secondary</Button>
      <Button style={{backgroundColor:warningBackground, color:primaryText, borderRadius:borderRadius, borderWidth:borderWidth, borderColor:borderColor, height, fontSize}} className="w-60" variant="warning">Warning</Button>
      <Button style={{backgroundColor:destructiveBackground, color:primaryText, borderRadius:borderRadius, borderWidth:borderWidth, borderColor:borderColor, height, fontSize}} className="w-60" variant="destructive">Destructive</Button>
      <Button  className="w-60" variant="solid">Solid</Button>
      <Button  className="w-60" variant="ghost">Ghost</Button>
      <Button  className="w-60" variant="outline-primary">Outline Primary</Button>
      <Button  className="w-60" variant="white">White</Button>
      <Button  className="w-60" variant="blue">Blue</Button>
      </div>
      <ControlsContainer>
        <ButtonsControls />
      </ControlsContainer>
    </div>
  )
}
