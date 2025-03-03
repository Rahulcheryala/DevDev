import React, { useCallback } from "react";
import ReactQuill from "react-quill";
import TableV2 from "../components/tanstack-table/TableV2";

import { Frame } from "scenejs";
import { prefix, setLayerProperties } from "../utils/utils";
import { colors, defaultLayerStyles } from "../consts";
import { CSSProperties } from "styled-components";
import shapesManager from "../components/managers/shapesManager";
import { Lines, SavedLayerJson, ScenaElementLayer } from "../types";
import { createLayer } from "../components/managers/LayerManager";
import { lineFactory } from "../components/drawers/line-drawer/components/LineFactory";

export const useGenerateLayers = () => {
  const generateLayer = useCallback(
    (layer: SavedLayerJson): ScenaElementLayer | null => {
      switch (layer?.type) {
        case "page":
          return generatePageLayer(layer);
        case "shape":
          return generateShapeLayer(layer);
        case "image":
          return generateImageLayer(layer);
        case "layer":
        case "text":
          return generateTextLayer(layer);
        case "table":
          return generateTableLayer(layer);
        case "line":
          return generateLineLayer(layer);
        default:
          return null;
      }
    },
    [],
  );

  const generatePageLayer = useCallback(
    (layer: SavedLayerJson): ScenaElementLayer | null => {
      const commonStyles: CSSProperties = {
        borderTopLeftRadius: layer.format?.rounding?.topLeft || "",
        borderTopRightRadius: layer.format?.rounding?.topRight || "",
        borderBottomRightRadius: layer.format?.rounding?.bottomRight || "",
        borderBottomLeftRadius: layer.format?.rounding?.bottomLeft || "",
        borderColor: layer.format?.stroke?.color || "",
        borderWidth: layer.format?.stroke?.width || "",
        borderStyle: layer.format?.stroke?.type || "",
        fill: layer.format?.fill || "#000000",
        width: layer.width,
        height: layer.height,
      };

      const layers = createLayer({
        id: layer.id,
        title: layer.subtype,
        scope: layer.scope,
        style: { position: "absolute" },
        jsx: (
          <div
            className={prefix("viewport")}
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <svg
              style={commonStyles}
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <rect width="100" height="100" />
            </svg>
          </div>
        ),
        type: "page",
      });

      const newFrame = new Frame();
      const layerProperties = setLayerProperties(layer);
      newFrame.set(layerProperties);

      layers.item.items[0] = newFrame;
      return layers;
    },
    [],
  );

  const generateImageLayer = useCallback(
    (layer: SavedLayerJson): ScenaElementLayer => {
      let newLayer: ScenaElementLayer;
      if (layer?.title === "barcode") {
        newLayer = createLayer({
          type: "image",
          id: layer.id,
          metaData: layer.metaData,
          scope: layer.scope,
          title: "barcode",
          style: {
            position: "absolute",
            opacity: layer?.metaData?.barcodeValues?.opacity || 1,
            display: "flex",
            width: layer?.width,
            height: layer?.height,
          },
          jsx: (
            <div
              style={{
                display: "flex",
                padding: "10px",
              }}
            >
              <img src={layer.src as string} className=" w-full h-full" />
            </div>
          ),
        });
      } else {
        newLayer = createLayer({
          id: layer.id ? layer.id : `layer_${Date.now().toString()}`,
          metaData: layer.metaData ? layer.metaData : {},
          title: layer.title ? layer.title : "image",
          type: "image",
          style: {
            position: "absolute",
            width: layer.width,
            height: layer.height,
            opacity: layer.metaData?.opacity || 1,
          },
          jsx: <img src={layer.src as string} />,
        });
      }

      const newFrame = new Frame();
      const layerProperties = setLayerProperties(layer);
      newFrame.set(layerProperties);
      newLayer.item.items[0] = newFrame;

      return newLayer;
    },
    [],
  );

  const generateShapeLayer = useCallback(
    (layer: SavedLayerJson): ScenaElementLayer | null => {
      let commonStyles: CSSProperties = {
        borderTopLeftRadius: layer.format?.rounding?.topLeft || "",
        borderTopRightRadius: layer.format?.rounding?.topRight || "",
        borderBottomRightRadius: layer.format?.rounding?.bottomRight || "",
        borderBottomLeftRadius: layer.format?.rounding?.bottomLeft || "",
        borderColor: layer.format?.stroke?.color || "",
        borderWidth: layer.format?.stroke?.width || "",
        borderStyle: layer.format?.stroke?.type || "",
        fill: layer.format?.fill || "#000000",
        width: layer.width,
        height: layer.height,
      };

      if (layer.subtype === "circle") {
        const width = parseInt(layer.format?.stroke?.width.replace("px", ""));

        const strokeDashArray = new shapesManager().calculateStrokeDashArray(
          width || 0,
          layer.format?.stroke.type,
        );

        commonStyles = {
          ...commonStyles,
          strokeWidth: layer.format?.stroke?.width || "",
          stroke: layer.format?.stroke.color,
          borderColor: "",
          borderWidth: "",
          strokeDasharray: strokeDashArray,
        };
      }

      const createSvgLayer = (jsx: JSX.Element) => {
        const layers = createLayer({
          id: layer.id,
          title: layer.subtype,
          scope: layer.scope,
          style: { position: "absolute" },
          jsx: jsx,
          type: "shape",
        });

        const newFrame = new Frame();
        const layerProperties = setLayerProperties(layer);
        newFrame.set(layerProperties);

        layers.item.items[0] = newFrame;
        return layers;
      };

      switch (layer.subtype) {
        case "square":
          return createSvgLayer(
            <svg
              style={commonStyles}
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <rect width="100" height="100" />
            </svg>,
          );
        case "circle":
          return createSvgLayer(
            <svg
              style={commonStyles}
              viewBox="0 0 104 104"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <circle cx="52" cy="52" r="50" />
            </svg>,
          );
        default:
          return null;
      }
    },
    [],
  );

  const generateTextLayer = useCallback(
    (layer: SavedLayerJson): ScenaElementLayer => {
      const newQuillRef = React.createRef<ReactQuill>();
      let newLayer: ScenaElementLayer;
      if (layer?.metaData?.isBarcodeText) {
        newLayer = createLayer({
          type: "text",
          id: layer.id || Date.now().toString(),
          metaData: layer?.metaData || {},
          scope: layer.scope || [],
          title: "text",
          style: defaultLayerStyles.TEXT_STYLES,
          jsx: (
            <div
              style={{
                width: "auto",
                height: "auto",
                padding: "10px",
              }}
            >
              <ReactQuill
                ref={newQuillRef}
                placeholder="Enter some text"
                value={layer.content || ""}
                modules={{ toolbar: false }}
                style={{
                  width: "auto",
                  height: "auto",
                }}
                readOnly
              />
            </div>
          ),
        });
      } else {
        newLayer = createLayer({
          id: layer.id ? layer.id : `layer_${Date.now().toString()}`,
          title: "text",
          type: "layer",
          metaData: layer.metaData,
          scope: layer.scope,
          style: {
            ...layer.format.style,
            position: "absolute",
            display: "inline-block",
            placeContent: "center",
            width: layer.width + "px",
            height: layer.height + "px",
          },
          jsx: (
            <div
              style={{
                position: "absolute",
                padding: "10px",
              }}
            >
              <ReactQuill
                ref={newQuillRef}
                placeholder="Enter some text"
                value={layer.content || ""}
                modules={{ toolbar: false }}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          ),
        });
      }

      const newFrame = new Frame();
      const layerProperties = setLayerProperties(layer);
      newFrame.set(layerProperties);

      newLayer.item.items[0] = newFrame;
      return newLayer;
    },
    [],
  );

  const generateTableLayer = useCallback(
    (layer: SavedLayerJson): ScenaElementLayer => {
      const newLayer = createLayer({
        id: layer.id,
        metaData: {
          isHeaderVisible: true,
          mergedCells: layer.format.mergedCells,
          tableSkin: layer.format.tableCss,
        },
        type: "table",
        title: "table",
        style: {
          height: `${layer.height}px`,
          width: `${layer.width}px`,
        },
        jsx: (() => {
          const tableRef = React.createRef<any>();

          return (
            <div className="absolute w-auto h-auto">
              <TableV2
                ref={tableRef}
                columns={layer.format.updatedColumnsArray}
                rows={layer.format.tableData}
                tableCss={layer.format.tableCss}
                cellBorders={layer.format.cellBorders} // Restore cell borders
                cellColors={layer.format.cellColors} // Restore cell colors
                cellSizes={layer.format.cellSizes}
              />
            </div>
          );
        })(),
      });
      const newFrame = new Frame();
      const layerProperties = setLayerProperties(layer);
      newFrame.set(layerProperties);

      newLayer.item.items[0] = newFrame;

      newLayer.metaData.isHeaderVisible = layer.format.isHeaderVisible;
      return newLayer;
    },
    [],
  );

  const generateLineLayer = useCallback(
    (layer: SavedLayerJson): ScenaElementLayer => {
      const LineProps = {
        width: layer.format.lineValues.width || 100,
        height: 10,
        stroke: layer.format.lineValues.color || colors.BLACK,
        strokeWidth: layer.format.lineValues.thickness || 1,
        strokeType: layer.format.lineValues.style,
      };

      const jsx = lineFactory(layer.subtype as Lines, LineProps);
      const newLayer = createLayer({
        id: layer.id ? layer.id : `layer_${Date.now().toString()}`,
        title: layer.subtype,
        metaData: layer.format.lineValues,
        style: {
          position: "absolute",
        },
        jsx,
        type: "line",
      });
      const newFrame = new Frame();
      const layerProperties = setLayerProperties(layer);
      newFrame.set(layerProperties);

      newLayer.item.items[0] = newFrame;
      return newLayer;
    },
    [],
  );
  return {
    generateLayer,
    generateImageLayer,
    generateShapeLayer,
    generateTextLayer,
    generateTableLayer,
  };
};
