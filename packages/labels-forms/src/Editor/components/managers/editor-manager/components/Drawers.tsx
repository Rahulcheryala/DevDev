import React from "react";
import { useEditor } from "../../../../context/EditorContext";
import DrawerHeading from "../../../drawers/DrawerHeading";
import { renderDrawer } from "../utils";
import { DefaultQuillObject, TextType } from "../../../../types";

type DrawersProps = {
  onTextFormattingUpdate: (
    name: string,
    value: number | boolean | string,
  ) => void;
  textFormatting: TextType;
  quillDefaultValues: DefaultQuillObject;
  labelComments: any;
  userDetails: any;
  labelId: string;
};

const Drawers: React.FC<DrawersProps> = ({
  onTextFormattingUpdate,
  textFormatting,
  quillDefaultValues,
  labelComments,
  userDetails,
  labelId,
}) => {
  const { selectedTool } = useEditor();

  return (
    <div
      className={`h-[calc(100vh_-_120px)] overflow-hidden border-l z-20 top-[64px] bg-white  
                border-gray-100   ${
                  selectedTool.length ? "right-[88px]" : "right-[-100%]"
                }
                fixed top-[64px]  transition-animation`}
    >
      <div className="h-full w-[336px]">
        <DrawerHeading
          heading={`${
            selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)
          } Settings`}
        />
        {renderDrawer(
          selectedTool,
          onTextFormattingUpdate,
          textFormatting,
          quillDefaultValues,
          labelComments,
          userDetails,
          labelId,
        )}
      </div>
    </div>
  );
};

export default Drawers;
