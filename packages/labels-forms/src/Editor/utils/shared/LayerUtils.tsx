import ReactQuill from "react-quill";
import { createLayer } from "../../components/managers/LayerManager";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  CreateTextLayerOptions,
  ScenaElementLayer,
  ScenaElementLayerGroup,
} from "../../types";
import { StoreValue } from "@scena/react-store";
import { barcodeTextStyles, defaultLayerStyles } from "../../consts";

export const deleteLayers = (
  selectedLayers: (ScenaElementLayer | ScenaElementLayerGroup)[],
  layerStore: StoreValue<ScenaElementLayer[]>,
) => {
  // Function to recursively delete layers
  const recursivelyDeleteLayers = (layer: any, layers: any[]): any[] => {
    if (
      layer?.type === "group" &&
      layer?.children &&
      layer?.children?.length > 0
    ) {
      // Process each child within a group
      layer.children.forEach((child: any) => {
        layers = recursivelyDeleteLayers(child, layers);
      });
    } else {
      // Filter out the layer to be deleted
      layers = layers.filter((l: any) => l.id !== layer.id);
    }
    return layers;
  };

  // Start with the current layers in the store
  let updatedLayers = layerStore.value;

  // Apply recursive deletion for each selected layer
  selectedLayers.forEach((selectedLayer: any) => {
    updatedLayers = recursivelyDeleteLayers(selectedLayer, updatedLayers);
  });

  // Return the updated layers for further use
  return updatedLayers;
};

// Recursive function to copy and update the group and its children
const copyAndUpdate = (
  group: any,
  parentGroupId: string | null = null,
  parentScope: string[] = [],
) => {
  let newGroup;
  const newLayerRef = React.createRef();

  // Generate a new ID for the group
  const newId = uuidv4();
  if (group.type === "group") {
    // Merge the parent scope with the current group's scope
    const newScope = parentGroupId
      ? [...parentScope, parentGroupId]
      : [...group.scope];

    // Copy the group and update its id and scope
    newGroup = { ...group, id: newId, scope: newScope };
    // If the group has children, process each child
    if (newGroup.children && newGroup.children.length > 0) {
      newGroup.children = newGroup.children.map((child: any) => {
        // For each child, if it's a group, recursively copy and update it
        // If it's a layer, update its scope with the new group id and parent scope
        return copyAndUpdate(child, newId, newScope);
      });
    }
  } else {
    // If it's a layer, update its scope with the new parent group id and parent scope
    const newScope = parentGroupId
      ? [...parentScope, parentGroupId]
      : [...group.scope];

    if (group.jsx.type === "img") {
      const imageSrc = group?.jsx?.props?.src;
      newGroup = createLayer({
        id: newId,
        type: "image",
        title: "image",
        style: {
          width: group.style.width,
          height: group.style.height,
          position: "absolute",
        },
        jsx: <img src={imageSrc} />,
      });
    } else if (group.jsx && group.jsx.props && group.jsx.props.children) {
      //Fetching the old layer contents along with its formatting options
      const oldQuillRef = group.jsx.props.children.ref;
      let oldLayerContentsWithFormatting;

      if (oldQuillRef?.current) {
        const quillInstance = oldQuillRef.current.getEditor();
        oldLayerContentsWithFormatting = quillInstance.getContents();
      }

      if (group.jsx.type === "svg") {
        const newSvgRef = React.createRef();

        newGroup = { ...group, id: newId, scope: newScope, ref: newSvgRef };
      } else {
        const height = group.ref.current.clientHeight;
        const width = group.ref.current.clientWidth;
        const metaData = group.metaData;
        //Creating the new layer with the contents and formatting of the previous layer
        newGroup = createLayer({
          id: newId,
          title: "text",
          metaData,
          type: "layer",
          scope: newScope,
          style: {
            position: "absolute",
            display: "inline-block", // Change from 'grid' to 'inline-block'
            placeContent: "center",
          },
          jsx: (
            <div
              style={{
                width,
                height,
                padding: "10px",
              }}
            >
              <ReactQuill
                ref={newLayerRef as any}
                value={oldLayerContentsWithFormatting}
                modules={{ toolbar: false }}
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
          ),
        });

        //the item property contains positioning of the elements inside the group;

        newGroup = { ...newGroup, item: group.item };
      }
    } else {
      newGroup = { ...group, id: newId, scope: newScope };
    }
  }
  return newGroup;
};

// Function to extract layers and groups from the nested structure
export const extractLayersAndGroups = (
  group: ScenaElementLayerGroup | ScenaElementLayer,
  //applying ScenaElementLayer[] gives overload error
  //'type ScenaElementLayer cannot be assigned to type never'
  layers: any = [],
  groups: any = [],
) => {
  if (group.type === "group") {
    groups.push(group);
    group.children.forEach((child: any) =>
      extractLayersAndGroups(child, layers, groups),
    );
  } else {
    layers.push(group);
  }
  return { layers, groups };
};

// Function to copy a group with a new ID and update the store
export const copyGroupWithNewId = (
  originalGroup: ScenaElementLayerGroup | ScenaElementLayer,
) => {
  const copiedGroup = copyAndUpdate(originalGroup);
  const { layers, groups } = extractLayersAndGroups(copiedGroup);

  return {
    copiedGroup,
    layers,
    groups,
  }; // Return the copied group structure
};

// Recursive function to empty the scope property of the group and its children
const emptyScope = (group: ScenaElementLayerGroup | ScenaElementLayer) => {
  // Set the scope to an empty array
  group.scope = [];

  if (group.type === "group" && group.children) {
    // If the group has children, process each child
    group.children.forEach((child) => {
      // Recursively empty the scope of each child
      emptyScope(child);
    });
  }
};

// Function to ungroup a group by emptying the scope and update the store
export const ungroupGroup = (
  originalGroup: ScenaElementLayerGroup | ScenaElementLayer,
) => {
  // Empty the scope of the original group and its children
  emptyScope(originalGroup);
  const { layers, groups } = extractLayersAndGroups(originalGroup);

  return {
    originalGroup, // The original group with empty scope
    layers,
    groups,
  };
};

// Enum for layer types
enum LayerType {
  Shape = "shape",
  Image = "image",
  Group = "group",
  Line = "line",
}

// Enum for image titles
enum ImageTitle {
  Pictogram = "pictogram",
  Image = "image",
  Barcode = "barcode",
  QRCode = "qrcode",
  Text = "text",
}

// Enum for general titles
enum GeneralTitle {
  Text = "text",
  Table = "table",
}

export const identifyLayer = (selectedLayer: any) => {
  if (!selectedLayer || selectedLayer.length === 0) {
    return undefined; // Optionally throw an error if an empty array is unexpected
  }

  const layer = selectedLayer[0];

  if (!layer || !("type" in layer)) {
    return undefined; // Safeguard against invalid layers
  }

  // Mapping for layer titles
  const typeMapping: { [key: string]: string | undefined } = {
    [ImageTitle.Pictogram]: LayerType.Shape,
    [ImageTitle.Image]: LayerType.Image,
    [ImageTitle.Barcode]: ImageTitle.Barcode,
    [ImageTitle.QRCode]: ImageTitle.QRCode,
    [ImageTitle.Text]: GeneralTitle.Text,
  };

  // Check if the type is 'line' and return 'LayerType.Shape'
  if (layer.type === "line") {
    return LayerType.Line;
  }

  // Handle different layer types
  if (layer.type === LayerType.Shape) {
    return LayerType.Shape;
  }

  if (layer.type === LayerType.Image && layer.title) {
    return typeMapping[layer.title] || undefined;
  }

  if (
    layer.type === LayerType.Group &&
    layer.children &&
    layer.children.length === 1
  ) {
    const childTitle = layer.children[0].title;
    return typeMapping[childTitle] || undefined;
  }

  // Handle 'title' property if 'type' is not conclusive
  if (
    "title" in layer &&
    [GeneralTitle.Text, GeneralTitle.Table].includes(layer.title)
  ) {
    return layer.title;
  }

  // Return undefined or a default value if no conditions are met
  return undefined;
};

//For generating text layer

export const createTextLayer = ({
  layerId,
  ref,
  isBarcodeText,
  isAutoScaleEnabled = true, // Default value
  textHTML,
  useBarcodeData,
  barcodeValues, // Optional for barcode layers
  translateY = 0, // Default value for translateY
}: CreateTextLayerOptions) => {
  const value = isBarcodeText
    ? useBarcodeData
      ? barcodeValues?.barcodeData
      : textHTML || barcodeValues?.barcodeData
    : textHTML || "";
  const newLayer = createLayer(
    {
      type: "text",
      id: layerId,
      metaData: {
        isAutoScaleEnabled,
        isStandaloneText: !isBarcodeText, // Standalone if not barcode text
        isBarcodeText,
      },
      scope: [layerId],
      title: "text",
      style: useBarcodeData
        ? barcodeTextStyles
        : defaultLayerStyles.TEXT_STYLES,
      jsx: (
        <div
          style={{
            width: "auto",
            height: "auto",
            padding: useBarcodeData ? "10px" : "0px",
          }}
        >
          <ReactQuill
            ref={ref}
            placeholder="Enter some text"
            value={value || ""} // Using condition to determine value
            modules={{ toolbar: false }}
            style={{
              width: "auto",
              height: "auto",
            }}
            readOnly={isBarcodeText} // Read-only if it's barcode text
          />
        </div>
      ),
    },
    translateY,
  ); // Pass translateY as the second argument

  return newLayer || {};
};

export const getTransformOriginForLayer = (layer: ScenaElementLayer) => {
  let transformOrigin;
  // const rotation = (layer as any).rotation;
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

  //check for existing values
  if (layer.item.items[0].properties.transform?.translate?.value) {
    transformOrigin =
      layer.item.items[0].properties.transform?.translate?.value?.map(
        (value: string) => parseFloat(value),
      ) || [0, 0];
  } else {
    transformOrigin = layer.item.items[0].properties.transform?.translate.map(
      (value: string) => parseFloat(value),
    ) || [0, 0];
  }
  return transformOrigin;
};
