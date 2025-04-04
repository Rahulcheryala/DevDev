import React from "react";
import { useEditor } from "../../../../context/EditorContext";
import RulerButton from "../../../editor/components/RulerButton";
import { useStoreStateValue } from "@scena/react-store";
import { $editor } from "../../../../stores/stores";
import AddDocumentButton from "./AddDocumentButton";

type CanvasButtonsProps = {
  canvasDimensions: {
    width: number;
    height: number;
    unit: string;
  };
  toggleRuler: any;
};

const CanvasButtons: React.FC<CanvasButtonsProps> = ({
  canvasDimensions,
  toggleRuler,
}) => {
  const { selectedTool } = useEditor();
  const editorRef = useStoreStateValue($editor);

  return (
    <div
      className={` ${selectedTool.length ? "right-[88px]" : "right-[-100%]"}`}
    >
      <RulerButton onClick={toggleRuler} />
      {editorRef?.current?.isDocument && (
        <AddDocumentButton canvasDimensions={canvasDimensions} />
      )}
    </div>
  );
};

export default CanvasButtons;
