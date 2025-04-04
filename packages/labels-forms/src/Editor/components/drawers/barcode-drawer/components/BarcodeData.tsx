import React, { forwardRef } from "react";
import { BarcodeValues } from "../../../../types";

type BarcodeDataProps = {
  barcodeValues: BarcodeValues;
  placeholderValue: string;
  handleBarcodeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isBarcodeValid: boolean | null;
};

const BarcodeData = forwardRef<HTMLInputElement, BarcodeDataProps>(
  (
    { barcodeValues, placeholderValue, handleBarcodeValue, isBarcodeValid },
    ref,
  ) => {
    return (
      <div className="py-[24px] px-[20px] border-t border-stroke-secondary">
        <p className="text-sm leading[20px] text-accent-primary font-suisseIntl mr-auto mb-[20px]">
          Data
        </p>
        <div className="border border-[#EBEBEB] rounded-[10px] h-[40px] overflow-hidden">
          <input
            ref={ref}
            type="text"
            className="w-full text-[14px] leading[20px] outline-none px-[8px] border-0 rounded-0 h-full"
            value={barcodeValues.barcodeData || ""}
            placeholder={placeholderValue}
            onChange={handleBarcodeValue}
          />
        </div>
        {isBarcodeValid !== null && (
          <div>
            {isBarcodeValid ? (
              <p className="text-[12px] text-green-600 mt-[5px] ml-[2px]">
                Valid Barcode
              </p>
            ) : (
              <p className="text-[12px] text-red-400 mt-[5px] ml-[2px]">
                Invalid Barcode
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
);

BarcodeData.displayName = "BarcodeData";

export default BarcodeData;
