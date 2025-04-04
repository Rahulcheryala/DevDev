import {
  ClearGuides,
  LayersGrouping,
  SelectAll,
  TogglePrintPreview,
  ToggleStudioControl,
  ScenaElementLayer,
  ScenaElementLayerGroup,
  EditorManagerInstance,
} from "../types";
import { extractLayersAndGroups } from "./shared/LayerUtils";

export const toggleGrid = (
  setShowGrid: (value: React.SetStateAction<boolean>) => void,
) => {
  setShowGrid((prevShowGrid) => !prevShowGrid);
};

export const clearGuides = ({
  horizontalGuidesRef,
  verticalGuidesRef,
}: ClearGuides) => {
  horizontalGuidesRef?.current?.loadGuides([]);
  verticalGuidesRef?.current?.loadGuides([]);
};

export const selectAll = ({ editorRef, allLayers }: SelectAll) => {
  editorRef.current!.setSelectedLayers(allLayers);
};

export const unselectLayers = (
  editorRef: React.MutableRefObject<EditorManagerInstance | undefined>,
) => {
  editorRef.current!.setSelectedLayers([]);
};

export const toggleStudioControl = ({
  selectedTool,
  setSelectedTool,
}: ToggleStudioControl) => {
  selectedTool === "studio" ? setSelectedTool("") : setSelectedTool("studio");
};

export const togglePrintPreview = ({
  actionManager,
  allLayers,
}: TogglePrintPreview) => {
  actionManager.act("trigger.preview", { allLayers });
};
export const ungroupLayers = async ({
  selectedLayersStore,
  layerManager,
  setLayers,
}: LayersGrouping) => {
  const selectedLayers = selectedLayersStore.value;
  const newGroupId = Date.now().toString();

  if (selectedLayers.length === 1 && selectedLayers[0].type === "group") {
    const groupToUngroup = selectedLayers[0] as ScenaElementLayerGroup;
    const childrenToPromote = groupToUngroup.children;

    const removeGroupScope = (
      item: ScenaElementLayer | ScenaElementLayerGroup,
    ) => {
      item.scope = item.scope.filter((scope) => scope !== groupToUngroup.id);
    };

    const updateChildrenScope = (
      children: (ScenaElementLayer | ScenaElementLayerGroup)[],
    ) => {
      children.forEach((child) => {
        removeGroupScope(child);
        if (child.type === "group") {
          updateChildrenScope(child.children);
        }
      });
    };

    updateChildrenScope(childrenToPromote);

    // Extract layers and groups from the children to be promoted
    const { layers: newLayers, groups: newGroups } = extractLayersAndGroups({
      type: "group",
      id: newGroupId,
      children: childrenToPromote,
    } as ScenaElementLayerGroup);

    // Remove the ungrouped group from existing groups
    const updatedGroups = layerManager.groups.filter(
      (group) => group.id !== groupToUngroup.id,
    );

    // Combine and deduplicate layers and groups
    const uniqueLayers = Array.from(
      new Set([...layerManager.layers, ...newLayers]),
    );
    const uniqueGroups = Array.from(new Set([...updatedGroups, ...newGroups]));

    await setLayers(uniqueLayers, uniqueGroups);
  }
};

export const groupLayers = async ({
  selectedLayersStore,
  layerManager,
  setLayers,
}: LayersGrouping) => {
  const selectedLayers = selectedLayersStore.value;
  if (selectedLayers.length > 1) {
    const newGroupId = Date.now().toString();
    const newChildren: (ScenaElementLayer | ScenaElementLayerGroup)[] = [];
    const newGroupScope: string[] = [];

    const updateScope = (item: ScenaElementLayer | ScenaElementLayerGroup) => {
      if (!item.scope.includes(newGroupId)) {
        item.scope.push(newGroupId);
      }
      // Collect unique scopes for the new group
      item.scope.forEach((scopeItem) => {
        if (!newGroupScope.includes(scopeItem)) {
          newGroupScope.push(scopeItem);
        }
      });
    };

    selectedLayers.forEach((layer) => {
      updateScope(layer);

      if (layer.type === "group") {
        // If it's a group, update scopes of all its children recursively
        const updateChildrenScope = (
          children: (ScenaElementLayer | ScenaElementLayerGroup)[],
        ) => {
          children.forEach((child) => {
            updateScope(child);
            if (child.type === "group") {
              updateChildrenScope(child.children);
            }
          });
        };
        updateChildrenScope(layer.children);
      }

      newChildren.push(layer);
    });

    const newGroup: Partial<ScenaElementLayerGroup> = {
      type: "group",
      id: newGroupId,
      scope: [],
      children: newChildren,
    };
    const { layers } = extractLayersAndGroups(
      newGroup as ScenaElementLayerGroup,
    );
    // For layers
    const uniqueLayers = Array.from(
      new Set([...layerManager.layers, ...layers]),
    );

    // For groups
    const uniqueGroups = Array.from(
      new Set([...layerManager.groups, newGroup]),
    );
    await setLayers(uniqueLayers, uniqueGroups);
  }
};
// this function extracts width and height in moveable manager inside
// onRender and fix the height to 11px and call the update line function to update the
// SVG
export const extractWidthAndReplaceHeight = (
  styleString: string,
): { width: string | null; updatedString: string } => {
  // Extract the width value
  const widthMatch = styleString.match(/width:\s*(\d+px)/);
  const widthValue = widthMatch ? widthMatch[1] : null;

  // Replace the height value with 0
  const updatedString = styleString.replace(/height:\s*\d+px/, "height: 11px");

  return { width: widthValue, updatedString };
};

export const handleLineStyleUpdate = (
  element: SVGElement,
  updateLineProperties: (
    element: SVGElement,
    property: string,
    value: number,
  ) => void,
) => {
  // Extract width and replace height from the element's style
  const { width, updatedString } = extractWidthAndReplaceHeight(
    element.style.cssText,
  );

  // Append the updated styles to the element's style
  element.style.cssText += updatedString;

  // Parse the width and reduce it by 20
  const widthValue = width ? Number(width.replace("px", "")) - 20 : 0;

  // Update the shape properties, passing the new width value
  updateLineProperties(element, "width", widthValue || 210);
};
