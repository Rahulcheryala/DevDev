import { dimensionUnits } from "../../consts";

export default class UnitManager {
  unit: string;
  resolution: number;
  PX_TO_INCH = 1 / 96; // 1 inch = 96 pixels
  CM_TO_INCH = 1 / 2.54; // 1 inch = 2.54 cm

  constructor(unit: string, resolution: number) {
    this.unit = unit;
    this.resolution = resolution; // DPI for 'in' unit, assumed constant for simplicity
  }

  // Method to convert any value into pixels
  convertToPixels(value: number, unit?: string, dpi?: number) {
    let valueInPixels;
    switch (unit || this.unit) {
      case dimensionUnits.IN:
        valueInPixels = value * (dpi || this.resolution);
        break;
      case dimensionUnits.CM:
        valueInPixels = (value / 2.54) * (dpi || this.resolution);
        break;
      case dimensionUnits.PX:
        valueInPixels = value;
        break;
      default:
        throw new Error("Unsupported unit. Supported units are px, in, cm.");
    }

    return {
      valueInPixels,
    };
  }

  // Method to retrieve the canvas dimensions in pixels
  getCanvasDimensionsInPixels(
    width: number,
    height: number,
    unit?: string,
    dpi?: number,
  ) {
    const widthInPixels = this.convertToPixels(width, unit, dpi).valueInPixels;
    const heightInPixels = this.convertToPixels(
      height,
      unit,
      dpi,
    ).valueInPixels;
    return {
      widthInPixels,
      heightInPixels,
    };
  }

  //receive zoom value according to resolution
  getZoom() {
    let zoom;
    switch (this.unit) {
      case dimensionUnits.CM:
        zoom = this.resolution / 2.54;
        break;
      case dimensionUnits.IN:
        zoom = this.resolution;
        break;
      case dimensionUnits.PX:
      default:
        zoom = 1;
        break;
    }
    return zoom;
  }

  getUnit(unit: string) {
    let newUnit;
    switch (unit) {
      case dimensionUnits.CM:
        newUnit = 1; // every 1cm
        break;
      case dimensionUnits.IN:
        newUnit = 1; // every 1in
        break;
      case dimensionUnits.PX:
      default:
        newUnit = 50; // every 50px
        break;
    }

    return newUnit;
  }

  convertToInches = (value: number, unit: string): number => {
    const conversionMap = new Map<string, number>([
      [dimensionUnits.CM, this.CM_TO_INCH],
      [dimensionUnits.PX, this.PX_TO_INCH],
    ]);

    const conversionFactor = conversionMap.get(unit);
    if (conversionFactor !== undefined) {
      return Number((value * conversionFactor).toFixed(3));
    }

    return value;
  };
}
