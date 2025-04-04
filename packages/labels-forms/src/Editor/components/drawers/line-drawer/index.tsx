import React, { useEffect, useRef, useState } from "react";
import { AlignmentIconsPanel } from "../../shared";
import {
  borderStyles,
  colors,
  defaultLineValues,
  linePropertiesMap,
  lineSvgValues,
  lineTypes,
  lineValueConsts,
  undoActionType,
} from "../../../consts";
import { useStoreStateValue, useStoreValue } from "@scena/react-store";
import {
  $actionManager,
  $editor,
  $layerManager,
  $moveable,
  $selectedFlattenLayers,
} from "../../../stores/stores";
import useUndoRedo from "../../../hooks/useUndoRedo";
import { RectInfo } from "react-moveable";
import { useLayers } from "../../../context/LayersContext";
import { createLayer } from "../../managers/LayerManager";
import { Lines, ScenaElementLayer } from "../../../types";
import DrawerButton from "../../shared/DrawerButton";
import LineInputPanel from "./components/LineInputPanel";
import { ColorPickerPanel } from "../barcode-drawer/components";
import { Select } from "antd";
import { lineFactory } from "./components/LineFactory";
import { updateLineProperties } from "../../../utils/line";

const LineDrawer = () => {
  const [lineValues, setLineValues] = useState(defaultLineValues);
  const rRef = useRef<HTMLInputElement>(null);
  const moveableRef = useStoreStateValue($moveable);
  const { addToUndo } = useUndoRedo();
  const { setSelectedLayerRotationAngle, setIsAutoFitEnabled } = useLayers();
  const actionManager = useStoreStateValue($actionManager);
  const editorRef = useStoreStateValue($editor);
  const layerManager = useStoreStateValue($layerManager);
  const selectedLayersStore = useStoreValue($selectedFlattenLayers);
  const lineRef = useRef<SVGElement | null>(null);

  const handleLineValues = (key: string, value: number | string) => {
    setLineValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    const layer = selectedLayersStore.value[0];
    layer.metaData = { ...lineValues, [key]: value };

    const property = linePropertiesMap[key];
    updateLineProperties(lineRef.current, property, value);
  };

  const getLine = () => {
    const line = selectedLayersStore.value[0];
    if (!line?.ref?.current) return;

    lineRef.current = line.ref.current as SVGElement;
    const lineValues = line?.metaData;
    if (Object.keys(lineValues).length) {
      setLineValues(lineValues);
    }
  };

  useEffect(() => {
    setIsAutoFitEnabled(true);
    getLine();
  }, [selectedLayersStore.value]);

  useEffect(() => {
    const onUpdate = (e: { rect: RectInfo }) => {
      const rotation = Math.round(e.rect.rotation * 10) / 10;
      setSelectedLayerRotationAngle(parseFloat(rotation.toFixed(1)));
      if (rotation != lineValues.rotation) {
        setLineValues((prev) => ({
          ...prev,
          rotation,
        }));
      } else {
        setLineValues((prev) => ({
          ...prev,
          width: e.rect.width,
        }));
      }
    };

    actionManager.on("get.rect", onUpdate);
    return () => {
      actionManager.off("get.rect", onUpdate);
    };
  }, []);

  const createLayerByType = async (title: Lines) => {
    const id = Date.now().toString();
    const jsx = lineFactory(title, lineSvgValues);

    const layers: ScenaElementLayer[] = [
      createLayer({
        id,
        title,
        style: {
          position: "absolute",
        },
        jsx,
        type: "line",
        metaData: {},
      }),
    ];

    await editorRef.current!.setLayers([...layerManager.layers, ...layers]);
    await editorRef.current!.setSelectedLayers(layers);
    addToUndo({ operation: undoActionType.ADD, addedLayer: layers[0] });
  };

  return (
    <div className="h-[calc(100vh_-_10em)] overflow-auto custom-scrollbar border-r border-[rgb(233,_233,_238)]">
      <AlignmentIconsPanel />
      <div>
        <LineInputPanel
          lineValues={lineValues}
          handleLineValues={handleLineValues}
          moveableRef={moveableRef}
          ref={rRef}
        />
        <ColorPickerPanel
          value={lineValues.color || colors.BLACK}
          onChange={(hex) => handleLineValues(lineValueConsts.COLOR, hex)}
          onNumericChange={() => {}}
        />
        <div className="px-6">
          <Select
            style={{ width: 120 }}
            onChange={(value) => handleLineValues(lineValueConsts.STYLE, value)}
            value={lineValues.style}
            options={borderStyles}
          />
        </div>
        <div className="px-6">
          {lineTypes.map(({ label, type }) => (
            <DrawerButton
              key={type}
              label={label}
              onClick={() => createLayerByType(type as Lines)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineDrawer;
