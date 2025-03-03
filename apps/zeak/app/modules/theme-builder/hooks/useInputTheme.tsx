import { useNanoStore } from "~/hooks"
import {atom} from "nanostores"
const inputTheme= atom({
    background: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#007AF5",
    horizontalPadding: 16,
    verticalPadding: 8,
})
export default function useInputTheme() {

  const [state, setState] = useNanoStore(inputTheme)
  const setBorderRadius = (radius: number) => {
    setState({...state, borderRadius: radius})
  }
  const setBorderWidth = (width: number) => {
    setState({...state, borderWidth: width})
  } 
  const setBorderColor = (color: string) => {
    setState({...state, borderColor: color})
  }
  const setHorizontalPadding = (padding: number) => {
    setState({...state, horizontalPadding: padding})
  }
  const setVerticalPadding = (padding: number) => {
    setState({...state, verticalPadding: padding})
  }
  return {state, setState, setBorderRadius, setBorderWidth,
     setBorderColor, setHorizontalPadding, setVerticalPadding}
}