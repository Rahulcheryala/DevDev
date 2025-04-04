import ReactQuill from "react-quill";
import { BarcodeValues } from "./barcode";

export type TextProperties = {
  color: string;
  fontWeight: number;
};

export type TextType = {
  align: string;
  background: string;
  bold: boolean;
  color: string;
  font: string;
  italic: boolean;
  letterSpacing: number;
  lineSpacing: number;
  list: string;
  size: string;
  strike: boolean;
  underline: boolean;
  case: string;
  script: string;
  rotation: number;
};
export type TextDrawerProps = {
  fontSizeList?: string[];
  fontList: string[];
};

export type CreateTextLayerOptions = {
  layerId: string;
  ref: React.RefObject<ReactQuill>;
  isBarcodeText: boolean;
  isAutoScaleEnabled?: boolean;
  textHTML?: string;
  useBarcodeData?: boolean;
  barcodeValues?: BarcodeValues;
  translateY?: number;
};
