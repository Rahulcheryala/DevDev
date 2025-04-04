import React from "react";
import ReactQuill from "react-quill";
import { BarcodeValues } from "../../../../../types";
import { createLayer } from "../../../../managers/LayerManager";

type BarcodeLayerProps = {
  imageUrl: string;
};

export const BarcodeLayer: React.FC<BarcodeLayerProps> = ({ imageUrl }) => (
  <div style={{ display: "flex", padding: "10px" }}>
    <img src={imageUrl} className="w-full h-full" alt="Generated Barcode" />
  </div>
);

type TextLayerProps = {
  newQuillRef: React.RefObject<ReactQuill>;
  textHTML?: string;
  barcodeData: string;
};

export const TextLayer: React.FC<TextLayerProps> = ({
  newQuillRef,
  textHTML,
  barcodeData,
}) => (
  <div style={{ width: "auto", height: "auto", padding: "10px" }}>
    <ReactQuill
      ref={newQuillRef}
      placeholder="Enter some text"
      value={textHTML || barcodeData}
      modules={{ toolbar: false }}
      readOnly
      style={{ width: "auto", height: "auto" }}
    />
  </div>
);

export type GenerateNewBarcode = {
  ref: React.RefObject<ReactQuill>;
  barcodeId: number;
  barcodeValues: BarcodeValues;
  isAutoScaleEnabled: boolean;
  imageUrl: string;
};
export const generateNewBarcode = ({
  ref,
  barcodeId,
  barcodeValues,
  isAutoScaleEnabled,
  imageUrl,
}: GenerateNewBarcode) => {
  const barcode = createLayer({
    type: "image",
    id: `barcode-${barcodeId.toString()}`,
    // storing barcodeRef and barcode properties to be used during saving and retrieving
    // (for 2 way binding purpose)
    metaData: {
      barcodeTextRef: ref,
      barcodeValues: barcodeValues,
      isAutoScaleEnabled,
    },
    scope: [barcodeId.toString()],
    title: "barcode",
    style: {
      position: "absolute",
      opacity: barcodeValues.opacity || 1,
      display: "flex",
      width: "290px",
      height: "120px",
    },
    jsx: (
      <div
        style={{
          display: "flex",
          padding: "10px",
        }}
      >
        <img src={imageUrl} className=" w-full h-full" />
      </div>
    ),
  });
  return barcode || {};
};
