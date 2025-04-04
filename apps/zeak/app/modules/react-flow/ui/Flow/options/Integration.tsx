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
import { useState } from "react";
import IntegrationIcon from "../assets/Integration.svg";

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
  onNextClick: any;
  optionData: any;
  updatedata: (arg0: any) => void;
  createCustomNode: any;
  nodeId: any;
  optionClick: any;
  actions?: any;
};

export const Integration = ({
  data,
  onBackClick,
  onNextClick,
  optionData,
  updatedata,
  createCustomNode,
  nodeId,
  optionClick,
  actions,
}: Props) => {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>();
  const [isDisabled, setIsDisabled] = useState(true);

  const handleNextCallback = () => {
    updatedata({ event: selectedItem });
    // optionData.name === 'Custom' ? createCustomNode() : onNextClick();
    onNextClick("final");
  };

  // const handleNextClickCallback = (selectedEvent: any) => {
  //   optionClick(selectedEvent, nodeId);
  //   setShowOptions(!showOptions);
  // };

  const handleSelectItem = (data: any) => {
    setSelectedItem(data);
    setIsDisabled(false);
  };

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
            {actions.map((event: any, eventIndex: number) => (
              <button
                className="flex flex-col grow justify-between mx-2 border border-solid rounded-[10px] hover:border-accent-p2"
                key={`${event?.eventName}-${eventIndex}`}
                onClick={() => handleSelectItem(event)}
                style={{
                  background:
                    selectedItem?.id === event?.id ? event?.title_bg : "",
                }}
              >
                <div className="py-1">
                  <div className="text-left flex items-center border border-input rounded-[10px] p-2 relative">
                    <div className="mr-4">
                      <img src={IntegrationIcon} alt="icon" />
                    </div>
                    <div className="grow">
                      <h3>{event?.eventName}</h3>
                      <p className="text-sm text-tertiary">
                        {event?.eventDesc}
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
            isDisabled={isDisabled}
          >
            Next
          </Button>
        </div>
      </div>
      {/* <div className='custom-node__body'>
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
      )} */}
    </div>
  );
};
