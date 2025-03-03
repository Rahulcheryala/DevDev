import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  IconButton,
  Input,
} from "@zeak/react";
import * as Accordion from "@radix-ui/react-accordion";
import { Link, useNavigate } from "@remix-run/react";
import { RxSlash } from "react-icons/rx";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { ClearableInput, DatePicker, Select } from "~/components/Form";
import {
  IoChevronDown,
  IoChevronUp,
  IoCopyOutline,
  IoEllipsisVertical,
} from "react-icons/io5";
import WarningNote from "~/modules/shared/ui/WarningNote";
import { primaryLanguageOptions, StepperItem } from "~/modules/access-settings";
import SettingsList from "~/modules/shared/ui/SettingsList/SettingsList";
import { TbCircleCheckFilled, TbPencilMinus, TbReload } from "react-icons/tb";
import { MdInfo } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { LuChevronDown, LuChevronUp, LuRocket, LuTrash } from "react-icons/lu";
import { useState } from "react";
import { DataflowIcon, SortIcon } from "@zeak/icons";
import { BiSearch } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { LiaRunningSolid } from "react-icons/lia";

export default function AdditionalInfo() {
  const navigate = useNavigate();
  const stepsList = [
    {
      id: 1,
      title: "General",
      isActive: false,
      isCompleted: true,
      label: "1",
    },
    {
      id: 2,
      title: "Additional Info",
      isActive: true,
      isCompleted: false,
      label: "2",
    },
    {
      id: 3,
      title: "Summary",
      isActive: false,
      isCompleted: false,
      label: "3",
    },
  ];

  const handleReview = () => {
    navigate("/x/ui/companies/review");
  };

  const stepTwoOptions = [
    {
      id: "1",
      title: "Additional Info",
      isFinished: false,
      content: <AdditionalInfoContent />,
    },
    {
      id: "2",
      title: "Fiscal Period",
      isFinished: true,
      content: <FiscalPeriodContent />,
    },
    {
      id: "3",
      title: "Third-Party Integration",
      isFinished: true,
      content: <ThirdPartyIntegrationContent />,
    },
  ];
  const [stepOneAccordionOpen, setStepOneAccordionOpen] = useState<any>(0);
  return (
    <div className="pt-[25px] px-[60px] w-full">
      {/* New Breadcumbs */}
      <ul className="grid grid-flow-col auto-cols-max gap-1">
        <li>
          <Link
            to={"/"}
            className="text-textLink text-sm leading-[20px] tracking-wider"
          >
            Settings
          </Link>
        </li>
        <li>
          <span className="text-secondary text-base leading-[20px] h-[24px] flex items-center justify-center">
            <RxSlash />
          </span>
        </li>
        <li>
          <span className="text-accent text-sm leading-[20px] tracking-wider">
            Companies
          </span>
        </li>
      </ul>
      {/* New Breadcumbs */}
      <SettingsList isSelectable={false} title=" PFIZER SALES" />
      <div className="pb-4">
        <div className="flex items-center">
          {stepsList.map((step, index) => (
            <>
              <StepperItem
                stepItem={step}
                listLength={stepsList.length}
                index={index}
              />
            </>
          ))}
        </div>
      </div>
      <div className="pt-10 -mx-[60px] px-[60px] border-t border-stroke">
        <div className="">
          <div className="mb-5">
            <WarningNote
              closeHandle={() => console.log("s")}
              message="This is a template editable note which is optional and can be closed from X icon on top right of the note box"
            />
          </div>
          <ValidatedForm validator={[]}>
            <Accordion.Root
              className="AccordionRoot"
              type="single"
              defaultValue={stepTwoOptions[0].title}
              collapsible
            >
              {stepTwoOptions.map((stepOneOption, index) => (
                <Accordion.Item
                  key={index}
                  className="AccordionItem border border-stroke rounded-lg mb-10"
                  value={stepOneOption.title}
                >
                  <Accordion.Trigger
                    onClick={() => {
                      if (stepOneAccordionOpen == index) {
                        setStepOneAccordionOpen(null);
                      } else {
                        setStepOneAccordionOpen(index);
                      }
                    }}
                    className="w-full py-2 px-6 flex items-center justify-between items-center font-medium text-accent h-auto"
                  >
                    <span className="trancate w-[calc(100%_-_160px)] text-left">
                      {stepOneOption.title}
                    </span>
                    <div className="flex items-center space-x-4 w-[152px] justify-end">
                      <IconButton
                        variant="ghost"
                        aria-label="in-progress"
                        icon={
                          stepOneOption.isFinished ? (
                            <TbCircleCheckFilled />
                          ) : (
                            <MdInfo size={24} />
                          )
                        }
                        className={`${
                          stepOneOption.isFinished
                            ? "text-accent-green"
                            : "text-accent-accentYellow"
                        } p-0`}
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none focus-visible:outline-none w-8 h-8 flex justify-center items-center hover:bg-background rounded-full">
                          <BsThreeDots />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="min-w-[100px]"
                        >
                          <DropdownMenuItem className="p-0">
                            <Button
                              variant="secondary"
                              className="p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none"
                            >
                              <TbPencilMinus size={20} className="mr-4" />
                              Edit
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="p-0">
                            <Button
                              variant="secondary"
                              className="p-4 hover:bg-stroke text-accent-red hover:text-accent-red bg-transparent h-auto w-full rounded-none justify-start border-none"
                            >
                              <LuTrash size={20} className="mr-4" />
                              Delete
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <IconButton
                        variant="ghost"
                        aria-label="more-option"
                        icon={
                          index == stepOneAccordionOpen ? (
                            <IoChevronUp size={24} />
                          ) : (
                            <IoChevronDown size={24} />
                          )
                        }
                        className="p-0"
                      />
                    </div>
                  </Accordion.Trigger>
                  <Accordion.Content className="p-10 border-t border-stroke">
                    {stepOneOption.content}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </ValidatedForm>
        </div>
      </div>
      <div className="-mx-[60px] px-[60px] py-4 flex justify-between items-center sticky bottom-0 left-0 bg-card border-t border-stroke">
        <Button variant="ghost" className="px-8 py-4 h-auto text-secondary">
          Cancel
        </Button>
        <Button
          variant="primary"
          className="px-8 py-4 h-auto rounded-sm min-w-[160px]"
          onClick={handleReview}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const AdditionalInfoContent = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-10">
        <Select
          name="primaryLanguage"
          label="Primary Language"
          options={primaryLanguageOptions}
        />
        <Select name="Timezone" label="Timezone" options={timezonesOptions} />
        <ClearableInput name="dunsNumber" label="DUNS Number" />
        <ClearableInput name="bbbRating" label="BBB Rating" />
        <ClearableInput name="creditRating" label="Credit Rating" />
      </div>
    </>
  );
};

const FiscalPeriodContent = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-10">
        <DatePicker name="Start Date" label="From" />
        <DatePicker name="End Date" label="To" />
      </div>
    </>
  );
};

const ThirdPartyIntegrationContent = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
              <Button
                variant="secondary"
                className="py-[13px] px-4 min-w-[162px] text-sm bg-white hover:bg-white h-auto text-left justify-between text-secondary"
              >
                Default views {true ? <LuChevronDown /> : <LuChevronUp />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[162px]">
              <DropdownMenuLabel>Dropdown Item</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-flow-col auto-cols-max gap-x-1 items-center">
          <Button
            variant="white"
            className="text-secondary-textLink py-[14px] px-6 h-auto"
          >
            <LiaRunningSolid className="text-secondary-textLink w-5 h-5 mr-2" />
            Tasks
          </Button>
          <Button
            variant="white"
            disabled={true}
            className="text-secondary-textLink py-[14px] px-6 h-auto"
          >
            <LuTrash className="text-secondary-textLink w-5 h-5 mr-2" />
            Delete
          </Button>
          <hr className="bg-stroke h-6 w-[1px]" />
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`outline-none focus-visible:outline-none ${
                true ? "pointer-events-none" : ""
              }`}
            >
              <Button
                variant="ghost"
                disabled={true}
                className={`py-[13px] px-4 min-w-[100px] text-sm font-normal text-secondary-textLink rounded-sm h-auto text-left justify-between  border-none`}
              >
                Edit{" "}
                {true ? (
                  <LuChevronDown
                    size={20}
                    className="text-secondary-textLink ml-1"
                  />
                ) : (
                  <LuChevronUp
                    size={20}
                    className="text-secondary-textLink ml-1"
                  />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[134px]">
              <DropdownMenuLabel className="py-3">
                Dropdown Item
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <hr className="bg-stroke h-6 w-[1px]" />
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
              <Button
                variant="ghost"
                className="py-[13px] px-4 min-w-[134px] text-sm font-normal text-secondary-textLink rounded-sm h-auto text-left justify-between  border-none"
              >
                <LuRocket className="text-secondary-textLink mr-2" size={20} />
                Actions{" "}
                {true ? (
                  <LuChevronDown
                    size={20}
                    className="text-secondary-textLink ml-1"
                  />
                ) : (
                  <LuChevronUp
                    size={20}
                    className="text-secondary-textLink ml-1"
                  />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[134px]">
              <DropdownMenuLabel className="py-3">
                Dropdown Item
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <hr className="bg-stroke h-6 w-[1px]" />
          <Button
            variant="white"
            className="text-accent-primary py-[14px] px-6 h-auto font-normal"
          >
            <FaPlus className="text-accent-primary w-4 h-4 mr-2" />
            New Company
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between border border-stroke rounded-tl-md rounded-tr-md p-2 mt-8">
        <div className="flex items-end space-x-6">
          <div className="relative">
            <Input
              className="max-w-[320px] w-[320px] h-10 px-[44px]"
              placeholder="Search"
            />
            <BiSearch
              size={20}
              className="absolute top-[50%] -translate-y-[50%] left-4"
            />
            <span className="absolute top-[50%] -translate-y-[50%] right-4">
              <SortIcon size="20" />
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none text-sm font-normal text-secondary-textLink flex text-left justify-between flex-col relative">
              <span className="flex items-center">
                <span className="flex flex-col truncate text-ellipsis items-start text-sm text-textLink tracking-[0.5px] pr-5">
                  <span className="uppercase text-[10px] leading-[12px] text-accent-primary font-semibold">
                    Status
                  </span>
                  Offline
                </span>
                {true ? (
                  <LuChevronDown
                    size={20}
                    className="text-secondary-tertiary ml-1 absolute right-0 bottom-0"
                  />
                ) : (
                  <LuChevronUp
                    size={20}
                    className="text-secondary-tertiary ml-1"
                  />
                )}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[100px]">
              <DropdownMenuLabel className="py-3">
                Dropdown Item
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none text-sm font-normal text-secondary-textLink flex text-left justify-between flex-col relative">
              <span className="flex items-center">
                <span className="flex flex-col truncate text-ellipsis items-start text-sm text-textLink tracking-[0.5px] pr-5">
                  <span className="uppercase text-[10px] leading-[12px] text-accent-primary font-semibold">
                    Creation Date
                  </span>
                  Today
                </span>
                {true ? (
                  <LuChevronDown
                    size={20}
                    className="text-secondary-tertiary ml-1 absolute right-0 bottom-0"
                  />
                ) : (
                  <LuChevronUp
                    size={20}
                    className="text-secondary-tertiary ml-1"
                  />
                )}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[100px]">
              <DropdownMenuLabel className="py-3">
                Dropdown Item
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none text-sm font-normal text-secondary-textLink flex text-left justify-between flex-col relative">
              <span className="flex items-center">
                <span className="flex flex-col truncate text-ellipsis items-start text-sm text-textLink tracking-[0.5px] pr-5">
                  More
                </span>
                {true ? (
                  <LuChevronDown
                    size={20}
                    className="text-secondary-tertiary ml-1 absolute right-0 bottom-0"
                  />
                ) : (
                  <LuChevronUp
                    size={20}
                    className="text-secondary-tertiary ml-1"
                  />
                )}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[100px]">
              <DropdownMenuLabel className="py-3">
                Dropdown Item
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-x-4">
            {" "}
            <IconButton
              aria-label={"pin"}
              variant="ghost"
              className="rounded-full h-10 w-10 hover:bg-background p-0"
              icon={<DataflowIcon size="20" />}
            />
            <IconButton
              aria-label={"pin"}
              variant="ghost"
              className="rounded-full h-10 w-10 hover:bg-background p-0"
              icon={<SortIcon size="20" />}
            />
            <IconButton
              aria-label={"pin"}
              variant="ghost"
              className="rounded-full h-10 w-10 hover:bg-background"
              icon={<TbReload size={20} className="text-secondary-tertiary" />}
            />
          </div>
          <hr className="mx-4 bg-stroke h-5 w-[1px]" />
          <div className="flex items-center gap-x-1">
            <Button
              variant="ghost"
              className="h-10 text-secondary-tertiary font-normal"
            >
              Export
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none w-10 h-10 flex justify-center items-center hover:bg-background rounded-full">
              <IoEllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[100px]">
              <DropdownMenuItem className="p-0">
                <Button
                  variant="secondary"
                  className="p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none"
                >
                  <TbPencilMinus size={20} className="mr-4" />
                  Edit
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Button
                  variant="secondary"
                  className="p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none"
                >
                  <IoCopyOutline size={20} className="mr-4" />
                  Duplicate
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Button
                  variant="secondary"
                  className="p-4 hover:bg-stroke text-accent-red hover:text-accent-red bg-transparent h-auto w-full rounded-none justify-start border-none"
                >
                  <LuTrash size={20} className="mr-4" />
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};
export const statusOptions = [
  {
    label: "Save as Active (Default)",
    value: "default",
  },
];
export const timezonesOptions = [
  {
    label: "Shipping",
    value: "shipping",
  },
  {
    label: "Billing",
    value: "billing",
  },
];
