export type DefaultLineValues = {
  width: number;
  color: string;
  style: string;
  rotation: number;
  opacity: number;
  thickness: number;
};

export type Lines = "line" | "arrow" | "doubleArrow";
export type LineProps = {
  width: number;
  height: number;
  stroke: string;
  strokeWidth: number;
  strokeType?: string;
};
