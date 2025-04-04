import {
  Alert,
  AlertDescription,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "@zeak/react";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { HiOutlineArrowLeft, HiPlus } from "react-icons/hi";
import { IoInformationCircleSharp } from "react-icons/io5";
import { LuZap } from "react-icons/lu";
import { ClearableInput, DatePicker } from "~/components/Form";

export default function Automations() {
  const defaultTab = "rules";
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };

  const [isSecretOpen, setIsSecretOpen] = useState(false);
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
            <span className="text-accent text-sm leading-[20px] tracking-wider">
              Workflows
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

      <Tabs
        defaultValue={currentTab}
        onValueChange={handleTabChange}
        value={currentTab}
        className="w-full"
      >
        <TabsList aria-label="List of tabs">
          <TabsTrigger value={"rules"}>Rules</TabsTrigger>
          <TabsTrigger value={"automations"}>Automations</TabsTrigger>
          <TabsTrigger value={"logs"}>Logs</TabsTrigger>
          <TabsTrigger value={"integrations"}>Integrations</TabsTrigger>
        </TabsList>
        <TabsContent value={"rules"} className="py-[40px]">
          {/* react flow nodes triggers */}
          <div className="max-w-[600px] my-4">
            <div className="rounded-lg overflow-hidden shadow-6large">
              <div className="flex items-center justify-between p-3 bg-accent-lightGreen">
                <div className="flex items-center">
                  <div className="bg-green-500 w-6 h-6  rounded-sm flex justify-center items-center">
                    <LuZap color="#ffffff" />
                  </div>
                  <span className="text-accent-green text-xs font-normal uppercase ml-3">
                    Trigger
                  </span>
                </div>
                {/* <Button
                  variant="ghost"
                  className="w-6 h-6 hover:bg-accent-lightGreen p-0 rounded-full"
                >
                  <WebEye />
                </Button> */}
              </div>
              <ul className="px-4 py-3">
                <li className="flex items-center justify-between">
                  <p className="text-sm font-normal text-accent">
                    Choose the trigger
                  </p>{" "}
                  <Button variant="ghost" className="w-6 h-6 p-0">
                    <FaArrowRightLong size={16} />
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-[600px] my-4">
            <div className="rounded-lg overflow-hidden shadow-6large">
              <div className="flex items-center justify-between p-3 bg-accent-lightGreen">
                <div className="flex items-center">
                  <div className="bg-green-500 w-6 h-6  rounded-sm flex justify-center items-center">
                    <LuZap color="#ffffff" />
                  </div>
                  <span className="text-accent-green text-xs font-normal uppercase ml-3">
                    Trigger
                  </span>
                </div>
                {/* <Button
              variant="ghost"
              className="w-6 h-6 hover:bg-accent-lightGreen p-0 rounded-full"
            >
              <WebEye />
            </Button> */}
              </div>
              <div className="p-4">
                <div className="relative mb-2">
                  <Input
                    placeholder="Search integrations"
                    size={"sm"}
                    className=" pr-6"
                  />
                  <Button
                    variant="ghost"
                    className="w-6 h-6  p-0 rounded-full right-4 absolute top-[50%] translate-y-[-50%]" //hover:bg-accent-lightGreen
                  >
                    <CiSearch size={24} />
                  </Button>
                </div>
                <ul className="-mb-[5px]">
                  <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[#F2F1FD] hover:border-accent-p2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[#F2F1FD]">
                      <img
                        src="/images/microsoft.png"
                        alt=""
                        width={28}
                        height={28}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm">Dynamics 365 F&O</h3>
                      <p className="text-sm text-tertiary">
                        Lorem ipsum dolor sit amet set consectetur.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[#DEFDFF] hover:border-accent-p2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[#DEFDFF]">
                      <img
                        src="/images/microsoft.png"
                        alt=""
                        width={28}
                        height={28}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm">Business Central</h3>
                      <p className="text-sm text-tertiary">
                        Lorem ipsum dolor sit amet set consectetur.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[#00A1E01A] hover:border-accent-p2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[#00A1E01A]">
                      <img
                        src="/images/microsoft.png"
                        alt=""
                        width={28}
                        height={28}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm">Salesforce</h3>
                      <p className="text-sm text-tertiary">
                        Lorem ipsum dolor sit amet set consectetur.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[rgba(58,_197,_242,_0.1)] hover:border-accent-p2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[rgba(58,_197,_242,_0.1)]">
                      <img
                        src="/images/microsoft.png"
                        alt=""
                        width={28}
                        height={28}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm">Azure</h3>
                      <p className="text-sm text-tertiary">
                        Lorem ipsum dolor sit amet set consectetur.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[rgba(81,_169,_227,_0.1)] hover:border-accent-p2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[rgba(81,_169,_227,_0.1)]">
                      <img
                        src="/images/microsoft.png"
                        alt=""
                        width={28}
                        height={28}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm">Sendgrid</h3>
                      <p className="text-sm text-tertiary">
                        Lorem ipsum dolor sit amet set consectetur.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[rgba(248,_0,_0,_0.1)] hover:border-accent-p2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[rgba(248,_0,_0,_0.1)]">
                      <img
                        src="/images/microsoft.png"
                        alt=""
                        width={28}
                        height={28}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm">MailGun</h3>
                      <p className="text-sm text-tertiary">
                        Lorem ipsum dolor sit amet set consectetur.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[rgba(255,_224,_27,_0.1)] hover:border-accent-p2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[rgba(255,_224,_27,_0.1)]">
                      <img
                        src="/images/microsoft.png"
                        alt=""
                        width={28}
                        height={28}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm">Mailchimp</h3>
                      <p className="text-sm text-tertiary">
                        Lorem ipsum dolor sit amet set consectetur.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[rgba(0,_0,_0,_0.06] hover:border-accent-p2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[rgba(0,_0,_0,_0.06)]">
                      <img
                        src="/images/microsoft.png"
                        alt=""
                        width={28}
                        height={28}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm">Notion</h3>
                      <p className="text-sm text-tertiary">
                        Lorem ipsum dolor sit amet set consectetur.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="flex justify-between items-center pt-[20px] pb-4 px-4">
                <Button
                  variant="ghost"
                  className="px-7 rounded-[100px]"
                  size="lg"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  className="px-7 rounded-[100px]"
                  size="lg"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
          <div className="max-w-[600px] my-4">
            <div className="rounded-lg overflow-hidden shadow-6large">
              <div className="flex items-center justify-between p-3 bg-accent-lightGreen">
                <div className="flex items-center">
                  <div className="bg-green-500 w-6 h-6  rounded-sm flex justify-center items-center">
                    <LuZap color="#ffffff" />
                  </div>
                  <span className="text-accent-green text-xs font-normal uppercase ml-3">
                    Trigger
                  </span>
                </div>
                {/* <Button
              variant="ghost"
              className="w-6 h-6 hover:bg-accent-lightGreen p-0 rounded-full"
            >
              <WebEye />
            </Button> */}
              </div>
              <div className="p-4">
                <div className="flex items-center rounded-[10px]">
                  <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[#F2F1FD]">
                    <img
                      src="/images/microsoft.png"
                      alt=""
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm">Dynamics 365 F&O</h3>
                    <p className="text-sm text-tertiary">
                      Lorem ipsum dolor sit amet set consectetur.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <ValidatedForm validator={[]} defaultValues={{}}>
                  <div className="mt-[20px]">
                    <Label htmlFor="" className="font-normal mb-3">
                      {" "}
                      Client ID
                    </Label>
                    <Input type="text" size="sm" />
                  </div>
                  <div className="mt-[20px] relative">
                    <Label htmlFor="" className="font-normal mb-3">
                      {" "}
                      Client Secret
                    </Label>
                    <Input
                      type={isSecretOpen ? "text" : "password"}
                      size="sm"
                    />
                    <Button
                      variant="ghost"
                      onClick={() => setIsSecretOpen(!isSecretOpen)}
                      className="w-6 h-6 right-3 p-0 rounded-full absolute bottom-2"
                    >
                      {isSecretOpen ? (
                        <BsEye size={20} />
                      ) : (
                        <BsEyeSlash size={20} />
                      )}
                    </Button>
                  </div>
                  <div className="mt-[20px]">
                    <Label htmlFor="" className="font-normal mb-3">
                      {" "}
                      Resource URL
                    </Label>
                    <Input
                      type="text"
                      size="sm"
                      defaultValue="http://loremipsum.dynamics.com"
                    />
                  </div>
                </ValidatedForm>
              </div>
              <hr />
              <div className="flex justify-between items-center pt-[20px] pb-4 px-4">
                <Button
                  variant="ghost"
                  className="px-7 rounded-[100px]"
                  size="lg"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  className="px-7 rounded-[100px]"
                  size="lg"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
          {/* react flow nodes triggers */}
        </TabsContent>
        <TabsContent value={"automations"} className="py-[40px]">
          automations
        </TabsContent>
        <TabsContent value={"logs"} className="py-[40px]">
          logs
        </TabsContent>
        <TabsContent value={"integrations"} className="py-[40px]">
          integrations
        </TabsContent>
      </Tabs>
    </div>
  );
}

const NewRolesModal = () => {
  const defaultTab = "overview";
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-[100px] font-normal border border-stroke w-[190px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-accent"
          leftIcon={<HiPlus size={20} />}
        >
          New Rules
        </Button>
      </DrawerTrigger>
      <DrawerContent size="xl">
        <DrawerHeader className="px-[60px] pt-[60px] pb-[18px] border-0">
          <DrawerTitle className="pr-[30px]">Role title</DrawerTitle>
          <DrawerCloseButton className="top-[65px] right-[60px] cursor-pointer z-10" />
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
              <TabsTrigger value={"generalPermissions"}>
                General Permissions
              </TabsTrigger>
              <TabsTrigger value={"byApplication"}>By Application</TabsTrigger>
              <TabsTrigger value={"menuItems"}>Menu Items</TabsTrigger>
            </TabsList>
            <TabsContent value={"overview"} className="px-[60px] py-[40px]">
              <Alert className="[&>svg]:top-[18px]" variant="warning">
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
              </ValidatedForm>
            </TabsContent>
            <TabsContent
              value={"generalPermissions"}
              className="px-[60px] py-[40px]"
            >
              <img src="/images/Table.png" alt="" className="mt-[32px]" />
            </TabsContent>
            <TabsContent
              value={"byApplication"}
              className="px-[60px] py-[40px]"
            >
              <Alert className="[&>svg]:top-[18px]" variant="warning">
                <IoInformationCircleSharp size={20} />
                <AlertDescription>
                  Only Tenant Admins can create a Custom Role. Custom Roles are
                  available for any company under the primary account.
                </AlertDescription>
              </Alert>
              <img src="/images/Table.png" alt="" className="mt-[32px]" />
            </TabsContent>
            <TabsContent value={"menuItems"} className="px-[60px] py-[40px]">
              <Alert className="[&>svg]:top-[18px]" variant="warning">
                <IoInformationCircleSharp size={20} />
                <AlertDescription>
                  Only Tenant Admins can create a Custom Role. Custom Roles are
                  available for any company under the primary account.
                </AlertDescription>
              </Alert>
              <img src="/images/Table.png" alt="" className="mt-[32px]" />
            </TabsContent>
          </Tabs>
        </DrawerBody>
        <DrawerFooter className="px-[60px] pb-[60px] pt-[28px] border-0 sm:justify-start">
          <div className="flex items-center justify-between w-full">
            <Button
              variant="link"
              className="rounded-[100px] font-normal min-w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-accent-blue hover:no-underline underline-offset-0"
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
