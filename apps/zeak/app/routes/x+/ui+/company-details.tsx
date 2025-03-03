import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@zeak/react";
import * as Accordion from "@radix-ui/react-accordion";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { Link } from "@remix-run/react";
import { useState } from "react";
import {
  HiOutlineArrowLeft,
  HiOutlineChevronRight,
  HiPlus,
} from "react-icons/hi";
import { ClearableInput } from "~/components/Form";
import { LuChevronDown } from "react-icons/lu";
import { IndeterminateCheckbox } from "~/components/Table/components";
import { PiPencilSimpleLine } from "react-icons/pi";
import { WebMenuVerticalDots } from "@zeak/icons";

export default function RolesPermissions() {
  return (
    <div className="py-[26px] px-[50px] w-full">
      <div className="flex items-center">
        <Link
          to={"/"}
          className="text-accent text-base leading-[20px] tracking-wider mr-[5px] h-[24px] w-[24px] flex items-center justify-center"
        >
          <HiOutlineArrowLeft />
        </Link>
        <ul className="flex items-center mx-[-2px]">
          <li className="px-2">
            <Link
              to={"/"}
              className="text-secondary text-sm leading-[20px] tracking-wider"
            >
              Settings
            </Link>
          </li>
          <li className="px-2">
            <span className="text-secondary text-base leading-[20px] h-[24px] flex items-center justify-center">
              <HiOutlineChevronRight />
            </span>
          </li>
          <li className="px-2">
            <span className="text-accent text-sm leading-[20px] tracking-wider">
              Companies
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-[22px] mb-[20px] min-h-[56px] flex justify-between">
        <h2 className="text-[32px] text-accent leading-[36px] font-semibold tracking-wider w-[calc(100%_-_160px)]">
          Companies
        </h2>

        <NewRolesModal />
      </div>
      <SortDropdown />
    </div>
  );
}

const NewRolesModal = () => {
  // const [value, setValue] = useState("Pixels");
  const defaultTab = "overview";
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          className="rounded-[100px] font-normal w-[190px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-accent bg-white hover:text-white"
          leftIcon={<HiPlus size={20} />}
        >
          New Company
        </Button>
      </DrawerTrigger>
      <DrawerContent size="xl">
        <DrawerHeader className="px-[60px] pt-[60px] pb-[18px] border-0 flex justify-between">
          <DrawerTitle className="pr-[200px]">Create a New Company</DrawerTitle>
          <div>
            <Button
              variant={"secondary"}
              className="rounded-[100px] font-normal border border-stroke w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] bg-white hover:text-white absolute top-[48px] right-[96px]"
              leftIcon={<PiPencilSimpleLine size={20} />}
            >
              Edit
            </Button>
            <DrawerCloseButton className="top-[65px] right-[60px] cursor-pointer z-10" />
          </div>
        </DrawerHeader>
        <DrawerBody className="p-0">
          <Tabs
            defaultValue={currentTab}
            onValueChange={handleTabChange}
            value={currentTab}
            className="w-full"
          >
            <TabsList aria-label="List of tabs" className="px-[60px]">
              <TabsTrigger value={"overview"}>Overview</TabsTrigger>
              <TabsTrigger value={"modules"}>Modules</TabsTrigger>
            </TabsList>
            <TabsContent value={"overview"} className="px-[60px] py-[40px]">
              <CompanyOverViewContent />
              {/* <Alert className="[&>svg]:top-[18px]" variant="warning">
                <IoInformationCircleSharp size={20} />
                <AlertDescription>
                  Only Tenant Admins can create a Custom Role. Custom Roles are
                  available for any company under the primary account.
                </AlertDescription>
              </Alert>
              <ValidatedForm validator={[]} defaultValues={{}}>
                <div className="mt-[32px]">
                  <ClearableInput name="text" label="Role name" />
                </div>
                <div className="flex flex-wrap mx-[-20px]">
                  <div className="px-[20px] w-1/2 mt-[40px]">
                    <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
                      Category
                    </label>
                    <Select
                      defaultValue="apple"
                      onValueChange={(value) => console.log(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="px-[20px] w-1/2 mt-[40px]">
                    <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
                      Company
                    </label>
                    <Select
                      defaultValue="apple"
                      onValueChange={(value) => console.log(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="px-[20px] w-1/2 mt-[40px]">
                    <DatePicker
                      name="Effectivity date"
                      label="Effectivity date"
                    />
                  </div>
                  <div className="px-[20px] w-full mt-[40px]">
                    <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
                      Description
                    </label>
                    <Textarea
                      name="description"
                      placeholder="Managing admin role for North America locations"
                      className="min-h-[104px]"
                    />
                  </div>
                </div>
              </ValidatedForm> */}
            </TabsContent>
            <TabsContent value={"modules"} className="px-[60px] py-[40px]">
              <ModulesContent />
            </TabsContent>
          </Tabs>
        </DrawerBody>
        <DrawerFooter className="px-[60px] pb-[60px] pt-[28px] border-0 sm:justify-start">
          <div className="flex items-center justify-between w-full">
            <Button
              variant="ghost"
              className="rounded-[100px] font-normal min-w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-secondary hover:no-underline underline-offset-0 pl-0 min-w-0"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="rounded-[100px] font-normal border border-stroke min-w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-white"
            >
              Next
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const SortDropdown = () => {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
          <Button
            variant="ghost"
            className="py-[10px] px-4  text-sm bg-white hover:bg-white h-10 text-left justify-start text-secondary"
          >
            <WebMenuVerticalDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[300px]">
          <DropdownMenuLabel className="hover:bg-[#D4E4ED] p-0">
            <Button
              variant="ghost"
              className="p-4 rounded-none justify-start w-full h-[auto] font-normal"
            >
              Sort A to Z
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-0" />{" "}
          <DropdownMenuLabel className="hover:bg-[#D4E4ED] p-0">
            <Button
              variant="ghost"
              className="p-4 rounded-none justify-start w-full h-[auto] font-normal"
            >
              Sort Z to A
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-0" />{" "}
          <div className="p-4">
            <div>
              <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
                Company Code
              </label>
              <Select
                defaultValue="notcontain"
                onValueChange={(value) => console.log(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notcontain">does not contain</SelectItem>
                  <SelectItem value="minnesota">Minnesota</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-4">
              <Select
                defaultValue="illinois"
                onValueChange={(value) => console.log(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="illinois">Illinois</SelectItem>
                  <SelectItem value="minnesota">Minnesota</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-x-[40px] mt-4">
              <Button
                variant="ghost"
                className="p-4 rounded-none rounded-full w-full h-[auto] font-normal"
              >
                Clear
              </Button>
              <Button
                variant="primary"
                className="p-4 rounded-none rounded-full w-full h-[auto] font-normal"
              >
                Apply
              </Button>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const CompanyOverViewContent = () => {
  return (
    <ValidatedForm validator={[]} defaultValues={{}}>
      <div className="grid grid-cols-2 gap-x-[40px] mb-12">
        <div>
          <div className="flex items-center">
            {/* <div className="w-[100px] h-[100px] rounded-[100px] bg-[#9747FF] overflow-hidden flex items-center justify-center">
        <span className="text-[32px] leading-[41px] text-[#FFFFFF]">
          NX
        </span>
      </div> */}
            <Avatar
              size="xl"
              color="#9E9E9E"
              src={""}
              // path={user?.avatarUrl}
              name={"David beckham"}
              onClick={() => console.log("s")}
            />

            <div className="w-[calc(100%_-_100px)] pl-[32px]">
              <p className="text-[14px] leading-[20px] text-accent">
                Company Logo
              </p>
              <span className="text-[12px] leading-[17px] text-secondary-foreground block">
                Drag and drop or click to upload a picture
              </span>
              <span className="text-[12px] leading-[17px] text-secondary-foreground block">
                .png, .jpg, .jpeg (Max 2MB)
              </span>
            </div>
          </div>
        </div>
        <div className="relative">
          <ClearableInput
            name="domain"
            label="Company Domain"
            disabled={true}
            isDisabled={true}
          />
          <span className="text-base absolute right-3 bottom-6">
            .my.projectx.com
          </span>
        </div>
        <div className="mt-10">
          <ClearableInput name="companyName" label="Company Name" />
        </div>
        <div className="mt-10">
          <ClearableInput name="companyCode" label="Company Code" />
        </div>
      </div>
      <Accordion.Root
        className="AccordionRoot mb-[60px]"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        <Accordion.Item className="AccordionItem" value="item-1">
          <Accordion.Trigger className="w-full">
            <div className="flex items-center justify-between py-[10px] border-b border-[#E9E9EE]">
              <p className="text-sm font-normal tracking-[0.5px]">Address</p>
              <div className="flex items-center justify-between">
                <Button variant="ghost" className="px-0 w-6 h-6">
                  <LuChevronDown size="20px" strokeWidth="2" color="#8A8A8F" />
                </Button>
              </div>
            </div>
          </Accordion.Trigger>
          <Accordion.Content className="pt-[26px]">
            <div className="grid grid-cols-2 gap-x-[40px]">
              <div className="pt-4">
                <ClearableInput name="address1" label="Address 1" />
              </div>
              <div className="pt-4">
                <ClearableInput name="address2" label="Address 2" />
              </div>
              <div className="pt-4">
                <ClearableInput name="city" label="City" />
              </div>
              <div className="pt-4">
                <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
                  State/ Province
                </label>
                <Select
                  defaultValue="illinois"
                  onValueChange={(value) => console.log(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="illinois">Illinois</SelectItem>
                    <SelectItem value="minnesota">Minnesota</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4">
                <ClearableInput name="zipcode" label="Zip/ Postal Code" />
              </div>
              <div className="pt-4">
                <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
                  Country
                </label>
                <Select
                  defaultValue="UnitedStates"
                  onValueChange={(value) => console.log(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UnitedStates">United States</SelectItem>
                    <SelectItem value="UnitedKingdom">
                      United Kingdom
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
      <Accordion.Root
        className="AccordionRoot mb-[60px]"
        type="single"
        defaultValue="addition-info"
        collapsible
      >
        <Accordion.Item className="AccordionItem" value="addition-info">
          <Accordion.Trigger className="w-full">
            <div className="flex items-center justify-between py-[10px] border-b border-[#E9E9EE]">
              <p className="text-sm font-normal tracking-[0.5px]">
                Additional Info
              </p>
              <div className="flex items-center justify-between">
                <Button variant="ghost" className="px-0 w-6 h-6">
                  <LuChevronDown size="20px" strokeWidth="2" color="#8A8A8F" />
                </Button>
              </div>
            </div>
          </Accordion.Trigger>
          <Accordion.Content className="pt-[26px]">
            <div className="grid grid-cols-2 gap-x-[40px]">
              <div className="pt-4">
                <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
                  Primary Language
                </label>
                <Select
                  defaultValue="EnglishUS"
                  onValueChange={(value) => console.log(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EnglishUS">English US</SelectItem>
                    <SelectItem value="EnglishUK">English UK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4">
                <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
                  Time Zone
                </label>
                <Select
                  defaultValue="usCanada"
                  onValueChange={(value) => console.log(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usCanada">
                      (UTC-08:00) Pacific Time (US & Canada)
                    </SelectItem>
                    <SelectItem value="usCanadk">
                      (UTC-08:00) Pacific Time (UK)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4">
                <ClearableInput name="custom1" label="Custom Field 1" />
              </div>
              <div className="pt-4">
                <ClearableInput name="custom2" label="Custom Field 2" />
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </ValidatedForm>
  );
};

const ModulesContent = () => {
  return (
    <div>
      <Accordion.Root
        className="AccordionRoot mb-[60px]"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        <Accordion.Item className="AccordionItem" value="item-1">
          <Accordion.Trigger className="w-full">
            <div className="flex items-center justify-between py-[10px] border-b border-[#E9E9EE]">
              <p className="text-sm font-normal tracking-[0.5px]">Default</p>
              <div className="flex items-center justify-between">
                <Button variant="ghost" className="px-0 w-6 h-6">
                  <LuChevronDown size="20px" strokeWidth="2" color="#8A8A8F" />
                </Button>
              </div>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <div className="pb-[10px] pt-6">
              <div className="flex items-center">
                <IndeterminateCheckbox
                  {...{
                    checked: true,
                    indeterminate: false,
                    onChange: () => console.log("sdf"),
                  }}
                />
                <span className="inline-block text-sm ml-2">ProjectX</span>
              </div>
              <p className="text-sm font-normal tracking-[0.5px] text-tertiary mt-2">
                {/* add class "text-secondary" for not disabled add "text-tertiary" for disabled view */}
                Customer service rep view
              </p>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
      <Accordion.Root
        className="AccordionRoot mb-[60px]"
        type="single"
        defaultValue="availableItem"
        collapsible
      >
        <Accordion.Item className="AccordionItem" value="availableItem">
          <Accordion.Trigger className="w-full">
            <div className="flex items-center justify-between py-[10px] border-b border-[#E9E9EE]">
              <p className="text-sm font-normal tracking-[0.5px]">Available</p>
              <div className="flex items-center justify-between">
                <Button variant="ghost" className="px-0 w-6 h-6">
                  <LuChevronDown size="20px" strokeWidth="2" color="#8A8A8F" />
                </Button>
              </div>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <div className="pb-[10px] pt-6">
              <div className="mb-10">
                <div className="flex items-center">
                  <IndeterminateCheckbox
                    {...{
                      checked: true,
                      indeterminate: false,
                      onChange: () => console.log("sdf"),
                    }}
                  />
                  <span className="inline-block text-sm ml-2">
                    Label and Forms
                  </span>
                </div>
                <p className="text-sm font-normal tracking-[0.5px] text-tertiary mt-2">
                  {/* add class "text-secondary" for not disabled add "text-tertiary" for disabled view */}
                  Standard and custom Label and Form designer. Works with
                  automations to print label and forms with typical events
                </p>
              </div>
              <div className="mb-10">
                <div className="flex items-center">
                  <IndeterminateCheckbox
                    {...{
                      checked: true,
                      indeterminate: false,
                      onChange: () => console.log("sdf"),
                    }}
                  />
                  <span className="inline-block text-sm ml-2">Automations</span>
                </div>
                <p className="text-sm font-normal tracking-[0.5px] text-tertiary mt-2">
                  {/* add class "text-secondary" for not disabled add "text-tertiary" for disabled view */}
                  Create Rules and Automations for anything your business needs.
                </p>
              </div>
              <div className="mb-10">
                <div className="flex items-center">
                  <IndeterminateCheckbox
                    {...{
                      checked: false,
                      indeterminate: false,
                      onChange: () => console.log("sdf"),
                    }}
                  />
                  <span className="inline-block text-sm ml-2">
                    CSA - Customer Service Automation
                  </span>
                </div>
                <p className="text-sm font-normal tracking-[0.5px] text-tertiary mt-2">
                  {/* add class "text-secondary" for not disabled add "text-tertiary" for disabled view */}
                  Track and manage your customer&apos;s claims and support
                  options.
                </p>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
};
