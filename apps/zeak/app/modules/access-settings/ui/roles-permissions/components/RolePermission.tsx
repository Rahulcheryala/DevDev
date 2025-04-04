import { memo, useEffect, useRef, useState } from "react";
import { useNavigate } from "@remix-run/react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@zeak/react";
import {
  ByApplication,
  GeneralPermissions,
  MenuItems,
  Overview,
} from "~/modules/access-settings/ui/roles-permissions/New";
import { roleType } from "~/modules/access-settings";
import { path } from "~/utils/path";
import { useUrlParams } from "~/hooks";

type RolePermissionProps = {
  currentTab: string;
  tabs: string[];
  employeeType?: any;
};

const RolePermission = memo(
  ({ currentTab: tab, tabs, employeeType }: RolePermissionProps) => {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState(tab);
    const [, setParams] = useUrlParams();

    useEffect(() => {
      setCurrentTab(tab);
    }, [tab]);

    const handleTabChange = (tabName: string) => {
      setCurrentTab(tabName);
      setParams({ tab: tabName });
    };
    const onClose = () => navigate(path.to.rolesPermissions);

    const onNextClick = () => {
      if (currentTab === tabs[0]) {
        (childRef.current as any)?.click();
      } else {
        handleTabChange(tabs[tabs.indexOf(currentTab) + 1]);
      }
    };

    const onCancelClick = () => {
      handleTabChange(tabs[tabs.indexOf(currentTab) - 1]);
    };

    const initialValues: any = {
      name: employeeType?.name ?? "",
      description: employeeType?.description ?? "",
      type: employeeType?.type ?? roleType[1],
      companyId: employeeType?.companyId ?? "",
      effectiveDate: employeeType?.effectiveDate
        ? employeeType.effectiveDate.split("T")[0]
        : "",
    };

    if (employeeType?.id) {
      initialValues.id = employeeType.id;
    }

    const childRef = useRef();

    return (
      <Drawer
        open
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <DrawerContent size="xl">
          <DrawerHeader className="px-[60px] pt-[60px] pb-[28px] border-0 flex items-center justify-between flex-row">
            <DrawerTitle className="pr-[30px]">Role title</DrawerTitle>
            <div className="flex items-center gap-2">
              {/* <Button
                variant="ghost"
                className="rounded-[100px] font-normal border border-stroke w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-accent"
                leftIcon={<CiEdit size={20} />}
                onClick={() => {
                  navigate(path.to.rolesPermissionsNew);
                }}
              >
                Edit
              </Button> */}
              <DrawerCloseButton className="w-14 h-14 flex items-center justify-center relative cursor-pointer z-10" />
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
                <TabsTrigger value={tabs[0]}>Overview</TabsTrigger>
                {employeeType ? (
                  <>
                    <TabsTrigger value={tabs[1]}>
                      General Permissions
                    </TabsTrigger>
                    <TabsTrigger value={tabs[2]}>By Application</TabsTrigger>
                    <TabsTrigger value={tabs[3]}>Menu Items</TabsTrigger>
                  </>
                ) : null}
              </TabsList>
              <TabsContent value={tabs[0]} className="px-[60px] py-[32px]">
                <Overview initialValues={initialValues} ref={childRef} />
              </TabsContent>
              {employeeType ? (
                <>
                  <TabsContent value={tabs[1]} className="px-[60px] py-[40px]">
                    <GeneralPermissions />
                  </TabsContent>
                  <TabsContent value={tabs[2]} className="px-[60px] py-[40px]">
                    <ByApplication />
                  </TabsContent>
                  <TabsContent value={tabs[3]} className="px-[60px] py-[40px]">
                    <MenuItems />
                  </TabsContent>
                </>
              ) : null}
            </Tabs>
          </DrawerBody>
          <DrawerFooter className="px-[60px] pb-[60px] pt-[28px] border-0 sm:justify-start">
            <div className="flex items-center justify-between w-full">
              <Button
                variant="link"
                className="rounded-[100px] font-normal min-w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-accent-blue hover:no-underline underline-offset-0"
                onClick={onCancelClick}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                className="rounded-[100px] font-normal border border-stroke min-w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-white"
                onClick={onNextClick}
              >
                {currentTab === tabs[3] ? "Submit" : "Next"}
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
);

RolePermission.displayName = "RolePermission";
export default RolePermission;
