import React from "react";
import { useEditor } from "../../../../context/EditorContext";
import "../../../../assets/styles/ruler-button.css";
import { useStoreStateValue } from "@scena/react-store";
import { $editor, $layerManager } from "../../../../stores/stores";
import {
  pageLayerConfig,
  shapes,
} from "../../../drawers/shapes-drawer/shapesList";
import { ScenaElementLayer, ScenaElementLayerGroup } from "../../../../types";
import { createGroup, createLayer } from "../../LayerManager";
import { SceneItem } from "scenejs";

interface AddDocumentProps {
  canvasDimensions: {
    width: number;
    height: number;
    unit: string;
  };
}

const AddDocument: React.FC<AddDocumentProps> = ({ canvasDimensions }) => {
  const { selectedTool } = useEditor();
  const layerManager = useStoreStateValue($layerManager);
  const editorRef = useStoreStateValue($editor);

  /*
  This needs to be refactored when we have designs for multiple pages flow.
  Currently, it holds flow for adding new pages in the vertical fashion.
  */
  const addPage = async () => {
    const id = Date.now().toString();
    const sqShapeConfig = shapes.find(
      (s) => s.title.toLowerCase() === "square",
    );
    const pageCount = layerManager.layers.filter(
      (l) => l.type == "page",
    ).length;
    const newPagePosition =
      canvasDimensions.height * pageCount + (70 * pageCount - 1);
    const HeaderFooterHeight = canvasDimensions.height * 0.15;
    const metaData = {
      draggable: false,
      resizable: false,
      props: {
        deleteButtonViewable: false,
      },
    };
    const pageItem = new SceneItem();
    const headerItem = new SceneItem();
    const bodyItem = new SceneItem();
    const footerItem = new SceneItem();

    // Create the shape layer with optional translateY
    const layers: ScenaElementLayer[] = [
      createLayer(
        {
          id,
          ...pageLayerConfig(newPagePosition, {
            width: canvasDimensions.width,
            height: canvasDimensions.height,
          }),
          title: `Page - ${pageCount + 1}`,
          metaData: {
            ...metaData,
            // translateY: -newPagePosition,
            pageNumber: pageCount,
            type: "page-layer",
          },
          scope: [`Page-${pageCount + 1}`],
          item: pageItem.set(0, "transform", {
            translate: `${0}px, ${newPagePosition}px`,
          }),
        },
        newPagePosition,
      ),
      createLayer(
        {
          id: `${id}-header`,
          ...sqShapeConfig,
          style: {
            ...sqShapeConfig?.style,
            width: canvasDimensions.width,
            height: HeaderFooterHeight,
            // transform: `translateY(${newPagePosition}px)`,
            fill: "#FF0000",
          },
          title: `Header-${pageCount + 1}`,
          scope: [`Page-${pageCount + 1}`, `Page-${pageCount + 1}-Header`],
          metaData: {
            ...metaData,
            translateY: -newPagePosition,
            type: "header-layer",
          },
          item: headerItem.set(0, "transform", {
            translate: `${0}px, ${newPagePosition}px`,
          }),
        },
        newPagePosition,
      ),
      createLayer(
        {
          id: `${id}-body`,
          ...sqShapeConfig,
          style: {
            ...sqShapeConfig?.style,
            width: canvasDimensions.width,
            height: canvasDimensions.height - 2 * HeaderFooterHeight,
            // transform: `translateY(${newPagePosition + HeaderFooterHeight}px)`,
            fill: "#00FF00",
          },
          title: `Body-${pageCount + 1}`,
          scope: [`Page-${pageCount + 1}`, `Page-${pageCount + 1}-Body`],
          metaData: {
            ...metaData,
            translateY: -(newPagePosition + HeaderFooterHeight),
            type: "body-layer",
          },
          item: bodyItem.set(0, "transform", {
            translate: `${0}px, ${newPagePosition + HeaderFooterHeight}px`,
          }),
        },
        newPagePosition + HeaderFooterHeight,
      ),
      createLayer(
        {
          id: `${id}-footer`,
          ...sqShapeConfig,
          style: {
            ...sqShapeConfig?.style,
            width: canvasDimensions.width,
            height: HeaderFooterHeight,
            // transform: `translateY(${
            //   newPagePosition + canvasDimensions.height - HeaderFooterHeight
            // }px)`,
            fill: "#0000FF",
          },
          title: `Footer - ${pageCount + 1}`,
          scope: [`Page-${pageCount + 1}`, `Page-${pageCount + 1}-Footer`],
          metaData: {
            ...metaData,
            translateY: -(
              newPagePosition +
              canvasDimensions.height -
              HeaderFooterHeight
            ),
            type: "footer-layer",
          },
          item: footerItem.set(0, "transform", {
            translate: `${0}px, ${
              newPagePosition + canvasDimensions.height - HeaderFooterHeight
            }px`,
          }),
        },
        newPagePosition + canvasDimensions.height - HeaderFooterHeight,
      ),
    ];

    const group: ScenaElementLayerGroup[] = [
      createGroup({
        id: `Page-${pageCount + 1}`,
        title: `Page-${pageCount + 1}`,
        scope: [],
        metaData: {
          ...metaData,
          type: "page-group",
        },
      }),
      createGroup({
        id: `Page-${pageCount + 1}-Header`,
        scope: [`Page-${pageCount + 1}`],
        title: `Page-${pageCount + 1}-Header`,
        metaData: {
          ...metaData,
          type: "header-group",
        },
      }),
      createGroup({
        id: `Page-${pageCount + 1}-Body`,
        scope: [`Page-${pageCount + 1}`],
        title: `Page-${pageCount + 1}-Body`,
        metaData: {
          ...metaData,
          type: "body-group",
        },
      }),
      createGroup({
        id: `Page-${pageCount + 1}-Footer`,
        scope: [`Page-${pageCount + 1}`],
        title: `Page-${pageCount + 1}-Footer`,
        metaData: {
          ...metaData,
          type: "footer-group",
        },
      }),
    ];
    // Set the new layers in the editor and update the selected layers
    await editorRef.current!.setLayers(
      [...layerManager.layers, ...layers],
      [...layerManager.groups, ...group],
    );
    await editorRef.current!.setSelectedLayers([group[0]]);

    // TODO Ekansh to be handled later
    // addToUndo({ operation: undoActionType.ADD, addedLayer: layers[0] });
  };

  return (
    <div
      className={`addDocument ${selectedTool ? "selected" : ""}`}
      onClick={addPage}
      style={{
        cursor: "pointer",
        position: "absolute",
        bottom: "90px",
        zIndex: 1,
        backgroundColor: "#000",
        padding: "9px",
        borderRadius: "10px",
        color: "white",
        fontSize: "12px",
      }}
    >
      Add Document
    </div>
  );
};

export default AddDocument;
