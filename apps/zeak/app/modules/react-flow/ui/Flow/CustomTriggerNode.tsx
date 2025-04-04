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
import { ChooseOptions } from "./ChooseOptions";
import TabComponent from "~/components/ReactFlow/CustomNode/TabComponent";
import ScheduleTab from "~/components/ReactFlow/CustomNode/ScheduleTab";
import { nanoid } from "nanoid";

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
  Category: any;
};

export const CustomTriggerNode = ({
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
  Category,
}: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [newCustomData, setNewCustomData] = useState<any>();
  const [triggerCreated, setTriggerCreated] = useState(
    initialData?.triggerCreated || false,
  );

  const [isNextDisabled, setIsNextDisabled] = useState(true);

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
    //   console.log("Setting custom data")
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

  const handleNextCallback = useCallback(() => {
    setTriggerCreated(true);
    if (updateNodeData && Category?.category === "Schedule") {
      updateNodeData({
        event: {
          id: id,
          category_id: CategoryId,
          type_id: nanoid(),
          type: type,
          nodeType: "custom trigger",
          metadata: {
            ...newCustomData,
          },
        },
      });
    } else {
      (updateNodeData &&
        updateNodeData({
          event: {
            id: id,
            category_id: CategoryId,
            type_id: nanoid(),
            type: type,
            nodeType: "custom trigger",
            metadata: {
              ...newCustomData,
            },
          },
        })) ||
        (updatedata &&
          updatedata({
            event: {
              id: id,
              category_id: CategoryId,
              type_id: nanoid(),
              type: type,
              nodeType: "custom trigger",
              metadata: {
                ...newCustomData,
              },
            },
          }));
    }
  }, [
    updateNodeData,
    Category?.category,
    id,
    CategoryId,
    type,
    newCustomData,
    updatedata,
  ]);

  const handleBackClick = useCallback(() => {
    onBackClick();
  }, [onBackClick]);

  const handleScheduleEvent = useCallback((data: any) => {
    setNewCustomData(data);
    setIsNextDisabled(false);
  }, []);

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
            {Category.category === "Schedule" ? (
              <>
                <ScheduleTab onSave={handleScheduleEvent} />
              </>
            ) : (
              <TabComponent
                type={type}
                CategoryId={CategoryId}
                setNewCustomData={handleSetCustomDataCallback}
                initialData={newCustomData}
                tables={tables}
                setIsNextDisabled={setIsNextDisabled}
              />
            )}
          </div>
        </div>
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
            isDisabled={isNextDisabled}
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
