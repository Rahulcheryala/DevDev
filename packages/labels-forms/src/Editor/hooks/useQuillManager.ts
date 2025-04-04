import { RefObject, useCallback } from "react";
import Quill, { StringMap, DeltaStatic } from "quill";
import Delta from "quill-delta";
import ReactQuill from "react-quill";
import { quillTextFormattingOptions } from "../utils/config";

import useUndoRedo from "./useUndoRedo";
import {
  DefaultBarcodeTextType,
  QuillDefaultValueProps,
  QuillValue,
} from "../types";

const useQuillManager = () => {
  const { addToUndo } = useUndoRedo();

  const getEditor = useCallback(
    (quillRef: RefObject<ReactQuill>): Quill | null => {
      if (!quillRef || !quillRef.current) {
        return null;
      }
      return quillRef.current.getEditor();
    },
    [],
  );

  const applyFormat = useCallback(
    (
      quillRef: RefObject<ReactQuill>,
      format: string,
      value: QuillValue,
    ): void => {
      const quill = getEditor(quillRef);
      if (!quill) return;

      const currentFormat = quill.getFormat()[format];
      quill.format(format, currentFormat === value ? false : value);
      addToUndo();
    },
    [getEditor],
  );

  const applySpacingAndFontSizeFormat = useCallback(
    (
      quillRef: RefObject<ReactQuill>,
      format: string,
      value: QuillValue,
    ): void => {
      const quill = getEditor(quillRef);
      if (!quill) return;

      if (value !== "0px") {
        quill.format(format, value);
      } else {
        quill.format(format, false);
      }
      addToUndo();
    },
    [getEditor],
  );

  const getHTML = useCallback(
    (quillRef: RefObject<ReactQuill>): string | undefined => {
      if (!quillRef || !quillRef.current) return;

      const editor = quillRef.current.getEditor();
      return editor.root.innerHTML;
    },
    [],
  );

  const applyAlignFormat = useCallback(
    (quillRef: RefObject<ReactQuill>, type: string): void => {
      const quill = getEditor(quillRef);
      if (!quill) return;

      const currentAlignment = quill.getFormat().align || "";
      const formatValue = currentAlignment !== type ? type : false;
      quill.format(quillTextFormattingOptions.ALIGN, formatValue);
      addToUndo();
    },
    [getEditor],
  );

  const formatText = useCallback(
    (quillRef: ReactQuill, format: DefaultBarcodeTextType): void => {
      const quill = quillRef.getEditor();
      if (!quill || !format) return;

      applyFormatWithoutFocus(quill, format);
    },
    [],
  );
  const applyFormatWithoutFocus = (
    quill: Quill,
    format: DefaultBarcodeTextType,
  ) => {
    const oldContents = quill.getContents();
    const delta = new Delta();
    if (oldContents) {
      oldContents.ops?.forEach((op) => {
        if (op.insert) {
          // Safely merge the existing attributes with the new format
          const attributes = op.attributes
            ? { ...op.attributes, ...format }
            : { ...format };
          delta.insert(op.insert, attributes);
        } else {
          delta.push(op);
        }
      });

      // Apply the new content delta to the editor
      quill.setContents(delta as unknown as DeltaStatic, "silent");
    }
  };

  const getCurrentFormatting = useCallback(
    (
      quillRef: RefObject<ReactQuill>,
      index?: number,
      length?: number,
    ): StringMap => {
      const quill = getEditor(quillRef);
      if (!quill) return {};

      if (index !== undefined && length !== undefined) {
        addToUndo();
        return quill.getFormat(index, length);
      }
      return quill.getFormat();
    },
    [getEditor],
  );

  const applyListFormat = useCallback(
    (
      quillRef: RefObject<ReactQuill>,
      type: string,
      quillDefaultValues: QuillDefaultValueProps,
      setQuillDefaultValues: (
        value: React.SetStateAction<QuillDefaultValueProps>,
      ) => void,
    ) => {
      if (!quillRef || !quillRef.current) {
        return;
      }
      const quill = quillRef.current.getEditor();

      setQuillDefaultValues({ ...quillDefaultValues, isListStyle: false });
      const formatValue = quill.getFormat().list === type ? null : type; // Toggle list type or unset

      quill.format("list", formatValue);
      addToUndo();
    },
    [getEditor],
  );

  const applyFontAndBgColor = useCallback(
    (quillRef: RefObject<ReactQuill>, key: string, value: string) => {
      if (!quillRef || !quillRef.current) {
        return;
      }
      const quill = quillRef.current.getEditor();
      // using any because getSelection provided by quill returns null value
      // whereas quill.selection.savedRange returns the selection
      const selection = (quill as any).selection.savedRange;
      const { index, length } = selection;
      quill.formatText(
        index,
        length,
        {
          [key]: value,
        },
        "silent",
      );
      addToUndo();
    },
    [getEditor],
  );
  return {
    applyFormat,
    applySpacingAndFontSizeFormat,
    getHTML,
    applyAlignFormat,
    formatText,
    getCurrentFormatting,
    applyListFormat,
    applyFontAndBgColor,
  };
};

export default useQuillManager;
