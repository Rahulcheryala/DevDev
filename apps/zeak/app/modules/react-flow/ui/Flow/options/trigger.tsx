import React, { useState, useEffect, useCallback } from "react";
import { Button, Input } from "@zeak/react";
// import { CiSearch } from "react-icons/ci";
import "@xyflow/react/dist/style.css";
import Custom from "../assets/Custom.svg";
import { CiSearch } from "react-icons/ci";
import { DotsWithDropdownContent } from "../UpdatedListItemView";

type Props = {
  data: any;
  onBackClick: () => void;
  onNextClick: (arg0?: any) => void;
  optionData: any;
  updatedata: (arg0: any) => void;
  createCustomNode: any;
  triggers: any;
  nodeId: any;
  optionClick: any;
  setNodeType: any;
  selectCategory: any;
  triggerCategories: any;
};

const Triggers: React.FC<Props> = ({
  data,
  onBackClick,
  onNextClick,
  optionData,
  updatedata,
  createCustomNode,
  nodeId,
  optionClick,
  triggers,
  setNodeType,
  selectCategory,
  triggerCategories,
}) => {
  // const [searchText, setSearchText] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [searchCategory, setSearchCategory] = useState<any>("");
  const [categoryTriggers, setCategoryTriggers] = useState<any>("");

  const handleNextCallback = () => {
    updatedata({ event: selectedEvent });
    setNodeType("Trigger");
    if (selectedEvent === "custom") {
      onNextClick("customTrigger");
    } else {
      onNextClick("final");
    }
  };

  const handleSelectedCategory = useCallback(
    (item: any) => {
      setSelectedCategory(item);
      const categoryTriggers = triggers.filter(
        (trigger: any) => trigger.category_id === item.id,
      );
      setCategoryTriggers(categoryTriggers);
    },
    [triggers],
  );

  useEffect(() => {
    return () => {
      setSelectedEvent(null);
    };
  }, []);

  return (
    <div className="relative flex flex-col max-h-max">
      {selectedCategory ? (
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

          {categoryTriggers.map((event: any, eventIndex: number) => (
            <button
              className="flex flex-col grow justify-between mx-2 border border-solid rounded-[10px] hover:border-accent-p2"
              key={`${event.id}-${eventIndex}`}
              onClick={() => setSelectedEvent(event)}
              style={{
                background: selectedEvent?.id === event?.id ? "#A259FF1F" : "",
              }}
            >
              <div className="py-1">
                <div className="text-left flex items-center border border-input rounded-[10px] p-2 relative">
                  <div className="mr-4">
                    <img src={event?.imageUrl} alt="icon" />
                  </div>
                  <div className="grow">
                    <h3
                      className={`text-sm ${
                        event.isDisabled ? "text-[#19110B]" : "text-[#19110B]"
                      }`}
                    >
                      {event.name}
                    </h3>
                    <p className="text-sm text-tertiary">{event.description}</p>
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
          <button
            className="flex flex-col grow w-full"
            onClick={() => setSelectedEvent("custom")}
          >
            <div className="flex flex-col grow justify-between mx-2 self-start p-2">
              <h3 className="text-base font-[450px] tracking-tighter">
                {"Custom trigger"}
              </h3>
            </div>
            <div
              className="flex flex-col grow justify-between mx-1 border-solid rounded-[10px] hover:border-accent-p2 w-full"
              style={{
                backgroundColor: selectedEvent === "custom" ? "lightblue" : "",
              }}
            >
              <div className="py-1">
                <div className="text-left flex items-center border border-input rounded-[10px] p-2 relative">
                  <div className="mr-4">
                    <img src={Custom} alt="" width={28} height={28} />
                  </div>
                  <div className="grow">
                    <h3 className={`text-sm text-[#19110B]`}>
                      {"Create a trigger"}
                    </h3>
                    <p className={`text-sm text-tertiary`}>
                      {"Create a new trigger"}
                    </p>
                  </div>
                  {false && (
                    <div className="absolute top-3 right-3">
                      <DotsWithDropdownContent />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div className="p-4 shadow-react-flow-container">
          <div className="relative mb-2">
            <Input
              value={searchCategory}
              onChange={(evt) => setSearchCategory(evt.target.value)}
              placeholder="Search integrations"
              size={"sm"}
              className=" pr-6"
            />
            <Button
              variant="ghost"
              className="w-6 h-6  p-0 rounded-full right-4 absolute top-[50%] translate-y-[-50%]" //hover:bg-accent-lightGreen
            >
              <CiSearch size={24} />
            </Button>
          </div>
          <ul className="-mb-[5px]">
            {triggerCategories
              .filter((each: any) =>
                each.category
                  .toLowerCase()
                  .includes(searchCategory.toLowerCase()),
              )
              .map((item: any) => (
                <li
                  key={item?.id}
                  data-key={item?.id}
                  className={`flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:border-accent-p2`}
                  style={{
                    background:
                      searchCategory?.id === item?.id ? item?.background : "",
                  }}
                  onClick={() => handleSelectedCategory(item)}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[#F2F1FD]">
                    <img src={item?.logoImage} alt="" width={28} height={28} />
                  </div>
                  <div className="ml-4 text-left">
                    <h3 className="text-sm">{item?.category}</h3>
                    <p className="text-sm text-tertiary">
                      {item?.categoryDesc}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}

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
          disabled={!selectedEvent}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Triggers;
