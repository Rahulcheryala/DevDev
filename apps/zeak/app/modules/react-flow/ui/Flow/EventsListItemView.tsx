import { WebTrigerLighting } from "@zeak/icons";
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
import Custom from "./assets/Custom.svg";

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
  onBackClick: any;
  onNextClick: (arg0: any) => void;
  optionsData: any;
  createCustomNode?: any;
  nodeId: any;
  updateNodeData: any;
  CategoryId: any;
  id: any;
  type: any;
};

export const EventsListItemView = ({
  data,
  onBackClick,
  onNextClick,
  createCustomNode,
  nodeId,
  updateNodeData,
  CategoryId,
  id,
  type,
}: Props) => {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSeletctedItem] = useState<any>();

  const updateData = () => {
    updateNodeData({
      event: {
        ...selectedItem,
      },
    });
    onNextClick(selectedItem);
  };

  const nextClickHandler = () => {
    selectedItem === "custom"
      ? createCustomNode(nodeId, selectedItem)
      : updateData();
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
            <div className="p-3 bg-[#E1F4EF] flex items-center rounded-t-[10px] w-full">
              <WebTrigerLighting color="#04A777" />
              <span className="text-[#04A777] ml-3 text-xs">TRIGGER</span>
            </div>
          </div>
          <div className="p-4 shadow-react-flow-container">
            <div className="relative mb-2">
              <Input
                value={searchText}
                onChange={(evt) => setSearchText(evt.target.value)}
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
              {data
                .filter((each: any) =>
                  each.name.toLowerCase().includes(searchText.toLowerCase()),
                )
                .map((item: any, i: any) => (
                  <li
                    key={`${item?.id}-${i}`}
                    data-key={item?.id}
                    className={`flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:border-accent-p2`}
                    style={{
                      backgroundColor:
                        selectedItem?.name === item?.name ? "lightblue" : "",
                    }}
                    onClick={() => setSeletctedItem(item)}
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[#F2F1FD]">
                      <img src={item?.imageUrl} alt="" width={28} height={28} />
                    </div>
                    <div className="ml-4 text-left">
                      <h3 className="text-sm">{item?.name}</h3>
                      <p className="text-sm text-tertiary">
                        {item?.description}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
            <button
              className="flex flex-col grow w-full"
              onClick={() => setSeletctedItem("custom")}
            >
              <div className="flex flex-col grow justify-between mx-2 self-start p-2">
                <h3 className="text-base font-[450px] tracking-tighter">
                  {"Custom trigger"}
                </h3>
              </div>
              <div
                className="flex flex-col grow justify-between mx-1 border-solid rounded-[10px] hover:border-accent-p2 w-full"
                style={{
                  backgroundColor: selectedItem === "custom" ? "lightblue" : "",
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
              disabled={!selectedItem}
              onClick={() => nextClickHandler()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
