import {
  validateCodabar,
  validateCode128,
  validateCode39,
  validateEAN13,
  validateEAN8,
  validateITF,
  validateITF14,
  validateMSI,
  validatePharmacode,
  validateUPC,
} from "../utils";
import { barcodePlaceholder, barcodes } from "../utils/config";

export const barcodePlaceholderMap = new Map([
  [barcodes.CODE128, barcodePlaceholder.CODE128],
  [barcodes.EAN13, barcodePlaceholder.EAN13],
  [barcodes.EAN8, barcodePlaceholder.EAN8],
  [barcodes.CODE39, barcodePlaceholder.CODE39],
  [barcodes.ITF14, barcodePlaceholder.ITF14],
  [barcodes.MSI, barcodePlaceholder.MSI],
  [barcodes.PHARMACODE, barcodePlaceholder.pharmacode],
  [barcodes.CODABAR, barcodePlaceholder.codabar],
  [barcodes.UPC, barcodePlaceholder.UPC],
]);

export const validationMap: Record<string, (input: string) => boolean> = {
  [barcodes.CODABAR]: validateCodabar,
  [barcodes.CODE39]: validateCode39,
  [barcodes.CODE128]: validateCode128,
  [barcodes.EAN8]: validateEAN8,
  [barcodes.ITF14]: validateITF14,
  [barcodes.EAN13]: validateEAN13,
  [barcodes.UPC]: validateUPC,
  [barcodes.ITF]: validateITF,
  [barcodes.MSI]: validateMSI,
  [barcodes.PHARMACODE]: validatePharmacode,
};

export const barcodeTextStyles = {
  position: "absolute",
  display: "inline-block",
  placeContent: "center",
  width: "290px",
  height: "55px",
};

export const barcodeHeaders = {
  BACKGROUND_COLOR: "Background color",
  CODE_COLOR: "Code color",
};
export const barcodeConsts = {
  BARCODE_BG_COLOR: "barcodeBgColor",
  BARCODE_BAR_COLOR: "barcodeBarColor",
};
