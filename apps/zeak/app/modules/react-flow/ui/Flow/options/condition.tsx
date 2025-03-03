import React, { useState, useEffect } from "react";
import { Button, Input } from "@zeak/react";
import { CiSearch } from "react-icons/ci";
import "@xyflow/react/dist/style.css";
import Custom from "../assets/Custom.svg";
import DropdownComponent from "~/components/ReactFlow/CustomNode/dropdown";

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

const Condition: React.FC<Props> = ({
  data,
  onBackClick,
  onNextClick,
  optionData,
  updatedata,
  createCustomNode,
  nodeId,
  optionClick,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedCondition, setSelectedCondition] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleNextCallback = () => {
    updatedata({ event: selectedEvent, condition: selectedCondition });
    optionData.name === "Custom" ? createCustomNode() : onNextClick();
  };

  const isOptionsDisabled = !selectedCondition;

  const mockConditions: any[] = [
    { value: "continue if Yes or no", name: "continue if Yes or no" },
    { value: "or only yes", name: "or only yes" },
    { value: "or only no", name: "or only no" },
  ];

  useEffect(() => {
    return () => {
      setSelectedItem(null);
      setSelectedEvent(null);
    };
  }, []);

  return (
    <div className="relative flex flex-col overflow-scroll h-[600px]">
      <div className="rounded-lg shadow-react-flow-container flex-grow overflow-auto">
        <div
          className="flex items-center justify-between sticky top-0 z-10"
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
          <div className="p-4">
            <div className="mb-4">
              <label
                htmlFor="condition-select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Condition
              </label>
              <DropdownComponent
                options={mockConditions}
                onChange={setSelectedCondition}
                value={selectedCondition}
              />
            </div>

            {optionData?.showSearchBar && (
              <div className="relative my-2">
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

            <div className="flex flex-col">
              {optionData.map((option: any, index: number) => (
                <button
                  key={`${option.name}-${index}`}
                  className={`flex flex-col grow justify-between mx-2 border border-solid rounded-[10px] hover:border-accent-p2 mb-2 ${
                    isOptionsDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => !isOptionsDisabled && setSelectedItem(option)}
                  style={{
                    background:
                      selectedItem?.id === option?.id ? option?.titleBg : "",
                  }}
                  disabled={selectedCondition.length < 1}
                >
                  <div className="py-1">
                    <div className="text-left flex items-center border border-input rounded-[10px] p-2 relative">
                      <div className="mr-4">
                        <img src={option?.icon} alt="icon" />
                      </div>
                      <div className="grow">
                        <h3
                          className={`text-sm ${
                            isOptionsDisabled
                              ? "text-gray-400"
                              : "text-[#19110B]"
                          }`}
                        >
                          {option?.name}
                        </h3>
                        <p
                          className={`text-sm ${
                            isOptionsDisabled
                              ? "text-gray-400"
                              : "text-tertiary"
                          }`}
                        >
                          {"Lorem ipsum dolor sit amet set consectetur."}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className=" bg-white border-t border-gray-200 p-4 flex justify-between items-center mt-auto">
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
          disabled={!selectedItem || !selectedCondition}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Condition;
