import React, { useState, useEffect, useRef } from "react";
import { useLayers } from "../../../context/LayersContext";
import { useStoreStateValue, useStoreValue } from "@scena/react-store";
import {
  $actionManager,
  $editor,
  $layerManager,
  $layers,
  $selectedLayers,
} from "../../../stores/stores";
import { DownArrowIcon, InfoIcon } from "../icons";
import { Select, Radio, Button, Collapse } from "antd";
import { SelectArrowDown } from "../../icons/SelectArrowDown";
import {
  BarcodeFormat,
  BarcodeValues,
  ScenaElementLayer,
} from "../../../types";
import { RectInfo } from "react-moveable";
import {
  barcodeOptions,
  barcodePlaceholder,
  barcodes,
  newBarcodeValues,
} from "../../../utils/config";
import useAutoScale from "../../../hooks/useAutoScale";
import {
  createTextLayer,
  deleteLayers,
} from "../../../utils/shared/LayerUtils";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import bwipjs from "bwip-js";
import { useEditor } from "../../../context/EditorContext";
import ReactQuill from "react-quill";
import { Switch } from "antd";
import useQuillManager from "../../../hooks/useQuillManager";
import useUndoRedo from "../../../hooks/useUndoRedo";
import {
  barcodePlaceholderMap,
  toolBarItems,
  undoActionType,
  validationMap,
} from "../../../consts";
import { createAndSetFrame, getCollapsePanelValues } from "./utils/barcode";
import {
  HeightAndMarginPanel,
  BarcodeSequencingPanel,
  DataPanel,
  PreviewPanel,
  SaveToBrandingPanel,
  OpacityControlPanel,
  BarcodeTextEditor,
  ColorPickerPanel,
  generateNewBarcode,
} from "./components";
import AlignmentIconPanel from "../../shared/AlignmentIconsPanel";

const validateBarcode = (type: BarcodeFormat, input: string): boolean => {
  const validator = validationMap[type];
  return validator ? validator(input) : false;
};

const BarcodeDrawer = () => {
  const actionManager = useStoreStateValue($actionManager);
  const { addToUndo } = useUndoRedo();
  const { getHTML, formatText } = useQuillManager();

  const [placeholderValue, setPlaceholderValue] = useState<string>("");
  const [barcodeValues, setBarcodeValues] =
    useState<BarcodeValues>(newBarcodeValues);
  const [barcodeCanvas, setBarcodeCanvas] = useState<any>();
  const { layerStore, setSelectedTool } = useEditor();
  const [isBarcodeValid, setIsBarcodeValid] = useState<boolean | null>(null);

  const layerManager = useStoreStateValue($layerManager);
  const [existingBarcodeImage, setExistingBarcodeImage] = useState<string>();
  const [barcodeTextRef, setBarcodeTextRef] = useState<ReactQuill | null>(null);

  const selectedLayers = useStoreStateValue($selectedLayers);

  const quillRef = React.createRef<ReactQuill>();
  const selectedLayersStore = useStoreValue($selectedLayers);
  const allLayers = useStoreStateValue($layers);
  const dataValueRef = useRef<HTMLInputElement>(null);

  const {
    setIsAutoScaleEnabled,
    setFixRatio,
    setSelectedLayerRotationAngle,
    isAutoScaleEnabled,
  } = useLayers();

  // flag to check if the barcode is being edited
  const [isBarcodeEditing, setIsBarcodeEditing] = useState<boolean>(false);

  //setting the isAutoScaleEnabled value on selecting text layer
  useAutoScale(selectedLayers, setIsAutoScaleEnabled, setFixRatio);

  useEffect(() => {
    const onUpdate = (e: { rect: RectInfo }) => {
      const rect = e.rect;
      setSelectedLayerRotationAngle(parseFloat(rect.rotation.toFixed(1)));
    };
    actionManager.on("get.rect", onUpdate);
    return () => {
      actionManager.off("get.rect", onUpdate);
    };
  }, []);

  // placeholder for barcode types
  useEffect(() => {
    getPlaceholder();
  }, [barcodeValues.barcodeType]);

  // Fetching the barcode values and quill ref from the selected layer
  useEffect(() => {
    const selectedLayer = selectedLayersStore?.value[0];
    if (selectedLayer) {
      const barcodeTextQuillRef = (selectedLayer as ScenaElementLayer)?.metaData
        ?.barcodeTextRef;
      setBarcodeTextRef(barcodeTextQuillRef?.current);
      const barcodeValues =
        (selectedLayer as ScenaElementLayer)?.metaData?.barcodeValues ||
        newBarcodeValues;
      const correspondingLayerExists = findCorrespondingTextLayer(
        allLayers,
        selectedLayer.id,
      );
      if (!correspondingLayerExists) {
        setBarcodeValues({ ...barcodeValues, showText: false });
      } else {
        setBarcodeValues(barcodeValues);
      }
    }
  }, [selectedLayersStore.value]);

  // Updating the barcode
  useEffect(() => {
    const updateBarcode = async () => {
      const selectedLayer = selectedLayersStore.value;
      try {
        // set options for generating barcode
        const options = {
          bcid: barcodeValues.barcodeType,
          text: barcodeValues.barcodeData,
          height: barcodeValues.height,
          barcolor: barcodeValues.barcodeBarColor,
          backgroundcolor: barcodeValues.barcodeBgColor,
          showText: barcodeValues.showText,
        };

        // Generating the barcode
        const canvas = (bwipjs as any).toCanvas("mycanvas", options);
        setBarcodeCanvas(canvas);

        // Checking validity of barcode against its type
        const isBarcodeValid = validateBarcode(
          barcodes.CODE128 as BarcodeFormat,
          barcodeValues.barcodeType,
        );
        setIsBarcodeValid(isBarcodeValid);

        // Updating the image src in the selected layer
        const images = (
          selectedLayer[0] as ScenaElementLayer
        ).ref.current?.getElementsByTagName("img");

        if (images) {
          (selectedLayer[0] as ScenaElementLayer).ref.current!.style.padding =
            barcodeValues.margin;
          images[0].src = canvas.toDataURL("image/png");
          setExistingBarcodeImage(canvas.toDataURL("image/png"));
        }
      } catch (error) {
        console.error(error);
      }
    };
    updateBarcode();
  }, [barcodeValues]);

  // Applying quill text formatting
  useEffect(() => {
    const { barcodeTextProperties } = barcodeValues;
    // Function to format text if ref exists
    const applyTextFormatting = (ref: ReactQuill | null) => {
      if (ref) {
        formatText(ref, barcodeTextProperties);
      }
    };
    // Apply formatting to barcodeTextRef and quillRef
    applyTextFormatting(barcodeTextRef);
    applyTextFormatting(quillRef.current);
  }, [barcodeValues.barcodeTextProperties, quillRef, barcodeTextRef]);

  useEffect(() => {
    updateExistingBarcodeLayer();
  }, [barcodeValues]);

  // update barcode
  const updateExistingBarcodeLayer = async () => {
    const selectedLayer = selectedLayersStore.value[0];
    if (
      selectedLayer &&
      isBarcodeEditing &&
      (selectedLayer as ScenaElementLayer).metaData
    ) {
      (selectedLayer as ScenaElementLayer).metaData.barcodeValues =
        barcodeValues;
      // (selectedLayer as ScenaElementLayer).style.opacity sets the opacity in the layer object
      // so when the label is loaded after saving the opacity is set without the ref.
      if ((selectedLayer as ScenaElementLayer).ref.current != null) {
        (selectedLayer as any).ref.current.style.opacity = (
          selectedLayer as ScenaElementLayer
        ).style.opacity = barcodeValues.opacity;
      }
    }
  };

  const editorRef = useStoreStateValue($editor);
  const createBarcode = async () => {
    const ref = React.createRef<ReactQuill>();

    if (!isBarcodeValid) {
      return null;
    }

    const imageUrl: string = barcodeCanvas.toDataURL("image/svg");

    const textHTML = getHTML(quillRef) || "";

    const barcodeId: number = Date.now();
    const layers: ScenaElementLayer[] = [];
    const barcode = generateNewBarcode({
      ref,
      barcodeId,
      barcodeValues,
      isAutoScaleEnabled,
      imageUrl,
    });
    // If the showtext is enabled before creating a barcode layer, spawn a text layer as well
    const text = createTextLayer({
      layerId: barcodeId.toString(),
      ref,
      barcodeValues,
      isBarcodeText: true,
      useBarcodeData: true,
      textHTML,
    });

    layers.push(barcode);
    barcodeValues.showText && layers.push(text);

    // setting the frame/positioning to adjust the layer text above the barcode layer
    layers[0].item.items[0] = createAndSetFrame("50px", "50px");
    barcodeValues.showText &&
      (layers[1].item.items[0] = createAndSetFrame("50px", "0"));

    await editorRef.current!.setLayers([...layerManager.layers, ...layers]);
    await editorRef.current!.setSelectedLayers(layers);
    addToUndo({ operation: undoActionType.ADD, addedLayer: layers[0] });
  };

  const handleBarcodeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dataValueRef?.current?.focus();
    setIsBarcodeEditing(true);

    const barcodeTextValue = e.target.value;
    // Update the content of the Quill editor
    if (barcodeTextRef && quillRef.current) {
      const editor = barcodeTextRef.getEditor();
      editor.setText(barcodeTextValue);
    }
    const result = validateBarcode(
      barcodeValues.barcodeType as BarcodeFormat,
      barcodeTextValue,
    );

    setIsBarcodeValid(result);
    setBarcodeValues({
      ...barcodeValues,
      barcodeData: barcodeTextValue,
    });
    addToUndo();
  };

  const getPlaceholder = () => {
    const placeholderValue =
      barcodePlaceholderMap.get(barcodeValues.barcodeType) ||
      barcodePlaceholder.CODE128;
    setPlaceholderValue(placeholderValue);
  };

  const handleAutoScale = () => {
    setIsAutoScaleEnabled(!isAutoScaleEnabled);
    const selectedLayer = selectedLayersStore.value;
    if (selectedLayer[0]) {
      (selectedLayer[0] as ScenaElementLayer).metaData.isAutoScaleEnabled =
        !isAutoScaleEnabled;
    }
    addToUndo();
  };

  const handleToggleText = async (checkValue: boolean) => {
    setIsBarcodeEditing(true);
    setBarcodeValues({
      ...barcodeValues,
      showText: !barcodeValues.showText,
    });
    const selectedLayer = selectedLayersStore.value[0];
    const newquillRef = React.createRef<ReactQuill>();
    const textId = selectedLayers[0]?.id.split("barcode-")[1];

    if (existingBarcodeImage) {
      // If the toggle is enabled then create the layer otherwise delete the layer
      if (checkValue) {
        (selectedLayer as ScenaElementLayer).metaData.barcodeTextRef =
          newquillRef;
        const layers: ScenaElementLayer[] = [
          createTextLayer({
            layerId: textId,
            ref: newquillRef,
            barcodeValues,
            isBarcodeText: true,
            useBarcodeData: true,
          }),
        ];
        layers[0].item.items[0] = createAndSetFrame("50px", "0");
        await editorRef.current!.setLayers([...layerManager.layers, ...layers]);
        await editorRef.current!.setSelectedLayers(layers);
        addToUndo({ operation: undoActionType.ADD, addedLayer: layers[0] });
      } else {
        const correspondingTextLayer = findCorrespondingTextLayer(
          allLayers,
          selectedLayersStore.value[0].id,
        );
        if (selectedLayer) {
          (selectedLayer as ScenaElementLayer).metaData.barcodeValues = {
            ...(selectedLayer as ScenaElementLayer).metaData.barcodeValues,
            ...newBarcodeValues,
          };
        }
        const remainingLayers = deleteLayers(
          [correspondingTextLayer as ScenaElementLayer],
          layerStore,
        );
        layerManager.setLayers(remainingLayers, layerManager.groups);
        layerStore.update(remainingLayers);
        addToUndo();
        setSelectedTool(toolBarItems.BARCODE);
      }
    }
  };

  // Find the corresponding text layer of barcode layer
  const findCorrespondingTextLayer = (
    layers: ScenaElementLayer[],
    selectedBarcodeId: string,
  ) => {
    const replaceValue = "barcode-";
    const layerType = "text";
    // Extract the numeric part of the barcode ID
    const textId = selectedBarcodeId.replace(replaceValue, "");

    // Find the corresponding text layer
    return layers.find(
      (layer) => layer.id === textId && layer.type === layerType,
    );
  };

  const handleHeightChange = (height: number) => {
    setIsBarcodeEditing(true);
    if (height < 0) {
      return null;
    }
    setBarcodeValues({
      ...barcodeValues,
      height,
    });
    addToUndo();
  };

  const handleMarginChange = (margin: number) => {
    setIsBarcodeEditing(true);
    if (margin > 0) {
      setBarcodeValues({
        ...barcodeValues,
        margin: margin.toString() + "px",
      });
      addToUndo();
    }
  };

  const handleBarcodeValues = (key: string, value: number | string) => {
    setIsBarcodeEditing(true);

    // If the value is a number, ensure it's between 0 and 1
    if (typeof value === "number" && (value < 0 || value > 1)) {
      return null;
    }

    // Update barcode values and add to the undo stack
    setBarcodeValues({
      ...barcodeValues,
      [key]: value,
    });
    addToUndo();
  };
  const collapsePanelValues = getCollapsePanelValues(
    barcodeValues,
    handleBarcodeValues,
  );

  return (
    <div className="h-[calc(100vh_-_176px)] overflow-auto border-r border-stroke-secondary relative">
      <div className="h-[calc(100%_-_97px)] side-menu overflow-x-hidden overflow-y-auto custom-scrollbar">
        <AlignmentIconPanel />

        {/* Opacity Panel */}
        <OpacityControlPanel
          value={barcodeValues.opacity}
          onChange={(opacity: number) => {
            handleBarcodeValues("opacity", opacity);
          }}
        />

        {/* Barcode width and height and Automatic scaling inputs */}
        <div className="py-[24px] px-[20px] border-t border-stroke-secondary">
          <div className="flex flex-row items-center space-x-1">
            <Radio checked={isAutoScaleEnabled} onClick={handleAutoScale} />
            <div className="text-sm leading-[20px]">
              Enable automatic scaling
            </div>
            <InfoIcon />
          </div>
          <HeightAndMarginPanel
            height={barcodeValues.height}
            margin={parseInt(barcodeValues.margin)} // Parse margin value as number for NumericInput
            onHeightChange={handleHeightChange} // Pass height change handler
            onMarginChange={handleMarginChange} // Pass margin change handler
          />
        </div>

        {/* Barcode Type */}
        <div className="py-[24px] px-[20px] border-t border-stroke-secondary">
          <p className="text-sm leading[20px] text-accent-primary font-suisseIntl mr-auto mb-[20px]">
            Type
          </p>
          <div className="flex">
            <Select
              defaultValue={"CODE128"}
              style={{ height: 40, width: "100%", fontSize: 26 }}
              onChange={(format) => {
                handleBarcodeValues("barcodeType", format);
              }}
              options={barcodeOptions}
              suffixIcon={<SelectArrowDown />}
              className="ant-custom-select"
              value={barcodeValues.barcodeType}
            />
          </div>
        </div>

        {/* Barcode Data */}
        <DataPanel
          ref={dataValueRef}
          barcodeValues={barcodeValues}
          placeholderValue={placeholderValue}
          handleBarcodeValue={handleBarcodeValue}
          isBarcodeValid={isBarcodeValid}
        />

        <div className="border-t border-stroke-secondary">
          <Collapse
            defaultActiveKey={["1"]}
            className="custom-collapse"
            expandIcon={() => <DownArrowIcon />}
            expandIconPosition={"end"}
          >
            {collapsePanelValues.map((panel) => {
              return (
                <CollapsePanel header={panel.header} key={panel.key}>
                  <ColorPickerPanel
                    value={panel.value}
                    onChange={panel.onChange}
                    onNumericChange={() => {}}
                  />
                </CollapsePanel>
              );
            })}

            {/* Toggle text */}
            <div
              className={`${
                barcodeValues.showText === true ? "pt-[24px]" : "py-[24px]"
              }  px-[20px] border-stroke-secondary  flex flex-row justify-between items-center`}
            >
              <div className="text-[14px] font-[400] font-suisseIntl ">
                Show text
              </div>
              <div>
                <Switch
                  value={barcodeValues.showText}
                  onChange={handleToggleText}
                />
              </div>
            </div>

            {/* Barcode Text */}
            {barcodeValues.showText && (
              <CollapsePanel header="Text" key="3">
                <BarcodeTextEditor
                  barcodeValues={barcodeValues}
                  setBarcodeValues={setBarcodeValues}
                  setIsBarcodeEditing={setIsBarcodeEditing}
                  addToUndo={addToUndo}
                />
              </CollapsePanel>
            )}
          </Collapse>
        </div>

        <PreviewPanel barcodeValues={barcodeValues} quillRef={quillRef} />
        <SaveToBrandingPanel />
        <BarcodeSequencingPanel />
      </div>
      <div
        onClick={() => createBarcode()}
        className="px-[20px] py-[24px]  border-t border-stroke-secondary"
      >
        <Button
          type="text"
          shape="round"
          disabled={!isBarcodeValid as boolean}
          className={`text-accent-primary border border-stroke-primary h-[48px] 
                flex items-center justify-center w-full text-sm leading-[20px]
                custom-ant-button`}
        >
          Generate Barcode
        </Button>
      </div>
    </div>
  );
};

export default BarcodeDrawer;
