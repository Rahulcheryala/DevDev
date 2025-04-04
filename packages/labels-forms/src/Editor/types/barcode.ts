import { QuillAlignment } from "./shared";
import { TextProperties } from "./text";

// Define the type for the barcode values
export type BarcodeType = {
  width: number;
  height: number;
  format: BarcodeFormat;
  value: string;
  displayValue: boolean;
  fontOptions: string;
  font: string;
  textAlign: string;
  textPosition: string;
  textMargin: number;
  fontSize: number;
  background: string;
  lineColor: string;
  margin: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  id?: string;
  className?: string;
  opacity: number;
  textProperties: TextProperties;
  fgOpacity: string;
  bgOpacity: string;
};

export type NewBarcodeTextProperties = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
  color: string;
  font?: string;
  fontMedium?: string;
  size: string;
  align: QuillAlignment | string;
  fontWeight: string;
};

export type BarcodeValues = {
  opacity: number;
  height: number;
  margin: string;
  barcodeType: string;
  barcodeData: string;
  barcodeBarColor: string;
  barcodeBgColor: string;
  showText: boolean;
  barcodeTextProperties: NewBarcodeTextProperties;
};

export type DefaultBarcodeTextType = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
  align: string;
  size: string;
  color: string;
  font?: string;
};

export type BarcodeFormat =
  | "CODE39"
  | "CODE128"
  | "CODE128A"
  | "CODE128B"
  | "CODE128C"
  | "EAN13"
  | "EAN8"
  | "EAN5"
  | "EAN2"
  | "UPC"
  | "UPCE"
  | "ITF14"
  | "ITF"
  | "MSI"
  | "MSI10"
  | "MSI11"
  | "MSI1010"
  | "MSI1110"
  | "pharmacode"
  | "codabar";

export type TextPropertyKey = "bold" | "italic" | "underline" | "strike";
