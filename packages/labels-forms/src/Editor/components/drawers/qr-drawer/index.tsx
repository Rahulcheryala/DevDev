import React, { useState, useEffect, useRef } from "react";
import { useLayers } from "../../../context/LayersContext";
import { useStoreStateValue, useStoreValue } from "@scena/react-store";
import {
  $actionManager,
  $editor,
  $itemHeight,
  $layerManager,
  $selectedLayers,
} from "../../../stores/stores";
import { Collapse } from "antd";
import { ScenaElementLayer } from "../../../types";
import { createLayer } from "../../managers/LayerManager";
import { RectInfo } from "react-moveable";
import LinkSvg from "../../../assets/icons/shared/Link.svg";
import useAutoScale from "../../../hooks/useAutoScale";
import { AngleDownIcon, AngleUpIcon, DownArrowIcon } from "../icons";
import { defaultQrValues } from "../../../utils/config";
import { identifyLayer } from "../../../utils/shared/LayerUtils";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import { getOpacityHex } from "../../../utils/utils";
import useUndoRedo from "../../../hooks/useUndoRedo";
import {
  colors,
  defaultLayerStyles,
  drawerButtonValues,
  qrValuesMap,
  undoActionType,
} from "../../../consts";
import { AlignmentIconsPanel, NumericInput } from "../../shared";
import { ColorPickerPanel } from "../barcode-drawer/components";
import DrawerButton from "../../shared/DrawerButton";
import QRTypePanel from "./components/QRTypePanel";
import DataPanel from "./components/DataPanel";
import QRPreview from "./components/QRPreview";
import {
  BACKGROUND,
  QRCODE,
  collapsePanelHeaders,
  dataPanelValues,
} from "../../../consts/qrcode";

const QRDrawer = () => {
  const actionManager = useStoreStateValue($actionManager);
  const { addToUndo } = useUndoRedo();
  const [qrValues, setQrValues] = useState(defaultQrValues);
  const { setSelectedLayerRotationAngle } = useLayers();
  const layerManager = useStoreStateValue($layerManager);
  const qrRef = useRef<any>(null);
  const editorRef = useStoreStateValue($editor);
  const selectedLayersStore = useStoreValue($selectedLayers);
  const [existingQR, setExistingQR] = useState<any>();

  const selectedLayers = useStoreStateValue($selectedLayers);
  const itemHeight = useStoreStateValue($itemHeight);
  const { setIsAutoScaleEnabled, setFixRatio } = useLayers();

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

  const createQR = async () => {
    const encodedBarcode = qrRef.current.canvas.current;
    const base64 = encodedBarcode.toDataURL("image/png");

    const layers: ScenaElementLayer[] = [
      createLayer(
        {
          id: Date.now().toString(),
          type: "image",
          title: "qrcode",
          metaData: {
            qrValues,
          },
          style: {
            position: "absolute",
            //setting the opacity of the whole QR
            opacity: qrValues?.qrOpacity || 1,
          },
          jsx: (
            <img
              src={base64}
              width={defaultLayerStyles.QR_STYLES.width}
              height={defaultLayerStyles.QR_STYLES.height}
            />
          ),
        },
        itemHeight,
      ),
    ];

    await editorRef.current!.setLayers([...layerManager.layers, ...layers]);
    await editorRef.current!.setSelectedLayers(layers);

    addToUndo({ operation: undoActionType.ADD, addedLayer: layers[0] });
  };

  // Two way binding for barcode
  useEffect(() => {
    if (selectedLayersStore.value.length) {
      const selectedLayer = selectedLayersStore.value;
      const layer = identifyLayer(selectedLayer);
      if (layer === QRCODE) {
        const existingQR = selectedLayer[0]?.metaData?.qrValues;
        setQrValues({
          bgColor: existingQR?.bgColor,
          ecLevel: existingQR?.ecLevel,
          enableCORS: existingQR?.enableCORS,
          eyeRadius: existingQR?.eyeRadius,
          fgColor: existingQR?.fgColor,
          logoOpacity: existingQR?.logoOpacity,
          logoPaddingStyle: existingQR?.logoPaddingStyle,
          qrStyle: existingQR?.qrStyle,
          quietZone: existingQR?.quietZone,
          size: existingQR?.size,
          value: existingQR?.value,
          bgOpacity: existingQR?.bgOpacity,
          fgOpacity: existingQR?.fgOpacity,
          qrOpacity: existingQR?.qrOpacity,
        });
        setExistingQR(existingQR || {});
      }
    }
  }, [selectedLayersStore.value]);

  const updateExistingQR = async () => {
    if (existingQR) {
      const selectedLayer = selectedLayersStore.value;
      const encodedBarcode = qrRef?.current?.canvas?.current;
      if (encodedBarcode) {
        const base64 = encodedBarcode.toDataURL("image/png");

        const refElement = (selectedLayer[0] as ScenaElementLayer).ref?.current;

        if (refElement instanceof HTMLImageElement) {
          if (refElement.src) {
            refElement.src = base64;
            (selectedLayer[0] as ScenaElementLayer).metaData = { qrValues };

            const opacityValue = qrValues.qrOpacity.toString();
            // Set opacity both in the ref element and the layer style.
            refElement.style.opacity = (
              selectedLayer[0] as ScenaElementLayer
            ).style.opacity = opacityValue;
          }
        }
      }
    }
  };

  useEffect(() => {
    if (existingQR) {
      updateExistingQR();
    }
  }, [qrValues, qrRef.current]);

  const handleOpacityChange = (opacity: number, target: string) => {
    //Check if opacity exceeds maximum limit
    if (opacity > 100 || opacity < 0) {
      return null;
    }

    // Extracts Opacity hex from map
    const hexOpacity = getOpacityHex(opacity);
    if (hexOpacity) {
      const currentColor =
        target === BACKGROUND ? qrValues.bgColor : qrValues.fgColor;

      // Check if the current color already has an opacity value
      const newColor =
        currentColor.length === 9
          ? currentColor.slice(0, 7) + hexOpacity
          : currentColor + hexOpacity;
      if (target === BACKGROUND) {
        setQrValues({ ...qrValues, bgColor: newColor, bgOpacity: opacity });
      } else {
        setQrValues({ ...qrValues, fgColor: newColor, fgOpacity: opacity });
      }
      addToUndo();
    }
  };

  const handleQrValues = (prop: string, value: number | string) => {
    setQrValues({
      ...qrValues,
      [prop]: value,
    });
    addToUndo();
  };
  return (
    <div className="h-[calc(100vh_-_176px)] overflow-auto border-r border-stroke-secondary">
      <div className="h-[calc(100%_-_97px)] side-menu overflow-x-hidden overflow-y-auto custom-scrollbar">
        <AlignmentIconsPanel />

        {/* Preview section */}
        <QRPreview qrValues={qrValues} ref={qrRef} />

        {/* Opacity section */}
        <div className="py-[24px] px-[20px] border-t border-stroke-secondary">
          <div className="flex flex-row flex-wrap items-center">
            <p className="text-sm leading[20px] text-accent-primary font-suisseIntl mr-auto">
              Opacity
            </p>
            <NumericInput
              value={qrValues.qrOpacity}
              onChange={(newValue) =>
                handleQrValues(qrValuesMap.QR_OPACITY, newValue)
              }
              min={0}
              max={1}
              step={0.1}
              incrementIcon={<AngleUpIcon />}
              decrementIcon={<AngleDownIcon />}
              className="w-[80px] h-[40px] border-stroke-secondary"
            />
          </div>
        </div>

        {/* QR type section */}
        <QRTypePanel qrValues={qrValues} handleQrValues={handleQrValues} />

        {/* Data section  */}
        <DataPanel
          label={dataPanelValues.LABEL}
          icon={LinkSvg}
          placeholder={dataPanelValues.PLACEHOLDER}
          value={qrValues.value || ""}
          onChange={(value) => handleQrValues(qrValuesMap.VALUE, value)}
        />

        <Collapse
          defaultActiveKey={["1"]}
          className="custom-collapse"
          expandIcon={() => <DownArrowIcon />}
          expandIconPosition={"end"}
        >
          <CollapsePanel header={collapsePanelHeaders.CODE_COLOR} key="1">
            <ColorPickerPanel
              value={qrValues.fgColor || colors.BLACK}
              onChange={(hex) => handleQrValues(qrValuesMap.FG_COLOR, hex)}
              numericValue={qrValues.fgOpacity}
              onNumericChange={(e) => handleOpacityChange(e, "")}
            />
          </CollapsePanel>

          <CollapsePanel header={collapsePanelHeaders.BACKGROUND_COLOR} key="2">
            <ColorPickerPanel
              value={qrValues.bgColor || colors.WHITE}
              onChange={(hex) => handleQrValues(qrValuesMap.BG_COLOR, hex)}
              numericValue={qrValues.bgOpacity}
              onNumericChange={(e) =>
                handleOpacityChange(e, qrValuesMap.BACKGROUND)
              }
            />
          </CollapsePanel>
        </Collapse>
      </div>

      <div className="px-[20px] py-[4px] border-t border-stroke-secondary">
        <DrawerButton
          label={drawerButtonValues.GENERATE_QR}
          onClick={createQR}
        />
      </div>
    </div>
  );
};

export default QRDrawer;
