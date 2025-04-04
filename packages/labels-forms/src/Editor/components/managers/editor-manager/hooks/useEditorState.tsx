import { useState } from "react";
import {
  useStoreState,
  useStoreStateSetPromise,
  useStoreStateSetValue,
  useStoreStateValue,
  useStoreValue,
} from "@scena/react-store";
import {
  $bleedVisible,
  $layers,
  $marginVisible,
  $selectedLayers,
  $showGuides,
  $bleedValue,
  $marginValue,
  $canvasProperties,
  $zoom,
  $togglePrint,
  $marginValueInPixels,
  $moveable,
  $infiniteViewer,
  $selecto,
  $horizontalGuides,
  $verticalGuides,
} from "../../../../stores/stores";
import { useEditor } from "../../../../context/EditorContext";
import { QuillContext, useLayers } from "../../../../context/LayersContext";
import { useGenerateLayers } from "../../../../hooks/useGenerateLayers";
import React from "react";
import Guides from "@scena/react-guides";
import InfiniteViewer from "react-infinite-viewer";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import { ViewportInstnace } from "../../../editor/Viewport";
import {
  EditorManagerInstance,
  ScenaElementLayer,
  ScenaElementLayerGroup,
} from "../../../../types";
import { useEditorSetup } from "./useEditorSetup";
import { isArrayEquals } from "../../../../utils/utils";
import useUndoRedo from "../../../../hooks/useUndoRedo";

export const useEditorState = (props: any, dpi: number) => {
  const [showGuides, setShowGuides] = useState(useStoreStateValue($showGuides));
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const selectedLayers = useStoreStateValue($selectedLayers);
  const allLayers = useStoreStateValue($layers);
  const marginVisible = useStoreStateValue($marginVisible);
  const bleedVisible = useStoreStateValue($bleedVisible);
  const bleed = useStoreStateValue($bleedValue);
  const margin = useStoreStateValue($marginValue);
  const canvasProperties = useStoreStateValue($canvasProperties);
  const setBleedValue = useStoreStateSetValue($bleedValue);
  const setBleedVisible = useStoreStateSetValue($bleedVisible);
  const setMarginVisible = useStoreStateSetValue($marginVisible);
  const { tableCssProperties } = useLayers();
  const gridDimension = { width: 100000, height: 100000 };
  // fetching functions to generate layers from custom hook
  const { generateLayer } = useGenerateLayers();
  const horizontalGuidesRef = React.createRef<Guides>();
  const verticalGuidesRef = React.createRef<Guides>();
  const infiniteViewerRef = React.useRef<InfiniteViewer>(null);
  const setZoomToStore = useStoreStateSetValue<number>($zoom);
  const moveableRef = React.useRef<Moveable>(null);
  const selectoRef = React.useRef<Selecto>(null);
  const viewportRef = React.useRef<ViewportInstnace>(null);
  const editorElementRef = React.useRef<HTMLDivElement>(null);
  const gridLinesWrapperDiv = React.useRef<HTMLDivElement>(null);
  const { undoStack, setUndoStack, redoStack, currentLabel } = useLayers();
  const { ZoomCanvas, setZoomCanvas, previewThumbnail } = useEditor();
  const [togglePrint, setTogglePrint] = useStoreState($togglePrint);
  const zoomStore = useStoreValue($zoom);
  const selectedLayersStore = useStoreValue($selectedLayers);
  const { setQuillRef, setIsAutoScaleEnabled } = useLayers();
  const allLayersListRef = React.useRef<Array<ScenaElementLayer>>();
  const editorRef = React.useRef<EditorManagerInstance>();
  const quillRef = React.useContext(QuillContext);
  const [marginInPixels, setMarginInPixels] =
    useStoreState($marginValueInPixels);
  const setMarginValue = useStoreStateSetValue($marginValue);
  useStoreValue($moveable, moveableRef);
  useStoreValue($selecto, selectoRef);
  useStoreValue($infiniteViewer, infiniteViewerRef);
  const setLayersPromise = useStoreStateSetPromise($layers);
  const setSelectedLayersPromise = useStoreStateSetPromise($selectedLayers);

  useStoreValue(
    $horizontalGuides,
    horizontalGuidesRef as React.MutableRefObject<Guides | null>,
  );
  useStoreValue(
    $verticalGuides,
    verticalGuidesRef as React.MutableRefObject<Guides | null>,
  );
  const setCanvasBorderRadius = useStoreStateSetValue($canvasProperties);
  const {
    dimensions,
    setDimensions,
    setGlobalLayerManager,
    setGlobalEditorManager,
    selectedTool,
    setSelectedTool,
    setDocumentName,
    onStatusChange,
    status,
    preview,
    togglePreview,
    quillDefaultValues,
    setQuillDefaultValues,
    gridType,
    documentName,
    toggleSnap,
    setToggleSnap,
  } = useEditor();
  const layerStore = useStoreValue($layers);

  const { addToUndo, handleRedo, handleUndo } = useUndoRedo();
  const {
    historyManager,
    actionManager,
    memoryManager,
    layerManager,
    unitManager,
    keyManager,
  } = useEditorSetup(props, editorRef, dpi);
  const changeLayers = React.useCallback(
    (layers: ScenaElementLayer[], groups = layerManager.groups) => {
      layerManager.setLayers(layers, groups);
      layerManager.calculateLayers();
      return setLayersPromise(layers);
    },
    [],
  );
  const setLayers = React.useCallback(
    (
      layers: ScenaElementLayer[],
      groups: ScenaElementLayerGroup[] = layerManager.groups,
    ) => {
      layerManager.setLayers(layers, groups);
      return setLayersPromise(layers).then((complete) => {
        layerManager.calculateLayers();
        return complete;
      });
    },
    [],
  );
  const setSelectedLayers = React.useCallback(
    (nextLayers: Array<ScenaElementLayer | ScenaElementLayerGroup>) => {
      const prevLayers = selectedLayersStore.value;

      if (isArrayEquals(prevLayers, nextLayers)) {
        return Promise.resolve(false);
      }
      return setSelectedLayersPromise(nextLayers).then((complete) => {
        if (!complete) {
          return false;
        }
        layerManager.calculateLayers();

        selectoRef.current!.setSelectedTargets(
          layerManager.toTargetList(nextLayers).flatten(),
        );
        actionManager.act("set.selected.layers");
        return true;
      });
    },
    [],
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  editorRef.current = React.useMemo<EditorManagerInstance>(() => {
    return {
      editorElementRef: editorElementRef,

      historyManager,
      actionManager,
      memoryManager,
      layerManager,
      keyManager,
      moveableRef: moveableRef,
      selectoRef: selectoRef,
      viewportRef: viewportRef,
      // menuRef,
      changeLayers,
      setLayers,
      setSelectedLayers,
      onSave: props.onSave,

      onDashboardClick: props.onDashboardClick,
      onFavoriteClick: props.onFavoriteClick,
      onLabelNameChange: props.onLabelNameChange,
      onDesignerClick: props.onDesignerClick,
      onTemplatesClick: props.onTemplatesClick,
      onElementsClick: props.onElementsClick,
      onBrandingClick: props.onBrandingClick,
      onProjectsClick: props.onProjectsClick,
      onUploadsClick: props.onUploadsClick,
      onDataClick: props.onDataClick,
      onControlsClick: props.onControlsClick,

      getThumbnail: props.getThumbnail,
      onStatusChange: props.onStatusChange,
      quillDefaultValues: props.quillDefaultValues,

      status: props.status,
      isFavourite: props.isFavourite,
      saveStatus: props.saveStatus,

      username: props.username,
      lastUpdated: props.lastUpdated,
      avatarUrl: props.avatarUrl,
      labelComments: props.labelComments,
      companyID: props.companyID,
      labelId: props.labelId,
      isDocument: props.isDocument,
    };
  }, [
    props.saveStatus,
    props.isFavourite,
    props.status,
    props.username,
    props.lastUpdated,
    props.avatarUrl,
    props.labelComments,
    props.companyID,
    props.userDetails,
    props.labelId,
    props.isDocument,
  ]);
  return {
    showGuides,
    setShowGuides,
    showGrid,
    setShowGrid,
    zoomLevel,
    setZoomLevel,
    selectedLayers,
    allLayers,
    marginVisible,
    bleedVisible,
    bleed,
    margin,
    canvasProperties,
    dimensions,
    setDimensions,
    setGlobalLayerManager,
    setGlobalEditorManager,
    selectedTool,
    setSelectedTool,
    setToggleSnap,
    toggleSnap,
    setDocumentName,
    onStatusChange,
    status,
    preview,
    togglePreview,
    quillDefaultValues,
    setQuillDefaultValues,
    gridType,
    documentName,
    setBleedValue,
    setBleedVisible,
    setMarginVisible,
    tableCssProperties,
    generateLayer,
    horizontalGuidesRef,
    verticalGuidesRef,
    infiniteViewerRef,
    setZoomToStore,
    moveableRef,
    selectoRef,
    viewportRef,
    editorElementRef,
    gridLinesWrapperDiv,
    undoStack,
    setUndoStack,
    redoStack,
    currentLabel,
    ZoomCanvas,
    setZoomCanvas,
    togglePrint,
    previewThumbnail,
    setTogglePrint,
    zoomStore,
    selectedLayersStore,
    setQuillRef,
    setIsAutoScaleEnabled,
    allLayersListRef,
    marginInPixels,
    setMarginInPixels,
    setMarginValue,
    setCanvasBorderRadius,
    gridDimension,
    editorRef,
    quillRef,
    historyManager,
    actionManager,
    memoryManager,
    layerManager,
    unitManager,
    keyManager,
    setSelectedLayers,
    changeLayers,
    setLayersPromise,
    setSelectedLayersPromise,
    setLayers,
    addToUndo,
    handleRedo,
    handleUndo,
    layerStore,
  };
};
