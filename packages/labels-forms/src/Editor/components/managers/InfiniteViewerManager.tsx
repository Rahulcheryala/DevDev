import * as React from "react";
import InfiniteViewer from "react-infinite-viewer";
import {
  useStoreStateSetValue,
  useStoreStateValue,
  useStoreValue,
} from "@scena/react-store";
import { $space } from "../../stores/keys";
import {
  $actionManager,
  $horizontalGuides,
  $infiniteViewer,
  $layerManager,
  $moveable,
  $scrollPos,
  $selectedLayers,
  $selecto,
  $verticalGuides,
  $zoom,
} from "../../stores/stores";
import { prefix } from "../../utils/utils";
import { useEffect } from "react";
import { useEditor } from "../../context/EditorContext";
import Guides from "@scena/react-guides";
import { useDPI } from "../../hooks/useDpi";

export type InfiniteViewerManagerProps = {
  children: React.ReactNode;
};
export const InfiniteViewerManager = React.forwardRef<
  InfiniteViewer,
  InfiniteViewerManagerProps
>((props, ref) => {
  const selectoRef = useStoreStateValue($selecto);
  const moveableRef = useStoreStateValue($moveable);
  const horizontalGuidesRef = useStoreValue($horizontalGuides);
  const verticalGuidesRef = useStoreValue($verticalGuides);
  const actionManager = useStoreStateValue($actionManager);
  const layerManager = useStoreStateValue($layerManager);
  const selectedLayersStore = useStoreValue($selectedLayers);
  const infiniteViewerRef = useStoreValue($infiniteViewer);

  const isSpace = useStoreStateValue($space);
  const setZoom = useStoreStateSetValue($zoom);
  const setScrollPos = useStoreStateSetValue($scrollPos);
  const [zoomValues, setZoomValues] = React.useState<any>({
    zoomXVal: 0.5,
    zoomYVal: 0.5,
  });

  const [horizontalGuide, setHorizontalGuide] = React.useState<
    React.MutableRefObject<Guides | null>
  >({ current: null });
  const [verticalGuide, setVerticalGuide] = React.useState<
    React.MutableRefObject<Guides | null>
  >({ current: null });

  const dpi = useDPI();
  const { dimensions, setAutoResizeCanvas } = useEditor();
  // // Initialize and update on scroll/resize

  useEffect(() => {
    if (
      horizontalGuidesRef.value.current != null &&
      verticalGuidesRef.value.current != null
    ) {
      setHorizontalGuide(horizontalGuidesRef.value);
      setVerticalGuide(verticalGuidesRef.value);
    }
  });

  useEffect(() => {
    const containerWidth = infiniteViewerRef.value.current?.getContainerWidth();
    const containerHeight =
      infiniteViewerRef.value.current?.getContainerHeight();

    if (containerWidth && containerHeight) {
      // const canvasWidth = dimensions.unit != "px" ? dimensions.width * dpi : dimensions.width;
      const canvasHeight =
        dimensions.unit != "px" ? dimensions.height * dpi : dimensions.height;

      const zoomY = containerHeight / (canvasHeight + 111.55);

      setAutoResizeCanvas({
        zoomXValue: zoomY,
        zoomYValue: zoomY,
      });
      setZoomValues({
        zoomXVal: zoomY,
        zoomYVal: zoomY,
      });
    }
  }, [infiniteViewerRef.value.current]);

  const horizontalGuides = horizontalGuide.current!;
  const verticalGuides = verticalGuide.current!;
  useEffect(() => {
    //for inches only
    if (horizontalGuides && verticalGuides) {
      horizontalGuides.scroll(-100 / dpi);
      verticalGuides.scroll(-50 / dpi);
    }
  }, [horizontalGuides, verticalGuides]);

  return (
    <InfiniteViewer
      ref={ref}
      className={prefix("viewer", isSpace ? "viewer-move" : "")}
      usePinch={true}
      rangeX={[-100]}
      rangeY={[-50]}
      useAutoZoom={true}
      useWheelScroll={true}
      useMouseDrag={isSpace}
      useResizeObserver={true}
      wheelContainer={".scena-canvas"}
      maxPinchWheel={3}
      onDragStart={(e) => {
        const target = e.inputEvent.target;
        const flatted = layerManager.toFlattenElement(
          selectedLayersStore.value,
        );

        actionManager.act("blur");

        if (
          target.nodeName === "A" ||
          moveableRef.current!.isMoveableElement(target) ||
          moveableRef.current!.isDragging() ||
          flatted.some((t) => t === target || t.contains(target))
        ) {
          e.stop();
        }
      }}
      onDragEnd={(e) => {
        if (!e.isDrag) {
          selectoRef.current!.clickTarget(e.inputEvent);
        }
      }}
      onAbortPinch={(e) => {
        selectoRef.current!.triggerDragStart(e.inputEvent);
      }}
      zoomX={zoomValues.zoomYVal}
      zoomY={zoomValues.zoomYVal}
      onScroll={(e) => {
        //on changing to light mode, the ref is null
        const horizontalGuides = horizontalGuide.current!;
        const verticalGuides = verticalGuide.current!;

        let rulerVal, scrollLeft, scrollTop;
        if (horizontalGuides && verticalGuides) {
          switch (dimensions?.unit) {
            case "cm":
              rulerVal = dpi / 2.54;
              break;
            case "in":
              rulerVal = dpi;
              break;
            case "px":
            default:
              rulerVal = 1;
              break;
          }
          scrollLeft = e.scrollLeft / rulerVal;
          scrollTop = e.scrollTop / rulerVal;
          horizontalGuides.scroll(scrollLeft);
          horizontalGuides.scrollGuides(scrollTop);

          verticalGuides.scroll(scrollTop);
          verticalGuides.scrollGuides(scrollLeft);

          setScrollPos([scrollLeft as number, scrollTop as number]);
          setZoom(e.zoomX * (rulerVal as number));
          setZoomValues({
            zoomXVal: e.zoomX,
            zoomYVal: e.zoomY,
          });
        }
      }}
      onPinch={(e) => {
        let rulerVal;
        if (moveableRef.current!.isDragging()) {
          return;
        }
        switch (dimensions?.unit) {
          case "cm":
            rulerVal = dpi / 2.54;

            break;
          case "in":
            rulerVal = dpi;
            break;
          case "px":
          default:
            rulerVal = 1;
            break;
        }
        setZoom(e.zoom * rulerVal);
      }}
    >
      {props.children}
    </InfiniteViewer>
  );
});

InfiniteViewerManager.displayName = "InfiniteViewerManager";
