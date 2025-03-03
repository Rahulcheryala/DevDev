import React from "react";
import { Divider } from "antd";
import FileMenuItem from "./FileMenuItem";
import {
  FileMenuImport,
  FileMenuLanguage,
  FileMenuSave,
  FileMenuSaveFolder,
  FileMenuCopy,
  FileMenuDownload,
  FileMenuVersionHistory,
  FileMenuFindReplace,
  FileMenuDelete,
} from "../../../../drawers/icons";
import { fileMenuItems } from "../../../../../consts/toolbar";
import {
  ScenaElementLayer,
  Dimensions,
  SavedLayerJson,
} from "../../../../../types";

type FileMenuProps = {
  handleSaveLabel: (
    allLayers: ScenaElementLayer[] | undefined,
    dimensions: Dimensions,
    undoStack?: Array<{
      [key: string]: any;
    }>,
    setUndoStack?: React.Dispatch<
      React.SetStateAction<
        {
          [key: string]: any;
        }[]
      >
    >,
    isUndoTriggered?: boolean,
  ) => Promise<void>;
  allLayers: ScenaElementLayer[];
  dimensions: Dimensions;
  undoStack?: Array<{ [key: string]: any }>;
  setUndoStack?: React.Dispatch<React.SetStateAction<SavedLayerJson[]>>;
  isUndoTriggered?: boolean;
  handleDownload: () => Promise<void>;
};

const FileMenu: React.FC<FileMenuProps> = ({
  handleSaveLabel,
  allLayers,
  dimensions,
  undoStack,
  setUndoStack,
  isUndoTriggered,
  handleDownload,
}) => {
  const menuItems = [
    { icon: <FileMenuImport />, label: fileMenuItems.IMPORT_FILES },
    { divider: true },
    { icon: <FileMenuLanguage />, label: fileMenuItems.LANGUAGE },
    { divider: true },
    {
      icon: <FileMenuSave />,
      label: "Save",
      onClick: () =>
        handleSaveLabel(
          allLayers,
          dimensions,
          undoStack,
          setUndoStack as React.Dispatch<
            React.SetStateAction<{ [key: string]: any }[]>
          >,
          isUndoTriggered,
        ),
    },
    { icon: <FileMenuSaveFolder />, label: fileMenuItems.SAVE_IN_FOLDER },
    { icon: <FileMenuCopy />, label: fileMenuItems.COPY },
    {
      icon: <FileMenuDownload />,
      label: fileMenuItems.DOWNLOAD,
      onClick: handleDownload,
    },
    { icon: <FileMenuVersionHistory />, label: fileMenuItems.VERSION_HISTORY },
    { divider: true },
    {
      icon: <FileMenuFindReplace />,
      label: fileMenuItems.FIND_AND_REPLACE_TEXT,
    },
    { icon: <FileMenuDelete />, label: fileMenuItems.DELETE },
  ];

  return (
    <>
      {menuItems.map((item, index) =>
        item.divider ? (
          <Divider
            key={index}
            className="my-[2px] border-[rgba(0,_0,_0,_0.06)]"
          />
        ) : (
          <FileMenuItem
            key={index}
            icon={item.icon}
            label={item.label ?? "Untitled"}
            onClick={item.onClick}
          />
        ),
      )}
    </>
  );
};

export default FileMenu;
