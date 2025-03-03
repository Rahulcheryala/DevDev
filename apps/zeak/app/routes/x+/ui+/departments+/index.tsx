import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
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
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical, IoPrintOutline } from "react-icons/io5";
import {
  LuChevronDown,
  LuChevronUp,
  LuRocket,
  LuShare2,
  LuUser,
  LuSettings2,
} from "react-icons/lu";
import { RxCopy, RxSlash } from "react-icons/rx";
import { TbReload } from "react-icons/tb";
import { BiPaperclip, BiSearch } from "react-icons/bi";
import EmptyList from "~/modules/shared/ui/EmptyList";
import SettingsList from "~/modules/shared/ui/SettingsList/SettingsList";

export default function Departments() {
  const defaultTab = "allDepartments";
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };
  const tabsLinks = [
    {
      id: 1,
      title: "All Departments",
      value: "allDepartments",
      content: <AllDepartmentsContent />,
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
            Departments
          </span>
        </li>
      </ul>
      {/* New Breadcumbs */}
      <SettingsList isSelectable={true} title="Departments" />
      <div className="-mx-[60px]">
        <Tabs
          defaultValue={currentTab}
          onValueChange={handleTabChange}
          value={currentTab}
          className="w-full"
        >
          <TabsList aria-label="List of tabs" className="px-[60px]">
            {tabsLinks.map((tab, index) => (
              <TabsTrigger key={tab.id} value={tab.value}>
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabsLinks.map((content, index) => (
            <TabsContent
              key={content.id}
              value={content.value}
              className="px-[60px] pt-8 py-8"
            >
              {content.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

const AllDepartmentsContent = () => {
  const navigate = useNavigate();
  return (
    <div className={`${false ? "pr-[336px]" : ""} relative`}>
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
            className="text-secondary-tertiary py-[14px] px-6 h-auto"
          >
            <LuUser className="text-secondary-tertiary w-5 h-5 mr-2" />
            Assign Users
          </Button>
          <hr className="bg-stroke h-6 w-[1px]" />
          <Button
            variant="white"
            className="text-secondary-tertiary py-[14px] px-6 h-auto"
          >
            <RxCopy className="text-secondary-tertiary w-5 h-5 mr-2" />
            Duplicate
          </Button>
          <hr className="bg-stroke h-6 w-[1px]" />
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
              <Button
                variant="ghost"
                className="py-[13px] px-4 min-w-[134px] text-sm font-normal text-secondary-tertiary rounded-sm h-auto text-left justify-between  border-none"
              >
                <LuRocket className="text-secondary-tertiary mr-2" size={20} />
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
            variant="white"
            onClick={() => navigate("/x/ui/departments/new")}
            className="text-accent-primary py-[14px] px-6 h-auto font-normal"
          >
            <FaPlus className="text-accent-primary w-5 h-5 mr-2" />
            New Department
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between border border-stroke rounded-tl-md rounded-tr-md p-2 mt-8">
        <div className="flex items-center">
          <div className="relative mr-6">
            <Input
              className="max-w-[320px] w-[320px] h-10 pl-[44px]"
              placeholder="Search"
            />
            <BiSearch
              size={20}
              className="absolute top-[50%] -translate-y-[50%] left-4"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none min-w-[100px] text-sm font-normal text-secondary-tertiary flex text-left justify-between">
              <span className="flex items-center">
                <LuSettings2
                  className="text-secondary-tertiary mr-2"
                  size={20}
                />
                Filters{" "}
              </span>
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
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[134px]">
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
              className="rounded-full h-10 w-10 hover:bg-background"
              icon={<LuShare2 size={20} className="text-secondary-tertiary" />}
            />
            <IconButton
              aria-label={"pin"}
              variant="ghost"
              className="rounded-full h-10 w-10 hover:bg-background"
              icon={<TbReload size={20} className="text-secondary-tertiary" />}
            />
            <IconButton
              aria-label={"pin"}
              variant="ghost"
              className="rounded-full h-10 w-10 relative hover:bg-background"
              icon={
                <>
                  <BiPaperclip size={20} className="text-secondary-tertiary" />
                  <span className="w-4 h-4 rounded-full bg-accent-yellow absolute text-[10px] flex justify-center items-center leading-[14px] bottom-1 right-1">
                    2
                  </span>
                </>
              }
            />
            <IconButton
              aria-label={"pin"}
              variant="secondary"
              className="rounded-full h-10 w-10 border-none hover:bg-background"
              icon={
                <>
                  <IoPrintOutline
                    size={20}
                    className="text-secondary-tertiary"
                  />
                </>
              }
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
            <Button
              variant="ghost"
              className="h-10 text-secondary-tertiary font-normal"
            >
              Import
            </Button>
            <Button
              variant="ghost"
              className="h-10 text-secondary-tertiary font-normal"
            >
              Notes
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none w-10 h-10 flex justify-center items-center hover:bg-background rounded-full">
              <IoEllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[100px]">
              <DropdownMenuLabel>Dropdown Item</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Font manager shared component we can use instead of this <EmptyTable />, then we can remove this */}
      <div className="max-w-[450px] mx-auto">
        <EmptyList
          title="No departments to display."
          ctaText="Click here to create your first department"
          ctaHandle={() => navigate("/x/ui/departments/new")}
        />
      </div>
    </div>
  );
};
