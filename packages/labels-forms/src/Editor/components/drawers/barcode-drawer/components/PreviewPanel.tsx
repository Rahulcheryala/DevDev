import React from "react";
import ReactQuill from "react-quill";
import { BarcodeValues } from "../../../../types";

type PreviewProps = {
  barcodeValues: BarcodeValues;
  quillRef: React.RefObject<any>;
};

const PreviewPanel: React.FC<PreviewProps> = ({ barcodeValues, quillRef }) => {
  return (
    <div className="py-[24px] px-[20px] border-t border-stroke-secondary h-auto">
      <p className="text-sm leading-[20px] text-accent-primary font-suisseIntl mb-[20px]">
        Preview
      </p>
      <div
        style={{
          opacity: barcodeValues.opacity || 1,
          height: "auto",
        }}
        className={`flex-col-reverse flex w-full justify-center space-x-4 flex-wrap border-[1px] rounded-[5px] generated-barcode`}
      >
        <div className="w-[40px]">
          <canvas
            style={{
              padding: "10px",
              width: "290px",
              height: "120px",
            }}
            id="mycanvas"
          ></canvas>
        </div>

        {/* Conditional display based on showText */}
        <div
          className={`${
            barcodeValues.showText ? "flex" : "hidden"
          } justify-center items-center mt-2`}
        >
          <ReactQuill
            ref={quillRef as any}
            placeholder="Enter some text"
            value={barcodeValues?.barcodeData || "sample-barcode"}
            modules={{ toolbar: false }}
            style={{ width: "100%" }}
            readOnly={true}
            className="barcode-quill-text"
            onFocus={() => quillRef.current?.blur()}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
