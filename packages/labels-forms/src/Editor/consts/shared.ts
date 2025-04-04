import { BorderRadiusProperty } from "../types/shape";

export const toolBarItems = {
  TEXT: "text",
  SHAPE: "shape",
  TABLE: "table",
  BARCODE: "barcode",
  QRCODE: "qrcode",
  GRIDLINEICON: "gridline",
  DOTGRIDICON: "dotgridline",
  ANCHORICON: "anchorIcon",
  EXPORT: "export",
  STUDIO: "studio",
  PRINT: "print",
  COMMENTS: "Comments",
  LINE: "line",
};

export const rightSidebar = {
  ELEMENTS: "elements",
};

export const dimensionUnits = {
  IN: "in",
  CM: "cm",
  PX: "px",
  MM: "mm",
};

export const position = {
  TOP: "top",
  LEFT: "left",
  RIGHT: "right",
  BOTTOM: "bottom",
} as const;

export const defaultLayerStyles = {
  TEXT_STYLES: {
    position: "absolute",
    display: "inline-block",
    placeContent: "center",
    width: "150px",
    height: "auto",
  },
  SHAPE_STYLES: {
    width: "100px",
    height: "100px",
    fill: "#d6d4d9",
    strokeColor: "#FFA500",
    strokeWidth: "0px",
  },
  QR_STYLES: {
    width: "100px",
    height: "100px",
  },
  BARCODE_STYLES: {
    width: "290px",
    height: "120px",
  },
};

export const quillFontSizes = [
  "8px",
  "9px",
  "10px",
  "11px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "25px",
  "72px",
];

export const caseValues = {
  UPPER_CASE: "uppercase",
  LOWER_CASE: "lowercase",
  SUB_SCRIPT: "sub",
  SUP_SCRIPT: "super",
};

export const quillFormatConsts = {
  SIZE: "size",
  BACKGROUND: "background",
  COLOR: "color",
  ALIGN: "align",
  STRIKE: "strike",
  UNDERLINE: "underline",
  BOLD: "bold",
  ITALIC: "italic",
  FONT: "font",
  CASE: "case",
  SCRIPT: "script",
};

export const alignConsts = {
  LEFT: "left",
  RIGHT: "right",
  CENTER: "center",
  JUSTIFY: "justify",
};

export enum paperSize {
  A4_WIDTH_MM = 210,
  A4_HEIGHT_MM = 297,
}

export const predefinedZoomLevels = [
  0.25, // 25%
  0.5, // 50%
  0.75, // 75%
  0.8, // 80%
  0.9, // 90%
  1, // 100%
  1.1, // 110%
  1.25, // 125%
  1.5, // 150%
  2, // 200%
  4, // 400%
  5, // 500%
];

export const undoActionType = {
  DELETE: "delete",
  UPDATE: "update",
  POS_CHANGE: "pos_change",
  ADD: "add",
};

export const defaultLayerValues = {
  COLOR: "dc4444f5",
};

export const qrValuesMap = {
  QR_OPACITY: "qrOpacity",
  QR_STYLE: "qrStyle",
  VALUE: "value",
  FG_COLOR: "fgColor",
  BG_COLOR: "bgColor",
  BACKGROUND: "background",
};

export const defaultIconValues = {
  primaryStroke: "#8A8A8F",
  secondaryStroke: "#19110B",
};

export const layerBorderMap = {
  TOP_LEFT: "borderTopLeftRadius",
  TOP_RIGHT: "borderTopRightRadius",
  BOTTOM_RIGHT: "borderBottomRightRadius",
  BOTTOM_LEFT: "borderBottomLeftRadius",
};

export const borderRadiusMap: { [key: string]: BorderRadiusProperty } = {
  [layerBorderMap.TOP_RIGHT]: "borderTopRightRadius",
  [layerBorderMap.TOP_LEFT]: "borderTopLeftRadius",
  [layerBorderMap.BOTTOM_LEFT]: "borderBottomLeftRadius",
  [layerBorderMap.BOTTOM_RIGHT]: "borderBottomRightRadius",
};

export const borderStyles = [
  { value: "solid", label: "Line" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
];

export const defaultPrintMargins = {
  top: 0.5,
  bottom: 0.5,
  left: 0.25,
  right: 0.25,
};

export enum gridTypeEnum {
  Gridline = "gridline",
  Griddot = "griddot",
}

export const tableCSS = [
  {
    headerBg: "#000000",
    headerText: "text-[#ffffff]",
    primaryRowBg: "bg-[#D9D9D9]",
    primaryRowText: "#000000",
    secondaryRowBg: "bg-[#ffffff]",
    secondaryRowText: "#000000",
  },
  {
    headerBg: "#4473C4",
    headerText: "text-[#ffffff]",
    primaryRowBg: "bg-[#D9E1F1]",
    primaryRowText: "#00000",
    secondaryRowBg: "bg-[#ffffff]",
    secondaryRowText: "#00000",
  },

  {
    headerBg: "#EC7D31",
    headerText: "text-[#ffffff]",
    primaryRowBg: "bg-[#FCE4D6]",
    primaryRowText: "#00000",
    secondaryRowBg: "bg-[#ffffff]",
    secondaryRowText: "#00000",
  },
  {
    headerBg: "#A5A5A5",
    headerText: "text-[#ffffff]",
    primaryRowBg: "bg-[#EDEDED]",
    primaryRowText: "#00000",
    secondaryRowBg: "bg-[#ffffff]",
    secondaryRowText: "#00000",
  },
  {
    headerBg: "#ffffff",
    headerText: "text-[#000000]",
    primaryRowBg: "bg-[#ffffff]",
    primaryRowText: "#00000",
    secondaryRowBg: "bg-[#ffffff]",
    secondaryRowText: "#00000",
  },
];

export const cloudSaveMap = {
  SAVE: "Save",
  UPLOADING: "Uploading",
  SAVED: "Saved",
  UPLOAD_FAILED: "Upload failed",
  OFFLINE: "Offline",
};

// Define enums for ShapeTypes and ShapeOperations
export const toolbarIcons: { [key: string]: string } = {
  UNDO: "undo",
  REDO: "redo",
  TEXT: "text",
  SHAPE: "shape",
  LINE: "line",
  WATERMARK: "watermark",
  SIGNATURE: "signature",
  LINK: "link",
  TABLE: "table",
  GRID: "grid",
  QRCODE: "qrcode",
  BARCODE: "barcode",
  FILL: "fill",
  PAINT: "paint",
  LOCK: "lock",
  DOTGRIDICON: "DotGridIcon",
  GRIDLINEICON: "GridLineIcon",
};

export const bleedValuesConst = {
  IN: 0.2,
  CM: 2,
  PX: 2,
};

export const keyboardShortcuts = {
  EXPORT: ["CtrlOrCmd", "Shift", "e"],
  GROUP_LAYERS: ["CtrlOrCmd", "g"],
  UNGROUP_LAYERS: ["CtrlOrCmd", "Shift", "g"],
  TOGGLE_PRINT: ["CtrlOrCmd", "Shift", "p"],
  STUDIO_CONTROL: ["CtrlOrCmd", "Shift", "s"],
  ESCAPE: ["Escape"],
  SELECT_ALL: ["CtrlOrCmd", "a"],
  CLEAR_GUIDES: ["CtrlOrCmd", "Shift", "\\"],
  TOGGLE_GRID: ["CtrlOrCmd", "Shift", "'"],
  TOGGLE_SNAP: ["CtrlOrCmd", "Shift", ";"],
  UNDO: ["CtrlOrCmd", "z"],
  REDO: ["CtrlOrCmd", "y"],
  ZOOMIN: ["CtrlOrCmd", "+"],
  ZOOMOUT: ["CtrlOrCmd", "-"],
  TOGGLE_RULER: ["Shift", "r"],
};

export enum platformKeys {
  CONTROL = "Control",
  META = "Meta",
}

export const defaultCanvasDimensions = {
  width: 600,
  height: 500,
  unit: "px",
};

export const colors = {
  WHITE: "#ffffff",
  BLACK: "#000000",
};

export const drawerButtonValues = {
  GENERATE_QR: "Generate QR",
  AUTOMATIC_DATA: "Automatic data",
};

export const toolbarItemMap: Record<string, string> = {
  [toolBarItems.SHAPE]: toolBarItems.SHAPE,
  [toolBarItems.TEXT]: toolBarItems.TEXT,
  [toolBarItems.TABLE]: toolBarItems.TABLE,
  [toolBarItems.QRCODE]: toolBarItems.QRCODE,
  [toolBarItems.BARCODE]: toolBarItems.BARCODE,
  [toolBarItems.COMMENTS]: toolBarItems.COMMENTS,
  [toolBarItems.LINE]: toolBarItems.LINE,
};
