import React, { useState, useEffect, useRef } from "react";
import { useLayers } from "../../../context/LayersContext";
import { useStoreStateValue, useStoreValue } from "@scena/react-store";
import {
  $actionManager,
  $editor,
  $layerManager,
  $moveable,
  $selectedFlattenLayers,
  $selectedPageId,
  $shapesManager,
} from "../../../stores/stores";
import alertHazard from "../../../assets/icons/shared/alert_hazard.svg";
import ShapesGallery from "./ShapesGallery";
import { ScenaElementLayer, ShapesGalleryType } from "../../../types";
import { createLayer } from "../../managers/LayerManager";
import { RectInfo } from "react-moveable";
import add_images from "../../../assets/icons/drawer/add_images.svg";
import {
  cornerConfig,
  initialShapeValues,
  validStyles,
} from "../../../utils/config";

import useUndoRedo from "../../../hooks/useUndoRedo";
import BorderSettings from "./components/BorderSettings";
import FillSettings from "./components/FillSettings";
import RadiusSettings from "./components/RadiusSettings";
import SizeSettings from "./components/SizeSettings";
import RotationSettings from "./components/RotationSettings";
import {
  createShape,
  getRoundingValues,
  setBorderColor,
  setBorderWidth,
  setCorners,
} from "./utils/shape-utils";
import { RadiusType, ShapeValues } from "../../../types";
import {
  shapeOperationConfigMap,
  shapeOperations,
  shapeTypes,
} from "../../../consts";
import { getTransformOriginForLayer } from "../../../utils/shared/LayerUtils";

const ShapesDrawer = () => {
  const actionManager = useStoreStateValue($actionManager);
  const moveableRef = useStoreStateValue($moveable);
  const [keepRatio, setKeepRatio] = React.useState(false);
  const {
    setSelectedLayerRotationAngle,
    setIsAutoScaleEnabled,
    setFixRatio,
    fixRatio,
  } = useLayers();
  const [shapeValues, setShapeValues] = useState(initialShapeValues);
  const layerManager = useStoreStateValue($layerManager);
  const shapesManager = useStoreStateValue($shapesManager);
  const selectedLayersStore = useStoreValue($selectedFlattenLayers);
  const selectedLayers = useStoreStateValue($selectedFlattenLayers);
  const selectedPageId = useStoreStateValue($selectedPageId);

  const fileInputRef = useRef<any>(null);
  const selectedShape = selectedLayersStore.value[0]?.title;
  const shapeConfig =
    shapeOperationConfigMap[selectedShape as keyof typeof shapeTypes] || {};
  const { addToUndo } = useUndoRedo();

  const setColor = async (color: string) => {
    const selectedLayers = selectedLayersStore.value;

    if (!selectedLayers.length) {
      return;
    }
    selectedLayers.forEach((layer: ScenaElementLayer) => {
      layer.ref.current!.style.fill = color;
      addToUndo();
      setShapeValues({
        ...shapeValues,
        fill: color,
      });
    });
  };

  useEffect(() => {
    const onUpdate = (e: { rect: RectInfo }) => {
      const svgRef = selectedLayersStore.value[0]?.ref?.current;
      const layer = selectedLayersStore.value[0];
      if (svgRef) {
        const fill = getFillValue(svgRef);
        const borderColor = svgRef?.style?.borderColor;
        const borderWidth = parseInt(
          svgRef?.style?.borderWidth.replace("px", ""),
        );
        const strokeWidth = parseInt(
          svgRef?.style?.strokeWidth.replace("px", ""),
        );

        // const borderStyle = getBorderStyle(svgRef);
        const borderStyle = svgRef?.style?.borderStyle;
        const rect = e.rect;
        const roundingValues = getRoundingValues(svgRef as SVGElement);

        (layer as any).rotation = e?.rect?.rotation;

        setSelectedLayerRotationAngle(
          parseFloat(rect?.rotation?.toFixed(1)) || 0,
        );
        // handleBorderWidth(borderWidth || 1);
        setShapeValues((prev: ShapeValues) => {
          return {
            ...prev,
            width: e?.rect?.offsetWidth,
            height: e?.rect?.offsetHeight,
            rotation: Math.round(e?.rect?.rotation * 10) / 10 || 0,
            fill,
            stroke: svgRef.style.stroke,
            borderColor,
            borderStyle,
            strokeWidth: strokeWidth || 0,
            borderWidth: borderWidth || 0,
            borderTopLeftRadius: parseFloat(
              roundingValues.borderTopLeftRadius as string,
            ),
            borderTopRightRadius: parseFloat(
              roundingValues.borderTopRightRadius as string,
            ),
            borderBottomRightRadius: parseFloat(
              roundingValues.borderBottomRightRadius as string,
            ),
            borderBottomLeftRadius: parseFloat(
              roundingValues.borderBottomLeftRadius as string,
            ),
          };
        });
      }
    };
    actionManager.on("get.rect", onUpdate);

    return () => {
      actionManager.off("get.rect", onUpdate);
    };
  }, []);
  const editorRef = useStoreStateValue($editor);

  const handleBorderWidth = (value: number) => {
    setBorderWidth(value, shapeValues, setShapeValues, selectedLayers);
  };

  const handleBorderColor = (value: string) => {
    setBorderColor(
      value,
      shapeValues,
      setShapeValues,
      selectedLayers,
      addToUndo,
    );
  };

  const handleCorners = (corner: string, radius: RadiusType) => {
    setCorners(
      corner,
      radius,
      shapeValues,
      setShapeValues,
      selectedLayers,
      addToUndo,
    );
  };

  const handleBorderStyle = (style: string) => {
    const updatedStyle = style.toLowerCase();
    // Validate the style to ensure it's either 'dotted', 'solid or 'dashed'
    if (!validStyles.includes(updatedStyle)) {
      console.error('Invalid style. Please use "dotted" or "dashed".');
      return;
    }

    setShapeValues({
      ...shapeValues,
      borderStyle: style,
    });

    selectedLayers.forEach((layer: ScenaElementLayer) => {
      const circle = layer.ref.current!.querySelector("circle");

      if (layer.ref.current) {
        if (circle) {
          const strokeDashArray = shapesManager.calculateStrokeDashArray(
            shapeValues.strokeWidth || 0,
            style,
          );
          layer.ref.current.setAttribute("stroke-dasharray", strokeDashArray);
          layer.ref.current.style.strokeDasharray = strokeDashArray;
          layer.ref.current.style.borderStyle = style;
        } else {
          layer.ref.current.style.borderStyle = style;
        }
      }
    });
  };

  const getFillValue = (svgRef: any) => {
    const fillColor = svgRef?.style?.fill;
    const fillByAttribute = svgRef?.getAttribute("fill");
    const fill = fillColor ? fillColor : fillByAttribute;
    return fill;
  };

  const handleFileClick = () => {
    if (fileInputRef) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = (await convertToBase64(file)) as string;

        const layers: ScenaElementLayer[] = [
          createLayer({
            id: `image-${Date.now()}`,
            type: "image",
            title: "image",
            style: {
              position: "absolute",
            },
            jsx: <img src={imageUrl || alertHazard} />,
          }),
        ];

        await editorRef.current!.setLayers([...layerManager.layers, ...layers]);
        await editorRef.current!.setSelectedLayers(layers);
        addToUndo();
      }
    } else {
      // Optionally handle the case where no file is selected
      console.error("No file selected");
    }
  };

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    setIsAutoScaleEnabled(false);
  }, []);

  const handleRatio = () => {
    const newRatioValue = !keepRatio;
    setFixRatio(newRatioValue);
    setKeepRatio(newRatioValue);
  };

  const handleCreateShape = (shapeName: ShapesGalleryType) => {
    let transformOrigin = [0, 0];
    let child: any;
    let scope;

    if (selectedPageId && editorRef?.current?.isDocument) {
      const g = layerManager.groups.find((g) => g.id === selectedPageId);
      if (selectedPageId.split("-").length === 2) {
        child = g?.children.find(
          (c) => c.scope.length === 1 && c.scope.includes(selectedPageId),
        );
        scope = [selectedPageId];
      } else {
        child = g?.children.find(
          (c) => c.scope.length === 2 && c.scope.includes(selectedPageId),
        );
        scope = child.scope;
      }
      transformOrigin = getTransformOriginForLayer(child);
      console.log("shape group", g);
    }
    createShape(
      {
        ...shapeName,
      },
      editorRef,
      layerManager,
      addToUndo,
      transformOrigin[1],
      scope,
    );
  };

  return (
    <div className="h-[calc(100vh_-_10em)] overflow-auto custom-scrollbar border-r border-[rgb(233,_233,_238)">
      <div className={"flex flex-col gap-2 p-[1em]"}>
        <p className={"text-14"}>Style</p>
        <div className="flex fle-row space-x-4 flex-wrap">
          <ShapesGallery onSubmit={handleCreateShape} />
          <div
            onClick={handleFileClick}
            className={`p-3 font-semibold flex items-center cursor-pointer rounded-[8px]  border-2 border-[#E9E9EE] hover:bg-[rgba(0,_0,_0,_0.06)]`}
          >
            <img src={add_images} alt="choose-image" />
            <input
              type="file"
              ref={fileInputRef}
              accept=".svg,.png,.jpg,.jpeg"
              onChange={(e) => handleFileChange(e)}
              style={{ display: "none" }} // Hide the actual file input
            />
          </div>
        </div>
      </div>

      <div className="">
        {/* Size */}
        {shapeConfig[shapeOperations.size] && (
          <SizeSettings
            width={shapeValues?.width}
            height={shapeValues?.height}
            moveableRef={moveableRef}
            keepRatio={fixRatio}
            handleRatio={handleRatio}
          />
        )}

        {/* Rotation */}
        {shapeConfig[shapeOperations.rotation] && (
          <RotationSettings
            rotation={shapeValues?.rotation}
            moveableRef={moveableRef}
          />
        )}

        {/* Rounding */}
        {shapeConfig[shapeOperations.rounding] && (
          <RadiusSettings
            handleCorners={handleCorners}
            inputArray={cornerConfig(shapeValues)}
          />
        )}

        {/* Fill */}
        {shapeConfig[shapeOperations.fill] && (
          <FillSettings fill={shapeValues.fill} setColor={setColor} />
        )}

        {shapeConfig[shapeOperations.border] && (
          <BorderSettings
            borderColor={shapeValues?.borderColor || shapeValues.stroke}
            borderWidth={shapeValues?.borderWidth}
            strokeWidth={shapeValues?.strokeWidth}
            borderStyle={shapeValues.borderStyle}
            handleBorderColor={handleBorderColor}
            handleBorderStyle={handleBorderStyle}
            handleBorderWidth={handleBorderWidth}
          />
        )}
      </div>
    </div>
  );
};

export default ShapesDrawer;
