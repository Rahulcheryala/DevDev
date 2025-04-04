import Guides from "@scena/react-guides";
import { ScenaElementLayer, ScenaElementLayerGroup } from "./scena";
import ActionManager from "../components/managers/ActionManager";
import { StoreValue } from "@scena/react-store";
import LayerManager from "../components/managers/LayerManager";
import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { HistoryManager, KeyManager, MemoryManager } from "../components";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import { ViewportInstnace } from "../components/editor/Viewport";

export type ClearGuides = {
  horizontalGuidesRef: React.RefObject<Guides>;
  verticalGuidesRef: React.RefObject<Guides>;
};
export type SelectAll = {
  editorRef: React.MutableRefObject<EditorManagerInstance | undefined>;
  allLayers: ScenaElementLayer[];
};

export type ToggleStudioControl = {
  selectedTool: string;
  setSelectedTool: (value: React.SetStateAction<string>) => void;
};
export type TogglePrintPreview = {
  actionManager: ActionManager;
  allLayers: ScenaElementLayer[];
};

export type LayersGrouping = {
  selectedLayersStore: StoreValue<
    (ScenaElementLayer | ScenaElementLayerGroup)[]
  >;
  layerManager: LayerManager;
  setLayers: (layers: ScenaElementLayer[], groups?: any) => Promise<boolean>;
};

export type Shortcut = {
  callback: () => void;
  keys: string[];
};

export type CommentBox = {
  id: string;
  pinLocation: PinLocation;
  isSubmitted: boolean;
};

export type PinLocation = {
  x: number;
  y: number;
};

export type ShortcutsParams = {
  setShowGrid: Dispatch<SetStateAction<boolean>>;
  setLayers: (
    layers: ScenaElementLayer[],
    groups?: ScenaElementLayerGroup[],
  ) => Promise<boolean>;
  horizontalGuidesRef: RefObject<Guides>;
  verticalGuidesRef: RefObject<Guides>;
  zoomLevel: number;
  setZoomLevel: Dispatch<SetStateAction<number>>;
  toggleRuler: () => void;

  layerManager: LayerManager;
  actionManager: ActionManager;
  selectedTool: string;
  setSelectedTool: React.Dispatch<React.SetStateAction<string>>;
  setToggleSnap: (value: boolean) => void;
  toggleSnap: boolean;
  allLayers: ScenaElementLayer[];
  editorRef: MutableRefObject<EditorManagerInstance | undefined>;
  selectedLayersStore: StoreValue<
    (ScenaElementLayer | ScenaElementLayerGroup)[]
  >;
  handleUndo: () => void;
  handleRedo: () => void;
};

export type DefaultQuillObject = {
  textFontSizes: string[];
  textFontStyles: string[];
  isListStyle: boolean;
};

export type SetQuillDefaultValues = (
  value: React.SetStateAction<DefaultQuillObject>,
) => void;

export type HandleLayerSelectionParams = {
  selectedLayersStore: StoreValue<
    (ScenaElementLayer | ScenaElementLayerGroup)[]
  >;
  selectedLayers: (ScenaElementLayer | ScenaElementLayerGroup)[];
  setSelectedTool: (value: React.SetStateAction<string>) => void;
  setIsAutoScaleEnabled: (value: React.SetStateAction<boolean>) => void;
};

export type EditorManagerInstance = {
  editorElementRef: React.MutableRefObject<HTMLDivElement | null>;
  historyManager: HistoryManager;
  actionManager: ActionManager;
  memoryManager: MemoryManager;
  layerManager: LayerManager;
  keyManager: KeyManager;
  moveableRef: React.MutableRefObject<Moveable | null>;
  selectoRef: React.MutableRefObject<Selecto | null>;
  viewportRef: React.MutableRefObject<ViewportInstnace | null>;

  changeLayers(
    layers: ScenaElementLayer[],
    groups?: ScenaElementLayerGroup,
  ): Promise<boolean>;
  setLayers(
    layers: ScenaElementLayer[],
    groups?: ScenaElementLayerGroup[],
  ): Promise<boolean>;
  setSelectedLayers(
    layerGroups: Array<ScenaElementLayer | ScenaElementLayerGroup>,
  ): Promise<boolean>;
  onSave(config: { [key: string]: any }, thumbnail: any): null | string;
  // TODO -> Types not clear
  onDashboardClick(event?: any): any;
  onFavoriteClick(event?: boolean): any;
  onLabelNameChange(labelName: string): string;

  onDesignerClick(event?: any): any;
  onTemplatesClick(event?: any): any;
  onElementsClick(event?: any): any;
  onBrandingClick(event?: any): any;
  onProjectsClick(event?: any): any;
  onUploadsClick(event?: any): any;
  onDataClick(event?: any): any;
  quillDefaultValues: { [key: string]: any };

  onControlsClick(event?: any): any;

  //Fetch thumbnail image on save
  getThumbnail?: (args?: any) => string;

  //change of status (submitted , approved etc)
  onStatusChange(args: string): any;
  status?: string;

  isFavourite?: boolean;

  //cloud save status values (saved, saving, upload failed etc)
  saveStatus?: string;
  username?: string;
  lastUpdated?: string;
  avatarUrl?: string;
  labelComments: any;
  companyID?: string;
  userDetails?: any;
  labelId?: string;
  isDocument?: boolean;
};
export interface QuillDefaults {
  textFontSizes: string[];
  textFontStyles: string[];
  isListStyle: boolean;
}
