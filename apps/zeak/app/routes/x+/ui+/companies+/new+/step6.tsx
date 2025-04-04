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
import { Link, useNavigate } from "@remix-run/react";
import { FaPlus } from "react-icons/fa6";
import { RxSlash } from "react-icons/rx";
import { useState } from "react";
import {
  IoCloseOutline,
  IoCopyOutline,
  IoEllipsisVertical,
} from "react-icons/io5";
import { LuChevronDown, LuChevronUp, LuTrash, LuRocket } from "react-icons/lu";
import { BiSearch } from "react-icons/bi";
import { TbCircleCheckFilled, TbPencilMinus, TbReload } from "react-icons/tb";
import { CheckIcon, DataflowIcon, SortIcon } from "@zeak/icons";
import SettingsList from "~/modules/shared/ui/SettingsList/SettingsList";
import { MdInfo } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

export default function Step6() {
  const navigate = useNavigate();
  const stepsList = [
    {
      id: 1,
      title: "Company Info",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: true,
      label: "1",
    },
    {
      id: 2,
      title: "Status and Effectivity Dates",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: true,
      label: "2",
    },
    {
      id: 3,
      title: "Address",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: true,
      label: "3",
    },
    {
      id: 4,
      title: "Additional Info",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: true,
      label: "4",
    },
    {
      id: 5,
      title: "Fiscal Period",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: true,
      label: "5",
    },
    {
      id: 6,
      title: "Third-Party Integration",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: true,
      isCompleted: false,
      label: "6",
    },
    {
      id: 7,
      title: "Summary",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: false,
      label: "7",
    },
  ];
  const [rightBanner, setRightBanner] = useState<boolean>(false);

  const handleReview = () => {
    navigate("/x/ui/companies/new/step7");
  };

  return (
    <>
      <div className="bg-accent-bgHoverNew flex h-full">
        <div
          className={`h-full ${
            rightBanner ? "w-[calc(100%_-_400px)]" : "w-full"
          }`}
        >
          <div className="pt-[25px] px-[60px] bg-white w-full mb-2 rounded-md">
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
            <SettingsList isSelectable={false} title="New Company" />
          </div>
          <div className="flex space-x-2 h-full max-h-[calc(100vh_-_219px)]">
            <div className="xxxl:w-[500px] w-[360px] bg-white p-[60px] rounded-tl-md rounded-tr-md max-h-[calc(100vh_-_218px)] overflow-y-auto">
              <div className="grid grid-cols-1 gap-y-4">
                {stepsList.map((step, index) => (
                  <>
                    <div
                      key={index}
                      className={`relative before:absolute before:content-[''] before:w-[2px] before:h-[calc(100%_-_56px)] ${
                        step.isActive
                          ? "before:bg-accent-primaryDark"
                          : step.isCompleted
                            ? "before:bg-accent-darkGreen"
                            : "before:bg-tertiary"
                      } before:top-[56px] before:left-5 last:before:content-none`}
                    >
                      <div className="absolute">
                        <span
                          className={`p-[5px] w-10 h-10 border-[2px] inline-block border rounded-full ${
                            step.isActive
                              ? "border-accent-primaryDark border-solid"
                              : step.isCompleted
                                ? "border-accent-darkGreen border-solid"
                                : "border-tertiary border-dashed"
                          }`}
                        >
                          <span
                            className={`w-full h-full flex items-center justify-center text-sm text-white rounded-full ${
                              step.isActive
                                ? "bg-primary-bright"
                                : step.isCompleted
                                  ? "bg-accent-brightGreen"
                                  : "bg-tertiary"
                            }`}
                          >
                            {step.isCompleted ? (
                              <CheckIcon color="#ffffff" size="18" />
                            ) : (
                              step.label
                            )}
                          </span>
                        </span>
                      </div>
                      <div className="pl-[64px]">
                        <h5
                          className={`font-semibold mb-1 ${
                            step.isActive || step.isCompleted
                              ? "text-accent-dark"
                              : "text-tertiary"
                          }`}
                        >
                          {step.title}
                        </h5>
                        <p
                          className={`text-sm ${
                            step.isActive || step.isCompleted
                              ? "text-accent-dark"
                              : "text-tertiary"
                          }`}
                        >
                          {step.subTitle}
                        </p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="xxxl:w-[calc(100%_-_500px)] w-[calc(100%_-_360px)] bg-white rounded-tl-md rounded-tr-md flex flex-col">
              <div className="grow max-h-[calc(100vh_-_302px)] overflow-y-auto">
                <div className="flex items-center justify-between py-6 px-[60px] border-b border-stroke">
                  <div className="">
                    <span className="text-accent-pink text-xs mb-2">
                      Step 6 of 7
                    </span>
                    <h4 className="text-xl text-accent-dark font-medium">
                      Third-Party Integration
                    </h4>
                  </div>
                  <div className="flex items-center space-x-4">
                    <IconButton
                      variant="ghost"
                      aria-label="in-progress"
                      icon={
                        false ? <TbCircleCheckFilled /> : <MdInfo size={24} />
                      }
                      className={`${
                        false ? "text-accent-green" : "text-accent-accentYellow"
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
                            className={`p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none ${
                              true ? "bg-stroke hover:bg-stroke" : ""
                            }`}
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
                  </div>
                </div>
                <div className="px-[60px] py-10">
                  <ThirdPartyContent />
                </div>
              </div>
              <div className="py-4 px-[60px] flex justify-between items-center sticky bottom-0 left-0 bg-card border-t border-stroke">
                <Button
                  variant="ghost"
                  className="px-8 py-4 h-auto text-secondary"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="px-8 py-4 h-auto rounded-sm min-w-[160px]"
                  onClick={handleReview}
                >
                  Review and Finish
                </Button>
              </div>
            </div>
          </div>
        </div>
        {rightBanner && (
          <div className="w-[400px] pl-2 h-full">
            <div className=" py-[52px] px-[60px] bg-white rounded-md relative  h-full">
              <Button
                className="p-0 absolute right-4 top-2"
                variant="ghost"
                onClick={() => setRightBanner(false)}
              >
                <IoCloseOutline size={32} />
              </Button>
              <div className="grid grid-cols-1 gap-10">
                <div className="w-full h-[280px] bg-stroke rounded-[24px]"></div>
                <div className="w-full h-[280px] bg-stroke rounded-[24px]"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const ThirdPartyContent = () => {
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
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
              <Button
                variant="ghost"
                className="py-[13px] px-4 min-w-[100px] text-sm font-normal text-accent-dark hover:bg-accent-bgHoverNew rounded-sm h-auto text-left justify-between  border-none"
              >
                Edit{" "}
                {true ? (
                  <LuChevronDown
                    size={20}
                    className="text-secondary-tertiary ml-1"
                  />
                ) : (
                  <LuChevronUp
                    size={20}
                    className="text-secondary-tertiary ml-1"
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
                className="py-[13px] px-4 min-w-[134px] text-sm font-normal text-accent-dark hover:bg-accent-bgHoverNew rounded-sm h-auto text-left justify-between  border-none"
              >
                <LuRocket className="mr-2" size={20} />
                Actions{" "}
                {true ? (
                  <LuChevronDown
                    size={20}
                    className="text-secondary-tertiary ml-1"
                  />
                ) : (
                  <LuChevronUp
                    size={20}
                    className="text-secondary-tertiary ml-1"
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
            variant="blue"
            className="py-[14px] px-6 h-auto rounded-sm"
            size="md"
          >
            <FaPlus className="w-5 h-5 mr-2" />
            New Address
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
              className="rounded-full h-10 w-10 hover:bg-background"
              icon={<TbReload size={20} className="text-secondary-tertiary" />}
            />
          </div>
          <hr className="mx-4 bg-stroke h-5 w-[1px]" />
          <div className="flex items-center gap-x-1">
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};
