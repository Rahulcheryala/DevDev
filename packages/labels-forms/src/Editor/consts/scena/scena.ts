import { FONT_IMPORTS } from "./fontImports";
import { FONT_STYLES } from "./fontStyles";
import { QUILL_STYLES } from "./quillStyles";
import { SCENA_STYLES } from "./scenaStyles";

export const EDITOR_PROPERTIES = [
  "memory",
  "eventBus",
  "keyManager",
  "moveableData",
  "moveableManager",
  "historyManager",
  "getViewport",
  "getSelecto",
  "getEditorElement",
  "getSelectedTargets",
  "selectMenu",
  "getSelectedFrames",
] as const;
export const PREFIX = "scena-";
export const SCENA_LAYER_SEPARATOR = "//__$__//";
export const DATA_SCENA_ELEMENT_ID = "data-scena-element-id";
export const DATA_SCENA_ELEMENT = "data-scena-element";

export const TYPE_SCENA_LAYERS = "application/x-scena-layers";

export const EDITOR_CSS = `
${FONT_IMPORTS}

${QUILL_STYLES}

${FONT_STYLES}
  
 ${SCENA_STYLES}

  
  
  `;
