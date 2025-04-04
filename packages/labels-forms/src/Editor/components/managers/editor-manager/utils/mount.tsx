import React from "react";
import { StoreValue } from "@scena/react-store";

import {
  copyGroupWithNewId,
  deleteLayers,
} from "../../../../utils/shared/LayerUtils";
import {
  SavedLayerJson,
  ScenaElementLayer,
  ScenaElementLayerGroup,
} from "../../../../types";
import ActionManager from "../../ActionManager";
import LayerManager from "../../LayerManager";

export const InitializeUndo = (
  label: string,
  width: number,
  height: number,
  unit: string,
  actionManager: ActionManager,
  allLayers: Array<ScenaElementLayer>,
  undoStack: Array<SavedLayerJson>,
  setUndoStack: React.Dispatch<React.SetStateAction<SavedLayerJson[]>>,
) => {
  if (label) {
    setUndoStack([...undoStack, JSON.parse(label)]);
  } else {
    actionManager.act("addToUndo", {
      allLayers,
      undoStack,
      setUndoStack,
      isUndoTriggered: true,
      dimensions: {
        width: width,
        height: height,
        unit: unit,
      },
    });
  }
};

export const handleDeleteLayer = (
  e: KeyboardEvent,
  selectedLayers: any[],
  layerStore: StoreValue<ScenaElementLayer[]>,
  layerManager: LayerManager,
  setLayers: (layers: any[]) => void,
) => {
  if (e.key === "Delete") {
    const remainingLayers = deleteLayers(selectedLayers, layerStore);
    layerManager.setLayers(remainingLayers, layerManager.groups);
    setLayers(remainingLayers);
  }
};

export const duplicateLayer = async (
  e: any,
  setLayers: (
    layers: ScenaElementLayer[],
    groups?: ScenaElementLayerGroup[],
  ) => Promise<boolean>,
  selectedLayersStore: StoreValue<
    (ScenaElementLayer | ScenaElementLayerGroup)[]
  >,
  layerManager: LayerManager,
) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "d") {
    e.preventDefault();
    if (selectedLayersStore.value.length) {
      const selectedLayer: any = selectedLayersStore.value;
      const { layers, groups } = copyGroupWithNewId(selectedLayer[0]);

      await setLayers(
        [...layerManager.layers, ...layers],
        [...layerManager.groups, ...groups],
      );
    }
  }
};
