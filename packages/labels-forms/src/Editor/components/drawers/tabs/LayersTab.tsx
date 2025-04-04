import * as React from "react";
import Folder, { FileProps } from "@scena/react-folder";
import { ScenaElementLayer, ScenaElementLayerGroup } from "../../../types";
import {
  useStoreStateSetPromise,
  useStoreStateValue,
  useStoreValue,
} from "@scena/react-store";
import {
  $editor,
  $layerManager,
  $layers,
  $selectedLayers,
} from "../../../stores/stores";
import {
  flattenLayerGroup,
  isArrayContains,
  prefix,
} from "../../../utils/utils";
import { styled } from "react-css-styled";
import { FolderIcon, InvisibleIcon, LayerIcon, VisibleIcon } from "../icons";
import { FOLDER_DEFAULT_STYLE } from "./FolderStyls";
import { ungroupGroup } from "../../../utils/shared/LayerUtils";
import useUndoRedo from "../../../hooks/useUndoRedo";
import { SCENA_LAYER_SEPARATOR } from "../../../consts";

const LayersElement = styled(
  "div",
  `
${FOLDER_DEFAULT_STYLE}

.scena-folder-file {
    position: relative;
    box-sizing: border-box;
    padding: 5px 0px;
    display: inline-block;
    width: 100%;
    font-size: 12px;
    font-weight: bold;
}

.scena-layer.scena-layer-invisible {
    color: #9aa;
}
.scena-layer.scena-layer-invisible svg, .scena-layer.scena-layer-invisible path {
    fill: #9aa;
    stroke: #9aa;
}

.scena-folder-file-name {
    width: 100%;
}
.scena-folder-file:hover .scena-layer-extra {
    opacity: 1;
}
.scena-layer {
    display: flex;
    align-content: center;
}
.scena-layer-icon {
    width: 16px;
    padding: 2px;
    box-sizing: border-box;
    margin-right: 5px;
}
.scena-layer-title {
    flex: 1;
}
.scena-layer-extra {
    margin-right: 5px;
    opacity: 0;
}

.scena-layer-extra svg {
    width: 18px;
    height: 18px;
    fill: #eee;
    padding: 2px;
    box-sizing: border-box;
}
.scena-layer-invisible .scena-layer-extra.scena-layer-invisible-extra {
    opacity: 1;
}
`,
);

// layerProperties 지원 가능성?

function Layer({
  name,
  value,
  onHandleHide,
}: FileProps<ScenaElementLayer | ScenaElementLayerGroup> & {
  onHandleHide: () => void;
}) {
  const layerManager = useStoreStateValue($layerManager);
  const [visible, setVisible] = React.useState(true);
  let iconJsx: JSX.Element | null = <LayerIcon />;
  const selectedLayersStore = useStoreValue($selectedLayers);
  const setLayersPromise = useStoreStateSetPromise($layers);

  if (value.type === "group") {
    iconJsx = <FolderIcon />;
  }

  React.useEffect(() => {
    isVisible(value);
  }, []);

  const isVisible = (layer: any) => {
    if (value.type != "group") {
      const element = layer.ref.current!;
      if (element?.style) {
        const cssString = element.style.cssText;
        // Step 1: Split the CSS string into individual declarations
        // Filter Boolean removes any empty strings resulting from trailing semicolons
        const declarations = cssString.split(";").filter(Boolean);

        // Step 2 & 3: Convert each declaration into a key-value pair and trim whitespace
        const cssObject = declarations.reduce((obj: any, declaration: any) => {
          const [property, value] = declaration
            .split(":")
            .map((item: any) => item.trim());
          obj[property] = value;
          return obj;
        }, {});

        // Step 4: Check the `display` property in the resulting object
        const isVisible = cssObject.visibility === "visible";
        setVisible(isVisible);
      } else {
        setVisible(true);
      }
    }
  };

  const handleHide = () => {
    // Helper function to toggle visibility
    const toggleVisibility = (element: any) => {
      const cssString = element.style.cssText;
      const declarations = cssString.split(";").filter(Boolean);
      const cssObject = declarations.reduce((obj: any, declaration: any) => {
        const [property, value] = declaration
          .split(":")
          .map((item: any) => item.trim());
        obj[property] = value;
        return obj;
      }, {});

      const hasDisplayNone = cssObject.visibility === "hidden";
      if (!hasDisplayNone) {
        element.style.cssText += "visibility:hidden;";
      } else {
        element.style.cssText += "visibility:visible;";
      }
    };

    // Recursive function to process each element
    const processElement = (value: any) => {
      if (value.type === "group") {
        // Toggle the visibility state

        if (value.children.length) {
          value.children.forEach((child: any) => {
            if (child.type === "group") {
              // If the child is a group, recursively process it
              processElement(child);
            } else {
              // If the child is not a group, toggle its visibility
              const element = child.ref.current;
              if (element) {
                // setVisibility(element);
                toggleVisibility(element);
              }
            }
          });
        }
      } else {
        // If the value is not a group, toggle its visibility
        const element = value.ref.current;
        if (element) {
          toggleVisibility(element);
        }
      }
    };

    // Start processing with the initial value
    processElement(value);
    onHandleHide();
  };
  const setLayers = React.useCallback(
    (layers: ScenaElementLayer[], groups = layerManager.groups) => {
      layerManager.setLayers(layers, groups);
      return setLayersPromise(layers).then((complete) => {
        layerManager.calculateLayers();
        return complete;
      });
    },
    [],
  );
  const handleUngroup = async () => {
    const selectedLayer = selectedLayersStore.value;
    const { layers, groups } = ungroupGroup(selectedLayer[0]);

    // Filter out the selected group from the layerManager's groups
    const filteredGroups = layerManager.groups.filter(
      (group) => group.id !== selectedLayer[0].id,
    );

    // Combine the existing layers with the ungrouped layers
    // Ensure that you're not adding duplicates
    const combinedLayers = [...layerManager.layers, ...layers].reduce(
      (acc, current) => {
        const x = acc.find((item: any) => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      },
      [],
    );

    // Combine the existing groups with the ungrouped groups
    // Ensure that you're not adding duplicates
    const combinedGroups = [...filteredGroups, ...groups].reduce(
      (acc, current) => {
        const x = acc.find((item: any) => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      },
      [],
    );

    // Update the layerManager with the new layers and groups
    await setLayers(combinedLayers, combinedGroups);
  };
  return (
    <div className={prefix("layer", !visible ? "layer-invisible" : "")}>
      <div className={prefix("layer-icon")}>{iconJsx}</div>
      <div className={prefix("layer-title")}>
        {name || (value.type === "group" ? "(Group)" : "(Layer)")}
      </div>
      <div className="flex flex-row space-x-2 items-center mr-4">
        <div
          onClick={() => handleUngroup()}
          style={{
            display: !value.scope.length ? "none" : "flex",
          }}
          className={prefix(
            "layer-extra cursor-pointer",
            !visible ? "layer-invisible-extra" : "layer-visible-extra",
          )}
        >
          ungroup
        </div>
        <div
          onClick={() => handleHide()}
          className={prefix(
            "layer-extra",
            !visible ? "layer-invisible-extra" : "layer-visible-extra",
          )}
        >
          {!visible ? <InvisibleIcon /> : <VisibleIcon />}
        </div>
      </div>
    </div>
  );
}

export default function LayersTab() {
  const editorRef = useStoreStateValue($editor);
  const { addToUndo } = useUndoRedo();

  const layerManager = useStoreStateValue($layerManager);
  const [folded, setFolded] = React.useState<string[]>([]);
  const children = layerManager.findChildren();
  const layers = layerManager.use();
  const selectedLayers = useStoreStateValue($selectedLayers);
  // Add a state variable to trigger re-renders
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const selected =
    (selectedLayers
      .map((layer) => {
        return [...layer.scope, layer.id].join(SCENA_LAYER_SEPARATOR);
      })
      .filter(Boolean) as string[]) ?? [];

  // Pass a new prop to Layer to trigger the state change

  // Pass a new prop to Layer to trigger the state change

  const triggerRerender = () => {
    forceUpdate();
  };

  return (
    <LayersElement>
      <Folder<ScenaElementLayer | ScenaElementLayerGroup>
        scope={[]}
        infos={children}
        multiselect={true}
        //dropdown trigger
        folded={folded}
        //toggles layer dragging
        isMove={true}
        isMoveChildren={true}
        nameProperty="title"
        idProperty="id"
        isPadding={true}
        selectedColor="var(--scena-editor-color-folder-selected)"
        iconColor="var(--scena-editor-color-folder-fold)"
        fontColor="var(--scena-editor-color-text)"
        backgroundColor="transparent"
        borderColor="transparent"
        pathSeperator={SCENA_LAYER_SEPARATOR}
        childrenProperty={React.useCallback(
          (value: ScenaElementLayer | ScenaElementLayerGroup) => {
            if (value.type === "group") {
              return value.children;
            } else {
              return [];
            }
          },
          [],
        )}
        selected={selected}
        // onSelect={this.onSelect}
        // checkMove={this.checkMove}
        FileComponent={React.useCallback(
          (props: FileProps) => (
            <Layer {...props} onHandleHide={triggerRerender} />
          ),
          [triggerRerender],
        )}
        //It checks whether the hovered value is a group or a layer
        checkMove={(e) => {
          // if (e.depth === 0) {
          //     return false;
          // }else if()
          return !e.parentInfo || e.parentInfo.value.type === "group";
        }}
        onMove={(e) => {
          const selectedInfos = e.selectedInfos;
          const scope = e.parentInfo?.path || [];
          const flattenPrevInfo = e.flattenPrevInfo;

          const nextLayers = layers.filter((layer) => {
            const layerPath = [...layer.scope, layer.id];

            if (
              selectedInfos.some((info) =>
                isArrayContains(info.path, layerPath),
              )
            ) {
              return false;
            }
            return true;
          });

          const selectedLayers: ScenaElementLayer[] = [];

          selectedInfos.forEach(({ value }) => {
            if (value.type === "group") {
              const groupScope = value.scope;
              const flattenLayers = flattenLayerGroup(value);

              flattenLayers.forEach((layer) => {
                layer.scope.splice(0, groupScope.length, ...scope);
              });
              selectedLayers.push(...flattenLayers);
            } else {
              value.scope = scope;
              selectedLayers.push(value);
            }
          });
          let prevIndex = 0;

          if (flattenPrevInfo) {
            const flattenInfos = e.flattenInfos;

            let lastIndex = flattenInfos.findIndex((info) => {
              return info.id === flattenPrevInfo.id;
            });

            for (; lastIndex >= 0; --lastIndex) {
              const info = flattenInfos[lastIndex];
              const value = info.value;

              if (value.type === "group") {
                continue;
              } else {
                prevIndex =
                  nextLayers.findIndex((layer) => layer.id === value.id) + 1;
                break;
              }
            }
          }

          nextLayers.splice(prevIndex, 0, ...selectedLayers);

          editorRef.current!.changeLayers(nextLayers);
          setFolded(e.nextFolded);

          editorRef.current!.setSelectedLayers(
            selectedInfos.map((info) => info.value),
          );
          addToUndo();
        }}
        //set selected layer globally
        onSelect={(e) => {
          editorRef.current!.setSelectedLayers(
            e.selectedInfos.map((info) => info.value),
          );
        }}
        // dropdown
        onFold={(e) => {
          setFolded(e.folded);
        }}
      />
    </LayersElement>
  );
}
