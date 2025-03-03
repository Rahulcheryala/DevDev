import React, { useEffect, useRef, useState } from "react";
import ScaleOptions from "./ScaleOptions";
import { useStoreStateSetValue, useStoreStateValue } from "@scena/react-store";
import {
  $actionManager,
  $isLabelRollSelected,
  $isLabelSheetSelected,
  $printPageRef,
  $toggleFullScreen,
  $unitManager,
} from "../../../../stores/stores";
import LabelRoll from "./LabelRoll";
import { useDPI } from "../../../../hooks/useDpi";
import { useEditor } from "../../../../context/EditorContext";
import { paperSize } from "../../../../consts";
import { SheetDimensions } from "../../../../types";

type Margins = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

type ContentAreaProps = {
  vGap: number;
  hGap: number;
  boxMargin: Margins;
  previewThumbnail: string;
};

const ContentArea: React.FC<ContentAreaProps> = ({
  vGap,
  hGap,
  boxMargin,
  previewThumbnail,
}) => {
  const [gapX, setGapX] = useState<number>(10);
  const [gapY, setGapY] = useState<number>(10);
  const [margins, setMargins] = useState<Margins>({
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  });
  const [numItems, setNumItems] = useState<number>(0);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { dimensions } = useEditor();
  const [imageDimensions, setImageDimensions] = useState({
    imageWidth: 0,
    imageHeight: 0,
  });
  const [sheetDimensions, setSheetDimensions] = useState<SheetDimensions>({
    width: 0,
    height: 0,
  });

  const dpi = useDPI();
  const unitManager = useStoreStateValue($unitManager);

  useEffect(() => {
    if (dpi) {
      const widthPx = (paperSize.A4_WIDTH_MM / 25.4) * dpi; // Convert mm to pixels
      const heightPx = (paperSize.A4_HEIGHT_MM / 25.4) * dpi; // Convert mm to pixels
      setSheetDimensions({
        width: widthPx,
        height: heightPx,
      });
    }
  }, [dpi]);

  useEffect(() => {
    if (dimensions) {
      const canvasDimensionsInPx = unitManager.getCanvasDimensionsInPixels(
        dimensions.width,
        dimensions.height,
        dimensions.unit,
        dpi,
      );
      const imageWidth = canvasDimensionsInPx.widthInPixels;
      const imageHeight = canvasDimensionsInPx.heightInPixels;
      setImageDimensions({
        imageWidth,
        imageHeight,
      });

      // Convert gaps and margins to pixels
      const convertedVGap = unitManager.convertToPixels(
        vGap,
        dimensions.unit,
        dpi,
      ).valueInPixels;
      const convertedHGap = unitManager.convertToPixels(
        hGap,
        dimensions.unit,
        dpi,
      ).valueInPixels;
      const convertedMargins = {
        top: unitManager.convertToPixels(boxMargin.top, dimensions.unit, dpi)
          .valueInPixels,
        bottom: unitManager.convertToPixels(
          boxMargin.bottom,
          dimensions.unit,
          dpi,
        ).valueInPixels,
        left: unitManager.convertToPixels(boxMargin.left, dimensions.unit, dpi)
          .valueInPixels,
        right: unitManager.convertToPixels(
          boxMargin.right,
          dimensions.unit,
          dpi,
        ).valueInPixels,
      };

      setGapX(convertedHGap);
      setGapY(convertedVGap);
      setMargins(convertedMargins);
    }
  }, [dimensions, unitManager, dpi, vGap, hGap, boxMargin]);

  const calculateNumberOfItems = () => {
    if (containerRef?.current) {
      const containerWidth =
        containerRef.current.clientWidth - margins.left - margins.right;
      const containerHeight =
        containerRef.current.clientHeight - margins.top - margins.bottom;

      if (containerWidth <= 0 || containerHeight <= 0) return 0;

      const numCols = Math.max(
        1,
        Math.floor(containerWidth / (imageDimensions.imageWidth + gapX)),
      );
      const numRows = Math.max(
        1,
        Math.floor(containerHeight / (imageDimensions.imageHeight + gapY)),
      );
      return { numCols, numRows, totalItems: numCols * numRows }; // Return cols, rows, and total items
    }
    return { numCols: 0, numRows: 0, totalItems: 0 }; // Default return
  };

  useEffect(() => {
    const updateNumItems = () => {
      const { numCols, totalItems }: any = calculateNumberOfItems(); // Get cols, rows, and total items
      if (totalItems < 1000) {
        setNumItems(totalItems);
      } else setNumItems(0);

      // Initialize positions for each item based on numCols and numRows
      setPositions(
        Array.from({ length: totalItems }).map((_, index) => ({
          x: (index % numCols) * (imageDimensions.imageWidth + gapX), // Adjust based on numCols
          y: Math.floor(index / numCols) * (imageDimensions.imageHeight + gapY), // Adjust based on numCols
        })),
      );
    };
    const timeoutId = setTimeout(updateNumItems, 0);

    window.addEventListener("resize", updateNumItems);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateNumItems);
    };
  }, [gapX, gapY, margins, dpi, imageDimensions]);
  const toggleFullScreen = useStoreStateValue($toggleFullScreen);
  const isLabelRollSelected = useStoreStateValue($isLabelRollSelected);
  const isLabelSheetSelected = useStoreStateValue($isLabelSheetSelected);
  const setPrintRef = useStoreStateSetValue($printPageRef);
  const actionManager = useStoreStateValue($actionManager);

  useEffect(() => {
    if (containerRef.current) {
      setPrintRef(containerRef);
      actionManager.act("labelRoll.getRef", {
        ref: containerRef,
        isLabelSheetSelected,
      });
    }
  }, [containerRef.current, isLabelRollSelected]);

  return (
    <>
      <div
        className={`bg-background-primary ${
          toggleFullScreen ? "h-[100vh]" : "h-[calc(100vh_-_126px)]"
        } flex items-center justify-center overflow-y-auto p-5`}
      >
        <div>
          {isLabelSheetSelected ? (
            <div
              style={{
                width: sheetDimensions.width + "px",
                height: sheetDimensions.height + "px",
              }}
              className={`label-page 
        bg-white flex justify-center items-center border-[1px] border-black overflow-hidden`}
              ref={containerRef}
            >
              <div
                style={{
                  width: `calc(100% - ${margins.left + margins.right}px)`,
                  height: `calc(100% - ${margins.top + margins.bottom}px)`,
                  margin: `${margins.top}px ${margins.right}px ${margins.bottom}px ${margins.left}px`,
                  position: "relative",
                }}
              >
                {Array.from({ length: numItems }).map((_, index) => (
                  <img
                    id={`image-${index}`}
                    key={index}
                    src={previewThumbnail}
                    // onClick={() => handleImageClick(index)}
                    style={{
                      width: `${imageDimensions.imageWidth}px`,
                      height: `${imageDimensions.imageHeight}px`,
                      position: "absolute",
                      left: `${positions[index]?.x || 0}px`,
                      top: `${positions[index]?.y || 0}px`,
                      // border: selectedImages.has(index)
                      //   ? "4px solid blue"
                      //   : "none",
                      cursor: "pointer",
                    }}
                    alt={`Grid Item ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : isLabelRollSelected ? (
            <LabelRoll />
          ) : (
            <></>
          )}
        </div>
      </div>
      <ScaleOptions />
    </>
  );
};

export default ContentArea;
