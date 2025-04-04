import { useNanoStore } from "~/hooks";
import {atom} from "nanostores"

export const dataTableTheme = atom({
  fontSize: 14,
  backgroundColor: "#fff",
  fontColor:"#0D0C22  ",
  foregroundColor:"#007AF5",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ffd",
  headerBackgroundColor: "#fff",
  headerFontColor: "#000",
  headerFontSize: 11,
  headerFontWeight: "bold",
  headerBorderRadius: 12,
  headerBorderWidth: 1,
  headerBorderColor: "#007AF5",
  cellTextColor:"#000",
  cellVerticalPadding: 8,
  cellHorizontalPadding: 16,
  // pagination
  paginationBgColor:"#F0F4FD",
  paginationTextColor:"#007AF5",
  paginationBorderRadius:0,
  paginationBorderWidth:4,
  paginationBorderColor:"#FFDF41",
  paginationHorizontalPadding:8,
  paginationVerticalPadding:16,

  
})

export const useDataTableTheme = () => {
 const [state, setState] = useNanoStore(dataTableTheme)
 const setFontSize = (size: number) => {
  setState({...state, fontSize: size})
 }

 const setBackgroundColor = (color: string) => {
  setState({...state, backgroundColor: color})
 }

 const setFontColor = (color: string) => {
  setState({...state, fontColor: color})
 }

 const setForegroundColor = (color: string) => {
  setState({...state, foregroundColor: color})
 }

 const setBorderRadius = (radius: number) => {
  setState({...state, borderRadius: radius})
 }

 const setBorderWidth = (width: number) => {
  setState({...state, borderWidth: width})
 }

 const setBorderColor = (color: string) => {
  setState({...state, borderColor: color})
 }

 const setHeaderBackgroundColor = (color: string) => {
  setState({...state, headerBackgroundColor: color})
 }

 const setHeaderFontColor = (color: string) => {
  setState({...state, headerFontColor: color})
 }

 const setHeaderFontSize = (size: number) => {
  setState({...state, headerFontSize: size})
 }

 const setHeaderFontWeight = (weight: string) => {
  setState({...state, headerFontWeight: weight})
 }

 const setHeaderBorderRadius = (radius: number) => {
  setState({...state, headerBorderRadius: radius})
 }

 const setHeaderBorderWidth = (width: number) => {
  setState({...state, headerBorderWidth: width})
 }

 const setHeaderBorderColor = (color: string) => {
  setState({...state, headerBorderColor: color})
 }

 const setCellTextColor = (color: string) => {
  setState({...state, cellTextColor: color})
 }

 const setCellVerticalPadding = (padding: number) => {
  setState({...state, cellVerticalPadding: padding})
 }

 const setCellHorizontalPadding = (padding: number) => {
  setState({...state, cellHorizontalPadding: padding})
 }

 const setPaginationBgColor = (color: string) => {
  setState({...state, paginationBgColor: color})
 }

 const setPaginationTextColor = (color: string) => {
  setState({...state, paginationTextColor: color})
 }

 const setPaginationBorderRadius = (radius: number) => {
  setState({...state, paginationBorderRadius: radius})
 }

 const setPaginationBorderWidth = (width: number) => {
  setState({...state, paginationBorderWidth: width})
 }

 const setPaginationBorderColor = (color: string) => {
  setState({...state, paginationBorderColor: color})
 }

 const setPaginationHorizontalPadding = (padding: number) => {
  setState({...state, paginationHorizontalPadding: padding})
 }

 const setPaginationVerticalPadding = (padding: number) => {
  setState({...state, paginationVerticalPadding: padding})
 }
 return {
  ...state,
  setState,
  setFontSize,
  setBackgroundColor,
  setFontColor,
  setForegroundColor,
  setBorderRadius,
  setBorderWidth,
  setBorderColor,
  setHeaderBackgroundColor,
  setHeaderFontColor,
  setHeaderFontSize,
  setHeaderFontWeight,
  setHeaderBorderRadius,
  setHeaderBorderWidth,
  setHeaderBorderColor,
  setCellTextColor,
  setCellVerticalPadding,
  setCellHorizontalPadding,
  setPaginationBgColor,
  setPaginationTextColor,
  setPaginationBorderRadius,
  setPaginationBorderWidth,
  setPaginationBorderColor,
  setPaginationHorizontalPadding,
  setPaginationVerticalPadding
 }
}
