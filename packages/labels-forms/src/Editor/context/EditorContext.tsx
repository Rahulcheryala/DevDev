import * as React from "react";
import { StoreValue, useStoreValue } from "@scena/react-store";
import { useState, useContext } from "react";
import { textFontSizes, textFontStyles } from "../utils/config";
import { $layers, $selectedLayers } from "../stores/stores";
import { gridTypeEnum } from "../consts";
import {
  Dimensions,
  EditorManagerInstance,
  QuillDefaults,
  ScenaElementLayer,
} from "../types";
import LayerManager from "../components/managers/LayerManager";

// Define the auto resize canvas interface
type AutoResizeCanvas = {
  zoomXValue: number;
  zoomYValue: number;
};

// Create the context with an initial undefined value for the setSelectedLayer function
export const EditorContext = React.createContext<
  | {
      //canvas dimensions
      dimensions: Dimensions;
      setDimensions: React.Dispatch<React.SetStateAction<Dimensions>>;

      layerStore: StoreValue<ScenaElementLayer[]>;
      selectedLayersStore: any;
      setGlobalLayerManager: React.Dispatch<
        React.SetStateAction<LayerManager | undefined>
      >;
      globalLayerManager: LayerManager | undefined;

      setGlobalEditorManager: React.Dispatch<
        React.SetStateAction<EditorManagerInstance | undefined>
      >;
      globalEditorManager: EditorManagerInstance | undefined;

      selectedTool: string;
      setSelectedTool: React.Dispatch<React.SetStateAction<string>>;

      documentName: string;
      setDocumentName: React.Dispatch<React.SetStateAction<string>>;

      status: string;
      onStatusChange: React.Dispatch<React.SetStateAction<string>>;

      //To trigger between document and label (for testing purpose as of now)
      triggerDocument: boolean;
      setTriggerDocument: React.Dispatch<React.SetStateAction<boolean>>;

      //To toggle preview of label
      preview: boolean;
      togglePreview: React.Dispatch<React.SetStateAction<boolean>>;

      previewThumbnail: string;
      setPreviewThumbnail: React.Dispatch<React.SetStateAction<string>>;

      // To set the default Quill values (Font size, font style etc
      // in the save label json )
      quillDefaultValues: QuillDefaults;
      setQuillDefaultValues: React.Dispatch<
        React.SetStateAction<QuillDefaults>
      >;

      gridType: gridTypeEnum;
      setGridType: React.Dispatch<React.SetStateAction<gridTypeEnum>>;
      toggleGridType: () => void;

      autoResizeCanvas: AutoResizeCanvas;
      setAutoResizeCanvas: React.Dispatch<
        React.SetStateAction<AutoResizeCanvas>
      >;

      toggleSnap: boolean;
      setToggleSnap: React.Dispatch<React.SetStateAction<boolean>>;
      setZoomCanvas: React.Dispatch<React.SetStateAction<number>>;
      ZoomCanvas: number;
    }
  | undefined
>(undefined);

// Provider component for setSelectedLayer
export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    unit: "px",
  });
  const [quillDefaultValues, setQuillDefaultValues] = useState<QuillDefaults>({
    textFontSizes: [...textFontSizes],
    textFontStyles: [...textFontStyles],
    isListStyle: false,
  });
  const [globalLayerManager, setGlobalLayerManager] = useState<any>(null);
  const [globalEditorManager, setGlobalEditorManager] = useState<
    EditorManagerInstance | undefined
  >(undefined);

  const layerStore = useStoreValue($layers);
  const selectedLayersStore = useStoreValue($selectedLayers);
  const [selectedTool, setSelectedTool] = useState<string>("");
  const [previewThumbnail, setPreviewThumbnail] = useState<string>("");
  const [preview, togglePreview] = useState<boolean>(false);
  const [triggerDocument, setTriggerDocument] = useState<boolean>(false);
  const [documentName, setDocumentName] = useState<string>("");

  const [status, onStatusChange] = useState<string>("");
  const [autoResizeCanvas, setAutoResizeCanvas] = useState<AutoResizeCanvas>({
    zoomXValue: 0.5,
    zoomYValue: 0.5,
  });
  const [ZoomCanvas, setZoomCanvas] = useState<number>(1);
  const [toggleSnap, setToggleSnap] = useState<boolean>(false);
  const [gridType, setGridType] = useState<gridTypeEnum>(gridTypeEnum.Gridline);

  const toggleGridType = () => {
    setGridType((prevType: gridTypeEnum) =>
      prevType === gridTypeEnum.Gridline
        ? gridTypeEnum.Griddot
        : gridTypeEnum.Gridline,
    );
  };

  const value = {
    //Setting the dimensions of the layer globally along with the unit
    //used in GuidesManager, InfiniteViewerManager, export drawer
    dimensions,
    setDimensions,

    //used in DeleteButtonViewable for setting the layers
    layerStore,
    selectedLayersStore,

    //Its used in DeleteButtonViewable where hooks are not allowed to be used
    //It is used to set the layers after deletion
    setGlobalLayerManager,
    globalLayerManager,

    setGlobalEditorManager,
    globalEditorManager,

    //value to be set for side drawer (Ex- TextDrawer, ShapesDrawer etc)
    selectedTool,
    setSelectedTool,

    //To add the title of the document (Ex-Hazard Label)
    documentName,

    //  To add the document (to be reviewed later)
    setDocumentName,

    //To manage the status of current document/label (Submitted / Draft / Approved / Not Approved)
    status,
    onStatusChange,

    triggerDocument,
    setTriggerDocument,

    preview,
    togglePreview,

    previewThumbnail,
    setPreviewThumbnail,

    // To set the default Quill values (Font size, font style etc in the save label json )
    quillDefaultValues,
    setQuillDefaultValues,

    // passing the grid toggle value
    gridType,
    setGridType,
    toggleGridType,

    //To resize the canvas to fit the viewport
    autoResizeCanvas,
    setAutoResizeCanvas,

    setZoomCanvas,
    ZoomCanvas,

    toggleSnap,
    setToggleSnap,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};

// Custom hook to use the setSelectedLayer function
export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditor must be used within a EditorProvider");
  }
  return context;
};
