import { DefaultPrintMargins } from "../types";

export const setDefaultPrintMargins = ({
  unit,
  dpi,
  margins,
}: DefaultPrintMargins) => {
  const conversionMap: Record<string, () => typeof margins> = {
    in: () => margins, // Return as is for inches
    cm: () => ({
      top: +(margins.top * 2.54).toFixed(2),
      right: +(margins.right * 2.54).toFixed(2),
      bottom: +(margins.bottom * 2.54).toFixed(2),
      left: +(margins.left * 2.54).toFixed(2),
    }),
    px: () => ({
      top: +(margins.top * dpi).toFixed(2),
      right: +(margins.right * dpi).toFixed(2),
      bottom: +(margins.bottom * dpi).toFixed(2),
      left: +(margins.left * dpi).toFixed(2),
    }),
  };

  // Use the map to get the conversion function and execute it
  return conversionMap[unit] ? conversionMap[unit]() : margins;
};

export const updateLabelPosition = (
  element: HTMLElement,
  uniqueId: string,
  position: "top" | "left" | "right" | "bottom",
  newValue: number,
  allSameTop: boolean,
  allSameLeft: boolean,
  originalPositions: React.MutableRefObject<{
    [key: string]: {
      top: number;
      left: number;
    };
  }>,
) => {
  if (position === "left") {
    if (allSameLeft) {
      element.style.left = `${newValue}px`;
    } else {
      const originalLeft = originalPositions.current[uniqueId].left;
      const newLeft = originalLeft + newValue;
      element.style.left = `${newLeft}px`;
    }
  } else if (position === "top") {
    if (allSameTop) {
      element.style.top = `${newValue}px`;
    } else {
      const originalTop = originalPositions.current[uniqueId].top;
      const newTop = originalTop + newValue;
      element.style.top = `${newTop}px`;
    }
  } else {
    element.style[position] = `${newValue}px`;
  }
};

export const checkLabelPositions = (labels: HTMLImageElement[]) => {
  const firstLabel = labels[0];
  const firstTop = Number(firstLabel.style.top.replace("px", ""));
  const firstLeft = Number(firstLabel.style.left.replace("px", ""));

  let allSameTop = true;
  let allSameLeft = true;

  for (let i = 1; i < labels.length; i++) {
    const label = labels[i];
    const currentTop = Number(label.style.top.replace("px", ""));
    const currentLeft = Number(label.style.left.replace("px", ""));

    if (currentTop !== firstTop) allSameTop = false;
    if (currentLeft !== firstLeft) allSameLeft = false;

    if (!allSameTop && !allSameLeft) break;
  }

  return { allSameTop, allSameLeft, firstTop, firstLeft };
};
