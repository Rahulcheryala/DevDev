import { DefaultLineValues } from "../types";
import { colors } from "./shared";

export const lineStyles = {
  SOLID: "solid",
  DASHED: "dashed",
  DOTTED: "dotted",
};
export const defaultLineValues: DefaultLineValues = {
  width: 100,
  color: colors.BLACK,
  style: lineStyles.SOLID,
  rotation: 0,
  opacity: 1,
  thickness: 1,
};

export const lineConsts = {
  WIDTH: "width",
  COLOR: "color",
  STYLE: "style",
  ROTATION: "rotation",
  OPACITY: "opacity",
  THICKNESS: "thickness",
};

export const linePropertiesMap = {
  [lineConsts.WIDTH]: "width",
  [lineConsts.THICKNESS]: "stroke-width",
  [lineConsts.COLOR]: "stroke",
  [lineConsts.STYLE]: "line-style",
};

export const lineSvgValues = {
  width: 200,
  height: 10,
  stroke: colors.BLACK,
  strokeWidth: 2,
};

export const lineTypes = [
  { label: "Generate Line", type: "line" },
  { label: "Generate Arrow", type: "arrow" },
];

export const lineValueConsts = {
  STYLE: "style",
  COLOR: "color",
};
