import React, { useEffect, useState, forwardRef, useRef } from "react";
import { useStoreStateValue } from "@scena/react-store";
import { prefix } from "../../utils/utils";
import {
  $bleedColor,
  $bleedVisible,
  $canvasProperties,
  $layerManager,
  $layers,
  $marginValueInPixels,
  $marginVisible,
  $unitManager,
} from "../../stores/stores";
import { useEditor } from "../../context/EditorContext";
import { DATA_SCENA_ELEMENT_ID } from "../../consts";
import { CanvasProperties, ScenaElementLayer } from "../../types";

// ScenaLayerElement Component
export interface ScenaLayerElementProps {
  layer: ScenaElementLayer;
}
export const ScenaLayerElement: React.FC<ScenaLayerElementProps> = ({
  layer,
}) => {
  const layerManager = useStoreStateValue($layerManager);

  useEffect(() => {
    const element = layer.ref.current!;
    layer.item.set(0, layer.style);
    element.style.cssText += layerManager.compositeFrame(layer).toCSSText();
  }, [layer.id, layer.item, layerManager]);

  return React.cloneElement(layer.jsx, {
    ...layer.jsx.props,
    key: layer.id,
    ref: layer.ref,
    ...(layer.type?.toLowerCase() === "page" && {
      className: "scena-viewport",
    }),
  });
};

// ViewportBleedIndicator Component
const ViewportBleedIndicator = ({
  bleedVisible,
}: {
  bleedVisible: boolean;
}) => (
  <div
    className={`${
      !bleedVisible && "hidden"
    } absolute w-[57px] right-[330px] -top-[34px] bg-[#0E77D3] p-2 font-suisseIntl grid place-content-center rounded-t-lg text-white font-light text-[12px]`}
  >
    Bleed
  </div>
);

// ViewportDimensions Component
const ViewportDimensions = ({
  dimensions,
}: {
  dimensions: { width: number; height: number; unit: string };
}) => (
  <>
    <div className="absolute top-[-50px] left-0 w-full">
      <div
        className="w-full border-l border-r border-[#0E77D3] h-[15px] 
      flex items-center absolute top-1/2 -translate-y-1/2"
      >
        <div className="w-full h-[1px] bg-[#0E77D3] flex justify-center"></div>
      </div>
      <div className="px-[8px] w-max m-auto relative">
        <div
          className="bg-white border border-[#0E77D3] rounded-[4px] w-max px-[12px] 
        py-[4px] text-[#5E626D] text-[12px] leading-[14px] font-suisseIntl font-normal"
        >
          W: {dimensions.width.toFixed(1)} {dimensions.unit}
        </div>
      </div>
    </div>
    <div className="absolute left-[-30px] top-0 h-full w-[24px] flex items-center justify-center">
      <div
        className="w-[15px] border-t border-b border-[#0E77D3] h-full flex justify-center absolute 
      left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-full bg-[#0E77D3] flex justify-center items-center"></div>
      </div>
      <div className="px-[8px] relative -rotate-90">
        <div
          className="bg-white border border-[#0E77D3] rounded-[4px] w-max px-[12px] py-[4px] 
        text-[#5E626D] text-[12px] leading-[14px] font-suisseIntl font-normal"
        >
          H: {dimensions.height.toFixed(1)} {dimensions.unit}
        </div>
      </div>
    </div>
  </>
);

// ScenaLayerWrapper Component
const ScenaLayerWrapper = ({ layers }: { layers: ScenaElementLayer[] }) =>
  layers.map((layer, index) => (
    <div key={index} style={{ display: "block" }}>
      <ScenaLayerElement key={layer.id} layer={layer} />
    </div>
  ));

// ViewportMargin Component
const ViewportMargin = ({
  marginVisible,
  canvasBorderRadius,
  canvasDimensionsInPixels,
  margin,
}: {
  marginVisible: boolean;
  canvasBorderRadius: any;
  canvasDimensionsInPixels: { width: number; height: number };
  margin: number;
}) => {
  if (!marginVisible) return null;

  return (
    <div
      style={{
        ...canvasBorderRadius,
        position: "absolute",
        width: `${canvasDimensionsInPixels.width}px`,
        height: `${canvasDimensionsInPixels.height}px`,
        pointerEvents: "none",
      }}
      className="border-2 border-black border-dashed"
    >
      <div
        style={{
          padding: margin.toString() + "px",
        }}
        className="w-full h-full flex justify-center items-center"
      >
        <div
          style={{
            ...canvasBorderRadius,
          }}
          className="border-2 border-[#D11149] border-dashed w-full h-full relative"
        >
          <div
            className="absolute w-[57px] right-1/2 -top-9 bg-[#D11149] p-2 font-suisseIntl 
          grid place-content-center rounded-t-lg text-white font-light text-[12px]"
          >
            Margin
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Viewport Component
export interface ViewportInstnace {}
export interface ViewportProps {
  isDocument: boolean;
  style: Record<string, any>;
  children?: React.ReactNode;
  onBlur: (e: any) => any;
  originalDimensions: {
    width: number;
    height: number;
  };
  unit: string;
  dpi: number;
}

const Viewport = forwardRef<ViewportInstnace, ViewportProps>((props, ref) => {
  const { dimensions } = useEditor();
  const marginVisible = useStoreStateValue($marginVisible);
  const bleedColor = useStoreStateValue($bleedColor);
  const bleedVisible = useStoreStateValue($bleedVisible);
  const canvasProperties = useStoreStateValue($canvasProperties);
  const margin = useStoreStateValue($marginValueInPixels);
  const unitManager = useStoreStateValue($unitManager);
  const layers = useStoreStateValue($layers);

  const [canvasBorderRadius, setCanvasBorderRadius] =
    useState<CanvasProperties | null>(null);
  const [canvasDimensionsInPixels, setCanvasDimensionsInPixels] = useState<{
    height: number;
    width: number;
  }>({
    width: 0,
    height: 0,
  });
  const viewportRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const dimensionInPixels = unitManager.getCanvasDimensionsInPixels(
      props.originalDimensions.width,
      props.originalDimensions.height,
      props.unit,
      props.dpi,
    );
    setCanvasDimensionsInPixels({
      width: dimensionInPixels.widthInPixels,
      height: dimensionInPixels.heightInPixels,
    });
  }, [props.dpi]);

  useEffect(() => {
    if (canvasProperties) {
      setCanvasBorderRadius(canvasProperties);
    }
  }, [canvasProperties]);

  React.useImperativeHandle(ref, () => ({}), []);

  // Function to render viewports based on props.documentCount
  const renderLabelViewports = () => {
    return (
      <div
        ref={(el) => (viewportRefs.current[0] = el)}
        className={prefix("viewport")}
        {...{ [DATA_SCENA_ELEMENT_ID]: "viewport" }}
        style={{
          ...canvasBorderRadius,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...(bleedVisible && {
            backgroundColor: "white",
            border: `2px dashed ${bleedColor}`,
          }),
          position: "absolute",
        }}
      >
        <ViewportBleedIndicator bleedVisible={bleedVisible} />
        <ViewportDimensions dimensions={dimensions} />
        {/* Conditionally render ScenaLayerWrapper only for the last viewport */}
        <ScenaLayerWrapper layers={layers} />
      </div>
    );
  };

  return (
    <>
      {props.isDocument ? (
        <div
          className={prefix("viewport-container relative")}
          onBlur={props.onBlur}
          style={{
            ...props.style,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {props.children}
          <ScenaLayerWrapper layers={layers} />
        </div>
      ) : (
        <div
          className={prefix("viewport-container relative")}
          onBlur={props.onBlur}
          style={{
            ...props.style,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.children}
          {renderLabelViewports()}
          <ViewportMargin
            marginVisible={marginVisible}
            canvasBorderRadius={canvasBorderRadius}
            canvasDimensionsInPixels={canvasDimensionsInPixels}
            margin={margin}
          />
        </div>
      )}
    </>
  );
});

Viewport.displayName = "Viewport";

export default Viewport;
