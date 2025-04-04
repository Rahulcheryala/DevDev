import { shapeOperations, shapeTypes } from "../consts";
import { layerBorderMap } from "../consts";

export type ShapeValues = {
  width: number;
  height: number;
  rotation: number;
  borderTopLeftRadius: number;
  borderTopRightRadius: number;
  borderBottomRightRadius: number;
  borderBottomLeftRadius: number;
  fill: string;
  borderColor: string;
  strokeWidth: number;
  borderStyle: string;
  borderWidth: number;
  stroke: string;
};
export type CornerType = keyof typeof layerBorderMap;

export type RadiusType = number | null | undefined;

export type BorderRadiusProperty =
  | "borderTopRightRadius"
  | "borderTopLeftRadius"
  | "borderBottomLeftRadius"
  | "borderBottomRightRadius";

// Type for BasicShapeOperations: maps ShapeOperations to boolean
export type BasicShapeOperationsType = {
  [key in shapeOperations]: boolean;
};

// Type for ShapeOperationConfig: Allows individual shape types to override BasicShapeOperations
export type ShapeOperationConfig = {
  [key in shapeOperations]?: boolean;
};

// Define the type for ShapeOperationConfigMap: Maps each ShapeType to its corresponding ShapeOperationConfig
export type ShapeOperationConfigMapType = {
  [key in shapeTypes]: ShapeOperationConfig;
};

export type BorderRadiusItem = {
  corner: (typeof layerBorderMap)[keyof typeof layerBorderMap] | string;
  icon: JSX.Element;
  value: number;
};
