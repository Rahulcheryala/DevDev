import { Button, Input } from "@zeak/react";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import "@xyflow/react/dist/style.css";
import Custom from "../assets/Custom.svg";

type Props = {
  data: any;
  onBackClick: () => void;
  onNextClick: () => void;
  optionData: any;
  updatedata: (arg0: any) => void;
  createCustomNode: any;
  nodeId: any;
  optionClick: any;
};

const ParallelBranches = ({
  data,
  onBackClick,
  onNextClick,
  optionData,
  updatedata,
  createCustomNode,
  nodeId,
  optionClick,
}: Props) => {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>();

  const [selectedEvent, setSelectedEvent] = useState<any>();

  const handleNextCallback = () => {
    updatedata({ event: selectedEvent });
    optionData.name === "Custom" ? createCustomNode() : onNextClick();
  };

  // const handleNextClickCallback = (selectedEvent: any) => {
  //   console.log(nodeId, "nodeId");
  //   optionClick(selectedEvent, nodeId);
  //   setShowOptions(!showOptions);
  //   setCaseNames(selectedEvent.name); // Update caseNames when a new option is selected
  // };

  return (
    <div className="relative overflow-scroll h-[600px]">
      <div className="rounded-lg shadow-react-flow-container h-[600px] ">
        <div
          className="flex items-center justify-between"
          style={{ backgroundColor: "#A259FF1F" }}
        >
          <div className="p-3 flex items-center rounded-t-[10px] w-full">
            <img src={Custom} alt="icon" />
            <span
              className="ml-3 text-xs"
              style={{ color: optionData.titleColor }}
            >
              {optionData.name}
            </span>
          </div>
        </div>

        {selectedItem ? (
          selectedItem?.optionData?.map((options: any, index: number) => (
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
                  onClick={() => setSelectedEvent(event)}
                  style={{
                    background:
                      selectedItem?.id === event?.id ? event?.background : "",
                  }}
                >
                  <div className="py-1">
                    <div className="text-left flex items-center border border-input rounded-[10px] p-2 relative">
                      <div className="mr-4">
                        <img src={options?.icon} alt="icon" />
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
                      {/* {event.showSecondaryOptions && (
                          <div className="absolute top-3 right-3">
                            <DotsWithDropdownContent />
                          </div>
                        )} */}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ))
        ) : (
          <>
            {optionData?.showSearchBar ||
              (true && (
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
              ))}

            <div
              className="flex flex-col"
              key={`${"options.optionsTitle"}-${"index"}`}
            >
              {true && (
                <div className="flex flex-col grow justify-between mx-2 self-start p-2">
                  <h3 className="text-base font-[450px] tracking-tighter">
                    {"options"}
                  </h3>
                </div>
              )}
              {optionData.map((option: any, index: any) => {
                return (
                  <button
                    className="flex flex-col grow justify-between mx-2 border border-solid rounded-[10px] hover:border-accent-p2"
                    key={`${option?.name}-${index}`}
                    onClick={() => setSelectedItem(option)}
                    style={{
                      background:
                        selectedItem?.id === option?.id ? option?.titleBg : "",
                    }}
                  >
                    <div className="py-1">
                      <div className="text-left flex items-center border border-input rounded-[10px] p-2 relative">
                        <div className="mr-4">
                          <img src={option?.icon} alt="icon" />
                        </div>
                        <div className="grow">
                          <h3
                            className={`text-sm ${
                              false ? "text-[#19110B]" : "text-[#19110B]"
                            }`}
                          >
                            {option?.name}
                          </h3>
                          <p className="text-sm text-tertiary">
                            {"Lorem ipsum dolor sit amet set consectetur."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
              {/* {optionData?.events.map((event: any, eventIndex: number) => (
            <button
              className="flex flex-col grow justify-between mx-2 border border-solid rounded-[10px] hover:border-accent-p2"
              key={`${event.title}-${eventIndex}`}
              onClick={() => setSelectedItem(event)}
              style={{
                background: selectedItem?.id === event?.id ? event?.background : "",
              }}
            >
              <div className="py-1">
                <div className="text-left flex items-center border border-input rounded-[10px] p-2 relative">
                  <div className="mr-4">
                    <img src={optionData?.icon} alt="icon" />
                  </div>
                  <div className="grow">
                    <h3 className={`text-sm ${event.isDisabled ? 'text-[#19110B]' : 'text-[#19110B]'}`}>{event.title}</h3>
                    <p className="text-sm text-tertiary">{event.description}</p>
                  </div>
                </div>
              </div>
            </button>
          ))} */}
            </div>
          </>
        )}

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
    </div>
  );
};

export default ParallelBranches;
