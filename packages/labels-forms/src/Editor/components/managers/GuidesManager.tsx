import * as React from "react";
import {
  useStoreState,
  useStoreStateSetValue,
  useStoreStateValue,
  useStoreValue,
} from "@scena/react-store";
import {
  $darkMode,
  $horizontalGuidelines,
  $horizontalGuides,
  $scrollPos,
  $verticalGuidelines,
  $verticalGuides,
  $zoom,
} from "../../stores/stores";
import { throttle } from "@daybrush/utils";
import { useEditor } from "../../context/EditorContext";
import { useDPI } from "../../hooks/useDpi";
import Guides from "@scena/react-guides";
import { dimensionUnits } from "../../consts";

function dragPosFormat(value: number) {
  return `${value}px`;
}

export type GuidesManagerProps = {
  type: "horizontal" | "vertical";
};

export const GuidesManager = React.forwardRef<Guides, GuidesManagerProps>(
  (props, ref) => {
    const type = props.type;
    const isHorizontal = type === "horizontal";

    const setHorizontalGuidesRef = useStoreStateSetValue($horizontalGuides);
    const setVerticalGuidesRef = useStoreStateSetValue($verticalGuides);

    const [guidelines, setGuidelines] = useStoreState(
      isHorizontal ? $horizontalGuidelines : $verticalGuidelines,
    );
    const setZoom = useStoreStateSetValue($zoom);

    const { dimensions, autoResizeCanvas } = useEditor();
    const dpi = useDPI();

    // const measurementUnit = useStoreStateValue($measurementUnit); // Get measurement unit from store
    const zoom = useStoreStateValue($zoom); // Get zoom from store
    //will be using later with unit switch toggle
    // Effect to set zoom based on measurement unit and DPI
    // React.useEffect(() => {
    //     let newZoom = 1;
    //     switch (measurementUnit) {
    //         case 'cm':
    //             newZoom = dpi / 2.54;
    //             break;
    //         case 'mm':
    //             newZoom = dpi / 25.4;
    //             break;
    //         case 'in':
    //             newZoom = dpi;
    //             break;
    //         case 'px':
    //             newZoom = 10;
    //             break;
    //         default:
    //             newZoom = 1;
    //             break;
    //     }
    //     setZoom(newZoom);
    React.useEffect(() => {
      switch (dimensions?.unit) {
        case "cm":
          setZoom(dpi / 2.54);
          break;
        case "in":
          setZoom(autoResizeCanvas.zoomYValue * dpi);
          break;
        case "px":
        default:
          setZoom(1);
          break;
      }
    }, [dimensions, dpi]);

    const darkMode = useStoreStateValue($darkMode);

    // const result = useAction("get.rect");
    // const rect = result?.rect as RectInfo;
    let unit = 50;

    if (zoom < 0.8) {
      unit = Math.floor(1 / zoom) * 50;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // let selectedRanges!: number[][];

    // if (rect && rect.width && rect.height) {
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     const selectedRanges = [
    //         isHorizontal
    //             ? [rect.left, rect.left + rect.width]
    //             : [rect.top, rect.top + rect.height],
    //     ];
    // } else {x
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     selectedRanges = [isHorizontal ? [0, 600] : [0, 800]];
    // }

    const scrollPos = useStoreValue($scrollPos).value;
    let defaultScrollPos = 0;
    let defaultGuidesPos = 0;

    if (isHorizontal) {
      [defaultScrollPos, defaultGuidesPos] = scrollPos;
    } else {
      [defaultGuidesPos, defaultScrollPos] = scrollPos;
    }

    // Conversion based on units
    switch (dimensions?.unit) {
      case dimensionUnits.CM:
        unit = 1; // every 1cm
        break;
      case dimensionUnits.IN:
        unit = 1; // every 1in
        break;
      case dimensionUnits.PX:
      default:
        unit = 50; // every 50px
        break;
    }

    if (Object.prototype.hasOwnProperty.call(ref, "current")) {
      if ((ref as React.MutableRefObject<Guides | null>).current != null) {
        if (type === "horizontal") {
          setHorizontalGuidesRef(ref as React.MutableRefObject<Guides>);
        } else {
          setVerticalGuidesRef(ref as React.MutableRefObject<Guides>);
        }
      }
    }
    return (
      <Guides
        ref={ref}
        type={type}
        snapThreshold={5}
        snaps={[0, ...guidelines]}
        displayDragPos={true}
        textFormat={(v) => `${throttle(v, 0.1)}`}
        dragPosFormat={dragPosFormat}
        zoom={zoom}
        unit={unit}
        textColor={darkMode ? "#fff" : "#555"}
        backgroundColor={darkMode ? "#333" : "#eee"}
        lineColor={darkMode ? "#777" : "#ccc"}
        selectedBackgroundColor={"#55bbff33"}
        useResizeObserver={true}
        defaultGuidesPos={defaultGuidesPos}
        defaultScrollPos={defaultScrollPos}
        defaultGuides={guidelines}
        onChangeGuides={React.useCallback((e) => {
          setGuidelines(e.guides);
        }, [])}
      />
    );
  },
);

GuidesManager.displayName = "GuidesManager";
