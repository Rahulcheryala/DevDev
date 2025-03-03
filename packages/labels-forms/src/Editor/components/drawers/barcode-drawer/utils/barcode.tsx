import React from "react";
// barcodeValidators
import { lazy } from "react";

// TODO -> Gaurav Jain (To be optimized)
const BoldOutlined = lazy(() =>
  import("@ant-design/icons").then((module) => ({
    default: module.BoldOutlined,
  })),
);
const ItalicOutlined = lazy(() =>
  import("@ant-design/icons").then((module) => ({
    default: module.ItalicOutlined,
  })),
);
const StrikethroughOutlined = lazy(() =>
  import("@ant-design/icons").then((module) => ({
    default: module.StrikethroughOutlined,
  })),
);
const UnderlineOutlined = lazy(() =>
  import("@ant-design/icons").then((module) => ({
    default: module.UnderlineOutlined,
  })),
);
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "../../icons";
import { Frame } from "scenejs";
import {
  BarcodeValues,
  ScenaElementLayer,
  TextPropertyKey,
} from "../../../../types";
import {
  alignConsts,
  barcodeConsts,
  barcodeHeaders,
  quillFormatConsts,
} from "../../../../consts";

export const validateCodabar = (input: string): boolean => {
  const codabarRegex = /^[ABCD][0-9\-:/.+]+[ABCD]$/;
  return codabarRegex.test(input);
};

export const validateCode39 = (input: string): boolean => {
  const code39Regex = /^[0-9A-Z\-$.%+/]+$/;
  return code39Regex.test(input);
};
/* eslint-disable no-control-regex */
export const validateCode93 = (input: string): boolean => {
  const code93Regex = /^[\x00-\x7F]+$/; // Full ASCII range
  return code93Regex.test(input);
};

export const validateCode128 = (input: string): boolean => {
  const code128Regex = /^[\x00-\x7F]+$/; // Full ASCII range
  return code128Regex.test(input);
};
/* eslint-enable no-control-regex */
export const validateITF14 = (input: string): boolean => {
  const itf14Regex = /^\d{14}$/;
  return itf14Regex.test(input);
};

export const validateEAN8 = (input: string): boolean => {
  const ean8Regex = /^\d{8}$/;
  return ean8Regex.test(input);
};

export const validateEAN13 = (input: string): boolean => {
  const ean13Regex = /^\d{13}$/;
  return ean13Regex.test(input);
};

export const validateUPC = (input: string): boolean => {
  const upcRegex = /^\d{12}$/;
  return upcRegex.test(input);
};

export const validateITF = (input: string): boolean => {
  const itfRegex = /^\d+$/;
  return itfRegex.test(input) && input.length % 2 === 0;
};

export const validateMSI = (input: string): boolean => {
  const msiRegex = /^\d+$/;
  return msiRegex.test(input);
};

export const validatePharmacode = (input: string): boolean => {
  const pharmacodeRegex = /^\d+$/;
  const num = parseInt(input, 10);
  return pharmacodeRegex.test(input) && num >= 3 && num <= 131070;
};

export const validatePlessey = (input: string): boolean => {
  const plesseyRegex = /^[0-9A-F]+$/;
  return plesseyRegex.test(input);
};

export const getImageUrlFromCanvas = (canvas: HTMLCanvasElement) =>
  canvas.toDataURL("image/svg");

export const createLayerStyle = (
  width: string,
  height: string,
  opacity: number,
) => ({
  position: "absolute",
  display: "flex",
  width,
  height,
  opacity,
});

export const setLayerFrame = (layer: ScenaElementLayer, padding: string) => {
  layer.item.items[0] = createAndSetFrame("50px", padding);
};

export const createAndSetFrame = (
  translateX: string = "50px",
  translateY: string,
): Frame => {
  const frame = new Frame();
  const layerProperties = {
    transform: {
      translate: [translateX, translateY],
    },
  };
  frame.set(layerProperties);
  return frame;
};

export const getCollapsePanelValues = (
  barcodeValues: BarcodeValues,
  handleBarcodeValues: (key: string, value: string) => void,
) => [
  {
    key: "1",
    header: barcodeHeaders.BACKGROUND_COLOR,
    value: barcodeValues.barcodeBgColor,
    onChange: (hex: string) =>
      handleBarcodeValues(barcodeConsts.BARCODE_BG_COLOR, hex),
  },
  {
    key: "2",
    header: barcodeHeaders.CODE_COLOR,
    value: barcodeValues.barcodeBarColor,
    onChange: (hex: string) =>
      handleBarcodeValues(barcodeConsts.BARCODE_BAR_COLOR, hex),
  },
];

// Export textStyleOptions
export const textStyleOptions: {
  key: TextPropertyKey;
  icon: JSX.Element;
  property: TextPropertyKey;
}[] = [
  {
    key: quillFormatConsts.BOLD as TextPropertyKey,
    icon: <BoldOutlined size={20} />,
    property: quillFormatConsts.BOLD as TextPropertyKey,
  },
  {
    key: quillFormatConsts.ITALIC as TextPropertyKey,
    icon: <ItalicOutlined size={20} />,
    property: quillFormatConsts.ITALIC as TextPropertyKey,
  },
  {
    key: quillFormatConsts.UNDERLINE as TextPropertyKey,
    icon: <UnderlineOutlined size={20} />,
    property: quillFormatConsts.UNDERLINE as TextPropertyKey,
  },
  {
    key: quillFormatConsts.UNDERLINE as TextPropertyKey,
    icon: <StrikethroughOutlined size={20} />,
    property: quillFormatConsts.UNDERLINE as TextPropertyKey,
  },
];

// Export textAlignOptions
export const textAlignOptions = [
  { key: alignConsts.LEFT, icon: <AlignLeft />, align: alignConsts.LEFT },
  { key: alignConsts.CENTER, icon: <AlignCenter />, align: alignConsts.CENTER },
  { key: alignConsts.RIGHT, icon: <AlignRight />, align: alignConsts.RIGHT },
  {
    key: alignConsts.JUSTIFY,
    icon: <AlignJustify />,
    align: alignConsts.JUSTIFY,
  },
];
