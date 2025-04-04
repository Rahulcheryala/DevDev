import { Input , Label, ChipInput } from "@zeak/react"
import { useInputTheme } from "~/modules/theme-builder"


export default function InputPreview() {
  const {state, setState} = useInputTheme()
  return (
    <div className="flex flex-col gap-2 w-full h-full rounded-zeak p-5 space-y-5">
      <Label>Label</Label>
      <Input style={{
        backgroundColor: state.background,
        borderRadius: state.borderRadius,
        borderWidth: state.borderWidth,
        borderColor: state.borderColor,
        padding: `${state.verticalPadding}px ${state.horizontalPadding}px`,
      }}  
      placeholder="Input" />
      <ChipInput  />
    </div>
  )
}