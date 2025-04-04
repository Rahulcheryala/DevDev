import { WebTrigerLighting } from "@zeak/icons";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
} from "@zeak/react";
import "@xyflow/react/dist/style.css";
import { CiEdit } from "react-icons/ci";
import { BiTrashAlt } from "react-icons/bi";
import { BsShare, BsThreeDotsVertical } from "react-icons/bs";
import Connector from "~/components/ReactFlow/Connector";
import { useCallback, useState } from "react";
// import { ChooseOptions } from "./ChooseOptions";
import { nanoid } from "nanoid";
import { ChooseOptions } from "../ChooseOptions";
import CustomEventTab from "~/components/ReactFlow/CustomNode/CustomEventTab";

export const DotsWithDropdownContent = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
      <IconButton
        aria-label="Favorite"
        variant={"ghost"}
        icon={<BsThreeDotsVertical color="#000" />}
        className=" rounded-full focus-visible:ring-offset-0 focus-visible:shadow-none focus-visible:ring-0 text-secondary hover:text-secondary hover:bg-dropdownHoverBg data-[state=open]:bg-dropdownHoverBg"
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
      <DropdownMenuItem className="hover:bg-dropdownHoverBg">
        <div className="flex items-center gap-2">
          <CiEdit size={20} />
          <span className="text-sm tracking-wider leading-[20px] font-light text-accent">
            Edit
          </span>
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem className="hover:bg-dropdownHoverBg">
        <div className="flex items-center gap-2">
          <BiTrashAlt size={20} />
          <span className="text-sm tracking-wider leading-[20px] font-light text-accent">
            Delete
          </span>
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem className="hover:bg-dropdownHoverBg">
        <div className="flex items-center gap-2">
          <BsShare size={16} />
          <span className="text-sm tracking-wider leading-[20px] font-light text-accent">
            Share
          </span>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

type Props = {
  onBackClick: () => void;
  onNextClick: (arg0: any, arg1: any) => void;
  optionsData?: any;
  updateNodeData?: (data: any) => void;
  CategoryId?: any;
  type: any;
  nodeId: string;
  initialData?: any;
  customNodeName?: string;
  updatedata?: any;
  tables?: any;
  hideOptions: boolean;
  setHideOptions: any;
  id: any;
};

export const CustomEventNode = ({
  onBackClick,
  onNextClick,
  optionsData,
  updateNodeData,
  CategoryId,
  type,
  nodeId,
  initialData,
  customNodeName,
  updatedata,
  tables,
  hideOptions,
  setHideOptions,
  id,
}: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [newCustomData, setNewCustomData] = useState<any>();
  const [disableNext, setDisableNext] = useState(true);
  const [triggerCreated, setTriggerCreated] = useState(
    initialData?.triggerCreated || false,
  );

  const handleOptionClickCallback = useCallback(
    (selectedEvent: any) => {
      onNextClick(selectedEvent, nodeId);
      setShowOptions(false);
      // if (updateNodeData) {
      //   updateNodeData({ newCustomData, triggerCreated: true, selectedEvent });
      // }
    },
    [onNextClick, nodeId],
  );

  const handleSetCustomDataCallback = useCallback((selectedEvent: any) => {
    setNewCustomData(selectedEvent);
    // if (updateNodeData && CategoryId !== "schedule") {
    //   updateNodeData({
    //     event: {
    //       id: eventIDRef.current,
    //       category_id: CategoryId,
    //       type_id: nanoid(),
    //       type: type,
    //       metadata: {
    //         ...newCustomData,
    //       },
    //     },
    //   });
    // }
  }, []);

  const saveData = useCallback(() => {
    const eventData = {
      id: id,
      category_id: CategoryId,
      type_id: nanoid(),
      type: type,
      nodeType: "custom event ",
      metadata: {
        ...newCustomData,
      },
    };

    if (updateNodeData && CategoryId === "schedule") {
      updateNodeData({ event: eventData });
    } else {
      if (updateNodeData) {
        updateNodeData({ event: eventData });
      } else if (updatedata) {
        updatedata({ event: eventData });
      }
    }

    setDisableNext(false);
  }, [id, updateNodeData, newCustomData, CategoryId, type, updatedata]);

  const handleNextCallback = () => {
    setTriggerCreated(true);
  };

  const handleBackClick = useCallback(() => {
    onBackClick();
  }, [onBackClick]);

  return (
    <>
      <div
        style={{
          boxShadow: "0px 9px 28px 8px #0000000D",
          borderRadius: "10px",
        }}
        className="rounded-lg overflow-visible shadow-react-flow-container"
      >
        <div className="flex items-center justify-between bg-accent-lightGreen">
          <div className="p-3 bg-[#E1F4EF] flex items-center rounded-t-[10px] w-full">
            <WebTrigerLighting color="#04A777" />
            <span className="text-[#04A777] ml-3 text-xs">
              {customNodeName || "trigger"}
            </span>
          </div>
        </div>
        <div className="p-4 shadow-react-flow-container relative">
          <div className="flex flex-col grow">
            <CustomEventTab
              CustomData={newCustomData}
              setCustomData={handleSetCustomDataCallback}
              tables={tables}
              type={type}
            />
          </div>
        </div>

        <button
          onClick={saveData}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          save
        </button>
        <hr />
        <div className="flex justify-between items-center pt-[20px] pb-4 px-4">
          <Button
            variant="ghost"
            className="px-7 rounded-[100px]"
            size="lg"
            onClick={handleBackClick}
          >
            Delete
          </Button>
          <Button
            variant="primary"
            className="px-7 rounded-[100px]"
            size="lg"
            onClick={handleNextCallback}
            disabled={disableNext}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="absolute left-full -ml-8 bottom-2/4">
        {triggerCreated && (
          <Connector
            onClick={() => {
              setShowOptions(!showOptions);
              hideOptions && setHideOptions(false);
            }}
          />
        )}
      </div>
      {showOptions && !hideOptions && (
        <div className={`absolute left-full top-0 ml-16`}>
          <ChooseOptions
            data={optionsData}
            onBackClick={handleBackClick}
            onNextClick={handleOptionClickCallback}
          />
        </div>
      )}
    </>
  );
};
