import { diff } from "@egjs/list-differ";
import HistoryManager from "../HistoryManager";
import {
  ScenaElementLayer,
  ScenaElementLayerGroup,
  EditorManagerInstance,
} from "../../../types";

type RenderHistoryProps = {
  layer: ScenaElementLayer;
  prev: any;
  next: any;
};

type RenderGroupHistoryProps = {
  infos: RenderHistoryProps[];
};

type SelectHistoryProps = {
  prevs: Array<ScenaElementLayer | ScenaElementLayerGroup>;
  nexts: Array<ScenaElementLayer | ScenaElementLayerGroup>;
};

function restoreRender(
  layer: ScenaElementLayer,
  prev: any,
  next: any,
  editor: EditorManagerInstance,
) {
  const el = layer.ref.current;

  if (!el) {
    throw new Error("No Element");
    // return false;
  }

  const frame = editor.layerManager.getFrame(layer);

  frame.clear();
  frame.set(next);

  const result = diff(Object.keys(prev), Object.keys(next));
  const { removed, prevList } = result;

  removed.forEach((index) => {
    el.style.removeProperty(prevList[index]);
  });
  el.style.cssText += frame.toCSSText();
  return true;
}

function undoRenderGroup(
  { infos }: RenderGroupHistoryProps,
  editor: EditorManagerInstance,
) {
  infos?.forEach(({ layer, prev, next }) => {
    restoreRender(layer, next, prev, editor);
  });
  editor.moveableRef.current!.updateRect();
  editor.actionManager.act("render.end");
}

function redoRenderGroup(
  { infos }: RenderGroupHistoryProps,
  editor: EditorManagerInstance,
) {
  infos?.forEach(({ layer, prev, next }) => {
    restoreRender(layer, prev, next, editor);
  });
  editor.moveableRef.current!.updateRect();
  editor.actionManager.act("render.end");
}

function undoSelectTargets(
  { prevs }: SelectHistoryProps,
  editor: EditorManagerInstance,
) {
  editor.setSelectedLayers(prevs);
}

function redoSelectTargets(
  { nexts }: SelectHistoryProps,
  editor: EditorManagerInstance,
) {
  editor.setSelectedLayers(nexts);
}

// function undoCreateElements({ infos, prevSelected }: Record<string, any>, editor: EditorManagerInstance) {
//     const res = editor.removeByIds(infos.map((info: ElementInfo) => info.id), true);

//     if (prevSelected) {
//         res.then(() => {
//             editor.setSelectedTargets(editor.viewportRef.current!.getElements(prevSelected), true);
//         })
//     }
// }
// function restoreElements({ infos }: Record<string, any>, editor: EditorManagerInstance) {
//     editor.appendJSXs(infos.map((info: ElementInfo) => ({
//         ...info,
//     })), true);
// }

// function undoChangeText({ prev, next, id }: Record<string, any>, editor: EditorManagerInstance) {
//     const info = editor.viewportRef.current!.getInfo(id)!;
//     info.innerText = prev;
//     info.el!.innerText = prev;
// }
// function redoChangeText({ prev, next, id }: Record<string, any>, editor: EditorManagerInstance) {
//     const info = editor.viewportRef.current!.getInfo(id)!;
//     info.innerText = next;
//     info.el!.innerText = next;
// }
// function undoMove({ prevInfos }: MovedResult, editor: EditorManagerInstance) {
//     editor.moves(prevInfos, true);
// }
// function redoMove({ nextInfos }: MovedResult, editor: EditorManagerInstance) {
//     editor.moves(nextInfos, true);
// }

export type Histories = {
  // render: RenderHistoryProps
  render: RenderGroupHistoryProps;
  selectTargets: SelectHistoryProps;
};

export function registerHistoryTypes(historyManager: HistoryManager) {
  historyManager.registerType(
    "render",
    undoRenderGroup,
    redoRenderGroup,
    "render elements",
  );
  historyManager.registerType(
    "selectTargets",
    undoSelectTargets,
    redoSelectTargets,
    "select targets",
  );
}
