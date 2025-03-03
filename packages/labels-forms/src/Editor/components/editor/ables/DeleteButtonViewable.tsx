import React from "react";
import { MoveableManagerInterface } from "react-moveable";
import { EditorContext } from "../../../context/EditorContext";
import { LayersContext } from "../../../context/LayersContext";
import {
  deleteLayers,
  getTransformOriginForLayer,
} from "../../../utils/shared/LayerUtils";
import { ScenaElementLayer, ScenaElementLayerGroup } from "../../../types";
import { Frame } from "scenejs";

export type DeleteButtonViewableProps = {
  deleteButtonViewable?: boolean;
};

export const DeleteButtonViewable = {
  name: "deleteButtonViewable",
  props: ["deleteButtonViewable"],
  render(moveable: MoveableManagerInterface) {
    const rect = moveable.getRect();
    const { pos2 } = moveable.state;

    const DeleteButton = moveable.useCSS(
      "div",
      `
        {
            position: absolute;
            left: 0px;
            top: 0px;
            will-change: transform;
            transform-origin: 0px 0px;
            width: 24px;
            height: 24px;
            background: #4af;
            background: var(--moveable-color);
            opacity: 0.9;
            border-radius: 4px;
        }
        :host:before, :host:after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 16px;
            height: 2px;
            background: #fff;
            border-radius: 1px;
            cursor: pointer;
        }
        :host:after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
        `,
    );

    return (
      <LayersContext.Consumer>
        {(layersContext) => {
          if (!layersContext) {
            // Handle the case where the context is undefined
            return null;
          }
          return (
            <EditorContext.Consumer key="delete-button-viewer">
              {(context) => {
                const { setUndoStack, allLayers, undoStack } = layersContext;
                if (!context) {
                  return null;
                }
                const {
                  globalLayerManager,
                  globalEditorManager,
                  selectedLayersStore,
                  layerStore,
                  setSelectedTool,
                  dimensions,
                } = context;

                const getPage = () => {
                  const result: ScenaElementLayer | ScenaElementLayerGroup =
                    selectedLayersStore.value.find(
                      (layer: ScenaElementLayer | ScenaElementLayerGroup) => {
                        if (
                          layer.type === "group" &&
                          layer?.metaData?.type?.toLowerCase() === "page-group"
                        )
                          return true;
                        return layer.type === "page";
                      },
                    );

                  if (result?.type === "group") {
                    return result.children.find(
                      (child) =>
                        child.scope?.length === 1 &&
                        child.scope.includes(result.id),
                    ) as ScenaElementLayer;
                  }
                  return result;
                };

                const updateRemainingPagesPosition = (
                  remainingLayers: ScenaElementLayer[],
                  nextPages: ScenaElementLayer[],
                  deletedPageLayer: ScenaElementLayer,
                ) => {
                  const nextPagesIds = nextPages.map((p) => p.scope).flat();

                  remainingLayers.forEach((layer) => {
                    if (layer.scope.some((id) => nextPagesIds.includes(id))) {
                      const [x, y] = getTransformOriginForLayer(layer);
                      const verticalOffset =
                        deletedPageLayer?.style?.height + 70;

                      const item = new Frame();
                      item.set({
                        transform: {
                          translate: `${x}px, ${y - verticalOffset}px`,
                        },
                      });
                      layer.item.items[0] = item;
                    }
                  });
                };

                const handleClick = () => {
                  globalEditorManager?.actionManager.act("addToUndo", {
                    allLayers,
                    undoStack,
                    setUndoStack,
                    isUndoTriggered: true,
                    dimensions,
                  });
                  const deletedPageLayer: ScenaElementLayer | undefined =
                    getPage();

                  const allPageList = allLayers.filter(
                    (l) => l.type === "page",
                  );

                  //deleting and updating layers
                  const remainingLayers = deleteLayers(
                    selectedLayersStore.value,
                    layerStore,
                  );
                  if (globalEditorManager?.isDocument && deletedPageLayer) {
                    const deletedPageIndex = allPageList.findIndex(
                      (i) => i.id === deletedPageLayer?.id,
                    );
                    const nextPages = allPageList.slice(deletedPageIndex + 1);
                    if (nextPages.length > 0) {
                      updateRemainingPagesPosition(
                        remainingLayers,
                        nextPages,
                        deletedPageLayer,
                      );
                    }
                  }
                  globalEditorManager?.layerManager?.setLayers(
                    remainingLayers,
                    globalLayerManager?.groups,
                  );

                  layerStore.update(remainingLayers);

                  //closing drawer after deletion
                  setSelectedTool("");
                };

                return (
                  <DeleteButton
                    className={"moveable-delete-button"}
                    onClick={handleClick}
                    style={{
                      transform: `translate(${pos2[0]}px, ${pos2[1]}px) rotate(${rect.rotation}deg) translate(10px)`,
                    }}
                  />
                );
              }}
            </EditorContext.Consumer>
          );
        }}
      </LayersContext.Consumer>
    );
  },
} as const;
