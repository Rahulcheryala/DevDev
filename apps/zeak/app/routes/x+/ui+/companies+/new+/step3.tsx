import {
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
  DropdownMenuTrigger,
  FormControl,
  HStack,
  IconButton,
  Input,
} from "@zeak/react";
import * as Accordion from "@radix-ui/react-accordion";
import { Link, useNavigate } from "@remix-run/react";
import { FaPlus } from "react-icons/fa6";
import { RxSlash } from "react-icons/rx";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { ClearableInput, PhoneInputV2, Select } from "~/components/Form";
import { useState } from "react";
import { FiBell, FiFile } from "react-icons/fi";
import { HiPaperClip } from "react-icons/hi";
import { VscPlug } from "react-icons/vsc";
import {
  IoChevronDown,
  IoChevronUp,
  IoCopyOutline,
  IoEllipsisVertical,
} from "react-icons/io5";
import { CiCircleList, CiGrid41 } from "react-icons/ci";
import { LuChevronDown, LuChevronUp, LuRocket, LuTrash } from "react-icons/lu";
import { BiSearch } from "react-icons/bi";
import { TbCircleCheckFilled, TbPencilMinus, TbReload } from "react-icons/tb";
import { CheckIcon, DataflowIcon, SortIcon } from "@zeak/icons";
import SettingsList from "~/modules/shared/ui/SettingsList/SettingsList";
import { MdInfo } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function Step3() {
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
      isActive: true,
      isCompleted: false,
      label: "3",
    },
    {
      id: 4,
      title: "Additional Info",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: false,
      label: "4",
    },
    {
      id: 5,
      title: "Fiscal Period",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: false,
      label: "5",
    },
    {
      id: 6,
      title: "Third-Party Integration",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
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

  const handleReview = () => {
    navigate("/x/ui/companies/new/step4");
  };

  return (
    <>
      <div className="bg-accent-bgHoverNew h-full">
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
                    Step 3 of 7
                  </span>
                  <h4 className="text-xl text-accent-dark font-medium">
                    Address
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
                    <DropdownMenuContent align="end" className="min-w-[100px]">
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
                <ValidatedForm validator={[]} className="">
                  <AddressContent />
                </ValidatedForm>
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
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const AddressContent = () => {
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
                      <IoEllipsisVertical />
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
                          <LuTrash size={20} className="mr-4" />
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
