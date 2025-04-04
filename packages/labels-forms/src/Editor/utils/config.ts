import { CornerLeftDown } from "../components/icons/CornerLeftDown";
import { CornerLeftUp } from "../components/icons/CornerLeftUp";
import { CornerRightDown } from "../components/icons/CornerRightDown";
import { CornerRightUp } from "../components/icons/CornerRightUp";
import { colors, layerBorderMap } from "../consts";
import {
  BarcodeValues,
  DefaultBarcodeTextType,
  QRType,
  ShapeValues,
} from "../types";

export const pictograms = [
  {
    id: `picto-1`,
    name: "Environment",
    src: "https://www.osha.gov/sites/default/files/inline-images/image8.png",
  },
  {
    id: `picto-2`,
    name: "Health Hazard",
    src: "https://www.osha.gov/sites/default/files/inline-images/image7.png",
  },
  {
    id: `picto-3`,
    name: "Exclamation mark",
    src: "https://www.osha.gov/sites/default/files/inline-images/image9.png",
  },
  {
    id: `picto-4`,
    name: "Gas Cylinder",
    src: "https://www.osha.gov/sites/default/files/inline-images/image6.png",
  },
  {
    id: `picto-5`,
    name: "Skulls and crossbones",
    src: "https://www.osha.gov/sites/default/files/inline-images/image5.png",
  },
  {
    id: `picto-6`,
    name: "Exploding Bomb",
    src: "https://www.osha.gov/sites/default/files/inline-images/image4.png",
  },
  {
    id: `picto-7`,
    name: "Flame",
    src: "https://www.osha.gov/sites/default/files/inline-images/image3.png",
  },
  {
    id: `picto-8`,
    name: "Flame",
    src: "https://www.osha.gov/sites/default/files/inline-images/image2.png",
  },
  {
    id: `picto-9`,
    name: "Flame over circle",
    src: "https://www.osha.gov/sites/default/files/inline-images/image1.png",
  },
];

export const barcodes = {
  CODABAR: "rationalizedCodabar",
  CODE39: "code39",
  CODE93: "code93",
  CODE128: "code128",
  EAN8: "ean8",
  EAN13: "ean13",
  UPC: "upca",
  ITF: "itf",
  ITF14: "itf14",
  MSI: "msi",
  MSI10: "msi10",
  MSI11: "msi11",
  MSI1010: "msi1010",
  MSI1110: "msi1110",
  PHARMACODE: "pharmacode",
  PLESSEY: "plessey",
};

export const barcodeOptions = [
  { value: barcodes.CODE128, label: "CODE128" },
  { value: barcodes.EAN13, label: "EAN 13" },
  { value: barcodes.CODE39, label: "CODE39" },
  { value: barcodes.ITF14, label: "ITF-14" },
  { value: barcodes.MSI, label: "MSI" },
  { value: barcodes.PHARMACODE, label: "Pharmacode" },
  { value: barcodes.CODABAR, label: "Codabar" },
  { value: barcodes.EAN8, label: "EAN 8" },
  { value: barcodes.UPC, label: "UPC" },
  { value: barcodes.CODE93, label: "CODE 93" },
];

export const initialShapeValues: ShapeValues = {
  width: 0,
  height: 0,
  rotation: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  borderBottomLeftRadius: 0,
  stroke: "",

  fill: "#dc4444f5",
  borderColor: "",
  strokeWidth: 0,
  borderStyle: "",
  borderWidth: 0,
};

export const initialTextValues = {
  align: "",
  background: "",
  bold: false,
  color: "",
  font: "",
  italic: false,
  letterSpacing: 0,
  lineSpacing: 0,
  list: "",
  size: "",
  strike: false,
  underline: false,
  case: "",
  script: "",
  rotation: 0,
};

export const exportLabelOptions = [
  { value: "pdf", label: "PDF" },
  { value: "jpg", label: "JPG" },
  { value: "png", label: "PNG" },
  { value: "jpeg", label: "JPEG" },
];

// export const textFontSizes = [
//     "8px",
//     "9px",
//     "10px",
//     "11px",
//     "12px",
//     "14px",
//     "16px",
//     "18px",
//     "20px",
//     "25px",
//     "72px",
//     "Add custom",
// ];
export const textFontSizes = (() => {
  const sizes = [];
  for (let i = 1; i <= 100; i++) {
    sizes.push(`${i}px`);
  }
  sizes.push("Add custom");
  return sizes;
})();

export const textFontWeight = [
  "200",
  "300",
  "400",
  "600",
  "700",
  "800",
  "bold",
  "normal",
];

export const textFontStyles = [
  "Roboto",
  "Montserrat",
  "Poppins",
  "Kalam",
  "Merriweather",
  "Arial",
  "Arial Black",
  "Arial Unicode MS",
  "Calibri",
  "Cambria",
  "Cambria Math",
  "Candara",
  "Comic Sans MS",
  "Consolas",
  "Constantia",
  "Corbel",
  "Courier New",
  "Georgia",
  "Lucida Sans Unicode",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
];

export const alignStyles = ["left", "center", "right", "justify"];
export const fontSizeOptions = textFontSizes?.map((font) => ({
  value: font,
  label: font,
}));

export const fontOptions = textFontStyles?.map((font) => ({
  value: font,
  label: font,
}));
export const fontWeightOptions = textFontWeight?.map((font) => ({
  value: font,
  label: font,
}));

export const validStyles = ["dotted", "dashed", "solid"];

export const defaultQrValues: QRType = {
  bgColor: colors.WHITE,
  ecLevel: "M",
  enableCORS: false,
  eyeRadius: [0, 0, 0],
  fgColor: colors.BLACK,
  logoOpacity: 0,
  logoPaddingStyle: "square",
  qrStyle: "squares",
  quietZone: 10,
  size: 150,
  value: "www.xcelpros.com",
  bgOpacity: 100,
  fgOpacity: 100,
  qrOpacity: 1,
};

export const qrTypeEnums = {
  label: {
    CLASSY: "Classy",
    ROUNDED: "Rounded",
    DOTS: "Dots",
  },
  values: {
    SQUARES: "squares",
    FLUID: "fluid",
    DOTS: "dots",
  },
};

export const barcodePlaceholder = {
  CODE128: "www.xcelpros.com",
  EAN13: "1234567891234",
  CODE39: "CODE39EXAMPLE",
  ITF14: "12345678901231",
  MSI: "1234567890",
  pharmacode: "12345",
  codabar: "A123456A",
  EAN8: "96385074",
  UPC: "012345678905",
  CODE93: "CODE93EXAMPLE",
};

export const newBarcodeValues: BarcodeValues = {
  opacity: 1,
  height: 10,
  margin: "10px",
  barcodeType: barcodes.CODE128,
  barcodeData: "www.xcelpros.com",
  barcodeBarColor: colors.BLACK,
  barcodeBgColor: colors.WHITE,
  showText: false,
  barcodeTextProperties: {
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    color: colors.BLACK,
    font: "",
    fontMedium: "normal",
    size: "16px",
    align: "left",
    fontWeight: "normal",
  },
};

export const defaultBarcodeTextValues: DefaultBarcodeTextType = {
  bold: false,
  italic: false,
  underline: false,
  strike: false,
  align: "left",
  size: "16px",
  color: colors.BLACK,
};

export const quillTextFormattingOptions = {
  ALIGN: "align",
  BOLD: "bold",
  ITALIC: "italic",
  STRIKE: "strike",
  UNDERLINE: "underline",
  SIZE: "size",
  LIST: "list",
  LISTSTYLE: {
    CHECK: "check",
    BULLET: "bullet",
  },
  FONT: "font",
};

export type CellPosition = {
  rowIndex: number;
  columnIndex: number;
};

export type BorderType = "top" | "right" | "bottom" | "left" | "all";

export const TableBorderConfig = {
  BORDER_TOP: "top",
  BORDER_BOTTOM: "bottom",
  BORDER_RIGHT: "right",
  BORDER_LEFT: "left",
  BORDER_ALL: "all",
  BORDER_OUTER: "outer",
  BORDER_INNER: "inner",
  BORDER_INNER_VERTICAL: "innerVertical",
  BORDER_INNER_HORIZONTAL: "innerHorizontal",
};

export const cornerConfig = (shapeValues: ShapeValues) => [
  {
    corner: layerBorderMap.TOP_LEFT,
    icon: CornerLeftUp({}),
    value: shapeValues.borderTopLeftRadius,
  },
  {
    corner: layerBorderMap.TOP_RIGHT,
    icon: CornerRightUp({}),
    value: shapeValues.borderTopRightRadius,
  },
  {
    corner: layerBorderMap.BOTTOM_LEFT,
    icon: CornerLeftDown({}),
    value: shapeValues.borderBottomLeftRadius,
  },
  {
    corner: layerBorderMap.BOTTOM_RIGHT,
    icon: CornerRightDown({}),
    value: shapeValues.borderBottomRightRadius,
  },
];

export enum SizeEnums {
  Width = "width",
  Height = "height",
  Resizable = "resizable",
  OffsetWidth = "offsetWidth",
  OffsetHeight = "offsetHeight",
}
