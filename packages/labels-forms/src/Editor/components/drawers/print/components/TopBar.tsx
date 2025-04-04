import React from "react";
import { ArrowLeftIcon } from "../../icons";
import { PrinterOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useEditor } from "../../../../context/EditorContext";
import { toolBarItems } from "../../../../consts";
import { $toggleFullScreen } from "../../../../stores/stores";
import { useStoreStateValue } from "@scena/react-store";

type TopBarProps = {
  documentName: string;
  onBackToDesigner: () => void;
};

const TopBar: React.FC<TopBarProps> = ({ documentName, onBackToDesigner }) => {
  const { setSelectedTool } = useEditor();

  const toggleFullScreen = useStoreStateValue($toggleFullScreen);

  const handleTogglePrint = () => {
    setSelectedTool(toolBarItems.PRINT);
  };
  return (
    <>
      {!toggleFullScreen && (
        <div className="px-7 py-4 border-b border-stroke-primary">
          <div className="flex items-center mx-[-5px] justify-between">
            <div className="w-1/4 px-[5px]">
              <button
                className={`
                        text-base text-accent-primary hover:text-accent-primary
                        flex items-center 
                        h-10 p-0 
                        font-suisseIntl 
                        `}
              >
                <span
                  onClick={onBackToDesigner}
                  className="mr-2 cursor-pointer"
                >
                  <ArrowLeftIcon />
                </span>
                Designer
              </button>
            </div>
            <div className="px-[5px]">
              <p
                className={`
                        text-xl text-accent-primary 
                        font-suisseIntl font-semibold 
                        leading-[0.5px] 
                        flex items-center justify-center 
                        h-10`}
              >
                {documentName}
              </p>
            </div>
            <div className="px-[5px]">
              <div className="flex flex-row justify-end items-center space-x-3">
                <button
                  className={`
                            text-sm text-accent-primary 
                            font-suisseIntl
                            border border-stroke-primary 
                            rounded-full 
                            py-1 px-7 
                            h-10`}
                >
                  <ShareAltOutlined className="mr-1 text-base" /> Share
                </button>
                <button
                  onClick={handleTogglePrint}
                  className={`
                            text-sm font-suisseIntl text-accent-primary border border-stroke-primary rounded-full py-1 px-7 h-10 min-w-[160px]`}
                >
                  <PrinterOutlined className="mr-1 text-base" /> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;
