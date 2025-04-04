import { atom } from "@scena/react-store";
import { MutableRefObject } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import InfiniteViewer from "react-infinite-viewer";
import Guides from "@scena/react-guides";

import ClipboardManager from "../components/managers/ClipboardManager";
import HistoryManager from "../components/managers/HistoryManager";
import LayerManager from "../components/managers/LayerManager";
import KeyManager from "../components/managers/KeyManager";
import MemoryManager from "../components/managers/MemoryManager";
import ActionManager from "../components/managers/ActionManager";

import { Histories } from "../components/managers/histories/histories";
import { compute } from "@scena/react-store";
import UnitManager from "../components/managers/UnitManager";
import ShapesManager from "../components/managers/shapesManager";
import { dimensionUnits } from "../consts";
import {
  CanvasProperties,
  EditorManagerInstance,
  LabelPosition,
  ScenaElementLayer,
  ScenaElementLayerGroup,
} from "../types";

// Atoms for various state management
export const $showGuides = atom<boolean>(true);
export const $darkMode = atom<boolean>(false);

export const $layerManager = atom<LayerManager | null>(null);
export const $unitManager = atom<UnitManager | null>(null);
export const $shapesManager = atom<ShapesManager | null>(null);

export const $historyManager = atom<HistoryManager<Histories> | null>(null);
export const $clipboardManager = atom<ClipboardManager | null>(null);
export const $keyManager = atom<KeyManager | null>(null);
export const $memoryManager = atom<MemoryManager | null>(null);
export const $actionManager = atom<ActionManager | null>(null);

export const $horizontalGuidelines = atom<number[]>([]);
export const $verticalGuidelines = atom<number[]>([]);
export const $selectedLayers = atom<
  Array<ScenaElementLayer | ScenaElementLayerGroup>
>([]);
export const $selectedFlattenLayers = compute(({ get }) => {
  const layerManager = get($layerManager)!;
  const selectedLayers = get($selectedLayers)!;

  return layerManager.toFlatten(selectedLayers);
});
export const $layers = atom<ScenaElementLayer[]>([]);
export const $scrollPos = atom<number[]>([0, 0]);
export const $zoom = atom<number>(1);
export const $groupOrigin = atom<string>("50% 50%");
export const $selectedTool = atom<string>("pointer");
export const $pointer = atom<string>("move");
export const $rect = atom<string>("rect");

export const $editor = atom<MutableRefObject<
  EditorManagerInstance | undefined
> | null>(null);
export const $selecto = atom<MutableRefObject<Selecto | null> | null>(null);
export const $moveable = atom<MutableRefObject<Moveable | null> | null>(null);
export const $infiniteViewer =
  atom<MutableRefObject<InfiniteViewer | null> | null>(null);
export const $horizontalGuides = atom<MutableRefObject<Guides | null> | null>(
  null,
);
export const $verticalGuides = atom<MutableRefObject<Guides | null> | null>(
  null,
);

// Read initial value from unit manager or set default
const savedMeasurementUnit =
  $unitManager.defaultValue?.unit || dimensionUnits.IN;
export const $measurementUnit = atom<string>(savedMeasurementUnit);

// anchor state value store
export const $anchorValue = atom<boolean>(false);

export const $marginValue = atom<number>(0);
export const $bleedValue = atom<number>(0);

export const $marginValueInPixels = atom<number>(0);
export const $bleedValueInPixels = atom<number>(0);

export const $marginVisible = atom<boolean>(false);
export const $bleedVisible = atom<boolean>(false);

export const $marginColor = atom<string>("red");
export const $bleedColor = atom<string>("#0E77D3");

export const $canvasProperties = atom<CanvasProperties>({
  borderTopLeftRadius: "0px",
  borderTopRightRadius: "0px",
  borderBottomRightRadius: "0px",
  borderBottomLeftRadius: "0px",
});

// variables for print label
export const $togglePrint = atom<boolean>(false);
export const $toggleFullScreen = atom<boolean>(false);

// used to store page ref for printing
export const $printPageRef = atom<React.RefObject<HTMLDivElement> | null>(null);

export const $isLabelSheetSelected = atom<boolean>(true);
export const $isLabelRollSelected = atom<boolean>(false);
export const $selectedLabels = atom<Array<HTMLImageElement>>([]);
export const $labelPosition = atom<LabelPosition | null>({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

// comments stores

export const $ExpandComments = atom<boolean>(false);
export const $ChangeCommentView = atom<boolean>(false);
export const $ExpandInputLayout = atom<boolean>(false);
export const $EmojiPicker = atom<boolean>(false);

export const $documentCount = atom<number>(1);
export const $itemHeight = atom<number>(0);
export const $documentNumber = atom<number>(1);
export const $selectedPageId = atom<string | null>("Page-1");

export const $tableSkin = atom<{ [key: string]: string }>({});
