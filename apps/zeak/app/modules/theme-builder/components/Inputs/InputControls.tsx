
import {ColorProperty, NumberInput, ControlsContainer} from "~/modules/theme-builder"
import {useInputTheme} from "~/modules/theme-builder"
export default function InputControls() {
  const {state, setState} = useInputTheme()
  return (
    <ControlsContainer>
      <div className="px-3 py-3 flex flex-col gap-2">
      <ColorProperty label="Background" value={state.background} onChange={(value) => setState({...state, background: value})} />
      <NumberInput label="Border Radius" value={state.borderRadius} onChange={(value) => setState({...state, borderRadius: value})} />
      <NumberInput label="Border Width" value={state.borderWidth} onChange={(value) => setState({...state, borderWidth: value})} />
      <ColorProperty label="Border Color" value={state.borderColor} onChange={(value) => setState({...state, borderColor: value})} />
      <NumberInput label="Horizontal Padding" value={state.horizontalPadding} onChange={(value) => setState({...state, horizontalPadding: value})} />
      <NumberInput label="Vertical Padding" value={state.verticalPadding} onChange={(value) => setState({...state, verticalPadding: value})} />
      </div>
    </ControlsContainer>
  )
}