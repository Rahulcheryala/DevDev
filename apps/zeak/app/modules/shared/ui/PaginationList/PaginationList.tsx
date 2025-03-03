import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
} from "@zeak/react";
import React, { useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

type PaginationListProps = {
  metadata: any;
};

const PaginationList = (props: PaginationListProps) => {
  const { metadata } = props;

  const [perPageItem, setPerPageItem] = useState(metadata.perPageItem);
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="text-sm">
          <span className="text-accent-primary font-medium">
            Showing {perPageItem}
          </span>{" "}
          of {metadata.count} items
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-textLink uppercase">
          <IoChevronBackOutline size={20} className="text-secondary-tertiary" />
          PREV
        </Button>
        <div className="flex items-center space-x-2">
          <IconButton
            aria-label={"pin"}
            variant={true ? "primary" : "ghost"}
            className={`rounded-full h-8 w-8 text-sm border-none ${
              true ? "" : "hover:bg-background"
            }`}
            icon={<>1</>}
          />
          <IconButton
            aria-label={"pin"}
            variant={false ? "primary" : "ghost"}
            className={`rounded-full h-8 w-8 text-sm border-none ${
              false ? "" : "hover:bg-background"
            }`}
            icon={<>2</>}
          />
          <IconButton
            aria-label={"pin"}
            variant={false ? "primary" : "ghost"}
            className={`rounded-full h-8 w-8 text-sm border-none ${
              false ? "" : "hover:bg-background"
            }`}
            icon={<>3</>}
          />
          <IconButton
            aria-label={"pin"}
            variant={false ? "primary" : "ghost"}
            className={`rounded-full h-8 w-8 text-sm border-none ${
              false ? "" : "hover:bg-background"
            }`}
            icon={<>4</>}
          />
        </div>
        <Button variant="ghost" className="text-textLink uppercase">
          Next
          <IoChevronForwardOutline
            size={20}
            className="text-secondary-tertiary"
          />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none focus-visible:outline-none h-10 flex justify-center items-center border py-3 px-4 text-textLink uppercase text-xs border-stroke rounded-full">
            {perPageItem} / page{" "}
            {true ? (
              <LuChevronDown size={20} className="ml-2" />
            ) : (
              <LuChevronUp size={20} className="ml-2" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[118px]">
            <DropdownMenuItem
              className="py-2"
              onClick={() => setPerPageItem(20)}
            >
              20
            </DropdownMenuItem>
            <DropdownMenuItem
              className="py-2"
              onClick={() => setPerPageItem(50)}
            >
              50
            </DropdownMenuItem>
            <DropdownMenuItem
              className="py-2"
              onClick={() => setPerPageItem(100)}
            >
              100
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PaginationList;
