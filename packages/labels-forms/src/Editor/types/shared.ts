import { ScenaElementLayer } from "./scena";
import { TextType } from "./text";

export type TagAppendInfo = {
  tag: any;
  props: Record<string, any>;
  name: string;
  frame: Record<string, any>;
};

export type Clipboard = {
  write(items: ClipboardItem[]): Promise<void>;
};

export type ClipboardItem = {
  types: string[];
  getType(type: string): Promise<Blob>;
};
export type CanvasDetails = {
  width: number;
  height: number;
  unit: string;
  bleed: number;
  margin: number;
  canvasBorderRadius: {
    borderBottomLeftRadius: string;
    borderBottomRightRadius: string;
    borderTopLeftRadius: string;
    borderTopRightRadius: string;
  };
  bleedVisible: boolean;
  marginVisible: boolean;
};

export type LabelData = {
  canvasDetails: CanvasDetails;
  layers: SavedLayerJson[];
  // To accomodate default quill values (font size -> 19px, 20px etc)
  quillDefaultValues: any;
  documentDetails: { [key: string]: any };
};

export type RightSideBarImages = {
  isActive: boolean;
};

export type ShapesGalleryType = {
  title: string;
  style: { [key: string]: string | number };
  jsx: JSX.Element;
};

export type DataRow = {
  [key: string]: string | number;
};

export type MergeRules = {
  horizontalMerges: [{ row: number; startCol: number; endCol: number }] | [];
  verticalMerges: [{ col: number; startRow: number; endRow: number }] | [];
};

export type AlignProps = {
  type: "horizontal" | "vertical";
  direction: "start" | "center" | "end";
};

export interface ITextDrawerProps {
  fontSizeList?: string[];
  fontList: string[];
  setTextFormatting: (name: string, value: number | boolean | string) => void;
  textFormatting: TextType;
}

export type Position = "left" | "right" | "top" | "bottom";

export type QuillDefaultValueProps = {
  textFontSizes: string[];
  textFontStyles: string[];
  isListStyle: boolean;
};
export type QuillAlignment = "left" | "center" | "right" | "justify";
export type QuillValue = string | number | boolean;
export type Database = any;

export type UndoConfig = {
  operation?: string | null;
  addedLayer?: {} | ScenaElementLayer | null;
  allLayerList?: ScenaElementLayer[] | null;
};
export type AddToUndo = (config?: UndoConfig) => void;

export type Dimensions = { width: number; height: number; unit: string };

export type MergeRule = {
  horizontalMerges: Array<{ endCol: number; row: number; startCol: number }>;
  verticalMerges: Array<{ endRow: number; col: number; startRow: number }>;
};

export type TableCss = { [key: string]: any };

export type CanvasProperties = {
  borderTopLeftRadius: string;
  borderTopRightRadius: string;
  borderBottomRightRadius: string;
  borderBottomLeftRadius: string;
  left?: string;
  top?: string;
};

export type SavedLayerJson = {
  id: string;
  type: string;
  subtype?: string;
  style?: any;
  scope: string[];
  undo?: boolean;
  width: number;
  height: number;
  src?: string | null;
  title?: string | null;
  operation?: string;
  rotation: string | number;
  transformOrigin: [number, number];
  metaData?: { [key: string]: any };
  formatting?: {
    rounding?: {
      topLeft?: string;
      topRight?: string;
      bottomLeft?: string;
      bottomRight?: string;
    };
    stroke?: {
      color?: string;
      width?: string;
      type?: string;
    };
    fill?: string;
  };
  content?: string;
  format?: any;
};

export type QRType = {
  bgColor: string;
  ecLevel: string;
  enableCORS: boolean;
  eyeRadius: number[];
  fgColor: string;
  logoOpacity: any;
  logoPaddingStyle: string;
  qrStyle: any;
  quietZone: number;
  size: number;
  value: string;
  bgOpacity: number;
  fgOpacity: number;
  qrOpacity: number;
};
