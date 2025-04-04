import * as React from "react";
import {
  useStoreState,
  useStoreStateSetValue,
  useStoreStateValue,
} from "@scena/react-store";
import {
  $editor,
  $layerManager,
  $layers,
  $anchorValue,
  $bleedValue,
  $marginValue,
  $canvasProperties,
  $bleedVisible,
  $marginVisible,
  $togglePrint,
  $actionManager,
  $documentCount,
  $itemHeight,
} from "../../stores/stores";
import {
  capitalizeFirstLetter,
  convertHtmlToImage,
  prefix,
} from "../../utils/utils";
import "../../assets/styles/toolbar.css";
import { Dimensions, ScenaElementLayer } from "../../types";
import { useLayers } from "../../context/LayersContext";
import { useEditor } from "../../context/EditorContext";
import { createTextLayer } from "../../utils/shared/LayerUtils";
import { useEffect, useState } from "react";
import saved_cloud from "../../assets/icons/shared/saved_cloud.svg";
import chat from "../../assets/icons/menu/chat.svg";
import share from "../../assets/icons/menu/share.svg";
import print from "../../assets/icons/menu/print.svg";
import play from "../../assets/icons/menu/play.svg";
import upload_cloud from "../../assets/icons/shared/upload_cloud.svg";
import upload_failed_cloud from "../../assets/icons/shared/upload_failed_cloud.svg";
import offline_cloud from "../../assets/icons/shared/offline_cloud.svg";
import AddTable from "../drawers/table-drawer/AddTable";
import {
  gridTypeEnum,
  dimensionUnits,
  toolBarItems,
  toolbarIcons,
  undoActionType,
} from "../../consts";

import useUndoRedo from "../../hooks/useUndoRedo";
import { getMenuSections, handleSaveLabel } from "./utils/toolbar-utils";
import ReactQuill from "react-quill";
import {
  Status,
  StatusKey,
  ToolBarElement,
  menuName,
  statusArrow,
  statusClassMap,
  statusKeyMap,
} from "../../consts/toolbar";
import FileMenu from "./components/Menu/FileMenu";
import {
  ZoomTool,
  ZoomControls,
  UnitSelector,
  MenuBarSection,
  GridToggleSection,
  DocumentStatus,
  DocumentActionsPanel,
  DocumentInfoPanel,
  MenuDropdown,
} from "./components";

type ZoomToolProps = {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomChange: (newZoom: number) => void;
};
type IEventProps = {
  allLayers: ScenaElementLayer[];
  undoStack: { [key: string]: any }[];
  setUndoStack: React.Dispatch<React.SetStateAction<{ [key: string]: any }[]>>;
  dimensions: Dimensions;
  [key: string]: any; // Index signature to allow any additional properties
};

const ToolBar: React.FC<ZoomToolProps> = ({
  onZoomChange,
  onZoomIn,
  zoomLevel,
  onZoomOut,
}) => {
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [inputWidth, setInputWidth] = useState<string>("w-20");
  const [isTableSelection, setIsTableSelection] = useState(false);
  const editorRef = useStoreStateValue($editor);
  const allLayers = useStoreStateValue($layers);
  const layerManager = useStoreStateValue($layerManager);
  const togglePrint = useStoreStateValue($togglePrint);
  const setTogglePrint = useStoreStateSetValue($togglePrint);
  const itemHeight = useStoreStateValue($itemHeight);

  const canvasProperties = useStoreStateValue($canvasProperties);
  const {
    dimensions,
    onStatusChange,
    setPreviewThumbnail,
    setSelectedTool,
    setDocumentName,
    documentName,
    selectedTool,
    togglePreview,
    quillDefaultValues,
    setGridType,
    gridType,
  } = useEditor();
  const [status, setStatus] = useState<string>("");

  const [triggerDropdown, setTriggerDropdown] = useState<boolean>(false);
  const [favourite, setFavourite] = useState<boolean>(false);
  const { tableCssProperties } = useLayers();
  const { setTriggerDocument, triggerDocument } = useEditor();
  const [savedStatus, setSavedStatus] = useState("");
  const [unit, setUnit] = useState("");
  const bleed = useStoreStateValue($bleedValue);
  const margin = useStoreStateValue($marginValue);
  const bleedVisible = useStoreStateValue($bleedVisible);
  const marginVisible = useStoreStateValue($marginVisible);
  const actionManager = useStoreStateValue($actionManager);
  const documentCount = useStoreStateValue($documentCount);

  const { addToUndo, handleRedo, handleUndo } = useUndoRedo();
  const { undoStack, redoStack, setUndoStack } = useLayers();

  // Update handleSaveLabelCallback type to match the expected structure
  const handleSaveLabelCallback = React.useCallback(
    async (
      allLayers: ScenaElementLayer[] = [],
      dimensions: Dimensions,
      undoStack?: Array<{ [key: string]: any }>,
      setUndoStack?: React.Dispatch<
        React.SetStateAction<{ [key: string]: any }[]>
      >,
      isUndoTriggered?: boolean,
    ) => {
      await handleSaveLabel(
        allLayers,
        dimensions,
        undoStack,
        setUndoStack,
        quillDefaultValues,
        canvasProperties,
        editorRef,
        documentName,
        tableCssProperties,
        bleed,
        margin,
        bleedVisible,
        marginVisible,
        isUndoTriggered,
        setTriggerDropdown,
      );
    },
    [
      allLayers,
      dimensions,
      quillDefaultValues,
      canvasProperties,
      documentCount,
    ],
  );

  // Calling the function to save json on undo
  useEffect(() => {
    const onUpdate = (e: IEventProps) => {
      const {
        allLayers,
        undoStack,
        setUndoStack,
        dimensions,
        operation,
        addedLayer,
      } = e;

      // For adding the newly spawned layer in the allLayers
      if (operation == undoActionType.ADD && addedLayer) {
        allLayers.push(addedLayer);
      }
      handleSaveLabelCallback(
        allLayers,
        dimensions,
        undoStack,
        setUndoStack,
        true,
      );
    };
    actionManager.on("addToUndo", onUpdate);

    return () => {
      actionManager.off("addToUndo", onUpdate);
    };
  }, []);

  useEffect(() => {
    if (selectedTool) {
      // Directly map selectedTool to its icon. Ensure selectedTool is in the correct case.
      const icon = toolbarIcons[selectedTool.toUpperCase()];

      setSelectedIcon(icon || "");
    } else {
      setSelectedIcon("");
    }
  }, [selectedTool]);

  useEffect(() => {
    // Adjust width based on the length of the input
    const newWidth = Math.max(20, documentName.length * 10); // Calculate width in pixels
    setInputWidth(`${newWidth}px`); // Update width class dynamically

    const isFavourite = editorRef.current?.isFavourite;
    isFavourite ? setFavourite(isFavourite) : setFavourite(false);

    const status = editorRef.current?.status;
    status ? setStatus(status) : setStatus("Draft");
  }, [documentName]);

  useEffect(() => {
    if (dimensions) {
      const unit = capitalizeFirstLetter(dimensions.unit);

      setUnit(unit);
    }
  }, [dimensions]);

  useEffect(() => {
    const saveStatus = editorRef.current?.saveStatus;
    if (saveStatus) {
      setSavedStatus(saveStatus);
    }
  }, [editorRef.current?.saveStatus]);

  const addNewTextBox = async () => {
    const newQuillRef = React.createRef<ReactQuill>();

    setSelectedIcon(toolbarIcons.TEXT);
    const layerDetail = createTextLayer({
      layerId: Date.now().toString(),
      ref: newQuillRef,
      isBarcodeText: false,
      textHTML: "",
      useBarcodeData: false,
      translateY: itemHeight,
    });

    await editorRef.current!.setLayers([...layerManager.layers, layerDetail]);
    await editorRef.current!.setSelectedLayers([layerDetail]);
    addToUndo({ operation: undoActionType.ADD, addedLayer: layerDetail });
  };
  const handleToolSelect = (value: string) => {
    setSelectedIcon(toolbarIcons[value]);
    setSelectedTool(value);
  };

  const handleLabelValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const labelName = e.target.value;
    setDocumentName(labelName);
  };

  const handleFavourite = () => {
    setFavourite((prev) => !prev);
    editorRef.current?.onFavoriteClick(!favourite);
  };

  const getStatusKey = (status: Status): StatusKey => {
    return statusKeyMap[status] || StatusKey.DEFAULT;
  };

  const statusKey = getStatusKey(status as Status);
  const statusClasses = statusClassMap[statusKey];
  const statusDropdownClass = statusArrow[statusKey];

  const handlestatus = (value: string) => {
    editorRef.current?.onStatusChange(value);
    setStatus(value);
    onStatusChange(value);
  };
  const handleDownload = async () => {
    setSelectedTool(toolBarItems.EXPORT);
    setTriggerDropdown(false);
  };

  const handleSaveAndConvert = async () => {
    handleSaveLabelCallback(allLayers, dimensions);
    const thumbnail = await convertHtmlToImage("scena-viewport");
    return thumbnail;
  };

  const handlePreview = async () => {
    const thumbnail = await handleSaveAndConvert();
    if (thumbnail) {
      togglePreview(true);
      setPreviewThumbnail(thumbnail);
    }
  };

  const handlePrintLabel = async () => {
    const thumbnail = await handleSaveAndConvert();
    if (thumbnail) {
      setPreviewThumbnail(thumbnail);
      setTogglePrint(!togglePrint);
    }
  };

  const handleGridClick = (type: gridTypeEnum) => {
    setGridType(type);
  };
  const [anchorValue, setAnchorValue] = useStoreState($anchorValue);

  const handleAnchorClick = () => {
    setAnchorValue(!anchorValue);
  };

  //comments function
  const handleCommentClick = async () => {
    setSelectedIcon(toolbarIcons.COMMENTS);
    handleToolSelect(toolBarItems.COMMENTS);
  };

  const menuSections = getMenuSections({
    handleUndo,
    handleRedo,
    undoStack,
    redoStack,
    addNewTextBox,
    selectedIcon,
    toolbarIcons,
    handleToolSelect,
    toolBarItems,
    setSelectedIcon,
    triggerDocument,
    setTriggerDocument,
    setIsTableSelection,
    handleAnchorClick,
    anchorValue,
  });

  return (
    <div className="z-10">
      <ToolBarElement className={prefix("menu")}>
        <div className="flex flex-col w-full">
          <div
            className="w-full h-[64px] border-b border-[#f2f2f4] flex flex-row 
        justify-between items-center pl-[16px] pr-[24px]"
          >
            <div className="flex flex-row justify-evenly items-center">
              {/* <div className="cursor-pointer">File</div> */}
              <MenuDropdown
                menuName={menuName.FILE}
                menuRender={
                  <FileMenu
                    handleSaveLabel={handleSaveLabelCallback}
                    allLayers={allLayers}
                    dimensions={dimensions}
                    undoStack={undoStack}
                    setUndoStack={setUndoStack}
                    isUndoTriggered={false}
                    handleDownload={handleDownload}
                  />
                }
                triggerDropdown={triggerDropdown}
                setTriggerDropdown={setTriggerDropdown}
              />

              {/* Saved cloud */}
              <DocumentStatus
                savedStatus={savedStatus}
                savedCloudIcon={saved_cloud}
                uploadCloudIcon={upload_cloud}
                uploadFailedCloudIcon={upload_failed_cloud}
                offlineCloudIcon={offline_cloud}
              />
            </div>

            {/* Middle section */}
            <DocumentInfoPanel
              favourite={favourite}
              handleFavourite={handleFavourite}
              documentName={documentName}
              setDocumentName={setDocumentName}
              handleLabelValue={handleLabelValue}
              inputWidth={inputWidth}
              status={status}
              statusClasses={statusClasses}
              statusDropdownClass={statusDropdownClass}
              handlestatus={handlestatus}
              ref={editorRef}
            />

            <DocumentActionsPanel
              handleCommentClick={handleCommentClick}
              handlePrintLabel={handlePrintLabel}
              handlePreview={handlePreview}
              chatIcon={chat}
              shareIcon={share}
              printIcon={print}
              playIcon={play}
            />
          </div>

          <div className=" px-[12px] h-[56px] bg-[#ffffff] w-full">
            <div className="flex">
              <div className="w-[calc(100%_-_416px)] py-[10px]">
                <div className="flex items-center mx-[-5px] ">
                  {menuSections.map((section, index) => (
                    <MenuBarSection key={index} buttons={section.buttons} />
                  ))}
                  {isTableSelection && (
                    <AddTable onClose={setIsTableSelection} />
                  )}

                  {/* Toggle grid */}
                  <GridToggleSection
                    gridType={gridType}
                    handleGridClick={handleGridClick}
                  />

                  <div>
                    <ul className="flex items-center mx-[-10px]">
                      {/* Unit Selector */}
                      <UnitSelector
                        unit={unit}
                        dimensionUnits={dimensionUnits}
                      />

                      {/* Zoom Controls */}
                      <ZoomControls onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
                    </ul>
                  </div>
                  <div
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #E4E7EC",
                      margin: "0 0 0 10px",
                      width: "130px",
                    }}
                  >
                    <ZoomTool
                      zoomLevel={zoomLevel}
                      onZoomIn={onZoomIn}
                      onZoomOut={onZoomOut}
                      onZoomChange={onZoomChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ToolBarElement>
    </div>
  );
};

export default ToolBar;
