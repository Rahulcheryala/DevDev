import React from "react";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  CanvasProperties,
  CommentBox,
  CreateCommentCard,
  DefaultQuillObject,
  Dimensions,
  EditorManagerInstance,
  HandleLayerSelectionParams,
  LabelData,
  SavedLayerJson,
  ScenaElementLayer,
  ShortcutsParams,
  TextType,
} from "../../../../types";
import {
  clearGuides,
  groupLayers,
  selectAll,
  toggleGrid,
  togglePrintPreview,
  toggleStudioControl,
  ungroupLayers,
  unselectLayers,
} from "../../../../utils";
import {
  keyboardShortcuts,
  predefinedZoomLevels,
  rightSidebar,
  toolBarItems,
  toolbarItemMap,
} from "../../../../consts";

import { identifyLayer } from "../../../../utils/shared/LayerUtils";
import TextDrawer from "../../../drawers/text-drawer";
import ShapesDrawer from "../../../drawers/shapes-drawer";
import TableDrawer from "../../../drawers/table-drawer";
import BarcodeDrawer from "../../../drawers/barcode-drawer";
import ElementsDrawer from "../../../drawers/ElementsDrawer";
import StudioControls from "../../../drawers/studio-drawer";
import CommentsDrawer from "../../../drawers/comments";
import Export from "../../../drawers/Export";
import QRDrawer from "../../../drawers/qr-drawer";
import { handleZoomIn, handleZoomOut } from "./zoom";
import LineDrawer from "../../../drawers/line-drawer";

export const getShortcuts = ({
  setShowGrid,
  setLayers,
  horizontalGuidesRef,
  verticalGuidesRef,
  zoomLevel,
  setZoomLevel,
  toggleRuler, // New dependency

  layerManager,
  actionManager,
  selectedTool,
  setSelectedTool,
  setToggleSnap,
  toggleSnap,
  allLayers,
  editorRef,
  selectedLayersStore,
  handleUndo,
  handleRedo,
}: ShortcutsParams) => {
  return [
    {
      callback: () => toggleGrid(setShowGrid),
      keys: keyboardShortcuts.TOGGLE_GRID,
    },
    {
      callback: () => setToggleSnap(!toggleSnap),
      keys: keyboardShortcuts.TOGGLE_SNAP,
    },
    {
      callback: () => setSelectedTool("export"),
      keys: keyboardShortcuts.EXPORT,
    },
    {
      callback: () =>
        groupLayers({
          selectedLayersStore,
          layerManager,
          setLayers,
        }),
      keys: keyboardShortcuts.GROUP_LAYERS,
    },
    {
      callback: () =>
        ungroupLayers({
          selectedLayersStore,
          layerManager,
          setLayers,
        }),
      keys: keyboardShortcuts.UNGROUP_LAYERS,
    },
    {
      callback: () => togglePrintPreview({ actionManager, allLayers }),
      keys: keyboardShortcuts.TOGGLE_PRINT,
    },
    {
      callback: () => toggleStudioControl({ selectedTool, setSelectedTool }),
      keys: keyboardShortcuts.STUDIO_CONTROL,
    },
    {
      callback: () => unselectLayers(editorRef),
      keys: keyboardShortcuts.ESCAPE,
    },
    {
      callback: () => selectAll({ editorRef, allLayers }),
      keys: keyboardShortcuts.SELECT_ALL,
    },
    {
      callback: () => clearGuides({ horizontalGuidesRef, verticalGuidesRef }),
      keys: keyboardShortcuts.CLEAR_GUIDES,
    },
    { callback: handleUndo, keys: keyboardShortcuts.UNDO },
    { callback: handleRedo, keys: keyboardShortcuts.REDO },
    {
      callback: (event: KeyboardEvent) => {
        event.preventDefault();
        handleZoomIn(predefinedZoomLevels, zoomLevel, setZoomLevel);
      },
      keys: keyboardShortcuts.ZOOMIN,
    },
    {
      callback: (event: KeyboardEvent) => {
        event.preventDefault();
        handleZoomOut(predefinedZoomLevels, zoomLevel, setZoomLevel);
      },
      keys: keyboardShortcuts.ZOOMOUT,
    },
    {
      callback: (event: KeyboardEvent) => {
        event.preventDefault(); // Prevent default browser behavior
        if (event.shiftKey && event.key.toLowerCase() === "r") {
          event.preventDefault(); // Prevent default browser behavior
          toggleRuler();
        }
      },
      keys: keyboardShortcuts.TOGGLE_RULER, // New shortcut for toggling ruler
    },
  ];
};

export const handleEditorCommentsClick = (
  setCommentBoxPosition: (position: { x: number; y: number }) => void,
  commentBoxes: CommentBox[],
  setCommentBoxes: React.Dispatch<React.SetStateAction<CommentBox[]>>,
  userDetails: { id: string },
  labelId: string,
  labelComments: {
    createCommentCard: (card: CreateCommentCard) => Promise<void>;
  },
) => {
  return useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if ((event.target as HTMLElement).closest(".comment-box")) {
        return;
      }
      const container = event.currentTarget;
      const containerRect = container.getBoundingClientRect();
      const position = {
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top,
      };

      setCommentBoxPosition(position);

      const existingUnsubmittedBox = commentBoxes.find(
        (box) => !box.isSubmitted,
      );

      if (!existingUnsubmittedBox) {
        const optimisticCard: CreateCommentCard = {
          id: uuidv4(),
          createdOn: new Date().toISOString(),
          createdBy: userDetails.id,
          labelId,
          pinLocation: position,
          isSubmitted: false,
        };

        // Optimistically update the UI
        setCommentBoxes((prevBoxes) => [...prevBoxes, optimisticCard]);

        try {
          await labelComments.createCommentCard(optimisticCard);

          // Update the optimistic card with the data from the server
          setCommentBoxes((prevBoxes) =>
            prevBoxes.map((box) =>
              box.id === optimisticCard.id
                ? { ...optimisticCard, isSubmitted: true }
                : box,
            ),
          );
        } catch (error) {
          console.error("Error creating comment card:", error);
          // Only remove the optimistic card if there's an error
          setCommentBoxes((prevBoxes) =>
            prevBoxes.filter((box) => box.id !== optimisticCard.id),
          );
        }
      }
    },
    [
      commentBoxes,
      setCommentBoxPosition,
      setCommentBoxes,
      userDetails.id,
      labelId,
      labelComments,
    ],
  );
};

export function handleLayerSelection({
  selectedLayersStore,
  selectedLayers,
  setSelectedTool,
  setIsAutoScaleEnabled,
}: HandleLayerSelectionParams) {
  try {
    // Check if there are selected layers
    if (!selectedLayersStore?.value?.length) return;

    const selectedLayer: any[] = selectedLayersStore.value;
    const layerType = identifyLayer(selectedLayer);

    const isStandaloneText = (selectedLayers[0] as ScenaElementLayer)?.metaData
      ?.isStandaloneText;
    const isBarcodeText = (selectedLayers[0] as ScenaElementLayer)?.metaData
      ?.isBarcodeText;

    // Handle standalone and barcode text cases
    if (!isStandaloneText && isBarcodeText) {
      setSelectedTool("");
      setIsAutoScaleEnabled(true);
      return;
    }

    // Set the selected tool based on the layer type
    const selectedTool = toolbarItemMap[layerType];
    if (selectedTool) {
      setSelectedTool(selectedTool);
    }
  } catch (error) {
    console.error(error);
  }
}

export const renderDrawer = (
  selectedTool: string,
  onTextFormattingUpdate: (
    name: string,
    value: number | boolean | string,
  ) => void,
  textFormatting: TextType,
  quillDefaultValues: DefaultQuillObject,
  labelComments: any,
  userDetails: any,
  labelId: string,
) => {
  // Define a mapping of selectedTool to components
  const drawerMap: Record<string, JSX.Element | null> = {
    [toolBarItems.TEXT]: (
      <TextDrawer
        setTextFormatting={onTextFormattingUpdate}
        textFormatting={textFormatting}
        fontList={quillDefaultValues?.textFontStyles || []}
      />
    ),
    [toolBarItems.SHAPE]: <ShapesDrawer />,
    [toolBarItems.TABLE]: <TableDrawer />,
    [toolBarItems.BARCODE]: <BarcodeDrawer />,
    [toolBarItems.QRCODE]: <QRDrawer />,
    [rightSidebar.ELEMENTS]: <ElementsDrawer />,
    [toolBarItems.STUDIO]: <StudioControls />,
    [toolBarItems.COMMENTS]: (
      <CommentsDrawer
        labelComments={labelComments}
        user={userDetails}
        labelId={labelId}
      />
    ),
    [toolBarItems.EXPORT]: <Export />,
    [toolBarItems.LINE]: <LineDrawer />,
  };

  // Return the component based on selectedTool
  return drawerMap[selectedTool] || null;
};

export const loadLabelFromDatabase = async (
  labelDataString: string,
  setDimensions: (value: React.SetStateAction<Dimensions>) => void,
  setBleedAndMarginProperties: (
    bleedVisible: boolean,
    marginVisible: boolean,
    bleed?: number,
    margin?: number,
    canvasBorderRadius?: CanvasProperties,
  ) => void,
  generateLayer: (layer: SavedLayerJson) => ScenaElementLayer | null,
  editorRef: React.MutableRefObject<EditorManagerInstance | undefined>,
) => {
  // const labelData: any = labelDataString;
  const labelData: LabelData = JSON.parse(labelDataString);

  if (labelData) {
    // setting the dimension from saved label
    setDimensions({
      width: Number(labelData.canvasDetails.width),
      height: Number(labelData.canvasDetails.height),
      unit: labelData.canvasDetails.unit,
    });
    // setting the bleed and margin values from saved label if present
    setBleedAndMarginProperties(
      labelData.canvasDetails.bleedVisible,
      labelData.canvasDetails.marginVisible,
      labelData.canvasDetails.bleed,
      labelData.canvasDetails.margin,
      labelData.canvasDetails.canvasBorderRadius,
    );

    const layersArray = labelData?.layers
      ?.map((layer) => generateLayer(layer))
      .filter((layer) => layer !== null);

    if (layersArray?.length) {
      await editorRef.current!.setLayers([
        ...layersArray,
      ] as ScenaElementLayer[]);
    }
  }
};

export const getCursorStyle = (selectedTool: string) => {
  switch (selectedTool) {
    case toolBarItems.COMMENTS:
      return `url("data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
  <path d="M17.833 9.6662C17.8305 11.9199 16.9341 14.0806 15.3405 15.6743C13.7469 17.2679 11.5862 18.1643 9.33246 18.1667H1.77301C1.5237 18.1667 1.28461 18.0677 1.10833 17.8914C0.932043 17.7151 0.833008 17.4761 0.833008 17.2267V9.66675C0.833008 7.41241 1.72854 5.2504 3.3226 3.65634C4.91666 2.06228 7.07867 1.16675 9.33301 1.16675C11.5873 1.16675 13.7494 2.06228 15.3434 3.65634C16.9373 5.25027 17.8329 7.41206 17.833 9.6662Z" fill="#141527" stroke="white"/>
</svg>`,
      )}"), auto`;
    default:
      return "default";
  }
};
