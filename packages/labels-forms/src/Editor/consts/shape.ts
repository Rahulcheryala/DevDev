import {
  BasicShapeOperationsType,
  ShapeOperationConfigMapType,
} from "../types";

// Define enums for ShapeTypes and ShapeOperations
export enum shapeTypes {
  rect = "rect",
  square = "square",
  circle = "circle",
  pictogram = "pictogram",
}

export enum shapeOperations {
  size = "size",
  radius = "radius",
  rotation = "rotation",
  sides = "sides",
  rounding = "rounding",
  fill = "fill",
  border = "border",
}

// Define BasicShapeOperations object with the corresponding type
export const basicShapeOperations: BasicShapeOperationsType = {
  [shapeOperations.size]: true,
  [shapeOperations.radius]: false,
  [shapeOperations.rotation]: true,
  [shapeOperations.sides]: false,
  [shapeOperations.rounding]: true,
  [shapeOperations.fill]: true,
  [shapeOperations.border]: true,
};

// Define ShapeOperationConfigMap with the appropriate type
export const shapeOperationConfigMap: ShapeOperationConfigMapType = {
  [shapeTypes.square]: {
    ...basicShapeOperations,
  },
  [shapeTypes.rect]: {
    ...basicShapeOperations,
  },
  [shapeTypes.circle]: {
    ...basicShapeOperations,
    [shapeOperations.rounding]: false,
    [shapeOperations.sides]: false,
    [shapeOperations.rotation]: false,
  },
  [shapeTypes.pictogram]: {
    ...basicShapeOperations,
    [shapeOperations.size]: true,
    [shapeOperations.rotation]: true,
    [shapeOperations.rounding]: false,
    [shapeOperations.fill]: false,
    [shapeOperations.border]: false,
  },
};
