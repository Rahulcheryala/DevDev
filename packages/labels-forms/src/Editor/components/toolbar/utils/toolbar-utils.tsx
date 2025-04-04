import React from "react";
import { isEmpty } from "lodash";
import LayerManager from "../../managers/LayerManager";
import { Dimensions, SavedLayerJson, ScenaElementLayer } from "../../../types";
import { convertHtmlToImage, rgbToHex } from "../../../utils/utils";
import { defaultLayerStyles, tableCSS } from "../../../consts";
import {
  AnchorIcon,
  Barcode,
  DesignToolIcon,
  EditIcon,
  ElementsIcon,
  InterfaceIcon,
  LinkIcon,
  NetworkIcon,
  PaintBucketIcon,
  SecurityIcon,
  SignatureIcon,
  SystemQrIcon,
  TextIcon,
  UndoLeft,
  UndoRight,
  WatermarkIcon,
} from "../../drawers/icons";
import { GetMenuSectionsParams } from "../../../types/toolbar";
import { SectionTitles, Tooltips } from "../../../consts/toolbar";

export const extractShapeProperties = (
  layerRef: SVGElement | HTMLElement | null,
  layer: ScenaElementLayer,
  layerWidth: number,
  layerHeight: number,
  rotation: string,
  transformOrigin: number[],
  scaleValue: string[],
) => {
  //svg properties
  const strokeWidth = isEmpty(layerRef?.style.borderWidth)
    ? layerRef?.style.strokeWidth
    : layerRef?.style.borderWidth;
  const strokeColor = isEmpty(layerRef?.style.borderColor)
    ? layerRef?.style.stroke
    : layerRef?.style.borderColor;
  const fill = layerRef?.style.fill;
  const borderTopLeftRadius = layerRef?.style.borderTopLeftRadius;
  const borderTopRightRadius = layerRef?.style.borderTopRightRadius;
  const borderBottomLeftRadius = layerRef?.style.borderBottomLeftRadius;
  const borderBottomRightRadius = layerRef?.style.borderBottomRightRadius;

  return {
    id: layer.id,
    name: "label-logo",
    type: layer.type,
    scope: layer.scope,
    subtype: layer.title,
    width: layerWidth,
    height: layerHeight,
    rotation: rotation || 0,
    transformOrigin: transformOrigin || ["0", "0"],
    format: {
      scale: scaleValue,
      fill:
        (fill && rgbToHex(fill as string)) ||
        defaultLayerStyles.SHAPE_STYLES.fill,
      stroke: {
        width: strokeWidth || defaultLayerStyles.SHAPE_STYLES.strokeWidth,
        color:
          (strokeColor && rgbToHex(strokeColor as string)) ||
          defaultLayerStyles.SHAPE_STYLES.strokeColor,
        type: layerRef?.style.borderStyle ?? "solid",
      },
      rounding: {
        topLeft: borderTopLeftRadius || "",
        topRight: borderTopRightRadius || "",
        bottomLeft: borderBottomLeftRadius || "",
        bottomRight: borderBottomRightRadius || "",
      },
    },
  };
};

export const extractLineLayerProperties = (
  layer: ScenaElementLayer,
  layerWidth: number,
  layerHeight: number,
  rotation: string,
  transformOrigin: number[],
  scaleValue: string[],
) => {
  const lineValues = layer?.metaData || {};

  return {
    id: layer.id,
    name: "label-logo",
    type: layer.type,
    scope: layer.scope,
    subtype: layer.title,
    width: layerWidth,
    height: layerHeight,
    rotation: rotation || 0,
    transformOrigin: transformOrigin || ["0", "0"],
    format: {
      scale: scaleValue,
      lineValues,
    },
  };
};
export const extractTextProperties = (
  layerRef: SVGElement | HTMLElement | null,
  layer: ScenaElementLayer,
  layerWidth: number,
  layerHeight: number,
  rotation: string,
  transformOrigin: number[],
  scaleValue: string[],
) => {
  const htmlContent =
    layer.jsx.props.children.ref.current.getEditor().root.innerHTML;
  const metaData = layer.metaData;
  if (layerRef) {
    return {
      id: layer.id,
      scope: layer.scope,
      metaData,
      type: layer.type,
      width: layerWidth,
      height: layerHeight,
      rotation: rotation || 0,
      transformOrigin: transformOrigin || [0, 0],
      content: htmlContent,
      format: {
        scale: scaleValue,
        style: {
          ...layer.style,
        },
      },
    };
  }
};
export const extractImageLayerProperties = (
  layer: ScenaElementLayer,
  layerRef: SVGElement | HTMLElement | null,
  rotation: string,
  transformOrigin: number[],
) => {
  let metaData: { [key: string]: any } = layer.metaData;

  if (layer.title === "barcode") {
    const barcodeImageSrc =
      layer.ref.current?.getElementsByTagName("img")[0]?.src;
    const imageContent = layer.ref.current;
    const scaleValue = layerRef?.style.scale;

    return {
      id: layer.id,
      title: layer.title,
      scope: layer.scope,
      metaData: metaData
        ? {
            barcodeValues: layer?.metaData?.barcodeValues,
          }
        : {},
      type: layer.type,
      width:
        imageContent?.style.width || defaultLayerStyles.BARCODE_STYLES.width,
      height:
        imageContent?.style.height || defaultLayerStyles.BARCODE_STYLES.height,
      rotation: rotation || 0,
      transformOrigin: transformOrigin || [0, 0],
      src: barcodeImageSrc,
      format: {
        scale: scaleValue,
        style: {
          ...layer.style,
        },
      },
    };
  } else {
    const { opacity } = layer.style;
    metaData = {
      ...metaData,
      opacity: opacity || 1,
    };

    const imageContent = layer.ref.current;
    const src = (imageContent as HTMLImageElement)?.src;
    const scaleValue = layerRef?.style.scale;

    return {
      id: layer.id,
      title: layer.title,
      scope: layer.scope,
      metaData: metaData || {},
      type: layer.type,
      width: imageContent?.style.width || defaultLayerStyles.QR_STYLES.width,
      height: imageContent?.style.height || defaultLayerStyles.QR_STYLES.height,
      rotation: rotation || 0,
      transformOrigin: transformOrigin || [0, 0],
      src: src,
      format: {
        scale: scaleValue,
        style: {
          ...layer.style,
        },
      },
    };
  }
};

export const extractTableLayerProperties = (
  layer: ScenaElementLayer,
  layerWidth: number,
  layerHeight: number,
  rotation: string,
  transformOrigin: number[],
  scaleValue: string[],
  tableCssProperties: { [key: string]: any },
) => {
  const tableRef = layer.jsx?.props?.children?.ref?.current;

  const tableData = tableRef.getRows().map((row: any) => {
    const updatedRow = { ...row };

    Object.keys(updatedRow).forEach((key) => {
      if (key.endsWith("Ref")) {
        updatedRow[key] = null;
      }
    });

    return updatedRow;
  });
  const columns = tableRef.getCols();
  const headersObject = tableRef.getHeaders();
  const updatedColumnsArray = columns[0].colsDetails.map((column: any) => {
    if (headersObject[column.id]) {
      return {
        ...column,
        header: headersObject[column.id],
      };
    }
    return column;
  });

  const isHeaderVisible = tableRef.getHeaderVisibility();
  const mergedCells = tableRef.getMergedCells();
  const cellBorders = tableRef.getTableCss().cellBorders; // Extract cell border properties
  const cellColors = tableRef.getTableCss().cellColors; // Extract cell fill colors
  const cellSizes = tableRef.getTableCss().cellSizes;

  return {
    id: layer.id,
    name: "label-info",
    scope: layer.scope,
    type: layer.type,
    width: layerWidth,
    height: layerHeight,
    rotation: rotation || 0,
    transformOrigin: transformOrigin || [0, 0],
    format: {
      scale: scaleValue,
      style: {
        ...layer.style,
      },
      tableCss:
        tableCssProperties && Object.keys(tableCssProperties).length > 0
          ? tableCssProperties
          : layer?.metaData?.tableSkin || tableCSS[3],
      columns,
      tableData,
      updatedColumnsArray,
      isHeaderVisible,
      mergedCells,
      cellBorders, // Include cell border properties
      cellColors, // Include cell fill colors
      cellSizes,
    },
  };
};

export const restoreTableProperties = (
  layer: SavedLayerJson,
  layerManager: LayerManager,
  isRedo?: boolean,
) => {
  const layers = layerManager.getLayerById(layer.id);
  if (layers?.length) {
    const tableLayer = layers[0];
    const tableRef = tableLayer.jsx.props.children.ref;
    const { updatedColumnsArray, tableData, tableCss, mergedCells } =
      layer.format;
    tableRef.current.setTableProperties(
      updatedColumnsArray,
      tableData,
      tableCss,
      mergedCells,
      isRedo,
    );
  }
};

export const getMenuSections = ({
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
}: GetMenuSectionsParams) => {
  return [
    {
      section: SectionTitles.UNDO_REDO,
      buttons: [
        {
          onClick: handleUndo,
          isToggled: false,
          icon: <UndoLeft isDisabled={undoStack.length === 0} />,
          disabled: undoStack.length === 0,
          tooltip: Tooltips.UNDO,
        },
        {
          onClick: handleRedo,
          isToggled: false,
          icon: <UndoRight isDisabled={redoStack.length === 0} />,
          disabled: redoStack.length === 0,
          tooltip: Tooltips.REDO,
        },
      ],
    },
    {
      section: SectionTitles.TEXT_SHAPE_LINE,
      buttons: [
        {
          onClick: addNewTextBox,
          isToggled: selectedIcon === toolbarIcons.TEXT,
          icon: <TextIcon />,
          tooltip: Tooltips.ADD_TEXT,
        },
        {
          onClick: () => {
            handleToolSelect(toolBarItems.SHAPE);
            setSelectedIcon(toolbarIcons.SHAPE);
          },
          isToggled: selectedIcon === toolbarIcons.SHAPE,
          icon: <ElementsIcon />,
          tooltip: Tooltips.ADD_SHAPE,
        },
        {
          onClick: () => {
            setSelectedIcon(toolbarIcons.LINE);
            handleToolSelect(toolBarItems.LINE);
          },
          isToggled: selectedIcon === toolbarIcons.LINE,
          icon: <InterfaceIcon />,
          tooltip: Tooltips.ADD_LINE,
        },
      ],
    },
    {
      section: SectionTitles.WATERMARK_SIGNATURE,
      buttons: [
        {
          onClick: () => {
            setSelectedIcon(toolbarIcons.WATERMARK);
            setTriggerDocument(!triggerDocument);
          },
          isToggled: selectedIcon === toolbarIcons.WATERMARK,
          icon: <WatermarkIcon />,
          tooltip: Tooltips.ADD_WATERMARK,
        },
        {
          onClick: () => setSelectedIcon(toolbarIcons.SIGNATURE),
          isToggled: selectedIcon === toolbarIcons.SIGNATURE,
          icon: <SignatureIcon />,
          tooltip: Tooltips.ADD_SIGNATURE,
        },
      ],
    },
    {
      section: SectionTitles.QR_BARCODE_TABLE,
      buttons: [
        {
          onClick: () => setSelectedIcon(toolbarIcons.LINK),
          isToggled: selectedIcon === toolbarIcons.LINK,
          icon: <LinkIcon className="h-6 w-5" />,
          tooltip: Tooltips.ADD_LINK,
        },
        {
          onClick: () => {
            setIsTableSelection(true);
            setSelectedIcon(toolbarIcons.TABLE);
          },
          isToggled: selectedIcon === toolbarIcons.TABLE,
          icon: <EditIcon />,
          tooltip: Tooltips.ADD_TABLE,
        },
        {
          onClick: () => {
            setSelectedIcon(toolbarIcons.GRID);
            handleToolSelect(toolBarItems.STUDIO);
          },
          isToggled: selectedIcon === toolbarIcons.GRID,
          icon: <NetworkIcon />,
          tooltip: Tooltips.ADD_GRID,
        },
        {
          onClick: () => {
            handleToolSelect(toolBarItems.QRCODE);
            setSelectedIcon(toolbarIcons.QRCODE);
          },
          isToggled: selectedIcon === toolbarIcons.QRCODE,
          icon: <SystemQrIcon />,
          tooltip: Tooltips.ADD_QR_CODE,
        },
        {
          onClick: () => {
            handleToolSelect(toolBarItems.BARCODE);
            setSelectedIcon(toolbarIcons.BARCODE);
          },
          isToggled: selectedIcon === toolbarIcons.BARCODE,
          icon: <Barcode />,
          tooltip: Tooltips.ADD_BARCODE,
        },
      ],
    },
    {
      section: SectionTitles.PAINT_LOCK_ANCHOR,
      buttons: [
        {
          onClick: () => setSelectedIcon(toolbarIcons.FILL),
          isToggled: selectedIcon === toolbarIcons.FILL,
          icon: <PaintBucketIcon />,
          tooltip: Tooltips.FILL_COLOR,
        },
        {
          onClick: () => setSelectedIcon(toolbarIcons.PAINT),
          isToggled: selectedIcon === toolbarIcons.PAINT,
          icon: <DesignToolIcon />,
          tooltip: Tooltips.PAINT_TOOL,
        },
        {
          onClick: () => setSelectedIcon(toolbarIcons.LOCK),
          isToggled: selectedIcon === toolbarIcons.LOCK,
          icon: <SecurityIcon color="#aeaca9" />,
          tooltip: Tooltips.LOCK_TOOL,
        },
        {
          onClick: handleAnchorClick,
          isToggled: anchorValue,
          icon: <AnchorIcon />,
          tooltip: Tooltips.ANCHOR_TOOL,
        },
      ],
    },
  ];
};

export const handleSaveLabel = async (
  allLayers: ScenaElementLayer[] = [],
  dimensions: Dimensions,
  undoStack?: Array<{ [key: string]: any }>,
  setUndoStack?: React.Dispatch<React.SetStateAction<{ [key: string]: any }[]>>,
  quillDefaultValues?: any, // pass quill values as param
  canvasProperties?: any, // pass canvas properties as param
  editorRef?: any, // editor ref for saving
  documentName?: string,
  tableCssProperties?: any,
  bleed?: any,
  margin?: any,
  bleedVisible?: boolean,
  marginVisible?: boolean,
  isUndoTriggered?: boolean,
  setTriggerDropdown?: React.Dispatch<React.SetStateAction<boolean>>, // param for dropdown state
) => {
  let labelJson = {};

  const newLayers = allLayers.map((layer: ScenaElementLayer) => {
    const layerRef = layer?.ref?.current;

    // rotation, isScaleExists, scaleValue
    const rotation = layer.item.items[0].properties?.transform?.rotate || "";
    const isScaleExists = Array.isArray(
      layer.item?.items[0].properties?.transform?.scale,
    );
    const scaleValue = isScaleExists
      ? layer.item?.items[0].properties?.transform?.scale
      : layer.item?.items[0].properties?.transform?.scale?.value;

    if (layerRef) {
      const layerHeight = layerRef.clientHeight;
      const layerWidth = layerRef.clientWidth;
      let transformOrigin;

      if (
        Object.prototype.hasOwnProperty.call(
          layer.item.items[0].properties,
          "transform",
        )
      ) {
        transformOrigin =
          layer.item.items[0].properties.transform?.translate?.value?.map(
            (value: string) => parseFloat(value),
          ) || [0, 0];
      }

      // check for existing values
      if (layer.item.items[0].properties.transform?.translate?.value) {
        transformOrigin =
          layer.item.items[0].properties.transform?.translate?.value?.map(
            (value: string) => parseFloat(value),
          ) || [0, 0];
      } else {
        transformOrigin =
          layer.item.items[0].properties.transform?.translate.map(
            (value: string) => parseFloat(value),
          ) || [0, 0];
      }

      // check if the layer is an SVG or other layer types
      if (layer.type === "shape") {
        return extractShapeProperties(
          layerRef,
          layer,
          layerWidth,
          layerHeight,
          rotation,
          transformOrigin,
          scaleValue,
        );
      } else if (layer.title === "text") {
        return extractTextProperties(
          layerRef,
          layer,
          layerWidth,
          layerHeight,
          rotation,
          transformOrigin,
          scaleValue,
        );
      } else if (layer.type === "image") {
        return extractImageLayerProperties(
          layer,
          layerRef,
          rotation,
          transformOrigin,
        );
      } else if (layer.title === "table") {
        return extractTableLayerProperties(
          layer,
          layerWidth,
          layerHeight,
          rotation,
          transformOrigin,
          scaleValue,
          tableCssProperties,
        );
      } else if (layer.type === "line") {
        return extractLineLayerProperties(
          layer,
          layerWidth,
          layerHeight,
          rotation,
          transformOrigin,
          scaleValue,
        );
      }
    }
  });

  labelJson = {
    canvasDetails: {
      width: dimensions.width ? dimensions?.width.toFixed(1) : 600,
      height: dimensions.height ? dimensions?.height.toFixed(1) : 500,
      unit: dimensions.unit ? dimensions?.unit : "px",
      bleed,
      margin,
      canvasBorderRadius: canvasProperties,
      bleedVisible,
      marginVisible,
    },
    quillDefaultValues,
    access: "*",
    layers: newLayers,
    documentDetails: {
      documentName,
    },
  };

  if (!isUndoTriggered) {
    const thumbnail = await convertHtmlToImage("scena-viewport");
    setTriggerDropdown?.(false); // close dropdown if the function is provided
    editorRef?.current?.onSave(labelJson, thumbnail || undefined);
  } else {
    if (setUndoStack && undoStack) {
      setUndoStack([...undoStack, labelJson]);
    }
  }
};
