import {
  ArrowTopRightIcon,
  ClockIcon,
  DotsHorizontalIcon,
  DataflowIcon,
  DotsVerticalIcon,
  EditIcon3,
  FileLandscapeIcon,
  FileQuestionIcon2,
  FilterLinesIcon,
  MailIcon1,
  MarkerPinIcon2,
  ShareIcon,
  SortIcon,
  TrashIcon4,
  UploadIcon1,
  UserIcon1,
} from "@zeak/icons";
import * as Accordion from "@radix-ui/react-accordion";
import {
  Avatar,
  Badge,
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  FormControl,
  HStack,
  IconButton,
  Input,
  Select,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@zeak/react";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { Link } from "@remix-run/react";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { RxSlash } from "react-icons/rx";
import { ProfilePhotoFormV2 } from "~/modules/shared";
import { ClearableInput, PhoneInputV2 } from "~/components/Form";
import { TbCircleCheckFilled, TbPencilMinus, TbReload } from "react-icons/tb";
import { MdInfo } from "react-icons/md";
import { IoChevronDown, IoChevronUp, IoCopyOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { CiCircleList, CiGrid41 } from "react-icons/ci";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiBell, FiFile } from "react-icons/fi";
import { HiPaperClip } from "react-icons/hi";
import { VscPlug } from "react-icons/vsc";

const CompanyDetails = () => {
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
      id: 2,
      title: "Additional Info",
      value: "additionalInfo",
      content: "<AdditionalInfoContent />",
    },
    {
      id: 3,
      title: "Users",
      value: "users",
      content: "<UsersContent />",
    },
    {
      id: 4,
      title: "Branding",
      value: "aranding",
      content: <BrandingContent />,
    },
    {
      id: 5,
      title: "Teams",
      value: "teams",
      content: "<TeamsContent />",
    },
    {
      id: 6,
      title: "Departments",
      value: "departments",
      content: "<DepartmentsContent />",
    },
    {
      id: 7,
      title: "Integrations",
      value: "integrations",
      content: <IntegrationsContent />,
    },
    {
      id: 28,
      title: "More",
      value: "more",
      content: "<MoreContent />",
    },
  ];

  const dummyDepartmentsList = [
    {
      id: "1",
      teamName: "Tenant Management",
      status: "Inactive",
      to: "#",
    },
    {
      id: "2",
      teamName: "Companies",
      status: "Active",
      to: "#",
    },
    {
      id: "3",
      teamName: "Roles and Permissions",
      status: "Active",
      to: "#",
    },
    {
      id: "4",
      teamName: "Teams",
      status: "Active",
      to: "#",
    },
    {
      id: "5",
      teamName: "Departments",
      status: "Active",
      to: "#",
    },
    {
      id: "6",
      teamName: "Tenant",
      status: "Active",
      to: "#",
    },
    {
      id: "7",
      teamName: "User",
      status: "Active",
      to: "#",
    },
  ];

  return (
    <>
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
        <div className="bg-accent-bgHoverNew rounded-xl flex justify-between items-center my-5">
          <div className="flex items-center p-6">
            <ProfilePhotoFormV2
              userName=""
              msg1=""
              msg2=""
              msg3=""
              onFileChange={() => console.log("sd")}
              size="eighty"
            />
            <div className="">
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
                    <Button
                      variant="ghost"
                      className={`py-[13px] rounded-md px-4 min-w-[134px] text-[28px] leading-[32px] font-semibold text-accent-dark ${
                        false
                          ? "border-stroke bg-white hover:bg-white pl-4"
                          : "pl-0 border-transparent"
                      }  h-auto text-left justify-between  border-none`}
                    >
                      Marck & Co 1920{" "}
                      {true ? (
                        <LuChevronDown
                          size={20}
                          className="text-secondary-tertiary ml-4"
                        />
                      ) : (
                        <LuChevronUp
                          size={20}
                          className="text-secondary-tertiary ml-4"
                        />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[436px]">
                    <ValidatedForm
                      validator={[]}
                      className="px-6 pt-6 sticky top-0 left-0 bg-card pb-4"
                    >
                      <h4 className="text-accent-dark font-medium mb-4">
                        Settings
                      </h4>
                      <div className="relative">
                        <Input
                          className="max-w-full w-full h-10 pl-[44px]"
                          placeholder="Search"
                          autoComplete="off"
                        />
                        <BiSearch
                          size={20}
                          className="absolute top-[50%] -translate-y-[50%] left-4"
                        />
                      </div>
                    </ValidatedForm>
                    <div className="bg-table flex items-center justify-between py-3 pl-[72px] pr-[10px]">
                      <div>
                        <p className="text-xs text-textLink">
                          Team Name Tasks{" "}
                          <FilterLinesIcon
                            className="ml-4 inline-block"
                            size="12"
                          />
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-textLink">
                          Status{" "}
                          <FilterLinesIcon
                            className="ml-4 inline-block"
                            size="12"
                          />
                        </p>
                      </div>
                    </div>
                    <div className="max-h-[360px] overflow-y-auto">
                      {dummyDepartmentsList.map((item, index) => (
                        <>
                          {index !== 0 && (
                            <DropdownMenuSeparator className="my-0 mx-6" />
                          )}
                          <Link
                            href={"#"}
                            className="hover:bg-accent-bgHoverNew flex items-center justify-between py-3 pl-6 pr-[10px]"
                          >
                            <span>
                              <Avatar
                                size="sm"
                                name="sdf sdf"
                                className="mr-4"
                              />
                              {item.teamName}
                            </span>
                            <div className="w-[90px] flex justify-start">
                              <Badge
                                variant={
                                  item.status == "Active" ? "green" : "gray"
                                }
                                className=""
                              >
                                {item.status}
                              </Badge>
                            </div>
                          </Link>
                        </>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Badge variant="green" className="uppercase ml-6">
                  Active
                </Badge>
                <span className="text-sm flex items-center text-secondary-tertiary ml-6">
                  <MailIcon1
                    className="mr-2"
                    color="hsl(var(--text-secondary-tertiary))"
                  />
                  Since August 2024
                </span>
              </div>
              <div className="flex items-center space-x-4 py-2">
                <span className="text-accent-pink2 text-sm">MNC</span>
                <hr className="bg-tertiary rounded-full h-6 w-[1px]" />
                <span className="flex text-sm text-secondary-tertiary items-center">
                  <MailIcon1
                    className="mr-2"
                    color="hsl(var(--text-secondary-tertiary))"
                  />
                  olivia.hills@zeak.com
                </span>
                <hr className="bg-tertiary rounded-full h-6 w-[1px]" />
                <span className="flex text-sm text-secondary-tertiary items-center">
                  <MarkerPinIcon2
                    className="mr-2"
                    color="hsl(var(--text-secondary-tertiary))"
                  />
                  Las Nevada, TX, USA
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center p-6">
            <Button variant="ghost" className="py-[14px] px-6 h-auto">
              <EditIcon3 className="w-5 h-5 mr-2" size="20" />
              Edit
            </Button>
            <hr className="bg-tertiary rounded-full h-6 w-[1px]" />
            <Button variant="ghost" className="py-[14px] px-6 h-auto">
              <UserIcon1 className="w-5 h-5 mr-2" size="20" />
              Manage Users
            </Button>
            <hr className="bg-tertiary rounded-full h-6 w-[1px]" />
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
                <Button
                  variant="ghost"
                  className="py-[13px] px-4 min-w-[134px] text-sm font-normal h-auto text-left justify-between  border-none"
                >
                  <DotsHorizontalIcon className="mr-2" size="20" />
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
          </div>
        </div>
        <div className="-mx-[60px]">
          <Tabs
            defaultValue={currentTab}
            onValueChange={handleTabChange}
            value={currentTab}
            className="w-full"
          >
            <div className="relative">
              <TabsList
                aria-label="List of tabs"
                className="px-[60px] pr-[174px]"
              >
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
              <Button
                variant="warning"
                className="absolute right-[60px] top-0 rounded-sm"
              >
                {" "}
                <FileLandscapeIcon
                  className="mr-2"
                  color="hsl(var(--dark-yellow))"
                />
                Notes
              </Button>
            </div>
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
    </>
  );
};

export default CompanyDetails;

const GeneralContent = () => {
  const [stepOneAccordionOpen, setStepOneAccordionOpen] = useState<any>(0);
  const generalList = [
    {
      id: "1",
      title: "Company Info",
      isFinished: false,
      isEditing: true,
      content: <CompaniesInfoContent />,
    },
    {
      id: "2",
      title: "Status and Effectivity Dates",
      isFinished: true,
      isEditing: false,
      content: <StatusEffectivityDateContent />,
    },
    {
      id: "3",
      title: "Addresses",
      isFinished: true,
      isEditing: false,
      content: <AddressesContent />,
    },
    {
      id: "4",
      title: "Audit",
      isFinished: false,
      content: <AuditContent />,
      isEditing: false,
      icon: (
        <>
          <span className="mr-6 flex items-center justify-center w-7 h-7  rounded-sm">
            <FileQuestionIcon2 />
          </span>
        </>
      ),
    },
  ];
  return (
    <>
      <Accordion.Root
        className="AccordionRoot"
        type="single"
        defaultValue={generalList[0].title}
        collapsible
      >
        {generalList.map((generalItem, index) => (
          <Accordion.Item
            key={index}
            className={`AccordionItem border border-stroke rounded-lg mb-10 ${
              generalItem.icon ? "bg-stroke" : ""
            }`}
            value={generalItem.title}
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
                {generalItem?.icon}
                {generalItem.title}
              </span>
              <div className="flex items-center space-x-4 w-[152px] justify-end">
                <IconButton
                  variant="ghost"
                  aria-label="editing"
                  icon={
                    generalItem.isFinished ? (
                      <TbCircleCheckFilled />
                    ) : (
                      <MdInfo size={24} />
                    )
                  }
                  className={`${
                    generalItem.isFinished
                      ? "text-accent-green"
                      : "text-accent-accentYellow"
                  } p-0`}
                />
                <IconButton
                  variant="ghost"
                  aria-label="in-progress"
                  icon={<EditIcon3 />}
                  tooltipText="Some important information missing (to be confirmed)"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none focus-visible:outline-none w-8 h-8 flex justify-center items-center hover:bg-background rounded-full">
                    <DotsHorizontalIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[250px]">
                    <DropdownMenuItem className="p-0">
                      <Button
                        variant="secondary"
                        className={`py-[18px] px-6 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none relative ml ${
                          // generalItem.isEditing
                          false ? "bg-stroke hover:bg-stroke" : ""
                        }`}
                      >
                        <DataflowIcon size="20" className="mr-4" />
                        Rule
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-0">
                      <Button
                        variant="secondary"
                        className={`py-[18px] px-6 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none relative ml ${
                          // generalItem.isEditing
                          false ? "bg-stroke hover:bg-stroke" : ""
                        }`}
                      >
                        <DataflowIcon size="20" className="mr-4" />
                        Rule
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
              {generalItem.content}
              {generalItem.isEditing && (
                <div className="flex justify-end space-x-10 pt-10">
                  <Button variant="ghost" className="rounded-sm" size="lg">
                    Cancel
                  </Button>
                  <Button variant="primary" className="rounded-sm" size="lg">
                    Save
                  </Button>
                </div>
              )}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </>
  );
};

const CompaniesInfoContent = () => {
  return (
    <>
      <ValidatedForm validator={[]}>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <div className="flex items-center">
              <h4 className="text-sm text-accent-dark font-medium mb-1">
                Company Name
              </h4>
            </div>

            {false ? (
              <p className="text-base text-tertiary">Marck & Co 1920</p>
            ) : (
              <ClearableInput name="companyName" placeholder="" />
            )}
          </div>
          <div className="">
            <div className="flex items-center">
              <h4 className="text-sm text-accent-dark font-medium mb-2">
                Company Code
              </h4>
            </div>

            {false ? (
              <p className="text-base text-tertiary">MNC</p>
            ) : (
              <ClearableInput name="companyCode" placeholder="" />
            )}
          </div>
          <div className="">
            <div className="flex items-center">
              <h4 className="text-sm text-accent-dark font-medium mb-2">
                Company's Deployed URL
              </h4>
            </div>

            {false ? (
              <p className="text-base text-tertiary">
                pfizer.my.zeak.com/pfizer-sales{" "}
              </p>
            ) : (
              <ClearableInput name="companyDeployedURL" placeholder="" />
            )}
          </div>
          <div className="">
            <div className="flex items-center">
              <h4 className="text-sm text-accent-dark font-medium mb-2">
                Company's Deployed URL
              </h4>
            </div>

            {false ? (
              <p className="text-base text-tertiary">
                pfizer.my.zeak.com/pfizer-sales{" "}
              </p>
            ) : (
              <ClearableInput name="companyDeployedURL2" placeholder="" />
            )}
          </div>
        </div>
      </ValidatedForm>
    </>
  );
};

const StatusEffectivityDateContent = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-y-[60px] gap-x-4">
        <div className="col-span-2">
          <h4 className="text-sm text-accent-dark font-medium mb-1">Status</h4>
          <p className="text-base text-tertiary">Save as Active (Default)</p>
        </div>
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">
            Start Date
          </h4>
          <p className="text-base text-tertiary">08/19/2024</p>
        </div>
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">
            End Date
          </h4>
          <p className="text-base text-tertiary">08/19/2024</p>
        </div>
      </div>
    </>
  );
};

const AddressesContent = () => {
  const [viewType, setViewType] = useState("grid");
  const addressDummyList = [
    {
      id: "1",
      addressType: "Shipping",
      addressName: "Chicago Office Chicago OfficOffice...",
      address1: "554 dfg siddhi vinayak shanti vidya nagri Mira road",
      address2: "THANE, MAHARASHTRA 401107",
      city: "Chicago",
      name: "John Doe",
      email: "ohndoe@mail.com",
      number: "+9112345667809",
      color: "94, 35, 157",
      isDefault: true,
      isActive: true,
    },
    {
      id: "2",
      addressType: "Billing",
      addressName: "Chicago Office Chicago OfficOffice...",
      address1: "554 dfg siddhi vinayak shanti vidya nagri Mira road",
      address2: "THANE, MAHARASHTRA 401107",
      city: "Chicago",
      name: "--",
      email: "--",
      number: "--",
      color: "4, 167, 119",
      isDefault: true,
      isActive: true,
    },
    {
      id: "3",
      addressType: "Billing",
      addressName: "Chicago Office Chicago OfficOffice...",
      address1: "554 dfg siddhi vinayak shanti vidya nagri Mira road",
      address2: "THANE, MAHARASHTRA 401107",
      city: "Chicago",
      name: "--",
      email: "--",
      number: "--",
      color: "245, 107, 30",
      isDefault: false,
      isActive: false,
    },
  ];

  const [addressList, setAddressList] = useState(addressDummyList);

  const handleTagColor = (e: any, index: number) => {
    const remaining = [...addressList];
    const targetValue = e.target.value;
    const r = parseInt(targetValue.substr(1, 2), 16);
    const g = parseInt(targetValue.substr(3, 2), 16);
    const b = parseInt(targetValue.substr(5, 2), 16);
    console.log(`red: ${r}, green: ${g}, blue: ${b}`);
    remaining[index].color = `${r}, ${g}, ${b}`;
    setAddressList(remaining);
  };
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
          <div className="flex items-center">
            <IconButton
              aria-label={"gridView"}
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                setViewType("grid");
              }}
              className={`rounded-sm ${
                viewType === "grid"
                  ? "bg-accent-bgHoverNew hover:bg-accent-bgHoverNew text-accent"
                  : "text-secondary"
              }`}
              icon={<CiGrid41 size={24} />}
              size={"lg"}
            />
            <IconButton
              aria-label={"listView"}
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                setViewType("list");
              }}
              className={`rounded-sm ${
                viewType === "list"
                  ? "bg-accent-bgHoverNew hover:bg-accent-bgHoverNew text-accent"
                  : "text-secondary"
              }`}
              icon={<CiCircleList size={24} />}
              size={"lg"}
            />
          </div>

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
                <DotsVerticalIcon />
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
      <div className="pt-10">
        {viewType === "grid" ? (
          <GridAddressContent
            addressList={addressList}
            handleTagColor={handleTagColor}
          />
        ) : (
          <ListAddressContent
            addressList={addressList}
            handleTagColor={handleTagColor}
          />
        )}
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

const GridAddressContent = (props: any) => {
  const { addressList, handleTagColor } = props;
  return (
    <>
      <div className="grid grid-cols-2 gap-x-10 gap-y-[60px]">
        <AddUsersModal />
        {addressList.length > 0 &&
          addressList.map((address: any, index: number) => (
            <div
              key={index}
              className="border border-stroke rounded-sm"
              style={{
                backgroundColor: `rgba(${address.color}, 0.1)`,
              }}
            >
              <div className="px-6 py-2 border-b border-stroke flex justify-between items-center">
                <h3
                  className={`text-sm font-medium`}
                  style={{ color: `rgb(${address.color})` }}
                >
                  {address.addressType}
                </h3>
                {address.isDefault && (
                  <Badge
                    variant="muted"
                    className="rounded-full font-normal text-xs"
                  >
                    Default
                  </Badge>
                )}
              </div>
              <div className="px-6 py-2 border-b border-stroke">
                <h4 className="mb-2 font-semibold">{address.addressName}</h4>
                <p className="text-sm text-secondary">{address.address1}</p>
                <p className="text-sm text-secondary">{address.address2}</p>
                <p className="text-sm text-secondary">{address.city}</p>
                <div className="pt-2 border-t border-stroke mt-2">
                  <p className="text-sm text-secondary">{address.name}</p>
                  <div className="flex items-center">
                    <p className="text-sm text-secondary">{address.email}</p>
                    <hr className="h-3 w-[1px] bg-secondary mx-2" />
                    <p className="text-sm text-secondary">{address.number}</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-1 border-b border-stroke flex justify-between items-center min-h-[40px]">
                <div className="flex items-center gap-x-4">
                  <IconButton
                    aria-label="buttons"
                    variant="ghost"
                    icon={<FiFile size="20" />}
                    size="md"
                    className="p-[2px] text-secondary w-5 h-5"
                  />
                  <IconButton
                    aria-label="buttons"
                    variant="ghost"
                    icon={<FiBell size="20" />}
                    size="md"
                    className="p-[2px] text-secondary w-5 h-5"
                  />
                  <IconButton
                    aria-label="buttons"
                    variant="ghost"
                    icon={<HiPaperClip size="20" />}
                    size="md"
                    className="p-[2px] text-secondary w-5 h-5"
                  />
                  <IconButton
                    aria-label="buttons"
                    variant="primary"
                    icon={<VscPlug size="20" />}
                    size="md"
                    className="p-[2px] text-secondary rounded-sm bg-accent-primary text-card w-5 h-5"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none focus-visible:outline-none w-5 h-5 flex justify-center items-center">
                      <DotsVerticalIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[100px]">
                      <DropdownMenuLabel className="flex items-center p-4 hover:bg-stroke border-b border-stroke">
                        <div className="relative h-5 mr-4">
                          <input
                            id={`tag-color-${index}`}
                            type="color"
                            className="opacity-0 absolute w-5 h-5"
                            value={`rgb(${address.color})`}
                            onChange={(e) => handleTagColor(e, index)}
                          />
                          <label
                            className="inline-block w-5 h-5 border-none rounded-sm"
                            style={{
                              backgroundColor: `rgba(${address.color}, 1)`,
                            }}
                            htmlFor={`tag-color-${index}`}
                          ></label>
                        </div>
                        <p>Bg Color</p>
                      </DropdownMenuLabel>
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
                          <TrashIcon4 size="20" className="mr-4" />
                          Delete
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center">
                  {address.isActive ? (
                    <span className="text-accent-green text-xs">Active</span>
                  ) : (
                    <span className="text-secondary-tertiary text-xs">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

const ListAddressContent = () => {
  return <>List view table</>;
};

const AddUsersModal = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex flex-col justify-center items-center border p-2 border border-dashed border-tertiary bg-table rounded-sm">
          <FaPlus className="mb-4" size={24} />
          <p className="text-accent-dark">New Address</p>
        </div>
      </DrawerTrigger>
      <DrawerContent size="md">
        <DrawerHeader className="px-6 py-4">
          <div className="pr-[30px]">
            <h3 className="text-3xl font-semibold">New Address</h3>
          </div>
          <DrawerCloseButton className="top-4 right-6 cursor-pointer z-10" />
        </DrawerHeader>
        <DrawerBody className="px-6 pt-6 pb-0">
          <div className="w-full grow">
            <ValidatedForm validator={[]}>
              <div className="flex items-center justify-between mb-10">
                <Select
                  value="status"
                  name="status"
                  label="Status"
                  defaultValue="default"
                  options={statusOptions}
                />
                <FormControl isInvalid={false}>
                  <HStack className="w-full justify-end">
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
                      Set as default{" "}
                      <span className="inline-block relative group ml-2">
                        <AiOutlineInfoCircle />
                        <span
                          id="tooltip-right"
                          role="tooltip"
                          className="absolute hidden right-[calc(100%_+_4px)] top-[50%] -translate-y-[50%] z-10  group-hover:inline-flex max-w-[320px] w-[max-content] group-hover:group-opacity-1 p-3 text-xs font-normal text-white bg-accent-dark rounded-lg shadow-sm tooltip"
                        >
                          ToolTip Text
                          <span className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-[50%] w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-accent-dark"></span>
                        </span>
                      </span>
                    </label>
                  </HStack>
                </FormControl>
              </div>
              <div className="grid grid-cols-1 gap-y-10">
                <ClearableInput
                  name="addressName"
                  placeholder="Company's Business Address"
                  label="Address Name"
                />
                <Select
                  value="purpose"
                  name="purpose"
                  label="Purpose"
                  defaultValue="shipping"
                  options={purposeOptions}
                />
                <ClearableInput
                  name="Address1"
                  placeholder=""
                  label="Address Line 1"
                />
                <ClearableInput
                  name="Address2"
                  placeholder=""
                  label="Address Line 2"
                />
                <ClearableInput name="City" placeholder="" label="City" />
                <Select
                  value="state"
                  name="state"
                  label="State/Province"
                  options={purposeOptions}
                />
                <Select
                  value="zipcode"
                  name="zipcode"
                  label="Zip/Postal Code"
                  defaultValue="shipping"
                  options={purposeOptions}
                />
                <Select
                  value="Country"
                  name="Country"
                  label="Country"
                  defaultValue="shipping"
                  options={purposeOptions}
                />
                <Accordion.Root
                  className="AccordionRoot"
                  type="single"
                  defaultValue={"contact"}
                  collapsible
                >
                  <Accordion.Item
                    className="AccordionItem border border-stroke rounded-lg mb-10"
                    value="contact"
                  >
                    <Accordion.Trigger className="w-full py-2 px-6 flex items-center justify-between items-center font-medium text-accent h-auto bg-table">
                      <span className="trancate w-[calc(100%_-_160px)] text-left">
                        Contact
                      </span>
                      <div className="flex items-center space-x-4 w-[152px] justify-end">
                        <IconButton
                          variant="ghost"
                          aria-label="in-progress"
                          icon={
                            false ? (
                              <TbCircleCheckFilled />
                            ) : (
                              <MdInfo size={24} />
                            )
                          }
                          className={`${
                            false
                              ? "text-accent-green"
                              : "text-accent-accentYellow"
                          } p-0`}
                        />

                        <IconButton
                          variant="ghost"
                          aria-label="more-option"
                          icon={
                            false ? (
                              <IoChevronUp size={24} />
                            ) : (
                              <IoChevronDown size={24} />
                            )
                          }
                          className="p-0"
                        />
                      </div>
                    </Accordion.Trigger>
                    <Accordion.Content className="p-8 border-t border-stroke bg-table">
                      <div className="grid grid-cols-1 gap-8">
                        <ClearableInput
                          name="Name"
                          placeholder=""
                          label="Name"
                        />
                        <ClearableInput
                          name="Email"
                          placeholder=""
                          label="Email"
                        />
                        <PhoneInputV2
                          name="phno"
                          label="Phone number"
                          defaultValue={""}
                          validateOnChange={true}
                          // for disabled and hiding the close icon you can use below two property
                          hideClose={true}
                          // isReadOnly={!prop}
                        />
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
            </ValidatedForm>
          </div>
        </DrawerBody>
        <DrawerFooter className="px-6 py-4 sm:justify-between">
          <Button className="rounded-sm bg-card" size="xl" variant="secondary">
            Cancel
          </Button>
          <Button className="rounded-sm" size="xl" variant="primary">
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const statusOptions = [
  {
    label: "Save as Active (Default)",
    value: "default",
  },
];
export const purposeOptions = [
  {
    label: "Shipping",
    value: "shipping",
  },
  {
    label: "Billing",
    value: "billing",
  },
];

export const BrandingContent = () => {
  const [stepOneAccordionOpen, setStepOneAccordionOpen] = useState<any>(0);
  const generalList = [
    {
      id: "1",
      title: "Kits",
      isFinished: false,
      isEditing: true,
      content: <BrandKitContent />,
    },
    {
      id: "2",
      title: "Fonts",
      isFinished: false,
      isEditing: false,
      content: <FontsContent />,
    },
    {
      id: "3",
      title: "Colors",
      isFinished: false,
      isEditing: false,
      content: <ColorsContent />,
    },
    {
      id: "4",
      title: "Media",
      isFinished: false,
      isEditing: false,
      content: <MediaContent />,
    },
  ];
  return (
    <>
      <Accordion.Root
        className="AccordionRoot"
        type="single"
        defaultValue={generalList[0].title}
        collapsible
      >
        {generalList.map((generalItem, index) => (
          <Accordion.Item
            key={index}
            className={`AccordionItem border border-stroke rounded-lg mb-10 ${
              generalItem.icon ? "bg-stroke" : ""
            }`}
            value={generalItem.title}
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
                {generalItem?.icon}
                {generalItem.title}
              </span>
              <div className="flex items-center space-x-4 w-[152px] justify-end">
                <IconButton
                  variant="ghost"
                  aria-label="editing"
                  icon={
                    generalItem.isFinished ? (
                      <TbCircleCheckFilled />
                    ) : (
                      <MdInfo size={24} />
                    )
                  }
                  className={`${
                    generalItem.isFinished
                      ? "text-accent-green"
                      : "text-accent-accentYellow"
                  } p-0`}
                />
                <IconButton
                  variant="ghost"
                  aria-label="in-progress"
                  icon={<EditIcon3 />}
                  tooltipText="Some important information missing (to be confirmed)"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none focus-visible:outline-none w-8 h-8 flex justify-center items-center hover:bg-background rounded-full">
                    <DotsHorizontalIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[250px]">
                    <DropdownMenuItem className="p-0">
                      <Button
                        variant="secondary"
                        className={`py-[18px] px-6 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none relative ml ${
                          // generalItem.isEditing
                          false ? "bg-stroke hover:bg-stroke" : ""
                        }`}
                      >
                        <DataflowIcon size="20" className="mr-4" />
                        Rule
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-0">
                      <Button
                        variant="secondary"
                        className={`py-[18px] px-6 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none relative ml ${
                          // generalItem.isEditing
                          false ? "bg-stroke hover:bg-stroke" : ""
                        }`}
                      >
                        <DataflowIcon size="20" className="mr-4" />
                        Rule
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
              {generalItem.content}
              {generalItem.isEditing && (
                <div className="flex justify-end space-x-10 pt-10">
                  <Button variant="ghost" className="rounded-sm" size="lg">
                    Cancel
                  </Button>
                  <Button variant="primary" className="rounded-sm" size="lg">
                    Save
                  </Button>
                </div>
              )}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </>
  );
};

const BrandKitContent = () => {
  const [viewType, setViewType] = useState("grid");
  const addressDummyList = [
    {
      id: "1",
      palette: "10",
      title: "Alt Brand Kit 2",
      fontsAvailable: "10",
      media: "213",
    },
    {
      id: "2",
      palette: "4",
      title: "Alt Brand Kit 2",
      fontsAvailable: "10",
      media: "4",
    },
    {
      id: "3",
      palette: "4",
      title: "Alt Brand Kit 2",
      fontsAvailable: "10",
      media: "20",
    },
    {
      id: "4",
      palette: "10",
      title: "Alt Brand Kit 2",
      fontsAvailable: "10",
      media: "213",
    },
    {
      id: "5",
      palette: "4",
      title: "Alt Brand Kit 2",
      fontsAvailable: "10",
      media: "4",
    },
    {
      id: "6",
      palette: "4",
      title: "Alt Brand Kit 2",
      fontsAvailable: "10",
      media: "20",
    },
  ];

  const [addressList, setAddressList] = useState(addressDummyList);

  const handleTagColor = (e: any, index: number) => {
    const remaining = [...addressList];
    const targetValue = e.target.value;
    const r = parseInt(targetValue.substr(1, 2), 16);
    const g = parseInt(targetValue.substr(3, 2), 16);
    const b = parseInt(targetValue.substr(5, 2), 16);
    console.log(`red: ${r}, green: ${g}, blue: ${b}`);
    remaining[index].color = `${r}, ${g}, ${b}`;
    setAddressList(remaining);
  };
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
          <div className="flex items-center">
            <IconButton
              aria-label={"gridView"}
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                setViewType("grid");
              }}
              className={`rounded-sm ${
                viewType === "grid"
                  ? "bg-accent-bgHoverNew hover:bg-accent-bgHoverNew text-accent"
                  : "text-secondary"
              }`}
              icon={<CiGrid41 size={24} />}
              size={"lg"}
            />
            <IconButton
              aria-label={"listView"}
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                setViewType("list");
              }}
              className={`rounded-sm ${
                viewType === "list"
                  ? "bg-accent-bgHoverNew hover:bg-accent-bgHoverNew text-accent"
                  : "text-secondary"
              }`}
              icon={<CiCircleList size={24} />}
              size={"lg"}
            />
          </div>

          <hr className="bg-stroke h-6 w-[1px]" />
          <Button
            variant="blue"
            className="py-[14px] px-6 h-auto rounded-sm"
            size="md"
          >
            <FaPlus className="w-5 h-5 mr-2" />
            New Brand Kit
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
                <DotsVerticalIcon />
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
      <div className="pt-10">
        {viewType === "grid" ? (
          <GridKitContent
            brandKit={addressList}
            handleTagColor={handleTagColor}
          />
        ) : (
          <ListAddressContent
            brandKit={addressList}
            handleTagColor={handleTagColor}
          />
        )}
      </div>
    </>
  );
};

const GridKitContent = (props: any) => {
  const { brandKit } = props;
  return (
    <>
      <div className="grid grid-cols-4 gap-x-10 gap-y-[60px]">
        <div className="flex flex-col justify-center items-center border p-2 border border-dashed border-tertiary bg-table rounded-sm">
          <FaPlus className="mb-4" size={24} />
          <p className="text-accent-dark">New Address</p>
        </div>
        {brandKit.length > 0 &&
          brandKit.map((kit: any, index: number) => (
            <div key={index} className="border border-stroke rounded-sm">
              <div className="h-7 grid grid-cols-4 w-full">
                <div
                  className="h-full"
                  style={{ backgroundColor: "#1F1F1F" }}
                ></div>
                <div
                  className="h-full"
                  style={{ backgroundColor: "#FFE58F" }}
                ></div>
                <div
                  className="h-full"
                  style={{ backgroundColor: "#F18F01" }}
                ></div>
                <div
                  className="h-full"
                  style={{ backgroundColor: "#E6F4FF" }}
                ></div>
              </div>
              <div className="py-6 px-6">
                <div className="">
                  <div className="flex">
                    <h5 className="text-sm font-medium text-accent-dark mb-2">
                      {kit.title}
                    </h5>
                    <IconButton
                      aria-label="more"
                      className="absolute top-1/2 right-0 -translate-y-1/2"
                      icon={<DotsVerticalIcon />}
                    />
                  </div>
                  <p className="text-sm mb-1">Fonts Available : 10</p>
                  <p className="text-sm mb-1">Media (213)</p>
                  <p className="text-sm mb-1">Palette (10)</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

const FontsContent = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h4 className="">Uploaded fonts</h4>
        <Button
          variant="primary"
          className="flex items-center px-6 py-4 rounded-sm h-[56px]"
          size="lg"
        >
          <UploadIcon1 className="mr-2" color="#ffffff" />
          Upload a Font
        </Button>
      </div>{" "}
    </>
  );
};
const ColorsContent = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-10">
        <div>
          <h5 className="text-sm text-accent mb-3">Brand Colors</h5>
          <p className="text-sm text-accent-dark">
            Click to add brand color(s) for use in label and report designs
          </p>
        </div>
        <div>
          <div className="flex items-center mb-3">
            <p className="text-sm text-accent-dark">Palette 1</p>
            <IconButton
              aria-label="editicon"
              variant="ghost"
              icon={<EditIcon3 />}
            />
          </div>
          <div className="-mx-[7px] flex items-center">
            <div className="px-[7px]">
              <div
                className="w-10 h-10 rounded-md border-[1px] border-stroke"
                style={{ backgroundColor: "#eeee" }}
              ></div>
            </div>
            <div className="px-[7px]">
              <div
                className="w-10 h-10 rounded-md border-[1px] border-stroke"
                style={{ backgroundColor: "#D11149" }}
              ></div>
            </div>
            <div className="px-[7px]">
              <div
                className="w-10 h-10 rounded-md border-[1px] border-stroke"
                style={{ backgroundColor: "#F56B1E" }}
              ></div>
            </div>
            <div className="px-[7px]">
              <div
                className="w-10 h-10 rounded-md border-[1px] border-stroke"
                style={{ backgroundColor: "#eeee" }}
              ></div>
            </div>
            <div className="px-[7px]">
              <div
                className="w-10 h-10 rounded-md border-[1px] border-stroke"
                style={{ backgroundColor: "#1677FF" }}
              ></div>
            </div>
            <div className="px-[7px]">
              <div
                className="w-10 h-10 rounded-md border-[1px] border-stroke"
                style={{ backgroundColor: "#eeee" }}
              ></div>
            </div>
            <div className="px-[7px]">
              <div className="w-10 h-10 rounded-md border-[1px] border-stroke flex items-center justify-center">
                <IconButton
                  aria-label="addicon"
                  variant="ghost"
                  className="text-xs bg-white"
                  icon={<FaPlus className="text-tertiary" size="14" />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MediaContent = () => {
  return (
    <>
      <div className="w-[200px]">
        <div className="w-[200px] h-[200px] relative rounded-sm overflow-hidden">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLACiigsvBEDNStSJ9YnZOk2NmvwL_QWyB6A&s"
            alt="..."
            className="h-full w-full object-cover"
          />
          <div className="absolute left-0 top-0 w-full h-full bg-[hsla(--var(text-accent-dark),_0.2))] flex items-center justify-center">
            <IconButton
              variant="secondary"
              className="w-10 h-10 rounded-full"
              aria-label=""
              icon={<TrashIcon4 />}
            />
          </div>
        </div>

        <Button
          variant="primary"
          className="flex items-center px-6 py-4 rounded-sm h-[56px] mt-10"
          size="lg"
        >
          <UploadIcon1 className="mr-2" color="#ffffff" />
          Upload Media
        </Button>
      </div>
    </>
  );
};

const IntegrationsContent = () => {
  const addressDummyList = [
    {
      id: "1",
      addressType: "Shipping",
      addressName: "Chicago Office Chicago OfficOffice...",
      address1: "554 dfg siddhi vinayak shanti vidya nagri Mira road",
      address2: "THANE, MAHARASHTRA 401107",
      city: "Chicago",
      name: "John Doe",
      email: "ohndoe@mail.com",
      number: "+9112345667809",
      color: "94, 35, 157",
      isDefault: true,
      isActive: true,
    },
    {
      id: "2",
      addressType: "Billing",
      addressName: "Chicago Office Chicago OfficOffice...",
      address1: "554 dfg siddhi vinayak shanti vidya nagri Mira road",
      address2: "THANE, MAHARASHTRA 401107",
      city: "Chicago",
      name: "--",
      email: "--",
      number: "--",
      color: "4, 167, 119",
      isDefault: true,
      isActive: true,
    },
    {
      id: "3",
      addressType: "Billing",
      addressName: "Chicago Office Chicago OfficOffice...",
      address1: "554 dfg siddhi vinayak shanti vidya nagri Mira road",
      address2: "THANE, MAHARASHTRA 401107",
      city: "Chicago",
      name: "--",
      email: "--",
      number: "--",
      color: "245, 107, 30",
      isDefault: false,
      isActive: false,
    },
  ];

  const [addressList, setAddressList] = useState(addressDummyList);

  const handleTagColor = (e: any, index: number) => {
    const remaining = [...addressList];
    const targetValue = e.target.value;
    const r = parseInt(targetValue.substr(1, 2), 16);
    const g = parseInt(targetValue.substr(3, 2), 16);
    const b = parseInt(targetValue.substr(5, 2), 16);
    console.log(`red: ${r}, green: ${g}, blue: ${b}`);
    remaining[index].color = `${r}, ${g}, ${b}`;
    setAddressList(remaining);
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-10">
        {addressList.map((address, index) => (
          <div
            key={index}
            className="px-8 pt-6 pb-4 bg-accent-bgHoverNew rounded-lg"
          >
            <div className="flex items-start justify-between">
              <div className="pb-4 pl-[84px] relative">
                <div className="absolute left-0 top-0 w-[60px] h-[60px] border-stroke border-[1px] rounded-sm overflow-hidden p-2 bg-white">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLACiigsvBEDNStSJ9YnZOk2NmvwL_QWyB6A&s"
                    alt="..."
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center space-x-6">
                  <h4 className="text-2xl font-semibold max-w-[296px] truncate">
                    Microsoft Dynamics
                  </h4>
                  <hr className="w-[1px] h-6 bg-tertiary" />
                  <div className="flex flex-col">
                    <span className="text-accent-red font-semibold text-xs mb-1">
                      Application
                    </span>
                    <span className="text-accent-dark font-medium text-xs">
                      Business Central Prod
                    </span>
                  </div>
                  <hr className="w-[1px] h-6 bg-tertiary" />
                  <div className="flex flex-col">
                    <span className="text-accent-green font-semibold text-xs mb-1">
                      Environment
                    </span>
                    <span className="text-accent-dark font-medium text-xs">
                      Business Central Prod
                    </span>
                  </div>
                </div>
                <p className="text-sm text-secondary mt-3">
                  Process of connecting Business Central, a cloud-based ERP
                  solution, with other systems or applications.
                </p>
                <Link
                  className="text-accent-primary flex items-center mt-4 underline"
                  to="https://www.environm.dynamics.com/"
                >
                  https://www.environm.dynamics.com/{" "}
                  <ArrowTopRightIcon
                    className="ml-3"
                    color="hsl(var(--accent-primary))"
                  />
                </Link>
              </div>
              <div>
                <Badge variant="green" className="uppercase">
                  <span className="w-2 h-2 rounded-full border-[1px] border-accent-brightGreen bg-accent-darkGreen mr-3"></span>
                  Connected
                </Badge>
              </div>
            </div>
            <div className="border-t-[1px] border-stroke flex items-center justify-between pt-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <UserIcon1 className="mr-2" />{" "}
                  <p className="text-sm text-secondary">
                    Last Updated By{" "}
                    <span className="font-semibold ml-1">Ryan Pazos</span>
                  </p>
                </div>
                <hr className="bg-tertiary w-[1px] h-6" />
                <div className="flex items-center">
                  <ClockIcon className="mr-2" />{" "}
                  <p className="text-sm text-secondary">
                    Last Updated Date:
                    <span className="font-semibold ml-1">
                      24 Aug 2024, 02:00 PM CST
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <IconButton
                  aria-label="buttons"
                  variant="ghost"
                  icon={<FiFile size="20" />}
                  size="md"
                  className="p-[2px] text-secondary w-10 h-10"
                />
                <IconButton
                  aria-label="buttons"
                  variant="ghost"
                  icon={<FiBell size="20" />}
                  size="md"
                  className="p-[2px] text-secondary w-10 h-10"
                />
                <IconButton
                  aria-label="buttons"
                  variant="ghost"
                  icon={<HiPaperClip size="20" />}
                  size="md"
                  className="p-[2px] text-secondary w-10 h-10"
                />
                <div className="relative h-5 mr-4">
                  <input
                    id={`tag-color-${index}`}
                    type="color"
                    className="opacity-0 absolute w-10 h-10"
                    value={`rgb(${address.color})`}
                    onChange={(e) => handleTagColor(e, index)}
                  />
                  <label
                    className="inline-block w-5 h-5 border-none rounded-sm"
                    style={{
                      backgroundColor: `rgba(${address.color}, 1)`,
                    }}
                    htmlFor={`tag-color-${index}`}
                  ></label>
                </div>
                <IconButton
                  aria-label="buttons"
                  variant="ghost"
                  icon={<ShareIcon size={20} />}
                  size="md"
                  className="p-[2px] text-secondary w-10 h-10"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none focus-visible:outline-none w-5 h-5 flex justify-center items-center">
                    <DotsVerticalIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[100px]">
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
                        <TrashIcon4 size="20" className="mr-4" />
                        Delete
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
