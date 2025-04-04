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
import { CiEdit, CiSearch } from "react-icons/ci";
import { BiTrashAlt } from "react-icons/bi";
import { BsShare, BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import Connector from "~/components/ReactFlow/Connector";
import { ChooseOptions } from "./ChooseOptions";
import type { ChangeEvent } from "react";

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
  data: any;
  showBackButton?: boolean;
  showNextButton?: boolean;
  onBackClick?: () => void;
  onNextClick?: (arg0?: any) => void;
  optionsData?: any;
  updatedata?: (arg0: any) => void;
  showPlusButton?: boolean;
  step?: number;
};

export const DynamicNode = ({
  data,
  onBackClick,
  onNextClick,
  optionsData,
  updatedata,
  showPlusButton = false,
  showBackButton = true,
  showNextButton = true,
  step,
}: Props) => {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>();
  const [showOptions, setShowOptions] = useState(false);
  // const [state, setState] = useState({
  //   ...data,
  // });

  // const handleToggle = () => setTogglePassword((prev) => !prev);

  const stateChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    console.log(name, value);

    // setState((prev: typeof data) => ({
    //   ...prev,
    //   [name]: value,
    // }));
  };

  const handleNextCallback = (data: any) => {
    updatedata && updatedata({ event: data });
    onNextClick && onNextClick(selectedItem);
  };

  const handleOptionClick = (option: any) => {
    // onNextClick && onNextClick(showOptions)
  };

  return (
    <>
      <div
        style={{
          boxShadow: "0px 9px 28px 8px #0000000D",
          borderRadius: "10px",
        }}
      >
        <div
          className="rounded-lg overflow-hidden shadow-react-flow-container"
          style={{
            boxShadow: "0px 9px 28px 8px #0000000D",
          }}
        >
          <div className="flex items-center justify-between bg-accent-lightGreen">
            <div
              className="p-3 flex items-center rounded-t-[10px] w-full"
              style={{
                backgroundColor: `${data?.titleBg ? data?.titleBg : ""}`,
              }}
            >
              <img src={data?.icon} alt="icon" />
              <span
                className="ml-3 text-xs"
                style={{ color: `${data?.titleColor ? data?.titleColor : ""}` }}
              >
                {data?.name ? data?.name : "Trriger"}
              </span>
            </div>
          </div>

          {data?.showSearchBar && (
            <div className="relative my-2 mx-2">
              <Input
                value={searchText}
                onChange={(evt) => setSearchText(evt.target.value)}
                placeholder={data?.placeholder}
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
          )}

          {data?.optionData &&
            data?.optionData?.map((options: any, index: any) => (
              <div
                className="flex flex-col"
                key={`${options.optionsTitle}-${index}`}
              >
                {data.optionsTitle && data.optionsTitle.length > 0 && (
                  <div className="flex flex-col grow justify-between mx-2 self-start p-2">
                    <h3 className="text-base font-[450px] tracking-tighter">
                      {options.optionsTitle}
                    </h3>
                  </div>
                )}
                {options.events.map((event: any, index: any) => {
                  return (
                    <>
                      <button
                        className="flex flex-col grow justify-between mx-2 border border-solid rounded-[10px] hover:border-accent-p2"
                        key={`${event.title}-${index}`}
                        onClick={() =>
                          setSelectedItem({ event: event, stepId: data?.id })
                        }
                      >
                        <div className="py-1">
                          <div className="text-left flex items-center border border-input rounded-[10px] p-2 relative">
                            {data?.icon && (
                              <div className="mr-4">
                                <img src={data?.icon} alt="icon" />
                              </div>
                            )}
                            <div className="grow">
                              {event.title ||
                                (event?.description && (
                                  <>
                                    <h3
                                      className={`text-sm ${
                                        event.isDisabled
                                          ? "text-[#19110B]"
                                          : "text-[#19110B]"
                                      }`}
                                    >
                                      {event.title}
                                    </h3>
                                    <p className={`text-sm text-tertiary`}>
                                      {event?.description}
                                    </p>
                                  </>
                                ))}
                            </div>
                            {event?.showSecondaryOptions && (
                              <div className="absolute top-3 right-3">
                                <DotsWithDropdownContent />
                              </div>
                            )}
                          </div>
                        </div>
                      </button>

                      <div className="p-4 shadow-react-flow-container relative">
                        <div
                          className={`form transition-all ${
                            false ? "blur-[2px]" : ""
                          }`}
                        >
                          {event?.inputs &&
                            event?.inputs.length > 0 &&
                            event.inputs.map((input: any, i: any) => {
                              return (
                                <div
                                  className="relative mb-2"
                                  key={`${input.lebel}-${i}`}
                                >
                                  <p className="text-sm text-left my-2 pt-2">
                                    {input.lebel}
                                  </p>
                                  <Input
                                    value={input.value}
                                    onChange={stateChangeHandler}
                                    placeholder="Enter your client id"
                                    name={input.lebel}
                                    size="md"
                                  />
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </>
                  );
                })}
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
              Back
            </Button>
            <Button
              variant="primary"
              className="px-7 rounded-[100px]"
              size="lg"
              // disabled={!validButton}
              // onClick={onNextClick}
              onClick={handleNextCallback}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      {showPlusButton && (
        <div className="custom-node__body">
          <Connector
            onClick={() => {
              // onNextClick();
              setShowOptions(!showOptions);
            }}
          />
        </div>
      )}
      {showOptions && optionsData && (
        <div
          className={`relative -right-[450px] -top-[315px] items-center flex justify-center`}
        >
          <ChooseOptions
            data={optionsData}
            onBackClick={onBackClick}
            onNextClick={handleOptionClick}
          />
        </div>
      )}
    </>
  );
};
