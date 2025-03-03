import React from "react";
import SelectInput from "./SelectInput";
import TextAlignButton from "./TextAlignButton";
import ColorPickerInput from "./ColorPickerInput";

import { EyeIcon, AngleUpIcon, AngleDownIcon } from "../../../icons";
import {
  fontOptions,
  fontSizeOptions,
  fontWeightOptions,
} from "../../../../../utils/config";
import TextIconButton from "./TextIconButton";
import {
  AddToUndo,
  BarcodeValues,
  TextPropertyKey,
} from "../../../../../types";
import { textAlignOptions, textStyleOptions } from "../../utils/barcode";

type BarcodeTextEditorProps = {
  barcodeValues: BarcodeValues;
  setBarcodeValues: React.Dispatch<React.SetStateAction<BarcodeValues>>;
  setIsBarcodeEditing: React.Dispatch<React.SetStateAction<boolean>>;
  addToUndo: AddToUndo;
};

const BarcodeTextEditor: React.FC<BarcodeTextEditorProps> = ({
  barcodeValues,
  setBarcodeValues,
  setIsBarcodeEditing,
  addToUndo,
}) => {
  const handleTextStyleChange = (property: TextPropertyKey) => {
    setIsBarcodeEditing(true);
    setBarcodeValues({
      ...barcodeValues,
      barcodeTextProperties: {
        ...barcodeValues.barcodeTextProperties,
        [property]: !barcodeValues.barcodeTextProperties[property],
      },
    });
    addToUndo();
  };

  const handleTextAlignChange = (align: string) => {
    setIsBarcodeEditing(true);
    setBarcodeValues({
      ...barcodeValues,
      barcodeTextProperties: {
        ...barcodeValues.barcodeTextProperties,
        align: barcodeValues.barcodeTextProperties.align === align ? "" : align,
      },
    });
    addToUndo();
  };

  return (
    <div className="pb-[24px] px-[20px]">
      <SelectInput
        options={fontOptions}
        defaultValue="Sans Serif"
        onChange={(fontStyle) => {
          setIsBarcodeEditing(true);
          setBarcodeValues({
            ...barcodeValues,
            barcodeTextProperties: {
              ...barcodeValues.barcodeTextProperties,
              font: fontStyle,
            },
          });
          addToUndo();
        }}
      />

      <div className="flex flex-row mt-[14px]">
        <div className="w-[calc(100%_-_88px)] pr-[14px]">
          <SelectInput
            options={fontWeightOptions}
            defaultValue="Bold"
            onChange={(fontWeight) => {
              setBarcodeValues({
                ...barcodeValues,
                barcodeTextProperties: {
                  ...barcodeValues.barcodeTextProperties,
                  fontWeight,
                },
              });
              addToUndo();
            }}
          />
        </div>
        <div className="w-[88px]">
          <SelectInput
            options={fontSizeOptions}
            defaultValue="16px"
            onChange={(fontSize) => {
              setBarcodeValues({
                ...barcodeValues,
                barcodeTextProperties: {
                  ...barcodeValues.barcodeTextProperties,
                  size: fontSize,
                },
              });
              addToUndo();
            }}
          />
        </div>
      </div>

      {/* Bold, Italic, Underline, Strike Buttons */}
      <div className="flex flex-row my-3 space-x-3">
        {textStyleOptions.map(({ key, icon, property }) => (
          <TextIconButton
            key={key}
            isActive={barcodeValues.barcodeTextProperties[property]}
            onClick={() => handleTextStyleChange(property)}
            icon={icon}
          />
        ))}
      </div>

      {/* Text Alignment */}
      <div className="flex flex-row space-x-3">
        {textAlignOptions.map(({ key, icon, align }) => (
          <TextAlignButton
            key={key}
            align={align}
            currentAlign={barcodeValues.barcodeTextProperties.align}
            onClick={() => handleTextAlignChange(align)}
            icon={icon}
          />
        ))}
      </div>

      {/* Color Picker */}
      <div className="flex mt-[14px]">
        <div className="w-[calc(100%_-_134px)] pr-[14px]">
          <ColorPickerInput
            value={barcodeValues.barcodeTextProperties.color}
            onChange={(hex) => {
              setIsBarcodeEditing(true);
              setBarcodeValues({
                ...barcodeValues,
                barcodeTextProperties: {
                  ...barcodeValues.barcodeTextProperties,
                  color: hex,
                },
              });
              addToUndo();
            }}
          />
        </div>

        {/* Number Input and Eye Icon */}
        <div className="w-[134px] flex">
          <div
            className="relative border border-stroke-secondary 
            rounded-[10px] flex items-center px-[8px] py-[8px] w-[80px] h-[40px]"
          >
            <input
              type="text"
              className="w-full text-[14px] leading[20px] outline-none border-0 rounded-0 h-full"
            />
            <div className="w-[16px] flex justify-center items-center flex-col">
              <button
                type="button"
                className="w-[16px] h-[12px] flex items-center justify-center"
              >
                <AngleUpIcon />
              </button>
              <button
                type="button"
                className="w-[16px] h-[12px] flex items-center justify-center"
              >
                <AngleDownIcon />
              </button>
            </div>
          </div>
          <div
            className="w-[40px] h-[40px] border border-stroke-secondary 
            rounded-[10px] flex items-center justify-center ml-[14px]"
          >
            <EyeIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeTextEditor;
