// Zoom utils
export const handleZoomChange = (
  newZoom: number,
  setZoomLevel: (value: React.SetStateAction<number>) => void,
) => {
  if (newZoom > 0) {
    setZoomLevel(newZoom);
  }
};

export const preventZoom = (e: KeyboardEvent) => {
  if (
    e.metaKey &&
    e.shiftKey &&
    (e.key === "+" || e.key === "=" || e.key === "-")
  ) {
    e.preventDefault();
  }
};

export const handleZoomIn = (
  predefinedZoomLevels: number[],
  zoomLevel: number,
  setZoomLevel: (value: React.SetStateAction<number>) => void,
) => {
  const currentIndex = predefinedZoomLevels.indexOf(zoomLevel);
  if (currentIndex < predefinedZoomLevels.length - 1) {
    setZoomLevel(predefinedZoomLevels[currentIndex + 1]);
  }
};

export const handleZoomOut = (
  predefinedZoomLevels: number[],
  zoomLevel: number,
  setZoomLevel: (value: React.SetStateAction<number>) => void,
) => {
  const currentIndex = predefinedZoomLevels.indexOf(zoomLevel);
  if (currentIndex > 0) {
    setZoomLevel(predefinedZoomLevels[currentIndex - 1]);
  }
};
