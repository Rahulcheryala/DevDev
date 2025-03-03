import React from "react";
import HistoryManager from "../../HistoryManager";
import ActionManager from "../../ActionManager";
import MemoryManager from "../../MemoryManager";
import LayerManager from "../../LayerManager";
import UnitManager from "../../UnitManager";
import KeyManager from "../../KeyManager";
import { useStoreRoot, useStoreValue } from "@scena/react-store";
import {
  $historyManager,
  $actionManager,
  $memoryManager,
  $layerManager,
  $keyManager,
  $unitManager,
  $shapesManager,
} from "../../../../stores/stores";
import { ShapesManager } from "../..";

export const useEditorSetup = (props: any, editorRef: any, dpi: number) => {
  const root = useStoreRoot();

  const historyManager = React.useMemo(() => new HistoryManager(editorRef), []);
  const actionManager = React.useMemo(() => new ActionManager(), []);
  const memoryManager = React.useMemo(() => new MemoryManager(), []);
  const layerManager = React.useMemo(() => new LayerManager(), []);
  const unitManager = React.useMemo(
    () => new UnitManager(props.unit, dpi),
    [dpi],
  );
  const shapesManager = React.useMemo(() => new ShapesManager(), []);
  const keyManager = React.useMemo(
    () => new KeyManager(root, actionManager),
    [],
  );

  // Store values
  useStoreValue($historyManager, historyManager);
  useStoreValue($actionManager, actionManager);
  useStoreValue($memoryManager, memoryManager);
  useStoreValue($layerManager, layerManager);
  useStoreValue($keyManager, keyManager);
  useStoreValue($unitManager, unitManager);
  useStoreValue($shapesManager, shapesManager);

  return {
    historyManager,
    actionManager,
    memoryManager,
    layerManager,
    unitManager,
    shapesManager,
    keyManager,
  };
};
