import ReactQuill, { Quill } from "react-quill";
import { ScenaElementLayer, ScenaElementLayerGroup } from "../types";
import { Dispatch, SetStateAction } from "react";

export const handleLayerSelection = (
  selectedLayers: (ScenaElementLayerGroup | ScenaElementLayer)[],
  setIsAutoScaleEnabled: Dispatch<SetStateAction<boolean>>,
  setFixRatio: (value: boolean) => void,
) => {
  if (selectedLayers && selectedLayers.length) {
    if ("type" in selectedLayers[0]) {
      const layer = selectedLayers[0] as ScenaElementLayerGroup;
      if (
        selectedLayers[0].type === "group" &&
        selectedLayers.length === 1 &&
        layer.children[0]?.title
      ) {
        const isAutoScaleEnabledValue =
          layer.children[0]?.metaData?.isAutoScaleEnabled;
        setIsAutoScaleEnabled(isAutoScaleEnabledValue);
        setFixRatio(false);
      } else {
        setIsAutoScaleEnabled(false);
      }
    }
  }
};

type QuillDefaultValues = {
  textFontSizes: string[];
  textFontStyles: string[];
  isListStyle: boolean;
};

export const handleCustomFontSizeChange = (
  customFontSize: number | undefined,
  quillDefaultValues: QuillDefaultValues,
  setQuillDefaultValues: React.Dispatch<
    React.SetStateAction<QuillDefaultValues>
  >,
  quillRef: React.RefObject<ReactQuill>,
  customFontSizeRef: React.MutableRefObject<HTMLInputElement | null>,
  applySpacingAndFontSizeFormat: (
    quillRef: React.RefObject<ReactQuill>,
    format: string,
    value: string,
  ) => void,
) => {
  if (customFontSize !== 0 && customFontSize !== undefined) {
    const size = customFontSize.toString() + "px";
    const updatedFontSizes = [...quillDefaultValues.textFontSizes, size];

    // Update Quill default values
    setQuillDefaultValues({
      ...quillDefaultValues,
      textFontSizes: [...updatedFontSizes, size],
    });

    // Update Quill size whitelist
    const SizeStyle = Quill.import("attributors/style/size");
    SizeStyle.whitelist = [...quillDefaultValues.textFontSizes, size];

    // Apply font size formatting
    applySpacingAndFontSizeFormat(quillRef, "size", size);

    // Set focus to the input after state update
    if (customFontSizeRef.current) {
      customFontSizeRef.current.focus();
    }
  }
};
