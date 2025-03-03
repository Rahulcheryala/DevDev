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
import { TeamUsers, TeamOverview } from "~/modules/access-settings/ui";
import { path } from "~/utils/path";
import { useUrlParams, useUser } from "~/hooks";

type TeamProps = {
  currentTab: string;
  tabs: string[];
  team?: any;
  count: number;
  teamMembers: any;
};

const Team = memo(
  ({ currentTab: tab, tabs, team, count, teamMembers }: TeamProps) => {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState(tab);
    const [, setParams] = useUrlParams();
    const { company } = useUser();

    useEffect(() => {
      setCurrentTab(tab);
    }, [tab]);

    const handleTabChange = (tabName: string) => {
      setCurrentTab(tabName);
      setParams({ tab: tabName });
    };
    const onClose = () => navigate(path.to.teams);

    const onNextClick = () => {
      if (currentTab === tabs[0]) {
        (childRef.current as any)?.click();
      } else {
        navigate(path.to.teams);
      }
    };

    const onCancelClick = () => {
      navigate(path.to.teams);
    };

    const onBackClick = () => {
      handleTabChange(tabs[tabs.indexOf(currentTab) - 1]);
    };

    const initialValues: any = {
      name: team?.name ?? "",
      description: team?.description ?? "",
      companyId: team?.companyId ?? company.id,
      status: team?.status ?? "Active",
    };

    if (team?.id) {
      initialValues.id = team.id;
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
          <DrawerHeader className="px-[60px] pt-[60px] pb-[18px] border-0">
            <DrawerTitle className="pr-[30px]">
              {team ? team.name : "New Team"}{" "}
            </DrawerTitle>
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
                <TabsTrigger value={tabs[0]}>General</TabsTrigger>
                <TabsTrigger value={tabs[1]} disabled={!(team && team.id)}>
                  Users
                </TabsTrigger>
              </TabsList>
              <TabsContent value={tabs[0]} className="px-[60px] pb-[40px]">
                <TeamOverview initialValues={initialValues} ref={childRef} />
              </TabsContent>
              {team ? (
                <TabsContent value={tabs[1]} className="px-[60px] py-[40px]">
                  <TeamUsers count={count} teamMembers={teamMembers} />
                </TabsContent>
              ) : null}
            </Tabs>
          </DrawerBody>
          <DrawerFooter className="px-[60px] pb-[60px] pt-[28px] border-0 sm:justify-start">
            <div className="flex items-center justify-between w-full">
              {currentTab === tabs[0] ? (
                <Button
                  variant="ghost"
                  className="rounded-[100px] font-normal min-w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-secondary hover:no-underline underline-offset-0 pl-0 min-w-0"
                  onClick={onCancelClick}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="rounded-[100px] font-normal min-w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-secondary hover:no-underline underline-offset-0 pl-0 min-w-0"
                  onClick={onBackClick}
                >
                  Back
                </Button>
              )}
              <Button
                type="button"
                variant="primary"
                className="rounded-[100px] font-normal border border-stroke min-w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-white"
                onClick={onNextClick}
              >
                {currentTab === tabs[0] ? "Next" : "Save"}
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
);

Team.displayName = "Team";
export default Team;
