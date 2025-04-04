import React, {
  memo,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLayers } from "../../../context/LayersContext";
import { useStoreStateValue } from "@scena/react-store";
import {
  $actionManager,
  $editor,
  $layers,
  $moveable,
  $selectedLayers,
} from "../../../stores/stores";
import { DownArrowIcon } from "../icons";
import { QuillContext } from "../../../context/LayersContext";
import { RectInfo } from "react-moveable";
import { ITextDrawerProps } from "../../../types";
import { useEditor } from "../../../context/EditorContext";
import ReactQuill from "react-quill";
import { quillFontSizes } from "../../../consts";
import useQuillManager from "../../../hooks/useQuillManager";
import useUndoRedo from "../../../hooks/useUndoRedo";
import { debounce } from "lodash";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import Collapse from "antd/lib/collapse/Collapse";
import CasePanel from "./components/CasePanel";
import ListPanel from "./components/ListPanel";
import SpacingPanel from "./components/SpacingPanel";
import ColorPanel from "./components/ColorPanel";
import FontFamilyPanel from "./components/FontSettingsPanel/FontFamilyPanel";
import TextStylePanel from "./components/FontSettingsPanel/TextStylePanel";
import FontAlignmentPanel from "./components/FontSettingsPanel/FontAlignmentPanel";
import FontSizePanel from "./components/FontSettingsPanel/FontSizePanel";
import {
  handleCustomFontSizeChange,
  handleLayerSelection,
} from "../../../utils/text";
import AutoFitScalePanel from "./components/AutoFitScalePanel";

const TextDrawer: React.FC<ITextDrawerProps> = ({
  fontList = [],
  textFormatting,
  setTextFormatting,
}) => {
  const editorRef = useStoreStateValue($editor);

  const fontOptions = (
    editorRef.current?.quillDefaultValues?.textFontStyles || fontList
  )?.map((font: string) => ({
    value: font,
    label: font,
  }));
  const fontSizeOptions = (
    editorRef.current?.quillDefaultValues?.textFontSizes || quillFontSizes
  )?.map((font: string) => ({
    value: font,
    label: font,
  }));
  const quillRef = useContext(QuillContext);
  const actionManager = useStoreStateValue($actionManager);
  const allLayers = useStoreStateValue($layers);
  const { undoStack, setUndoStack, redoStack, setRedoStack } = useLayers();
  const { addToUndo } = useUndoRedo();

  const { setSelectedLayerRotationAngle } = useLayers();
  const [customFontSize, setCustomFontSize] = useState<number>();
  const customFontSizeRef = useRef<HTMLInputElement | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const selectedLayers = useStoreStateValue($selectedLayers);

  const moveableRef = useStoreStateValue($moveable);
  const { setQuillDefaultValues, quillDefaultValues } = useEditor();
  const {
    applyFormat,
    applySpacingAndFontSizeFormat,
    applyAlignFormat,
    applyListFormat,
    applyFontAndBgColor,
  } = useQuillManager();

  const {
    isAutoFitEnabled,
    setIsAutoFitEnabled,
    isAutoScaleEnabled,
    setIsAutoScaleEnabled,
    setFixRatio,
  } = useLayers();

  useEffect(() => {
    if (quillRef) {
      // Get the Quill instance from the React Quill ref
      const quillInstance = quillRef.current.getEditor();

      // Debounce the addToUndo function
      const debouncedAddToUndo = debounce(addToUndo, 50); // 50ms debounce delay

      // Set up a listener for text-change events
      // Clean up the listener on component unmount
      return () => {
        quillInstance.off("text-change");
        debouncedAddToUndo.cancel();
      };
    }
  }, [allLayers, undoStack, redoStack, setUndoStack, setRedoStack]);

  useEffect(() => {
    handleCustomFontSizeChange(
      customFontSize,
      quillDefaultValues,
      setQuillDefaultValues,
      quillRef as RefObject<ReactQuill>,
      customFontSizeRef,
      applySpacingAndFontSizeFormat,
    );
  }, [customFontSize]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.shiftKey && (e.key === "+" || e.key === "=")) {
        e.preventDefault();
        increaseFontSize();
      } else if (e.metaKey && e.shiftKey && (e.key === "-" || e.key === "_")) {
        e.preventDefault();
        decreaseFontSize();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const decreaseFontSize = () => {
    if (quillRef?.current) {
      const quill = quillRef.current.getEditor();
      const selection = quill.getSelection();
      if (selection) {
        const currentSize = quill.getFormat(selection).size || "14px";
        if (currentSize <= 0) {
          return;
        }
        const newSize = parseInt(currentSize) - 2 + "px";

        quill.format("size", newSize);
      } else {
        // If no text is selected, increase font size for the entire content
        const currentSize =
          quill.getFormat(0, quill.getLength()).size || "14px";
        const newSize = parseInt(currentSize) - 2 + "px";
        quill.formatText(0, quill.getLength(), "size", newSize);
      }
    }
  };
  const increaseFontSize = () => {
    if (quillRef?.current) {
      const quill = quillRef.current.getEditor();
      const selection = quill.getSelection();
      if (selection) {
        const currentSize = quill.getFormat(selection).size || "14px";
        const newSize = parseInt(currentSize) + 2 + "px";

        quill.format("size", newSize);
      } else {
        // If no text is selected, increase font size for the entire content
        const currentSize =
          quill.getFormat(0, quill.getLength()).size || "14px";
        const newSize = parseInt(currentSize) + 2 + "px";
        quill.formatText(0, quill.getLength(), "size", newSize);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Option (Alt) + Command (Meta) + T
      if (
        event.altKey &&
        event.metaKey &&
        (event.key === "þ" || event.key.toLowerCase() === "t")
      ) {
        event.preventDefault(); // Prevent default browser behavior
        applyAlignFormat(quillRef as RefObject<ReactQuill>, "center");
      } else if (
        event.altKey &&
        event.metaKey &&
        (event.key === "dead" || event.key.toLowerCase() === "r")
      ) {
        event.preventDefault();
        applyAlignFormat(quillRef as RefObject<ReactQuill>, "right");
      }
    };

    // Add event listener
    document.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    handleLayerSelection(selectedLayers, setIsAutoScaleEnabled, setFixRatio);
  }, [selectedLayers]);

  useEffect(() => {
    const onUpdate = (e: { rect: RectInfo }) => {
      const rect = e.rect;
      setSelectedLayerRotationAngle(parseFloat(rect.rotation.toFixed(1)));
      setRotation(Math.round(e.rect.rotation * 10) / 10);
    };

    actionManager.on("get.rect", onUpdate);

    return () => {
      actionManager.off("get.rect", onUpdate);
    };
  }, []);

  const handleAutoScale = () => {
    if (!quillRef || !selectedLayers.length) {
      return;
    }
    const layer = selectedLayers[0];
    const newAutoScaleState = !isAutoScaleEnabled;

    if (layer.type === "group" && layer.children && layer.children.length > 0) {
      layer.children[0].metaData.isAutoScaleEnabled = newAutoScaleState;
    } else {
      layer.metaData.isAutoScaleEnabled = newAutoScaleState;
    }

    setIsAutoScaleEnabled(newAutoScaleState);
    addToUndo();
  };

  const handleColor = (key: string, value: string) => {
    if (quillRef && quillRef.current) {
      applyFontAndBgColor(quillRef, key, value);
    }
  };
  const spacingRefs = useRef({
    lineSpacingRef: null,
    letterSpacingRef: null,
    rRef: null,
  });

  return (
    <>
      <div className="h-[calc(100vh_-_10em)] overflow-auto border-r border-[rgb(233,_233,_238)">
        <div className="h-full side-menu overflow-x-hidden overflow-y-auto custom-scrollbar">
          {/* Font */}
          <AutoFitScalePanel
            isAutoFitEnabled={isAutoFitEnabled}
            setIsAutoFitEnabled={setIsAutoFitEnabled}
            isAutoScaleEnabled={isAutoScaleEnabled}
            handleAutoScale={handleAutoScale}
            addToUndo={addToUndo}
          />
          <Collapse
            defaultActiveKey={["1", "2", "3", "4", "5"]}
            className="custom-collapse"
            expandIcon={() => <DownArrowIcon />}
            expandIconPosition={"end"}
          >
            {/* Font Panel */}
            <CollapsePanel header="Font" key="1">
              <div className="flex flex-col items-center pb-[24px] pl-[24px] pr-[24px]">
                {/* Font */}
                <FontFamilyPanel
                  ref={quillRef}
                  applyFormat={applyFormat}
                  setTextFormatting={setTextFormatting}
                  textFormatting={textFormatting}
                  fontOptions={fontOptions}
                />

                {/* Font size */}
                <FontSizePanel
                  ref={quillRef}
                  fontSizeOptions={fontSizeOptions}
                  applyFormat={applyFormat}
                  setTextFormatting={setTextFormatting}
                  setCustomFontSize={setCustomFontSize}
                  applySpacingAndFontSizeFormat={applySpacingAndFontSizeFormat}
                  textFormatting={textFormatting}
                  customFontSizeRef={customFontSizeRef}
                />

                {/* Font Alignment */}
                <FontAlignmentPanel
                  ref={quillRef}
                  applyAlignFormat={applyAlignFormat}
                  setTextFormatting={setTextFormatting}
                  textFormatting={textFormatting}
                />
                {/* Bold, italic, underline, strikethrought */}
                <TextStylePanel
                  ref={quillRef}
                  applyFormat={applyFormat}
                  setTextFormatting={setTextFormatting}
                  textFormatting={textFormatting}
                />
              </div>
            </CollapsePanel>

            {/* Color Panel */}
            <CollapsePanel header="Color" key="2">
              <ColorPanel
                textFormatting={textFormatting}
                handleColor={handleColor}
                setTextFormatting={setTextFormatting}
                addToUndo={addToUndo}
              />
            </CollapsePanel>

            {/* Spacing */}
            <CollapsePanel header="Spacing" key="3">
              <SpacingPanel
                ref={spacingRefs} // Pass refs using forwardRef
                textFormatting={textFormatting}
                rotation={rotation}
                setTextFormatting={setTextFormatting}
                applySpacingAndFontSizeFormat={applySpacingAndFontSizeFormat}
                addToUndo={addToUndo}
                moveableRef={moveableRef}
                quillRef={quillRef as RefObject<ReactQuill>}
              />
            </CollapsePanel>

            {/* List Panel */}
            <CollapsePanel header="List style" key="4">
              <ListPanel
                ref={quillRef} // Forwarding the ref
                quillDefaultValues={quillDefaultValues}
                setQuillDefaultValues={setQuillDefaultValues}
                textFormatting={textFormatting}
                setTextFormatting={setTextFormatting}
                applyListFormat={applyListFormat}
              />
            </CollapsePanel>

            {/* Case Panel */}
            <CollapsePanel header="Casing" key="5">
              <CasePanel
                ref={quillRef} // Forwarding the ref to CasePanel
                textFormatting={textFormatting}
                applyFormat={applyFormat}
                setTextFormatting={setTextFormatting}
              />
            </CollapsePanel>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default memo(TextDrawer);
