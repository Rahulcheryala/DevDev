import React from "react";
import { useEditor } from "../../context/EditorContext";
import { CrossIcon } from "./icons";

type DrawerHeadingProps = {
  heading: string;
};
const DrawerHeading: React.FC<DrawerHeadingProps> = ({ heading }) => {
  const { setSelectedTool } = useEditor();
  return (
    <div className="border-b border-[rgb(233,_233,_238)] p-[1em] h-[56px] border-r ">
      <div className="relative pr-[40px]">
        <p className="text-[16px] font-medium leading-[24px] tracking-[0.5px]">
          {heading}
        </p>
        <button
          className="absolute right-[0px] top-[2px] cursor-pointer"
          onClick={() => setSelectedTool("")}
        >
          <CrossIcon />
        </button>
      </div>
    </div>
  );
};

export default DrawerHeading;
