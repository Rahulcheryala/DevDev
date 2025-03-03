import React from "react";
import DrawerHeading from "../../DrawerHeading";
import { useEditor } from "../../../../context/EditorContext";
import { toolBarItems } from "../../../../consts";
import { PrintProps } from "../../../../types";
import PrintDrawer from "./PrintDrawer";

export const RightDrawer: React.FC<PrintProps> = ({
  setHGap,
  setVGap,
  boxMargin,
  setBoxMargin,
  hGap,
  vGap,
}) => {
  const { selectedTool } = useEditor();
  return (
    <>
      {selectedTool === toolBarItems.PRINT && (
        <div
          className={`h-[calc(100vh_-_120px)] overflow-hidden border-l z-20 absolute  bg-white border-gray-100 right-[0] fixed top-[75px] transition-animation`}
        >
          <div className="h-full w-[336px]">
            <DrawerHeading heading="Print" />
            <PrintDrawer
              hGap={hGap}
              vGap={vGap}
              setHGap={setHGap}
              setVGap={setVGap}
              boxMargin={boxMargin}
              setBoxMargin={setBoxMargin}
            />
          </div>
        </div>
      )}
    </>
  );
};
