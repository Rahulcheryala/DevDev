import { styled } from "react-css-styled";

export const ToolBarElement = styled(
  "div",
  `
  {
      --scena-editor-size-tools: 45px;
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      background: var(--scena-editor-color-background-tool);
      box-sizing: border-box;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      z-index: 10;
      transform: translateZ(1px);
      display: flex;
      justify-content: flex-start;
  }
  .scena-menu-bottom {
      position: absolute;
      top: 0;
      right: 0;
      padding: 7px 7px 0px;
      height: 100%;
      width:100%;
      box-sizing: border-box;
  }
  svg, .scena-i {
      pointer-events: none;
  }
  .scena-icon {
      position: relative;
      display: inline-block;
      width: var(--scena-editor-size-tools);
      height: var(--scena-editor-size-tools);
      box-sizing: border-box;
      cursor: pointer;
      border: 1px solid transparent;
      border-radius: 0px;
      transition: all ease 0.2s;
      vertical-align: top;
  }
  
  .scena-icon-inner {
      position: relative;
      padding: 10px;
      display: flex;
      align-items: center;
      justified-contents: center;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
  }
  .scena-tool-left>.scena-icon:hover, .scena-tool-right>.scena-icon:hover  {
      --scena-editor-color-icon: #fff;
      background: #000;
  }
  .scena-tool-left>.scena-icon.scena-selected {
      background: var(--scena-editor-color-main);
  }
  .scena-icon.scena-selected {
      --scena-editor-color-icon: #fff;
  }
  .scena-icon.scena-selected svg *,
  .scena-sub-icon.scena-selected svg * {
      fill: #fff;
      stroke: #fff;
  }
  .scena-icon .scena-extends-icon {
      position: absolute;
      right: 4px;
      bottom: 4px;
      border-bottom: 5px solid var(--scena-editor-color-icon);
      border-right: 0;
      border-left: 5px solid transparent;
      pointer-events: none;
  }
  .scena-tool-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--scena-editor-color-text);
      font-weight: bold;
      font-size: 12px;
  }
  .scena-tool-right {
      position: absolute;
      right: 0;
  }
  `,
);

// Enums for section titles
export enum SectionTitles {
  UNDO_REDO = "Undo / Redo Section",
  TEXT_SHAPE_LINE = "Text, Shape, Line Section",
  WATERMARK_SIGNATURE = "Watermark and Signature Section",
  QR_BARCODE_TABLE = "QR, Barcode, Table Section",
  PAINT_LOCK_ANCHOR = "Paint, Lock, Anchor Section",
}

// Enums for tooltips
export enum Tooltips {
  UNDO = "Undo",
  REDO = "Redo",
  ADD_TEXT = "Add Text",
  ADD_SHAPE = "Add Shape",
  ADD_LINE = "Add Line",
  ADD_WATERMARK = "Add Watermark",
  ADD_SIGNATURE = "Add Signature",
  ADD_LINK = "Add Link",
  ADD_TABLE = "Add Table",
  ADD_GRID = "Add Grid",
  ADD_QR_CODE = "Add QR Code",
  ADD_BARCODE = "Add Barcode",
  FILL_COLOR = "Fill Color",
  PAINT_TOOL = "Paint Tool",
  LOCK_TOOL = "Lock Tool",
  ANCHOR_TOOL = "Anchor Tool",
}

export enum Status {
  DRAFT = "Draft",
  SUBMITTED = "Submitted",
  APPROVED = "Approved",
  NOT_APPROVED = "Not Approved",
  HOLD = "Hold",
}

export enum StatusKey {
  DEFAULT = "default",
  GREEN = "green",
  ORANGE = "orange",
  DESTRUCTIVE = "destructive",
}

export const favouriteIconFill = {
  RED: "red",
  NONE: "none",
};
// Colors
export const statusArrowColors = {
  BLUE: "#2F54EB",
  GREEN: "#04A777",
  ORANGE: "#FA8C16",
  RED: "#D11149",
};

// Background and Text Classes
export const statusArrowClasses = {
  DEFAULT: `bg-[#F0F5FF] text[${statusArrowColors.BLUE}]`,
  GREEN: `bg-[#F6FFED] text[${statusArrowColors.GREEN}]`,
  ORANGE: `bg-[#FFF7E6] text[${statusArrowColors.ORANGE}]`,
  DESTRUCTIVE: `bg-[#FFF1F0] text[${statusArrowColors.RED}]`,
};

export const statusClassMap: Record<StatusKey, string> = {
  [StatusKey.DEFAULT]: statusArrowClasses.DEFAULT,
  [StatusKey.GREEN]: statusArrowClasses.GREEN,
  [StatusKey.ORANGE]: statusArrowClasses.ORANGE,
  [StatusKey.DESTRUCTIVE]: statusArrowClasses.DESTRUCTIVE,
};

export const statusArrow: Record<StatusKey, string> = {
  [StatusKey.DEFAULT]: statusArrowColors.BLUE,
  [StatusKey.GREEN]: statusArrowColors.GREEN,
  [StatusKey.ORANGE]: statusArrowColors.ORANGE,
  [StatusKey.DESTRUCTIVE]: statusArrowColors.RED,
};
export const statusKeyMap: Record<Status, StatusKey> = {
  [Status.DRAFT]: StatusKey.DEFAULT,
  [Status.SUBMITTED]: StatusKey.ORANGE,
  [Status.APPROVED]: StatusKey.GREEN,
  [Status.NOT_APPROVED]: StatusKey.DESTRUCTIVE,
  [Status.HOLD]: StatusKey.ORANGE,
};

export const defaultDocumentName = "Hazard Label";

export enum documentSaveStatus {
  SAVED = "Saved",
  UPLOADING = "Uploading",
  UPLOAD_FAILED = "Upload failed",
  OFFLINE = "Offline",
}

export enum statusTextColor {
  GRAY = "#8A8A8F",
  RED = "#D11149",
  ORANGE = "#F18F01",
}

export enum documentStatus {
  DRAFT = "Draft",
  SUBMITTED = "Submitted",
  APPROVED = "Approved",
  NOT_APPROVED = "Not Approved",
}

export const menuName = {
  FILE: "File",
};

export const fileMenuItems = {
  IMPORT_FILES: "Import files",
  LANGUAGE: "Language",
  SAVE: "Save",
  SAVE_IN_FOLDER: "Save in folder",
  COPY: "Copy",
  DOWNLOAD: "Download",
  VERSION_HISTORY: "Version history",
  FIND_AND_REPLACE_TEXT: "Find and replace text",
  DELETE: "Delete",
};
