import * as React from "react";
import { useState, Dispatch, SetStateAction } from "react";
import { useStoreStateValue } from "@scena/react-store";
import { $layers } from "../stores/stores";
import { SavedLayerJson, ScenaElementLayer } from "../types";
import { TableCssProps } from "../types/toolbar";

// Defining context value types
interface LayersContextValue {
  setQuillRef: (ref: any) => void;
  setSelectedLayerRotationAngle: Dispatch<SetStateAction<number>>;
  selectedLayerRotationAngle: number;
  isAutoFitEnabled: boolean;
  setIsAutoFitEnabled: Dispatch<SetStateAction<boolean>>;
  isAutoScaleEnabled: boolean;
  setIsAutoScaleEnabled: Dispatch<SetStateAction<boolean>>;
  tableCssProperties?: TableCssProps;
  setTableCssProperties: Dispatch<SetStateAction<TableCssProps | undefined>>;
  fixRatio: boolean;
  setFixRatio: Dispatch<SetStateAction<boolean>>;
  undoStack: SavedLayerJson[];
  setUndoStack: Dispatch<SetStateAction<SavedLayerJson[]>>;
  redoStack: SavedLayerJson[];
  setRedoStack: Dispatch<SetStateAction<SavedLayerJson[]>>;
  currentLabel: SavedLayerJson | {};
  setCurrentLabel: Dispatch<SetStateAction<SavedLayerJson | {}>>;
  allLayers: ScenaElementLayer[];
}

// Create the context with an initial undefined value
export const LayersContext = React.createContext<
  LayersContextValue | undefined
>(undefined);

export const QuillContext = React.createContext<React.RefObject<any> | null>(
  null,
);

// Provider component
export const LayersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedLayerRotationAngle, setSelectedLayerRotationAngle] =
    useState<number>(0);
  const [isAutoFitEnabled, setIsAutoFitEnabled] = useState<boolean>(false);
  const quillRef = React.useRef<any>(null); // Create a ref for the Quill editor
  const [isAutoScaleEnabled, setIsAutoScaleEnabled] = useState<boolean>(false);
  const [fixRatio, setFixRatio] = useState<boolean>(false);
  const [undoStack, setUndoStack] = useState<SavedLayerJson[]>([]);
  const [redoStack, setRedoStack] = useState<SavedLayerJson[]>([]);
  const [currentLabel, setCurrentLabel] = useState<SavedLayerJson | {}>({});
  const allLayers = useStoreStateValue($layers);

  const [tableCssProperties, setTableCssProperties] = useState<TableCssProps>();

  // Function to update the quillRef
  const setQuillRef = (ref: any) => {
    quillRef.current = ref;
  };

  const value: LayersContextValue = {
    setQuillRef,
    setSelectedLayerRotationAngle,
    selectedLayerRotationAngle,
    isAutoFitEnabled,
    setIsAutoFitEnabled,
    isAutoScaleEnabled,
    setIsAutoScaleEnabled,
    tableCssProperties,
    setTableCssProperties,
    fixRatio,
    setFixRatio,
    undoStack,
    setUndoStack,
    redoStack,
    setRedoStack,
    currentLabel,
    setCurrentLabel,
    allLayers,
  };

  return (
    <QuillContext.Provider value={quillRef}>
      <LayersContext.Provider value={value}>{children}</LayersContext.Provider>
    </QuillContext.Provider>
  );
};

// Custom hook to use the context
export const useLayers = (): LayersContextValue => {
  const context = React.useContext(LayersContext);
  if (context === undefined) {
    throw new Error("useLayers must be used within a LayersProvider");
  }
  return context;
};
