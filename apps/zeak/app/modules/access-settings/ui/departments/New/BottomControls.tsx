import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@zeak/react";
import { GoPlus } from "react-icons/go";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { RxCopy } from "react-icons/rx";

type BottomControlsProps = {
  handleReview: () => void;
  handleBackClick: () => void;
  handleAddUsersClick: () => void;
  handleDuplicateClick: () => void;
  isReviewPage: boolean;
};

const BottomControls = ({
  handleReview,
  isReviewPage,
  handleBackClick,
  handleAddUsersClick,
  handleDuplicateClick,
}: BottomControlsProps) => {
  return (
    <div className="-mx-[60px] px-[124px] py-4 flex justify-between items-center sticky bottom-0 left-0 bg-card border-t border-stroke">
      <Button
        variant="ghost"
        className="px-8 py-4 h-auto text-secondary"
        onClick={handleBackClick}
      >
        {isReviewPage ? "Back" : "Cancel"}
      </Button>
      {isReviewPage && (
        <div className="flex items-center">
          <Button
            variant="white"
            className="text-accent-primary py-[14px] px-6 h-auto font-normal"
            onClick={handleAddUsersClick}
          >
            <GoPlus className="text-accent-primary w-5 h-5 mr-2" />
            Add Users
          </Button>
          <Button
            variant="white"
            className="text-accent-primary py-[14px] px-6 h-auto font-normal"
            onClick={handleDuplicateClick}
          >
            <RxCopy className="text-accent-primary w-5 h-5 mr-2" />
            Copy Department
          </Button>
          {/* <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
              <Button
                variant="ghost"
                className="py-[13px] px-4 min-w-[100px] text-sm font-normal text-accent-primary rounded-sm h-auto text-left justify-between  border-none"
              >
                More{" "}
                {true ? (
                  <LuChevronDown
                    size={20}
                    className="text-accent-primary ml-1"
                  />
                ) : (
                  <LuChevronUp size={20} className="text-accent-primary ml-1" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[100px]">
              <DropdownMenuLabel className="py-3">
                Dropdown Item
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      )}
      {isReviewPage ? (
        <div className="flex items-center">
          <Button
            variant="secondary"
            className="px-8 py-4 bg-card h-auto rounded-sm hover:text-card rounded-tr-none rounded-br-none border-r-none"
            onClick={handleReview}
          >
            Finish and Add Users
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
              <Button
                variant="secondary"
                className="w-[54px] text-sm font-normal p-0 bg-card h-auto rounded-sm hover:text-card rounded-sm h-[54px] text-left justify-center border-l-none rounded-tl-none rounded-bl-none"
              >
                {true ? (
                  <LuChevronDown size={24} className="" />
                ) : (
                  <LuChevronUp size={24} className="" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[100px]">
              <DropdownMenuLabel className="py-3">
                Dropdown Item
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Button
          variant="secondary"
          className="px-8 py-4 bg-card h-auto hover:text-card rounded-sm"
          onClick={handleReview}
        >
          Review and Finish
        </Button>
      )}
    </div>
  );
};

export default BottomControls;
