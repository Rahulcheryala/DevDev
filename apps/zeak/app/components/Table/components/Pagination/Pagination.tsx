import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  HStack,
  IconButton,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useKeyboardShortcuts,
} from "@zeak/react";
import { prettifyKeyboardShortcut } from "@zeak/utils";
import { WebAngleDown } from "@zeak/icons";
import { useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

export type PaginationProps = {
  count: number;
  offset: number;
  pageIndex: number;
  pageSize: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  gotoPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
};

const Pagination = (props: PaginationProps) => {
  const { pageSize, setPageSize } = props;

  const pageSizes = [10, 20, 50];
  if (!pageSizes.includes(pageSize)) {
    pageSizes.push(pageSize);
    pageSizes.sort();
  }

  return (
    <HStack
      className="text-center bg-white justify-between px-0 pt-7 w-full z-[1]"
      spacing={6}
    >
      <div>
        {/* <p className="text-sm">
          <span className="text-accent-primary font-medium">
            Showing {"TBD"}
          </span>{" "}
          of {"TBD"} items
        </p> */}
      </div>
      <div className="flex items-center">
        <HStack className="space-x-4">
          <PaginationButtons {...props} />
        </HStack>

        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="border border-stroke h-10 bg-white rounded-[56px] hover:bg-white"
          >
            <Button
              variant="secondary"
              className="font-normal text-sm font-sans flex gap-2 items-center text-secondary"
            >
              <span>{pageSize} / page</span>
              <WebAngleDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[154px]">
            <DropdownMenuRadioGroup className="pl-6" value={`${pageSize}`}>
              {pageSizes.map((size) => (
                <>
                  <DropdownMenuRadioItem
                    key={`${size}`}
                    value={`${size}`}
                    onClick={() => {
                      setPageSize(size);
                    }}
                    className="hover:bg-accent-bgHoverNew focus:bg-accent-bgHoverNew p-[15px] -ml-6 [&>span]:hidden data-[state=checked]:bg-accent-bgHoverNew rounded-none"
                  >
                    {size} / page
                  </DropdownMenuRadioItem>

                  <DropdownMenuSeparator className="m-0" />
                </>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </HStack>
  );
};

export const PaginationButtons = ({
  condensed = false,
  canNextPage,
  canPreviousPage,
  count,
  nextPage,
  offset,
  pageSize,
  previousPage,
  pageCount,
  pageIndex,
  gotoPage,
}: PaginationProps & { condensed?: boolean }) => {
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const previousButtonRef = useRef<HTMLButtonElement>(null);

  useKeyboardShortcuts({
    ArrowRight: (event: KeyboardEvent) => {
      event.stopPropagation();
      nextButtonRef.current?.click();
    },
    ArrowLeft: (event: KeyboardEvent) => {
      event.stopPropagation();
      previousButtonRef.current?.click();
    },
  });

  return (
    <>
      {condensed ? (
        <>
          <Tooltip>
            <TooltipTrigger>
              <IconButton
                aria-label="Previous"
                icon={<BsChevronLeft />}
                isDisabled={!canPreviousPage}
                onClick={previousPage}
                variant="secondary"
              />
            </TooltipTrigger>
            <TooltipContent>
              <HStack>{prettifyKeyboardShortcut("ArrowLeft")}</HStack>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <IconButton
                aria-label="Next"
                icon={<BsChevronRight />}
                isDisabled={!canNextPage}
                onClick={nextPage}
                variant="secondary"
              />
            </TooltipTrigger>
            <TooltipContent>
              <HStack>{prettifyKeyboardShortcut("ArrowRight")}</HStack>
            </TooltipContent>
          </Tooltip>
        </>
      ) : (
        <>
          {/* <div className="text-foreground flex text-sm font-medium align-center">
            {count > 0 ? offset + 1 : 0} - {Math.min(offset + pageSize, count)}{" "}
            of {count}
          </div> */}

          <div className="flex items-center justify-between py-4">
            <Button
              ref={previousButtonRef}
              variant="ghost"
              isDisabled={!canPreviousPage}
              onClick={previousPage}
              className="text-textLink uppercase"
            >
              <IoChevronBackOutline
                size={20}
                className="text-secondary-tertiary"
              />
              PREV
            </Button>
            <div className="flex items-center space-x-2">
              {[...Array(pageCount)].map((_, index) => {
                const page = index + 1;
                return (
                  <IconButton
                    key={page}
                    onClick={() => gotoPage(page)}
                    aria-label={"pin" + index}
                    variant={pageIndex === page ? "primary" : "ghost"}
                    className={`rounded-full h-8 w-8 text-sm border-none ${pageIndex === page ? "" : "hover:bg-background"
                      }`}
                    icon={<>{page}</>}
                  />
                );
              })}
            </div>
            <Button
              ref={nextButtonRef}
              variant="ghost"
              isDisabled={!canNextPage}
              onClick={nextPage}
              className="text-textLink uppercase"
            >
              Next
              <IoChevronForwardOutline
                size={20}
                className="text-secondary-tertiary"
              />
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Pagination;
