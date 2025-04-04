import { StoreValue } from "@scena/react-store";
import { dimensionUnits, gridTypeEnum } from "../../../../consts";
import InfiniteViewer from "react-infinite-viewer";

export const calculateGridSize = (unit: string, dpi: number) => {
  switch (unit) {
    case dimensionUnits.IN:
      return dpi; // 1 inch in dpi pixels
    case dimensionUnits.CM:
      return dpi / 2.54; // 1 cm in dpi pixels
    default:
      return 50; // default grid size
  }
};
// Function to add grid lines
export const addGridLines = (
  defaultUnit: string,
  dpi: number,
  gridLinesWrapperDiv: React.RefObject<HTMLDivElement>,
  gridType: gridTypeEnum,
  gridDimension: {
    width: number;
    height: number;
  },
  zoomStore: StoreValue<number>,
  setZoomToStore: (value: number) => void,
  infiniteViewerRef: React.RefObject<InfiniteViewer>,
) => {
  const unit = defaultUnit;
  const gridWidth = calculateGridSize(unit, dpi);
  const gridHeight = calculateGridSize(unit, dpi);

  if (gridLinesWrapperDiv?.current) {
    const gridLinesDiv = gridLinesWrapperDiv.current;
    const svgDataUrl = `url("data:image/svg+xml,${svgContent(
      gridWidth,
      gridHeight,
      gridType,
    )}")`;
    // Store the current zoom level
    const currentZoomLevel = zoomStore;

    // Assigning styles to gridLinesDiv
    Object.assign(gridLinesDiv.style, {
      backgroundImage: svgDataUrl,
      backgroundRepeat: "repeat",
      width: `${gridDimension.width}px`,
      height: `${gridDimension.height}px`,
      position: "absolute",
      top: `${-100 * dpi}px`,
      left: `${-100 * dpi}px`,
    });
    // infiniteViewerRef.current?.scrollTo(-100, -50);

    // Update the zoom level directly in the store
    if (typeof currentZoomLevel === "number") {
      setZoomToStore(currentZoomLevel);
      infiniteViewerRef.current?.setZoom(currentZoomLevel);
    }
  }
};

export const removeGridLines = (
  gridLinesWrapperDiv: React.RefObject<HTMLDivElement>,
) => {
  if (gridLinesWrapperDiv?.current) {
    const gridLinesDiv = gridLinesWrapperDiv.current;
    Object.assign(gridLinesDiv.style, {
      backgroundImage: "none",
      backgroundRepeat: "no-repeat",
      width: "0",
      height: "0",
      position: "static",
      top: "0",
      left: "0",
    });
  }
};

export const svgContent = (
  width: number,
  height: number,
  gridType: "gridline" | "griddot",
) => {
  const convertedWidth = width;
  const convertedHeight = height;
  const patternSize = convertedWidth / 10;
  const gridLineSvg = `
     <pattern id="smallGrid" width="${patternSize}" height="${patternSize}" patternUnits="userSpaceOnUse">
      <rect width="${patternSize}" height="${patternSize}" fill="#F7F8FB" />
      <path d="M ${patternSize} 0 L 0 0 0 ${patternSize}" fill="none" stroke="gray" stroke-width="0.5"/>
    </pattern>
    <pattern id="grid" width="${convertedWidth}" height="${convertedHeight}" patternUnits="userSpaceOnUse">
      <rect width="${convertedWidth}" height="${convertedHeight}" fill="url(#smallGrid)"/>
      <path d="M ${convertedWidth} 0 L 0 0 0 ${convertedHeight}" fill="none" stroke="gray" stroke-width="1"/>
    </pattern>
  `;

  const dotGridSvg = `
    <pattern id="dot-grid" width="${patternSize}" height="${patternSize}" patternUnits="userSpaceOnUse">
      <circle cx="${patternSize / 2}" cy="${
        patternSize / 2
      }" r="1" fill="#BFBFBF"/>
    </pattern>
    <pattern id="grid" width="${convertedWidth}" height="${convertedHeight}" patternUnits="userSpaceOnUse">
      <rect width="${convertedWidth}" height="${convertedHeight}" fill="url(#dot-grid)"/>
    </pattern>
  `;

  return encodeURIComponent(
    `<svg id="svgGrid" width="${convertedWidth}" height="${convertedHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${gridType === "gridline" ? gridLineSvg : dotGridSvg}
      </defs>
      <rect width="${convertedWidth}" height="${convertedHeight}" fill="url(#grid)" />
    </svg>`,
  );
};
