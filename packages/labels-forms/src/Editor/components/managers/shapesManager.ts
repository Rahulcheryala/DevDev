export default class ShapesManager {
  calculateStrokeDashArray = (strokeWidth: number, strokeStyle: string) => {
    if (strokeStyle === "dotted") {
      // For dotted lines, use small dashes and larger gaps
      return `${strokeWidth},${strokeWidth * 2}`;
    } else if (strokeStyle === "dashed") {
      // For dashed lines, use larger dashes and smaller gaps
      return `${strokeWidth * 4},${strokeWidth * 2}`;
    } else {
      // Default to solid line if strokeStyle is not recognized
      return "none";
    }
  };
}
