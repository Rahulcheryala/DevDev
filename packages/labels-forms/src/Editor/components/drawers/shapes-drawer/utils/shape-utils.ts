// shapeUtils.ts

import { borderRadiusMap, undoActionType } from "../../../../consts";
import LayerManager, { createLayer } from "../../../managers/LayerManager";
import ShapesManager from "../../../managers/shapesManager";
import {
  AddToUndo,
  EditorManagerInstance,
  RadiusType,
  ScenaElementLayer,
  ShapeValues,
  ShapesGalleryType,
} from "../../../../types";
import { validStyles } from "../../../../utils/config";

export const createShape = async (
  shapeName: ShapesGalleryType,
  editorRef: React.MutableRefObject<EditorManagerInstance | undefined>,
  layerManager: LayerManager,
  addToUndo: AddToUndo,
  transformY: number = 0,
  scope?: Array<string>,
) => {
  const id = Date.now().toString();

  // Create the shape layer with optional translateY
  const layers: ScenaElementLayer[] = [
    createLayer(
      {
        id,
        ...shapeName,
        metaData: {},
        ...(scope && { scope }),
      },
      transformY,
    ), // Pass translateY as the second argument
  ];

  // Set the new layers in the editor and update the selected layers
  await editorRef.current!.setLayers([...layerManager.layers, ...layers]);
  await editorRef.current!.setSelectedLayers(layers);

  // Add the layer creation to the undo stack
  addToUndo({ operation: undoActionType.ADD, addedLayer: layers[0] });
};

export const setBorderWidth = (
  value: number,
  shapeValues: ShapeValues,
  setShapeValues: (value: React.SetStateAction<ShapeValues>) => void,
  selectedLayers: ScenaElementLayer[],
) => {
  selectedLayers.forEach((layer) => {
    const circle = layer?.ref?.current?.querySelector("circle");
    if (circle) {
      const newRadius = 50 - value / 2;
      circle.setAttribute("stroke-width", value ? value.toString() : "0");
      circle.setAttribute("r", newRadius.toString());
      layer.ref.current!.style.strokeWidth = `${value}px`;
      setShapeValues({
        ...shapeValues,
        strokeWidth: value as number,
      });
    } else {
      layer.ref.current!.style.borderWidth = `${value}px`;
      setShapeValues({
        ...shapeValues,
        borderWidth: value as number,
      });
    }
  });
};

export const setBorderColor = (
  value: string,
  shapeValues: ShapeValues,
  setShapeValues: (value: React.SetStateAction<ShapeValues>) => void,
  selectedLayers: ScenaElementLayer[],
  addToUndo: AddToUndo,
) => {
  selectedLayers.forEach((layer) => {
    const circle = layer.ref.current!.querySelector("circle");
    if (circle) {
      layer.ref.current!.style.stroke = value;
      setShapeValues({
        ...shapeValues,
        stroke: `${value}`,
      });
    } else {
      layer.ref.current!.style.borderColor = value;
      setShapeValues({
        ...shapeValues,
        borderColor: `${value}`,
      });
    }
    addToUndo();
  });
};

export const setCorners = (
  corner: string,
  radius: RadiusType,
  shapeValues: ShapeValues,
  setShapeValues: (value: React.SetStateAction<ShapeValues>) => void,
  selectedLayers: ScenaElementLayer[],
  addToUndo: AddToUndo,
) => {
  const borderRadiusProperty = borderRadiusMap[corner];
  setShapeValues({ ...shapeValues, [corner]: radius });

  selectedLayers.forEach((layer) => {
    if (layer.ref.current && borderRadiusProperty) {
      layer.ref.current.style[borderRadiusProperty] = `${radius || 0}px`;
    }
  });

  addToUndo();
};

export const setBorderStyle = (
  style: string,
  shapeValues: ShapeValues,
  selectedLayers: ScenaElementLayer[],
  shapesManager: ShapesManager,
  addToUndo: AddToUndo,
) => {
  const updatedStyle = style.toLowerCase();

  if (!validStyles.includes(updatedStyle)) {
    console.error('Invalid style. Please use "dotted", "solid", or "dashed".');
    return;
  }

  selectedLayers.forEach((layer) => {
    const layerElement = layer.ref.current;
    if (!layerElement) return;

    const circle = layerElement.querySelector("circle");
    if (circle) {
      const strokeDashArray = shapesManager.calculateStrokeDashArray(
        shapeValues.borderWidth || 0,
        updatedStyle,
      );
      layerElement.setAttribute("stroke-dasharray", strokeDashArray);
    } else {
      layerElement.style.borderStyle = updatedStyle;
    }
    addToUndo();
  });
};

export const getFillValue = (svgRef: any) => {
  const fillColor = svgRef?.style?.fill;
  const fillByAttribute = svgRef?.getAttribute("fill");
  return fillColor || fillByAttribute;
};

export const getRoundingValues = (svgRef: SVGElement) => {
  const {
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
  } = svgRef.style;

  return {
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
  };
};
