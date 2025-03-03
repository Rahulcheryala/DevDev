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
import {
  HiOutlineArrowLeft,
  HiOutlineChevronRight,
  HiPlus,
} from "react-icons/hi";
import { IoInformationCircleSharp } from "react-icons/io5";
import { ClearableInput, DatePicker } from "~/components/Form";

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
              Roles & Permissions
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-[22px] mb-[20px] min-h-[56px] flex justify-between">
        <h2 className="text-[32px] text-accent leading-[36px] font-semibold tracking-wider w-[calc(100%_-_160px)]">
          Roles & Permissions
        </h2>

        <NewRolesModal />
      </div>
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
          variant="ghost"
          className="rounded-[100px] font-normal border border-stroke w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-accent"
          leftIcon={<HiPlus size={20} />}
        >
          New role
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
