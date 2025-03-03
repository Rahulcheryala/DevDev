export type GetMenuSectionsParams = {
  handleUndo: () => void;
  handleRedo: () => void;
  addNewTextBox: () => Promise<void>;
  handleToolSelect: (value: string) => void;
  setSelectedIcon: (value: React.SetStateAction<string>) => void;
  selectedIcon: string;
  toolbarIcons: { [key: string]: string };
  toolBarItems: { [key: string]: string };
  triggerDocument: boolean;
  setTriggerDocument: (value: React.SetStateAction<boolean>) => void;
  setIsTableSelection: (value: React.SetStateAction<boolean>) => void;
  handleAnchorClick: () => void;
  anchorValue: boolean;
  undoStack: { [key: string]: any }[];
  redoStack: { [key: string]: any }[];
};

export type MenuItem = {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
};
export type TableCssProps = {
  headerBg: string;
  headerText: string;
  primaryRowBg: string;
  primaryRowText: string;
  secondaryRowBg: string;
  secondaryRowText: string;
};
