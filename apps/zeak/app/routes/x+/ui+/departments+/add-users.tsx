import {
  Avatar,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  FormControl,
  HStack,
  IconButton,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@zeak/react";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoClose, IoEllipsisVertical, IoPrintOutline } from "react-icons/io5";
import {
  LuChevronDown,
  LuChevronUp,
  LuRocket,
  LuShare2,
  LuSettings2,
} from "react-icons/lu";
import { RxCopy, RxSlash } from "react-icons/rx";
import { TbReload } from "react-icons/tb";
import { BiPaperclip, BiSearch } from "react-icons/bi";
import { GoQuestion } from "react-icons/go";
import { FiSearch, FiUser } from "react-icons/fi";
import EmptyList from "~/modules/shared/ui/EmptyList";
import SettingsList from "~/modules/shared/ui/SettingsList/SettingsList";

export default function AddUsers() {
  const defaultTab = "general";
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };
  const tabsLinks = [
    {
      id: 1,
      title: "General",
      value: "general",
      content: <GeneralContent />,
    },
    {
      id: 1,
      title: "Users",
      value: "users",
      content: <GeneralContent />,
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
      <SettingsList isSelectable={false} title="Product Research" />
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

const GeneralContent = () => {
  return (
    <div className={`${false ? "pr-[336px]" : ""} relative`}>
      <div
        className="flex justify-between items-start p-4 rounded-xl mb-5 relative"
        style={{ backgroundColor: "#fffae5" }}
      >
        <IconButton
          aria-label={"closeMessage"}
          variant="ghost"
          className="absolute top-[50%] -translate-y-[50%] right-1"
          icon={<IoClose size={24} />}
        />
        <div className="pl-[40px]">
          <GoQuestion
            size={24}
            className="absolute left-4 top-[50%] -translate-y-[50%] text-accent-accentYellow"
          />
          <h3 className="text-sm text-accent-yellow mb-1">Note:</h3>
          <p className="text-secondary text-sm">
            This is a template editable note which is optional and can be closed
            from X icon on top right of the note box
          </p>
        </div>
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
        <div className="grid grid-flow-col auto-cols-max gap-x-1 items-center">
          <Button
            variant="white"
            className="text-secondary-tertiary py-[14px] px-6 h-auto"
          >
            <RxCopy className="text-secondary-tertiary w-5 h-5 mr-2" />
            Edit
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

          <AddUsersModal />
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
      <div className="max-w-[500px] mx-auto">
        <EmptyList
          title="No Users to display."
          ctaText="Click here to add your first user for this department"
          ctaHandle={() => console.log("sdf")}
        />
      </div>
    </div>
  );
};

const AddUsersModal = () => {
  const dummyList = [
    {
      id: "1",
      name: "Ryan Pazos",
      email: "ryanpazos@xcelpros.com",
    },
    {
      id: "2",
      name: "Ankita rohan",
      email: "ankitarohan@xcelpros.com",
    },
    {
      id: "3",
      name: "Saket patel",
      email: "saketpatel@xcelpros.com",
    },
  ];
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="white"
          className="text-accent-primary py-[14px] px-6 h-auto font-normal"
        >
          <FaPlus className="text-accent-primary w-5 h-5 mr-2" />
          Add User
        </Button>
      </DrawerTrigger>
      <DrawerContent size="md">
        <DrawerHeader className="px-6 py-4">
          <div className="pr-[30px]">
            <h3 className="text-3xl font-semibold">Add user</h3>
            <p className="text-secondary-tertiary text-sm font-medium">
              to Custom Label Manager role.
            </p>
          </div>
          <DrawerCloseButton className="top-4 right-6 cursor-pointer z-10" />
        </DrawerHeader>
        <DrawerBody className="px-6 pt-6 pb-0">
          <div className="w-full grow">
            <div className="sticky top-0 left-0 z-[1] bg-card">
              <div className="relative">
                <Input
                  className="w-full h-[50px] pl-10"
                  placeholder="Search by name or email address"
                  size="md"
                />
                <FiSearch
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary"
                  size={20}
                />
              </div>
              {false && (
                <div className="absolute top-full w-full p-4 left-0 bg-card shadow-lg rounded-lg">
                  <ul className="py-1 max-h-[300px] overflow-y-auto">
                    {dummyList.map((item, index) => (
                      <li
                        key={index}
                        className={`py-3 px-4 hover:bg-accent-bgHoverNew rounded-md`}
                      >
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <Checkbox
                              name="userlist"
                              id={`notify-${index}`}
                              data-testid={`notify-${index}`}
                              className="h-[18px] w-[18px] custom__checkbox !text-white"
                              onCheckedChange={(e) => {
                                console.log(e);
                              }}
                            />
                            <Avatar name={item.name} className="ml-4" />
                          </div>
                          <div className="pl-[20px]">
                            <h3 className="text-sm text-accent">{item.name}</h3>
                            <p className="text-primary-blue text-xs">
                              {item.email}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="primary"
                    size="xl"
                    className="w-full rounded-sm mt-4"
                  >
                    Select
                  </Button>
                </div>
              )}
            </div>
            {false ? (
              <div className="flex items-center justify-center flex-col py-[250px]">
                <FiUser size={44} className="text-tertiary" />
                <p className="text-tertiary mt-5">
                  Search for user to add to department
                </p>
              </div>
            ) : (
              <div>
                <ul className="py-2 gap-y-2">
                  {dummyList.map((item, index) => (
                    <li key={index} className="py-3 pl-4 pr-[52px] relative">
                      <div className="flex items-center">
                        <Avatar name={item.name} />
                        <div className="pl-[20px]">
                          <h3 className="text-sm text-accent">{item.name}</h3>
                          <p className="text-primary-blue text-xs">
                            {item.email}
                          </p>
                        </div>
                      </div>
                      <IconButton
                        aria-label={"removelist-" + index}
                        variant="ghost"
                        className="absolute top-[50%] -translate-y-[50%] right-0 p-0 text-secondary"
                        icon={<IoClose size={44} />}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <FormControl
            isInvalid={false}
            className="sticky bottom-0 left-0 bg-card pb-6 pt-1 bg-card"
          >
            <HStack className="w-full">
              <Checkbox
                name="notify"
                id="notify"
                data-testid="notify"
                className="h-[18px] w-[18px] custom__checkbox !text-white"
                onCheckedChange={(e) => {
                  console.log(e);
                }}
              />

              <label
                htmlFor="notify"
                className="font-light text-sm font-medium"
              >
                Notify users on Finish
              </label>
            </HStack>
          </FormControl>
        </DrawerBody>
        <DrawerFooter className="px-6 py-4 sm:justify-between">
          <Button className="rounded-sm" size="xl" variant="secondary">
            Cancel
          </Button>
          <Button className="rounded-sm" size="xl" variant="primary">
            Add User
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
