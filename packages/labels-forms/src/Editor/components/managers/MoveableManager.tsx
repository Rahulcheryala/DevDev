/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import Moveable, {
  ElementGuidelineValueOption,
  MoveableRefType,
  OnBeforeResize,
  OnChangeTargets,
  OnClick,
  OnClickGroup,
  OnDragEnd,
  OnRender,
  OnRenderEnd,
  OnRenderGroup,
  OnRenderGroupEnd,
  OnRenderGroupStart,
  OnRenderStart,
  OnResize,
  SnapDirections,
} from "react-moveable";
import {
  parseCssText,
  getContentElement,
  getNormalizedRotationAngle,
} from "../../utils/utils";
import { DimensionViewable } from "../../components/editor/ables/DimensionViewable";
import { DeleteButtonViewable } from "../../components/editor/ables/DeleteButtonViewable";
import {
  useStoreState,
  useStoreStateSetValue,
  useStoreStateValue,
  useStoreValue,
} from "@scena/react-store";
import {
  $actionManager,
  $layerManager,
  $editor,
  $historyManager,
  $horizontalGuidelines,
  $infiniteViewer,
  $layers,
  $memoryManager,
  $selectedTool,
  $selectedLayers,
  $selecto,
  $verticalGuidelines,
  $groupOrigin,
  $anchorValue,
  $moveable,
  $selectedPageId,
} from "../../stores/stores";
import { $alt, $shift } from "../../stores/keys";
import { RotationAngleViewable } from "../../components/editor/ables/RotationAngleViewable";
import { useLayers } from "../../context/LayersContext";
import { useEffect, useState } from "react";
import { toolBarItems } from "../../consts";
import useUndoRedo from "../../hooks/useUndoRedo";
import { useEditor } from "../../context/EditorContext";
import { identifyLayer } from "../../utils/shared/LayerUtils";
import { handleLineStyleUpdate } from "../../utils";
import { updateLineProperties } from "../../utils/line";

const SNAP_DIRECTIONS: SnapDirections = {
  top: true,
  left: true,
  right: true,
  center: true,
  middle: true,
  bottom: true,
};

export type ScenaMoveableMangerProps = {
  ZoomCanvas: number;
};

export const MoveableManager = React.forwardRef<
  Moveable,
  ScenaMoveableMangerProps
>((props, ref) => {
  //#5451 -> To Enhance Handles for Improved Usability and Aesthetics
  const [layerState, setLayerState] = useState({
    isDragging: false,
    isResizing: false,
  });

  const [layerDraggable, setLayerDraggable] = useState(true);
  const [layerResizable, setLayerResizable] = useState(true);
  const isShift = useStoreStateValue($shift);

  // const isMeta = useStoreStateValue($meta);
  const altStore = useStoreValue($alt);

  const [selectedTool, setSelectedTool] = useStoreState($selectedTool);
  const verticalGuidelines = useStoreStateValue($verticalGuidelines);
  const horizontalGuidelines = useStoreStateValue($horizontalGuidelines);
  const groupOrigin = useStoreStateValue($groupOrigin);

  const layers = useStoreStateValue($layers);
  const selectedLayers = useStoreStateValue($selectedLayers);

  const infiniteViewerRef = useStoreStateValue($infiniteViewer);
  const selectoRef = useStoreStateValue($selecto);
  const editorRef = useStoreStateValue($editor);

  const actionManager = useStoreStateValue($actionManager);
  const historyManager = useStoreStateValue($historyManager);
  const layerManager = useStoreStateValue($layerManager);
  const memoryManager = useStoreStateValue($memoryManager);
  const moveable = useStoreStateValue($moveable);
  const [enabledDrag, setEnabledDrag] = useState(true);

  const targetList = layerManager.toTargetList(selectedLayers);
  const selectedTargets = targetList.displayed();
  const visibleLayers = layerManager.filterDisplayedLayers(layers);
  const flattenSelectedLayers = layerManager.toFlatten(selectedLayers);
  const anchorValueFromStore = useStoreStateValue($anchorValue);
  const setSelectedPageId = useStoreStateSetValue($selectedPageId);

  const { addToUndo } = useUndoRedo();
  const { isAutoScaleEnabled, setSelectedLayerRotationAngle, fixRatio } =
    useLayers();
  const [isLine, setIsLine] = useState<boolean>(false);
  const { toggleSnap } = useEditor();
  const elementGuidelines: Array<
    ElementGuidelineValueOption | MoveableRefType<Element>
  > = [
    ".scena-viewport",
    ...visibleLayers
      .filter((layer) => !flattenSelectedLayers.includes(layer))
      .map((layer) => layer.ref),
  ];

  useEffect(() => {
    actionManager.on("table.drag", ({ enabled }) => {
      setEnabledDrag(enabled);
    });
  }, []);

  useEffect(() => {
    if (targetList.raw()?.length) {
      const detailList = targetList.raw();
      const metaDataList = detailList.map((data) => {
        if (data?.type !== "single") {
          // setLayerDraggable
          return layerManager.groups
            .filter((g) => g.id === data.id)
            .map((g) => g.metaData);
        }
        return null;
      });
      if (metaDataList?.filter((m) => !!m)?.length) {
        setLayerDraggable(
          metaDataList
            ?.filter((m) => !!m)
            .some((m) => !!(m as { [key: string]: any })?.draggable),
        );
        setLayerResizable(
          metaDataList
            ?.filter((m) => !!m)
            .some((m) => !!(m as { [key: string]: any })?.resizable),
        );
      } else {
        setLayerDraggable(true);
        setLayerResizable(true);
      }
    } else {
      setLayerDraggable(true);
      setLayerResizable(true);
    }
  }, [selectedLayers]);

  const updateDraggingState = (isDragging: boolean) => {
    setLayerState((prev) => ({
      ...prev,
      isDragging,
    }));
  };

  // This function sets the height of text Layer to 'auto'
  // making it Auto resizable according to text inside.
  function updateCssObject(layer: HTMLElement | SVGElement) {
    const { cssObject, widthValue, heightValue } = parseCssText(
      layer.style.cssText,
    );
    const layerIsTextBox = !!layer.querySelector(".quill");

    Object.assign(cssObject, {
      width: widthValue,
      height: layerIsTextBox ? "auto" : heightValue,
    });

    layer.style.cssText =
      Object.entries(cssObject)
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ") + ";";
  }

  useEffect(() => {
    const isLine =
      !!selectedLayers.length && identifyLayer(selectedLayers) === "line";
    setIsLine(isLine);
  }, [selectedLayers]);

  const getRenderDirections = () => {
    if (layerState.isDragging) return [];

    if (isAutoScaleEnabled) return ["se"];

    return isLine ? ["w", "e"] : ["nw", "n", "ne", "w", "e", "sw", "s", "se"];
  };
  const renderDirections = getRenderDirections();

  const getPageGroupId = (scope: Array<string> = []) => {
    if (!scope?.length) return null;
    const pageGroupAndSubgroupIdList = scope.filter((s) =>
      s.toLowerCase().includes("page-"),
    );
    const splitIdList = pageGroupAndSubgroupIdList.map((id) => id.split("-"));
    const subgroupSplitList = splitIdList.find((s) => s.length > 2);
    if (subgroupSplitList?.length) return subgroupSplitList.join("-");
    return pageGroupAndSubgroupIdList[0];
  };

  const handleDragEnd = async (e: OnDragEnd) => {
    updateDraggingState(false);
    const draggedElement = e.currentTarget.getDragElement();
    if (draggedElement) {
      const draggedElementBoundingRect = draggedElement.getBoundingClientRect();
      const currentLayer = layerManager.getLayerByElement(draggedElement);
      if (currentLayer) {
        const overlappingLayers = layerManager.layers.filter((l) => {
          const layerRect = l.ref.current?.getBoundingClientRect();
          return (
            layerRect &&
            draggedElementBoundingRect.left >= layerRect.left &&
            draggedElementBoundingRect.right <= layerRect.right &&
            draggedElementBoundingRect.top >= layerRect.top &&
            draggedElementBoundingRect.bottom <= layerRect.bottom
          );
        });
        const overLappingLayerScopeList = overlappingLayers
          .filter((l) => l.id && l.id !== currentLayer?.id)
          .map((l) => l.scope)
          .flat();
        const uniqueArray = Array.from(new Set(overLappingLayerScopeList));
        currentLayer.scope = uniqueArray;

        await editorRef.current?.setLayers(
          layerManager.layers.map((l) =>
            l.id === currentLayer.id ? currentLayer : l,
          ),
        );
        await editorRef.current?.setSelectedLayers([currentLayer]);
      }
    }
  };

  return (
    <Moveable
      ables={[DimensionViewable, DeleteButtonViewable, RotationAngleViewable]}
      ref={ref}
      target={selectedTargets}
      props={{
        dimensionViewable: true,
        deleteButtonViewable: true,
        rotationAngleViewable: true,
        copyButtonViewable: false,
      }}
      draggable={enabledDrag}
      // draggable={layerDraggable}
      originDraggable={anchorValueFromStore}
      originRelative={anchorValueFromStore}
      useAccuratePosition={true}
      useResizeObserver={true}
      useMutationObserver={true}
      rotateAroundControls={layerDraggable}
      pinchable={["rotatable"]}
      edge={layerDraggable}
      zoom={props.ZoomCanvas}
      throttleResize={1}
      clippable={selectedTool === "crop"}
      //For text input
      passDragArea={false}
      checkInput={false}
      throttleDragRotate={isShift ? 45 : 1}
      throttleRotate={isShift ? 45 : 1}
      keepRatio={isAutoScaleEnabled || fixRatio}
      resizable={layerResizable && (!isAutoScaleEnabled || fixRatio)}
      scalable={layerResizable && !fixRatio}
      rotatable={layerResizable}
      defaultGroupOrigin={groupOrigin}
      groupableProps={{
        keepRatio: true,
        clippable: false,
      }}
      renderDirections={renderDirections}
      onResize={(e: OnResize) => {
        e.target.style.width = `${e.width}px`;
        e.target.style.height = `${e.height}px`;
        e.target.style.transform = e.drag.transform;
      }}
      onDrag={() => updateDraggingState(true)}
      onDragEnd={handleDragEnd}
      onDragStart={(e) => {
        if (!layerDraggable) e.stopAble();
      }}
      onDragGroupStart={(e) => {
        if (!layerDraggable) e.stopAble();
      }}
      snappable={toggleSnap}
      snapDirections={SNAP_DIRECTIONS}
      elementSnapDirections={SNAP_DIRECTIONS}
      snapRotationThreshold={2}
      snapRotationDegrees={[0]}
      snapGap={false}
      isDisplayInnerSnapDigit={true}
      roundable={false}
      isDisplayShadowRoundControls={true}
      roundPadding={10}
      roundClickable={true}
      verticalGuidelines={verticalGuidelines}
      horizontalGuidelines={horizontalGuidelines}
      elementGuidelines={elementGuidelines as any}
      clipArea={true}
      clipVerticalGuidelines={[0, "50%", "100%"]}
      clipHorizontalGuidelines={[0, "50%", "100%"]}
      clipTargetBounds={true}
      defaultClipPath={memoryManager.get("crop") || "inset"}
      scrollContainer={() => infiniteViewerRef.current!.getContainer()}
      scrollThreshold={30}
      scrollThrottleTime={30}
      getScrollPosition={() => {
        const current = infiniteViewerRef.current!;

        return [
          current.getScrollLeft({ absolute: true }),
          current.getScrollTop({ absolute: true }),
        ];
      }}
      onChangeTargets={(e: OnChangeTargets) => {
        if (e.targets.length) {
          e.targets.forEach((layer) => {
            updateCssObject(layer);
          });
        }

        actionManager.act("changed.targets");
      }}
      onBeforeResize={(e: OnBeforeResize) => {
        e.setFixedDirection(altStore.value ? [0, 0] : e.startFixedDirection);
      }}
      onClick={(e: OnClick) => {
        actionManager.act("get.rect", { rect: moveable?.current!.getRect() });
        if (editorRef?.current?.isDocument && e.moveableTarget) {
          const targetLayer = layerManager.getLayerByElement(e.moveableTarget);
          if (targetLayer) {
            setSelectedPageId(getPageGroupId(targetLayer.scope));
          }
        }
        const target = e.inputTarget as any;
        updateCssObject(e.target);

        if (e.isDouble && target.isContentEditable) {
          const el = getContentElement(target);

          if (el) {
            el.focus();
          }
        } else if (e.isDouble) {
          setSelectedTool(toolBarItems.SHAPE);
        } else if (e.isTrusted) {
          selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget);
        }
      }}
      onClickGroup={(e: OnClickGroup) => {
        if (editorRef?.current?.isDocument && e.moveableTarget) {
          const targetLayer = layerManager.getLayerByElement(e.moveableTarget);
          if (targetLayer) {
            setSelectedPageId(getPageGroupId(targetLayer.scope));
          }
        }
        if (!e.moveableTarget) {
          editorRef.current!.setSelectedLayers([]);
          return;
        }
        if (e.isDouble) {
          const nextChilds = layerManager.selectSubChilds(
            selectedTargets,
            e.moveableTarget,
          );

          editorRef.current!.setSelectedLayers(
            layerManager.toLayerGroups(nextChilds),
          );
          return;
        } else if (e.isTrusted) {
          selectoRef.current!.clickTarget(e.inputEvent, e.moveableTarget);
        }
      }}
      onRenderStart={(e: OnRenderStart) => {
        e.datas.prevData = layerManager.getCSSByElement(e.target);
      }}
      onRender={(e: OnRender) => {
        e.datas.isRender = true;

        //Finding the rotation angle and keeping it within 0-360 range
        const angle = getNormalizedRotationAngle(e.transform);

        if (angle !== null) {
          setSelectedLayerRotationAngle(Number(angle));
        }

        e.target.style.cssText += e.cssText;

        // If line is selected then do not allow height value to be set and set the line width value
        isLine &&
          handleLineStyleUpdate(e.target as SVGElement, updateLineProperties);

        layerManager.setCSSByElement(e.target, e.cssText);
        // Updating rect in real time in side drawer
        // (Ex-> rotation, width, height) of the layer
        editorRef.current?.moveableRef.current?.updateRect();
        actionManager.act("render.end");
      }}
      onRenderEnd={(e: OnRenderEnd) => {
        if (!e.datas.isRender) {
          return;
        }
        actionManager.requestAct("render.end");
        const layer = layerManager.getLayerByElement(e.target);
        updateCssObject(e.target);

        if (!layer) {
          return;
        }

        addToUndo();
        historyManager.addHistory("render", {
          infos: [
            {
              layer,
              prev: e.datas.prevData,
              next: layerManager.getFrame(layer).toCSSObject(),
            },
          ],
        });
      }}
      onRenderGroupStart={(e: OnRenderGroupStart) => {
        e.datas.prevDatas = e.targets.map((target) =>
          layerManager.getCSSByElement(target),
        );
      }}
      onRenderGroup={(e: OnRenderGroup) => {
        e.datas.isRender = true;

        //Finding the rotation angle and keeping it within 0-360 range
        const angle = getNormalizedRotationAngle(e.transform);

        if (angle !== null) {
          setSelectedLayerRotationAngle(Number(angle));
        }

        e.events.forEach((ev) => {
          ev.target.style.cssText += ev.cssText;
          layerManager.setCSSByElement(ev.target, ev.cssText);
        });
      }}
      onRenderGroupEnd={(e: OnRenderGroupEnd) => {
        if (!e.datas.isRender) {
          return;
        }
        actionManager.requestAct("render.end");
        const prevDatas = e.datas.prevDatas;
        const infos = e.targets.map((target, i) => {
          const layer = layerManager.getLayerByElement(target)!;

          return {
            layer,
            prev: prevDatas[i],
            next: layerManager.getFrame(layer).toCSSObject(),
          };
        });

        historyManager.addHistory("render", {
          infos,
        });
      }}
    ></Moveable>
  );
});

MoveableManager.displayName = "MoveableManager";
