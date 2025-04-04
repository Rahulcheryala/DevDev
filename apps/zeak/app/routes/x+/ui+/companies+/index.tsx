import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  IconButton,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@zeak/react";
import { Link, useNavigate } from "@remix-run/react";
import { DataflowIcon, SortIcon, TaskIcon, TrashIcon4 } from "@zeak/icons";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsPaperclip } from "react-icons/bs";
import { FaPlus, FaRegCircleCheck } from "react-icons/fa6";
import { IoCopyOutline, IoEllipsisVertical } from "react-icons/io5";
import {
  LuChevronDown,
  LuChevronUp,
  LuRocket,
  LuTrash,
  LuUser,
  LuUsers,
} from "react-icons/lu";
import { RiBuildingLine } from "react-icons/ri";
import { RxSlash } from "react-icons/rx";
import { TbPencilMinus, TbReload } from "react-icons/tb";
import EmptyList from "~/modules/shared/ui/EmptyList";
import SettingsList from "~/modules/shared/ui/SettingsList/SettingsList";
import WarningNote from "~/modules/shared/ui/WarningNote";

const Companies = () => {
  const defaultTab = "allCompanies";
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };
  const tabsLinks = [
    {
      id: 1,
      title: "Dashboard",
      value: "dashboard",
      content: <AllCompaniesContent />,
    },
    {
      id: 2,
      title: "All Companies",
      value: "allCompanies",
      content: <AllCompaniesContent />,
    },
  ];

  return (
    <div className="py-[25px] px-[60px] w-full">
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
      <SettingsList isSelectable={true} title="Companies" />
      <div className="-mx-[60px]">
        <Tabs
          defaultValue={currentTab}
          onValueChange={handleTabChange}
          value={currentTab}
          className="w-full"
        >
          <TabsList aria-label="List of tabs" className="px-[60px] ">
            {tabsLinks.map((tab, index) => (
              <TabsTrigger
                key={tab.id}
                value={tab.value}
                className="text-accent"
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabsLinks.map((content, index) => (
            <TabsContent
              key={content.id}
              value={content.value}
              className="px-[60px] pt-8 pb-0"
            >
              {content.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Companies;

const AllCompaniesContent = () => {
  const navigate = useNavigate();
  return (
    <div className={`${false ? "pr-[336px]" : ""} relative`}>
      <div className="mb-5">
        <WarningNote
          closeHandle={() => console.log("s")}
          message="This is a template editable note which is optional and can be closed from X icon on top right of the note box"
        />
      </div>
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
        <div className="grid grid-flow-col auto-cols-max items-center">
          <Button
            variant="white"
            className="text-accent-dark hover:bg-accent-bgHoverNew rounded-sm py-[14px] px-6 h-auto"
          >
            <TaskIcon className="w-5 h-5 mr-2" size="20" />
            Tasks
          </Button>
          <hr className="bg-stroke h-6 w-[1px]" />
          <Button
            variant="white"
            className="text-accent-dark hover:bg-accent-bgHoverNew rounded-sm py-[14px] px-6 h-auto"
          >
            <TrashIcon4 className="w-5 h-5 mr-2" size="20" />
            Delete
          </Button>
          <hr className="bg-stroke h-6 w-[1px]" />
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
            onClick={() => navigate("/x/ui/companies/new")}
          >
            <FaPlus className="w-5 h-5 mr-2" />
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
            <IconButton
              aria-label={"pin"}
              variant="secondary"
              className="rounded-full h-10 w-10 border-none hover:bg-background"
              icon={
                <>
                  <BsPaperclip size={20} className="text-secondary-tertiary" />
                </>
              }
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
                <DropdownMenuItem className="p-0">
                  <Button
                    variant="secondary"
                    className="p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none"
                  >
                    <RiBuildingLine size={20} className="mr-4" />
                    Manage Departments
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <Button
                    variant="secondary"
                    className="p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none"
                  >
                    <LuUsers size={20} className="mr-4" />
                    Manage Teams
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <Button
                    variant="secondary"
                    className="p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none"
                  >
                    <LuUser size={20} className="mr-4" />
                    Manage Users
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <Button
                    variant="secondary"
                    className="p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none"
                  >
                    <FaRegCircleCheck size={20} className="mr-4" />
                    Update Status
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
      </div>
      {/* Font manager shared component we can use instead of this <EmptyTable />, then we can remove this */}
      <div className="max-w-[450px] mx-auto">
        <EmptyList
          title="No companies to display."
          ctaText="Click here to create your first company."
          ctaHandle={() => navigate("/x/ui/companies/new")}
        />
      </div>
    </div>
  );
};
