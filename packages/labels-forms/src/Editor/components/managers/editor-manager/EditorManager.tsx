import React, { useEffect, useState, RefObject } from "react";
import Viewport from "../../editor/Viewport";
import {
  checkInput,
  getParnetScenaElement,
  prefix,
} from "../../../utils/utils";
import {
  EDITOR_CSS,
  predefinedZoomLevels,
  toolBarItems,
} from "../../../consts";
import {
  useStoreRoot,
  useStoreStateValue,
  useStoreValue,
} from "@scena/react-store";
import { $editor, $layers, $darkMode } from "../../../stores/stores";
import { InfiniteViewerManager } from "../InfiniteViewerManager";
import { SelectoManager } from "../SelectoManager";
import { MoveableManager } from "../MoveableManager";
import { Tabs } from "../../drawers/Tabs";
import { registerHistoryTypes } from "../histories/histories";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { IEditorProps } from "../../../Editor";
import { useDPI } from "../../../hooks/useDpi";
import ToolBarV2 from "../../toolbar/ToolBar";
import RightSidebar from "../../RightSidebar";
import Footer from "../../Footer";
import { ConfigProvider } from "antd";
import EditorPreview from "../../preview/Preview";
import { initialTextValues } from "../../../utils/config";
import { styled } from "react-css-styled";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useComments } from "../../../context/CommentContext";
import {
  ScenaElementLayer,
  ScenaElementLayerGroup,
  TextType,
  CanvasProperties,
  CommentBox,
} from "../../../types";
import ZoomButton from "../../editor/components/ZoomButton";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";
import { configProviderConsts, EDITOR_CONFIG } from "../../../consts/editor";
import { handleSaveLabel } from "../../toolbar/utils/toolbar-utils";
import useGlobalKeydownListener from "./hooks/useGlobalKeydownListener";
import { addGridLines, removeGridLines } from "./utils/grid";
import {
  handleQuillSelectionChange,
  initializeQuillListener,
  initializeTableLayers,
  manageLayerFocusAndCleanup,
  setAndFocusQuillRef,
  setDefaultQuillInstances,
  handleZoomChange,
  handleZoomIn,
  handleZoomOut,
  preventZoom,
  getCursorStyle,
  getShortcuts,
  handleEditorCommentsClick,
  handleLayerSelection,
  loadLabelFromDatabase,
  InitializeUndo,
  handleDeleteLayer,
  duplicateLayer,
} from "./utils";
import { CanvasButtons, DisplayGuides, Comments, Drawers } from "./components";
import { useEditorState } from "./hooks/useEditorState";
import EditorPrint from "../../drawers/print";

const EditorElement = styled("div", EDITOR_CSS);

export default function EditorManager(props: IEditorProps) {
  const root = useStoreRoot();

  const [textFormatting, setTextFormatting] =
    React.useState<TextType>(initialTextValues);

  //to be used for calculating DPI for different monitors
  const dpi = useDPI();
  const editorState = useEditorState(props, dpi);
  const latestEditorStateRef = React.useRef(editorState);

  const [canvasDimensions, setCanvasDimensions] = React.useState({
    width: props.width,
    height: props.height,
    unit: props.unit,
  });

  // declare global ui component
  useStoreValue($editor, editorState.editorRef);

  const label = props.savedDocument;
  const originalDimensions = {
    width: props.width,
    height: props.height,
    unit: props.unit,
  };

  React.useEffect(() => {
    latestEditorStateRef.current = editorState;
  }, [editorState]);

  //setting the canvas dimensions globally
  React.useEffect(() => {
    props.name
      ? editorState.setDocumentName(props.name)
      : editorState.setDocumentName("Hazard Label");
    if (!label) {
      editorState.setDimensions({
        width: props.width,
        height: props.height,
        unit: props.unit,
      });
    }
  }, [dpi]);

  React.useEffect(() => {
    editorState.onStatusChange(props.status);
    editorState.setGlobalLayerManager(editorState.layerManager);
    editorState.setGlobalEditorManager(editorState.editorRef.current);
  }, [props.status]);

  React.useEffect(() => {
    setTextFormatting(initialTextValues);
  }, [editorState.selectedTool]);

  //sets the ReactQuill ref globally when new Textbox is added
  useEffect(() => {
    const cleanup = manageLayerFocusAndCleanup(
      editorState.selectedLayersStore.value,
      editorState.setSelectedTool,
      setAndFocusQuillRef,
      editorState.setQuillRef,
    );

    // Call cleanup function on component unmount
    return cleanup;
  }, [editorState.selectedLayersStore.value]);

  //This function sets the ref options of a text layer globally
  const handleEditorClick = () => {
    if (editorState.selectedLayersStore.value.length) {
      const selectedLayer: (ScenaElementLayer | ScenaElementLayerGroup)[] =
        editorState.selectedLayersStore.value;
      setAndFocusQuillRef(selectedLayer, editorState.setQuillRef);
    }
  };

  React.useEffect(() => {
    editorState.allLayersListRef.current = editorState.allLayers;
  }, [editorState.allLayers]);

  useEffect(() => {
    handleQuillSelectionChange(
      editorState.quillRef as RefObject<any>,
      setTextFormatting,
    );
  }, [editorState.quillRef, setTextFormatting]);

  // This useEffect adds the click listener on all Text Layers
  useEffect(() => {
    // Call the utility function and get the cleanup function
    const cleanup = initializeQuillListener(
      editorState.allLayers,
      handleEditorClick,
    );

    // Use the cleanup function on component unmount
    return cleanup;
  }, [editorState.allLayers, handleEditorClick]);

  // Use the custom hook for both listeners
  useGlobalKeydownListener(preventZoom, []);
  useGlobalKeydownListener(
    (e) =>
      handleDeleteLayer(
        e,
        editorState.selectedLayersStore.value,
        editorState.layerStore,
        editorState.layerManager,
        editorState.setLayers,
      ),
    [
      editorState.selectedLayersStore.value,
      editorState.allLayers,
      editorState.layerManager,
    ],
  );
  const onBlur = React.useCallback((e: any) => {
    const target = e.target as HTMLElement | SVGElement;
    if (!checkInput(target)) {
      return;
    }
    const parentTarget = getParnetScenaElement(target);
    if (!parentTarget) {
      return;
    }
  }, []);

  const saveLabel = () => {
    const current = latestEditorStateRef.current;
    if (props.isDocument) return null;
    handleSaveLabel(
      current.allLayers,
      originalDimensions,
      current.undoStack,
      current.setUndoStack as React.Dispatch<
        React.SetStateAction<{ [key: string]: any }[]>
      >,
      current.quillDefaultValues,
      current.canvasProperties,
      current.editorRef,
      current.documentName,
      current.tableCssProperties,
      current.bleed,
      current.margin,
      current.bleedVisible,
      current.marginVisible,
      false,
    );
  };

  React.useEffect(() => {
    // Add the event listener for 'keydown' event
    const handleDuplicateLayer = (e: any) => {
      duplicateLayer(
        e,
        editorState.setLayers,
        editorState.selectedLayersStore,
        editorState.layerManager,
      );
    };
    window.addEventListener("keydown", handleDuplicateLayer);

    // Auto save starts
    const intervalId = setInterval(saveLabel, EDITOR_CONFIG.AUTO_SAVE_INTERVAL);
    // Auto save ends

    const onUpdate = () => {
      requestAnimationFrame(() => {
        editorState.actionManager.act("get.rect", {
          rect: editorState.moveableRef.current!.getRect(),
        });
      });
    };
    editorState.actionManager.on("render.end", () => {
      onUpdate();
    });
    editorState.actionManager.on("changed.targets", () => {
      onUpdate();
    });
    editorState.actionManager.on("update.rect", () => {
      onUpdate();
    });

    editorState.actionManager.on("select.all", (e) => {
      e.inputEvent?.preventDefault();
      const layers = root.get($layers);

      const childs = editorState.layerManager.selectSameDepthChilds(
        [],
        layers.map((layer) => layer.ref.current!),
        [],
      );

      editorState.setSelectedLayers(
        editorState.layerManager.toLayerGroups(childs),
      );
    });

    const startId = requestAnimationFrame(() => {
      // onResize();
      editorState.infiniteViewerRef?.current?.scrollCenter();
    });
    registerHistoryTypes(editorState.historyManager);
    InitializeUndo(
      label,
      props.width,
      props.height,
      props.unit,
      editorState.actionManager,
      editorState.allLayers,
      editorState.undoStack,
      editorState.setUndoStack,
    );
    setDefaultQuillInstances(
      editorState.setQuillDefaultValues,
      editorState.quillDefaultValues,
    );
    return () => {
      window.removeEventListener("keydown", handleDuplicateLayer);
      editorState.layerManager.set([], []);
      editorState.historyManager.clear();
      editorState.actionManager.off();
      editorState.keyManager.destroy();
      cancelAnimationFrame(startId);
      clearInterval(intervalId);
    };
  }, []);

  const darkMode = useStoreStateValue($darkMode);
  const leftTabs = React.useMemo(() => ["layers"], []);

  React.useEffect(() => {
    try {
      editorState.showGrid
        ? addGridLines(
            props.unit,
            dpi,
            editorState.gridLinesWrapperDiv,
            editorState.gridType,
            editorState.gridDimension,
            editorState.zoomStore,
            editorState.setZoomToStore,
            editorState.infiniteViewerRef,
          )
        : removeGridLines(editorState.gridLinesWrapperDiv);

      //convert the canvasDimensions in pixels
      const canvasDimensions =
        editorState.unitManager.getCanvasDimensionsInPixels(
          editorState.dimensions.width != 0
            ? editorState.dimensions.width
            : props.width,
          editorState.dimensions.height != 0
            ? editorState.dimensions.height
            : props.height,
          editorState.dimensions.unit,
        );
      // setting converted dimensions locally
      setCanvasDimensions({
        width: canvasDimensions.widthInPixels,
        height: canvasDimensions.heightInPixels,
        unit: editorState.dimensions.unit
          ? editorState.dimensions.unit
          : props.unit,
      });
    } catch (error) {
      console.error(error);
    }
  }, [dpi, editorState.dimensions, editorState.gridType, editorState.showGrid]);

  //Identifying layer type and opening drawer accordingly
  React.useEffect(() => {
    handleLayerSelection({
      selectedLayersStore: editorState.selectedLayersStore,
      selectedLayers: editorState.selectedLayers,
      setSelectedTool: editorState.setSelectedTool,
      setIsAutoScaleEnabled: editorState.setIsAutoScaleEnabled,
    });
  }, [editorState.selectedLayersStore.value]);

  //setting the table headers for loaded labels using ref (ref is available on render)
  useEffect(() => {
    initializeTableLayers(editorState.allLayers);
  }, [editorState.allLayers]);

  // Trigger loadLabelFromDatabase when currentLabel changes
  useEffect(() => {
    if (editorState.currentLabel) {
      if (Object.keys(editorState.currentLabel).length > 0) {
        loadLabelFromDatabase(
          JSON.stringify(editorState.currentLabel),
          editorState.setDimensions,
          setBleedAndMarginProperties,
          editorState.generateLayer,
          editorState.editorRef,
        );
      }
    }
  }, [editorState.currentLabel]);

  React.useEffect(() => {
    if (label) {
      const defaultQuillValues = JSON.parse(label).quillDefaultValues;
      // Setting default quill values to be shown in the dropdown or custom values
      // before the label has been recreated
      setDefaultQuillInstances(
        editorState.setQuillDefaultValues,
        defaultQuillValues,
      );
      loadLabelFromDatabase(
        label,
        editorState.setDimensions,
        setBleedAndMarginProperties,
        editorState.generateLayer,
        editorState.editorRef,
      );
    }
  }, [label, dpi]);

  // textDrawer prop
  const onTextFormattingUpdate = (
    name: string,
    value: number | boolean | string,
  ) => {
    setTextFormatting({
      ...textFormatting,
      [name]: value,
    });
  };

  const toggleRuler = () => {
    editorState.setShowGuides((prevShowGuides) => !prevShowGuides);
  };
  // bleeds and margin
  const setBleedAndMarginProperties = (
    bleedVisible: boolean,
    marginVisible: boolean,
    bleed?: number,
    margin?: number,
    canvasBorderRadius?: CanvasProperties,
  ) => {
    if (bleed) {
      editorState.setBleedValue(bleed);
    }
    if (margin) {
      const marginInPixels = editorState.unitManager.convertToPixels(
        margin,
        editorState.dimensions.unit,
      );
      editorState.setMarginValue(margin);
      editorState.setMarginInPixels(marginInPixels.valueInPixels);
    }
    if (canvasBorderRadius) {
      editorState.setCanvasBorderRadius(canvasBorderRadius);
    }
    editorState.setBleedVisible(bleedVisible);
    editorState.setMarginVisible(marginVisible);
  };
  // comments code
  const [commentBoxes, setCommentBoxes] = useState<CommentBox[]>([]);
  const [commentBoxPosition, setCommentBoxPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const { getComments, comments } = useComments();

  const handleComments = handleEditorCommentsClick(
    setCommentBoxPosition,
    commentBoxes,
    setCommentBoxes,
    props.userDetails,
    props.labelId,
    props.labelComments,
  );

  // used in the jsx
  const handleMultipleEditorClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (editorState.selectedTool === toolBarItems.COMMENTS) {
      handleComments(event);
    } else {
      // Remove unsubmitted comment boxes when a different tool is selected
      setCommentBoxes((prevBoxes) =>
        prevBoxes.filter((box) => box.isSubmitted),
      );
    }
  };

  // canvas zoom
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  useEffect(() => {
    editorState.setZoomCanvas(zoomLevel);
  }, [zoomLevel, editorState.setZoomCanvas]);

  // shortcuts
  const shortcuts = getShortcuts({
    setShowGrid: editorState.setShowGrid,
    setLayers: editorState.setLayers,
    horizontalGuidesRef: editorState.horizontalGuidesRef,
    verticalGuidesRef: editorState.verticalGuidesRef,
    zoomLevel: zoomLevel,
    setZoomLevel: setZoomLevel,
    toggleRuler: toggleRuler,
    layerManager: editorState.layerManager,
    actionManager: editorState.actionManager,
    selectedTool: editorState.selectedTool,
    setSelectedTool: editorState.setSelectedTool,
    setToggleSnap: editorState.setToggleSnap,
    toggleSnap: editorState.toggleSnap,
    allLayers: editorState.allLayers,
    editorRef: editorState.editorRef,
    selectedLayersStore: editorState.selectedLayersStore,
    handleUndo: editorState.handleUndo,
    handleRedo: editorState.handleRedo,
  });

  shortcuts.forEach((shortcut) => {
    useKeyboardShortcuts(shortcut.callback, shortcut.keys);
  });

  return React.useMemo(
    () => (
      <ConfigProvider theme={configProviderConsts}>
        <div className={`hidden ${editorState.preview ? "!block" : ""}`}>
          <EditorPreview
            onBackToDesigner={() => editorState.togglePreview(false)}
          />
        </div>
        {editorState.togglePrint && (
          <EditorPrint
            onBackToDesigner={() => editorState.setTogglePrint(false)}
            previewThumbnail={editorState.previewThumbnail}
          />
        )}
        <div
          className={`flex flex-col h-screen ${editorState.preview || editorState.togglePrint ? "hidden" : ""}`}
        >
          <div className="w-full">
            <EditorElement
              ref={editorState.editorElementRef}
              className={prefix(
                "editor",
                editorState.showGuides ? "" : "hide-guides",
                darkMode ? "" : "light-mode",
              )}
              onDragOver={(e: DragEvent) => {
                e.preventDefault();
              }}
            >
              <ToolBarV2
                zoomLevel={zoomLevel}
                onZoomIn={() =>
                  handleZoomIn(predefinedZoomLevels, zoomLevel, setZoomLevel)
                }
                onZoomOut={() =>
                  handleZoomOut(predefinedZoomLevels, zoomLevel, setZoomLevel)
                }
                onZoomChange={(newZoom) =>
                  handleZoomChange(newZoom, setZoomLevel)
                }
              />

              {/* When drawer is open the add class  w-[calc(100vw_-_426px)] and default w-[calc(100vw_-_90px)]*/}
              <div className={` w-[calc(100%_-_90px)]`}>
                <PanelGroup
                  direction="horizontal"
                  style={{
                    height: "calc(100vh - 176px)",
                    zIndex: "-999",
                  }}
                >
                  <Panel className="scena-panel-left ">
                    <Tabs tabs={leftTabs} />
                  </Panel>
                  <PanelResizeHandle className="scena-resize-handle" />
                  <Panel defaultSize={90} className="scena-center">
                    <div
                      onClick={handleMultipleEditorClick}
                      className="scena-canvas"
                      style={{
                        cursor: getCursorStyle(editorState.selectedTool),
                      }}
                    >
                      <ZoomButton
                        onZoomIn={() =>
                          handleZoomIn(
                            predefinedZoomLevels,
                            zoomLevel,
                            setZoomLevel,
                          )
                        }
                        onZoomOut={() =>
                          handleZoomOut(
                            predefinedZoomLevels,
                            zoomLevel,
                            setZoomLevel,
                          )
                        }
                      />
                      <div
                        className={prefix("reset")}
                        onClick={() => {
                          editorState.infiniteViewerRef.current!.scrollCenter({
                            duration: 500,
                            absolute: true,
                          });
                        }}
                      />

                      {/* Rulers */}
                      <DisplayGuides
                        showGuides={editorState.showGuides}
                        horizontalGuidesRef={editorState.horizontalGuidesRef}
                        verticalGuidesRef={editorState.verticalGuidesRef}
                      />

                      <InfiniteViewerManager
                        ref={editorState.infiniteViewerRef}
                      >
                        <Viewport
                          isDocument={!!props.isDocument}
                          ref={editorState.viewportRef}
                          onBlur={onBlur}
                          originalDimensions={{
                            width: props.width,
                            height: props.height,
                          }}
                          unit={props.unit}
                          dpi={dpi}
                          style={{
                            width: `${canvasDimensions?.width}px` || "500px",
                            height: `${canvasDimensions?.height}px` || "600px",
                            transform: `scale(${editorState.ZoomCanvas})`,
                            transformOrigin: "center",
                            position: "relative",
                          }}
                        >
                          <Comments
                            labelComments={props.labelComments}
                            labelId={props.labelId}
                            companyID={props?.companyID as string}
                            userDetails={props.userDetails}
                            commentBoxes={commentBoxes}
                            commentBoxPosition={commentBoxPosition}
                            setCommentBoxPosition={setCommentBoxPosition}
                            setCommentBoxes={setCommentBoxes}
                          />
                          <MoveableManager
                            ref={editorState.moveableRef}
                            ZoomCanvas={zoomLevel}
                          />
                          <div
                            ref={editorState.gridLinesWrapperDiv}
                            style={{
                              zIndex: -9998,
                            }}
                          ></div>
                        </Viewport>
                      </InfiniteViewerManager>
                      <SelectoManager ref={editorState.selectoRef} />
                    </div>
                  </Panel>
                  {/* </Panel> */}
                </PanelGroup>
              </div>
              <Drawers
                onTextFormattingUpdate={onTextFormattingUpdate}
                textFormatting={textFormatting}
                quillDefaultValues={editorState.quillDefaultValues}
                labelComments={props.labelComments}
                userDetails={props.userDetails}
                labelId={props.labelId}
              />

              <RightSidebar />
            </EditorElement>
          </div>
          <Footer />
          <CanvasButtons
            canvasDimensions={canvasDimensions}
            toggleRuler={toggleRuler}
          />

          <ToastContainer />
        </div>
      </ConfigProvider>
    ),
    [
      editorState.showGuides,
      darkMode,
      editorState.selectedLayers,
      editorState.dimensions,
      canvasDimensions,
      editorState.selectedTool,
      editorState.status,
      props.saveStatus,
      editorState.preview,
      editorState.quillDefaultValues.textFontSizes,
      editorState.togglePrint,
      editorState.marginInPixels,
      commentBoxes,
      commentBoxPosition,
      comments,
      getComments,
      editorState.ZoomCanvas,
      editorState.infiniteViewerRef.current?.getZoom(),
      editorState.undoStack,
      editorState.currentLabel,
      editorState.redoStack,
      textFormatting,
    ],
  );
}
