import { useCallback } from "react";
import { useStoreStateValue, useStoreValue } from "@scena/react-store";
import { $actionManager, $layerManager, $layers } from "../stores/stores";
import { deleteLayers } from "../utils/shared/LayerUtils";
import { useEditor } from "../context/EditorContext";
import { useLayers } from "../context/LayersContext";
import { undoActionType } from "../consts";
import { ScenaElementLayer } from "../types";

const useUndoRedo = () => {
  const { undoStack, setUndoStack, redoStack, setRedoStack, setCurrentLabel } =
    useLayers();

  const layerStore = useStoreValue($layers);
  const actionManager = useStoreStateValue($actionManager);
  const allLayers = useStoreStateValue($layers);
  const layerManager = useStoreStateValue($layerManager);
  const { dimensions } = useEditor();

  const addToUndo = useCallback(
    (config?: {
      operation?: string | null;
      addedLayer?: ScenaElementLayer | {} | null;
      allLayerList?: ScenaElementLayer[] | null;
    }) => {
      setRedoStack([]);
      actionManager.act("addToUndo", {
        allLayers: config?.allLayerList || allLayers,
        undoStack,
        setUndoStack,
        dimensions,
        operation: config?.operation || undoActionType.UPDATE,
        addedLayer: config?.addedLayer || {},
      });
    },
    [
      actionManager,
      allLayers,
      undoStack,
      redoStack,
      setUndoStack,
      setRedoStack,
    ],
  );

  const handleUndo = useCallback(() => {
    if (undoStack.length > 0) {
      const newUndoStack = [...undoStack];

      // Remove the top most state
      const labelJson = newUndoStack.pop();

      // Handle empty layers scenario
      if (labelJson?.layers?.length === 0) {
        deleteLayers(allLayers, layerStore);
        layerManager.setLayers([], layerManager.groups);
        layerStore.update([]);
      }

      if (labelJson) {
        setUndoStack(newUndoStack);
        setRedoStack([
          ...redoStack,
          undoStack[undoStack.length - 1] as { [key: string]: any },
        ]);
        setCurrentLabel(labelJson);
      }
    }
  }, [
    undoStack,
    allLayers,
    deleteLayers,
    layerStore,
    layerManager,
    setUndoStack,
    setRedoStack,
    setCurrentLabel,
  ]);

  const handleRedo = useCallback(() => {
    if (redoStack.length > 0) {
      const newRedoStack = [...redoStack];
      const labelDataString = newRedoStack.pop(); // Get the state to redo

      if (labelDataString) {
        // Update the undo stack with the redone state
        setUndoStack([...undoStack, labelDataString as { [key: string]: any }]);

        // Update the redo stack by removing the top element
        setRedoStack(newRedoStack);

        setCurrentLabel(labelDataString);

        // Handle empty layers scenario
        if (labelDataString?.layers?.length === 0) {
          deleteLayers(allLayers, layerStore);
          layerManager.setLayers([], layerManager.groups);
          layerStore.update([]);
        }
      }
    }
  }, [
    redoStack,
    undoStack,
    allLayers,
    deleteLayers,
    layerStore,
    layerManager,
    setUndoStack,
    setRedoStack,
    setCurrentLabel,
  ]);

  return {
    addToUndo,
    handleUndo,
    handleRedo,
  };
};

export default useUndoRedo;
