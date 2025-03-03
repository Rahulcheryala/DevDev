import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
} from "@zeak/react";
import { Link } from "@remix-run/react";
import { RxSlash } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import { BuildingIcon } from "@zeak/icons";
import SettingsList from "~/modules/shared/ui/SettingsList/SettingsList";
import { StepperItem } from "~/modules/access-settings";
import * as Accordion from "@radix-ui/react-accordion";
import {
  TbCircleCheckFilled,
  TbFileSettings,
  TbPencilMinus,
} from "react-icons/tb";
import { MdInfo } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { LuChevronDown, LuChevronUp, LuTrash } from "react-icons/lu";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useState } from "react";
import { VscPlug } from "react-icons/vsc";

export default function ReviewCompanies() {
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
      isActive: false,
      isCompleted: true,
      label: "2",
    },
    {
      id: 3,
      title: "Summary",
      isActive: true,
      isCompleted: false,
      label: "3",
    },
  ];

  const [stepOneAccordionOpen, setStepOneAccordionOpen] = useState<any>(0);

  const stepThreeList = [
    {
      id: "1",
      title: "Summary",
      isFinished: false,
      content: <SummaryContent />,
    },
    {
      id: "2",
      title: "Status and Effectivity Dates",
      isFinished: true,
      content: <StatusEffectivityDateContent />,
    },
    {
      id: "3",
      title: "Additional Info",
      isFinished: true,
      content: "sas",
    },
    {
      id: "4",
      title: "Fiscal Period",
      isFinished: true,
      content: "sas",
    },
    {
      id: "5",
      title: "Third-Party Integration",
      isFinished: true,
      content: "sas",
      icon: (
        <>
          <span className="mr-6 flex items-center justify-center bg-accent-primary w-7 h-7 text-white rounded-sm">
            <VscPlug />
          </span>
        </>
      ),
    },
    {
      id: "6",
      title: "Audit",
      isFinished: false,
      content: <AuditContent />,
      icon: (
        <>
          <span className="mr-6 flex items-center justify-center w-7 h-7  rounded-sm">
            <TbFileSettings />
          </span>
        </>
      ),
    },
  ];

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
          <h3 className="mb-[28px] text-[28px] leading-[28px] font-medium">
            Review and Finish
          </h3>
          <div
            className="flex justify-between items-start p-6 rounded-sm mb-10 relative"
            style={{ backgroundColor: "hsl(177.27deg 56.12% 61.57% / 20%)" }}
          >
            <div className="max-w-[600px]">
              <h3 className="text-[20px] leading-[28px] text-accent-dark font-medium mb-2">
                Next Steps
              </h3>
              <p className="text-secondary font-normal text-sm">
                Your Department has been successfully created. You can close the
                record or use the{" "}
                <span className="font-semibold">next steps</span> shown on right
                to add users and manage your department details.
              </p>
            </div>
            <div>
              <Button
                variant="secondary"
                className="min-w-[268px] items-center h-[56px] rounded-sm bg-white text-base hover:bg-white hover:text-accent-dark mr-4 font-normal"
              >
                <BuildingIcon className="mr-2" />
                Add Departments
              </Button>
              <Button
                variant="secondary"
                className="min-w-[268px] items-center h-[56px] rounded-sm bg-white text-base hover:bg-white hover:text-accent-dark font-normal"
              >
                <FiUser size={24} className="mr-2" />
                Add Users
              </Button>
            </div>
          </div>
          <Accordion.Root
            className="AccordionRoot"
            type="single"
            defaultValue={stepThreeList[0].title}
            collapsible
          >
            {stepThreeList.map((stepThreeOption, index) => (
              <Accordion.Item
                key={index}
                className="AccordionItem border border-stroke rounded-lg mb-10"
                value={stepThreeOption.title}
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
                  <span className="trancate w-[calc(100%_-_160px)] text-left flex items-center">
                    {stepThreeOption?.icon}
                    {stepThreeOption.title}
                  </span>
                  <div className="flex items-center space-x-4 w-[152px] justify-end">
                    <IconButton
                      variant="ghost"
                      aria-label="in-progress"
                      icon={
                        stepThreeOption.isFinished ? (
                          <TbCircleCheckFilled />
                        ) : (
                          <MdInfo size={24} />
                        )
                      }
                      className={`${
                        stepThreeOption.isFinished
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
                  {stepThreeOption.content}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>

      <div className="-mx-[60px] px-[60px] py-4 flex justify-between items-center sticky bottom-0 left-0 bg-card border-t border-stroke">
        <Button variant="ghost" className="px-8 py-4 h-auto text-secondary">
          Cancel
        </Button>
        <div className="flex items-center">
          <Button
            variant="primary"
            className="px-8 py-4 h-auto rounded-sm rounded-tr-none rounded-br-none border-r-none"
          >
            Finish
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
              <Button
                variant="primary"
                className="w-[54px] text-sm font-normal p-0 h-auto rounded-sm h-[52px] ml-[1px] text-left justify-center border-l-none rounded-tl-none rounded-bl-none"
              >
                {true ? (
                  <LuChevronDown size={24} className="" />
                ) : (
                  <LuChevronUp size={24} className="" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[241px]">
              <DropdownMenuItem className="p-3">Finish</DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                Finish & Create New Company
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

const SummaryContent = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-y-8 gap-x-4">
        <div>
          <div className="flex items-center">
            <h4 className="text-sm text-accent-dark font-medium mb-1">
              Company Name
            </h4>
          </div>
          <p className="text-base text-tertiary">
            PFIZER SALES <br />
            https://sales.pfizer.com
          </p>
        </div>
        <div className="">
          <div className="flex items-center">
            <h4 className="text-sm text-accent-dark font-medium mb-1">
              Company Code
            </h4>
          </div>
          <p className="text-base text-tertiary">PFS</p>
        </div>
        <div className="col-span-2">
          <div className="flex items-center">
            <h4 className="text-sm text-accent-dark font-medium mb-1">
              Company's Zeak URL
            </h4>
          </div>
          <p className="text-base text-tertiary">
            pfizer.my.zeak.com/pfizer-sales
          </p>
        </div>
        <div>
          <div className="flex items-center">
            <h4 className="text-sm text-accent-dark font-medium mb-1">
              Addresses
            </h4>
          </div>
          <p className="text-base text-tertiary">
            1231 Cataluna Street, Las Nevadas, Texas 10101, United States
          </p>
        </div>
        <div>
          <div className="flex items-center">
            <h4 className="text-sm text-accent-dark font-medium mb-1">
              Default Timezone
            </h4>
          </div>
          <p className="text-base text-tertiary">
            UTC-6 Central Standard Time (CST)
          </p>
        </div>
        <div>
          <div className="flex items-center">
            <h4 className="text-sm text-accent-dark font-medium mb-1">
              Default Language
            </h4>
          </div>
          <p className="text-base text-tertiary">EN-US</p>
        </div>
      </div>
    </>
  );
};

const StatusEffectivityDateContent = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-y-[60px] gap-x-4">
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">Status</h4>
          <p className="text-base text-tertiary">Active</p>
        </div>
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">
            Effectivity From
          </h4>
          <p className="text-base text-tertiary">08/19/2024</p>
        </div>
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">
            Effectivity To
          </h4>
          <p className="text-base text-tertiary">--</p>
        </div>
      </div>
    </>
  );
};

const AuditContent = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-y-[60px] gap-x-4">
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">
            Created By
          </h4>
          <p className="text-base text-tertiary">Ryan Pazos</p>
        </div>
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">
            Created on
          </h4>
          <p className="text-base text-tertiary">08/19/2024</p>
        </div>
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">
            Last Updated By
          </h4>
          <p className="text-base text-tertiary">Ryan Pazos</p>
        </div>
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">
            Updated on
          </h4>
          <p className="text-base text-tertiary">08/19/2024</p>
        </div>
      </div>
    </>
  );
};
