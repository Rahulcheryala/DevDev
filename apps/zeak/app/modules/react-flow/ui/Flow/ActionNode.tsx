import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  Input,
} from "@zeak/react";
import "@xyflow/react/dist/style.css";
import { BiTrashAlt } from "react-icons/bi";
import { BsShare, BsThreeDotsVertical } from "react-icons/bs";
import { CiEdit, CiSearch } from "react-icons/ci";
import Connector from "~/components/ReactFlow/Connector";
import Custom from "./assets/Custom.svg";
import Integrations from "./assets/Integration.svg";
import Rules from "./assets/Rules.svg";
import Workflows from "./assets/Workflows.svg";
import { ChooseOptions } from "./ChooseOptions";
import React, { useEffect, useState } from "react";
import { Integration } from "./options/Integration";
import { Final } from "./options/final";
import ParallelBranches from "./options/ParallelBranches";
import Condition from "./options/condition";
import Delay from "./options/delay";
import { nanoid } from "nanoid";
import Triggers from "./options/trigger";
import { CustomEventNode } from "./options/CustomEventNode";
import { CustomTriggerNode } from "./CustomTriggerNode";

const options = [
  {
    id: 2,
    icon: Integrations,
    name: "Action",
    showSearchBar: true,
    placeholder: "Add an action to your trigger",
    titleBg: "rgba(234, 27, 34, 0.12)",
    titleColor: "#EA1B22",
    optionData: [
      {
        optionsTitle: "Modules",
        events: [
          {
            id: "1",
            Icon: Integrations,
            title: "Send email",
            description: "When a sales order is created in my ERP",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "rgba(234, 27, 34, 0.12)",
            notification_type: "email",
          },
          {
            id: "2",
            Icon: Integrations,
            title: "Send sequential approval email",
            description: "When a sales order is created in my ERP",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "rgba(234, 27, 34, 0.12)",
            notification_type: "email",
          },
          {
            id: "3",
            Icon: Integrations,
            title: "Send parallel approval email",
            description: "When a sales order is created in my ERP",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "rgba(234, 27, 34, 0.12)",
            notification_type: "email",
          },
          {
            id: "4",
            Icon: Integrations,
            title: "Send all approved mail",
            description: "When a sales order is created in my ERP",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "rgba(234, 27, 34, 0.12)",
            notification_type: "email",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    icon: Integrations,
    name: "parallel branches",
    showSearchBar: true,
    placeholder: "parallel branch",
    titleBg: "rgba(234, 27, 34, 0.12)",
    titleColor: "#EA1B22",
    optionData: [
      {
        optionsTitle: "",
        events: [
          {
            id: "1",
            Icon: Integrations,
            title: "parallel branches",
            description: "Create parallel branches",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "rgba(234, 27, 34, 0.12)",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    icon: Workflows,
    name: "Condition",
    showSearchBar: true,
    placeholder: "Condition",
    titleBg: "rgba(234, 27, 34, 0.12)",
    titleColor: "#EA1B22",
    optionData: [
      {
        optionsTitle: "",
        events: [
          {
            id: "1",
            Icon: Integrations,
            title: "add Condition",
            description: "Create Condition branch",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "rgba(234, 27, 34, 0.12)",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    icon: Custom,
    name: "Custom",
    showSearchBar: true,
    placeholder: "Search custom",
    titleBg: "#A259FF1F",
    titleColor: "#A259FF",
    optionData: [
      {
        optionsTitle: "",
        events: [
          {
            id: "1",
            Icon: Rules,
            title: "Custom1",
            description: "The description of the custom action.",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "#A259FF1F",
          },
          {
            id: "2",
            Icon: Rules,
            title: "Custom2",
            description: "The description of the custom action.",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "#A259FF1F",
          },
        ],
      },
      {
        optionsTitle: "New",
        events: [
          {
            id: "21",
            Icon: Rules,
            title: "Create a new action",
            description: "",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "#A259FF1F",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    icon: Rules,
    name: "Delay",
    showSearchBar: true,
    placeholder: "Search Rules",
    titleBg: "#0E77D31A",
    titleColor: "#0E77D3",
    optionData: [],
    isDisabled: false,
  },
  {
    id: 8,
    icon: Rules,
    name: "End Process",
    showSearchBar: true,
    placeholder: "Search Rules",
    titleBg: "#0E77D31A",
    titleColor: "#0E77D3",
    optionData: [],
    isDisabled: true,
  },
  {
    id: 10,
    icon: Integrations,
    name: "Trigger",
    showSearchBar: true,
    placeholder: "Search Rules",
    titleBg: "#0E77D31A",
    titleColor: "#0E77D3",
    optionData: [],
    isDisabled: false,
  },
];

const DotsWithDropdownContent = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
      <IconButton
        aria-label="More options"
        variant="ghost"
        icon={<BsThreeDotsVertical color="#000" />}
        className="rounded-full focus-visible:ring-offset-0 focus-visible:shadow-none focus-visible:ring-0 text-secondary hover:text-secondary hover:bg-dropdownHoverBg data-[state=open]:bg-dropdownHoverBg"
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
  data: any;
  onBackClick: () => void;
  onNextClick: () => void;
  optionData: any;
  updatedata: (arg0: any) => void;
  createCustomNode: any;
  nodeId: any;
  optionClick: any;
  CategoryId: any;
  tabels?: any;
  actions?: any;
  triggers?: any;
  hideOptions: boolean;
  setHideOptions: any;
  selectCategory: any;
  triggerCategories: any;
};

// eslint-disable-next-line react/display-name
export const ChooseAction = React.memo(
  ({
    data,
    onBackClick,
    onNextClick,
    optionData,
    updatedata,
    createCustomNode,
    nodeId,
    optionClick,
    CategoryId,
    tabels,
    actions,
    triggers,
    hideOptions,
    setHideOptions,
    selectCategory,
    triggerCategories,
  }: Props) => {
    const [searchText, setSearchText] = useState("");
    const [selectedItem, setSelectedItem] = useState<any>();
    const [showOptions, setShowOptions] = useState(false);
    const [caseNames, setCaseNames] = useState(optionData.name);
    const [eventData, setEventData] = useState<any>();
    const [finalNodeType, setfinalNodeType] = useState("Action");

    const customId = nanoid();

    const handleSetEventData = (data: any, id?: any) => {
      setEventData({
        id: id ? id : nanoid(),
        category_id: CategoryId,
        type_id: nanoid(),
        type: "action",
        metadata: {
          ...data,
        },
      });
    };

    const handleNextCallback = () => {
      optionData.name === "Custom" ? createCustomNode() : onNextClick();
    };

    const handleNextClickCallback = (selectedEvent: any) => {
      optionClick(selectedEvent, nodeId);
      setShowOptions(!showOptions);
    };

    useEffect(() => {
      if (caseNames === "final") {
        updatedata({ event: eventData });
      }
    }, [caseNames, setCaseNames, eventData, setEventData, updatedata]);

    const renderComponent = () => {
      switch (caseNames) {
        case "Custom":
          return (
            <CustomEventNode
              onBackClick={onBackClick}
              onNextClick={optionClick}
              updatedata={updatedata}
              optionsData={options}
              type={"action"}
              nodeId={nodeId}
              customNodeName="Action"
              tables={tabels}
              hideOptions={hideOptions}
              setHideOptions={setHideOptions}
              id={customId}
              CategoryId={CategoryId}
            />
          );
        case "Delay":
          return (
            <Delay
              data={undefined}
              onBackClick={onBackClick}
              onNextClick={() => setCaseNames("final")}
              optionData={options}
              updatedata={handleSetEventData}
              createCustomNode={undefined}
              nodeId={nodeId}
              optionClick={optionClick}
            />
          );
        case "Condition":
          return (
            <Condition
              data={undefined}
              onBackClick={onBackClick}
              onNextClick={() => setCaseNames("final")}
              optionData={options}
              updatedata={handleSetEventData}
              createCustomNode={undefined}
              nodeId={nodeId}
              optionClick={optionClick}
            />
          );
        case "Action":
          return (
            <Integration
              data={[]}
              onBackClick={onBackClick}
              onNextClick={() => setCaseNames("final")}
              optionData={optionData}
              updatedata={handleSetEventData}
              createCustomNode={createCustomNode}
              nodeId={nodeId}
              optionClick={optionClick}
              actions={actions}
            />
          );
        case "parallel branches":
          return (
            <ParallelBranches
              data={undefined}
              onBackClick={onBackClick}
              onNextClick={() => setCaseNames("final")}
              optionData={options}
              updatedata={handleSetEventData}
              createCustomNode={undefined}
              nodeId={nodeId}
              optionClick={optionClick}
            />
          );
        case "Trigger":
          return (
            <Triggers
              data={undefined}
              onBackClick={onBackClick}
              onNextClick={setCaseNames}
              optionData={options}
              updatedata={handleSetEventData}
              createCustomNode={createCustomNode}
              nodeId={nodeId}
              optionClick={optionClick}
              triggers={triggers}
              setNodeType={setfinalNodeType}
              selectCategory={selectCategory}
              triggerCategories={triggerCategories}
            />
          );
        case "final":
          return (
            <Final
              eventData={eventData}
              onBackClick={onBackClick}
              nodeId={nodeId}
              optionsData={options}
              updatedata={handleSetEventData}
              onNextClick={handleNextClickCallback}
              nodeType={finalNodeType}
              hideOptions={hideOptions}
              setHideOptions={setHideOptions}
            />
          );
        case "customTrigger":
          return (
            <CustomTriggerNode
              onBackClick={onBackClick}
              onNextClick={handleNextClickCallback}
              optionsData={options}
              type={"trigger"}
              nodeId={nodeId}
              CategoryId={CategoryId}
              tables={tabels}
              hideOptions={hideOptions}
              setHideOptions={setHideOptions}
              id={nanoid()}
              updateNodeData={updatedata}
              Category={data}
            />
          );
        default:
          return renderDefaultView();
      }
    };

    const renderDefaultView = () => {
      return (
        <div className="relative">
          <div className="rounded-lg overflow-visible shadow-react-flow-container max-h-[782px] ">
            <div
              className="flex items-center justify-between"
              style={{ backgroundColor: optionData.titleBg }}
            >
              <div className="p-3 flex items-center rounded-t-[10px] w-full">
                <img src={optionData?.icon} alt="icon" />
                <span
                  className="ml-3 text-xs"
                  style={{ color: optionData.titleColor }}
                >
                  {optionData.name}
                </span>
              </div>
            </div>

            {optionData?.showSearchBar && (
              <div className="relative my-2 mx-2">
                <Input
                  value={searchText}
                  onChange={(evt) => setSearchText(evt.target.value)}
                  placeholder={optionData?.placeholder}
                  size="sm"
                  className="pr-6"
                />
                <Button
                  variant="ghost"
                  className="w-6 h-6 p-0 rounded-full right-4 absolute top-1/2 -translate-y-1/2"
                >
                  <CiSearch size={24} />
                </Button>
              </div>
            )}

            {optionData?.optionData?.map((options: any, index: number) => (
              <div
                className="flex flex-col"
                key={`${options.optionsTitle}-${index}`}
              >
                {options.optionsTitle && (
                  <div className="flex flex-col grow justify-between mx-2 self-start p-2">
                    <h3 className="text-base font-[450px] tracking-tighter">
                      {options.optionsTitle}
                    </h3>
                  </div>
                )}
                {options.events.map((event: any, eventIndex: number) => (
                  <button
                    className="flex flex-col grow justify-between mx-2 border border-solid rounded-[10px] hover:border-accent-p2"
                    key={`${event.title}-${eventIndex}`}
                    onClick={() => setSelectedItem(event)}
                    style={{
                      background:
                        selectedItem?.id === event?.id ? event?.background : "",
                    }}
                  >
                    <div className="py-1">
                      <div className="text-left flex items-center border border-input rounded-[10px] p-2 relative">
                        <div className="mr-4">
                          <img src={optionData?.icon} alt="icon" />
                        </div>
                        <div className="grow">
                          <h3
                            className={`text-sm ${
                              event.isDisabled
                                ? "text-[#19110B]"
                                : "text-[#19110B]"
                            }`}
                          >
                            {event.title}
                          </h3>
                          <p className="text-sm text-tertiary">
                            {event.description}
                          </p>
                        </div>
                        {event.showSecondaryOptions && (
                          <div className="absolute top-3 right-3">
                            <DotsWithDropdownContent />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ))}

            <hr />
            <div className="flex justify-between items-center pt-[20px] pb-4 px-4">
              <Button
                variant="ghost"
                className="px-7 rounded-[100px]"
                size="lg"
                onClick={onBackClick}
              >
                Delete
              </Button>
              <Button
                variant="primary"
                className="px-7 rounded-[100px]"
                size="lg"
                onClick={handleNextCallback}
              >
                Next
              </Button>
            </div>
          </div>
          <div className="custom-node__body">
            <Connector onClick={() => setShowOptions(!showOptions)} />
          </div>
          {showOptions && (
            <div className="absolute left-full top-0 ml-16">
              <ChooseOptions
                data={options}
                onBackClick={onBackClick}
                onNextClick={handleNextClickCallback}
                createCustomNode={createCustomNode}
                nodeId={nodeId}
              />
            </div>
          )}
        </div>
      );
    };

    return renderComponent();
  },
);
