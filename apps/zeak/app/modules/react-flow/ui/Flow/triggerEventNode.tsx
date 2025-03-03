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
import { useState } from "react";
import Integrations from "./assets/Integration.svg";

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
};

export const TriggerEventNode = ({ data, onBackClick, onNextClick }: Props) => {
  const [showOptions, setshowOptions] = useState(false);

  return (
    <>
      <div
        style={{
          boxShadow: "0px 9px 28px 8px #0000000D",
          borderRadius: "10px",
        }}
      >
        <div
          className="rounded-lg overflow-visible shadow-react-flow-container"
          style={{
            boxShadow: "0px 9px 28px 8px #0000000D",
          }}
        >
          <div className="flex items-center justify-between bg-accent-lightGreen">
            <div
              className="p-3 flex items-center rounded-t-[10px] w-full"
              style={{ backgroundColor: "rgba(234, 27, 34, 0.12)" }}
            >
              <img src={Integrations} alt="icon" />
              <span className="ml-3 text-xs" style={{ color: "#EA1B22" }}>
                {"Integrations"}
              </span>
            </div>
          </div>
          <div className="p-4 shadow-react-flow-container relative">
            <div className="flex flex-col grow justify-between mx-1 border-solid rounded-[10px] hover:border-accent-p2">
              <div className="py-1">
                <div className="text-left flex items-center border border-input rounded-[10px] p-2 relative">
                  <div className="mr-4">
                    <img src={data.imageUrl} alt="" width={28} height={28} />
                  </div>
                  <div className="grow">
                    <h3 className={`text-sm`}>{"Send Email"}</h3>
                    <p className={`text-sm text-tertiary`}>
                      {"Send sales report email"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
          </div>
        </div>
      </div>
      <div className="custom-node__body">
        <Connector
          onClick={() => {
            setshowOptions(!showOptions);
          }}
        />
      </div>
    </>
  );
};
