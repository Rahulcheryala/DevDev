import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@zeak/react";
import { WebTrigerLighting } from "@zeak/icons";
import "@xyflow/react/dist/style.css";
import { EventsTab } from "./EventsTab";
import { ScheduleTab } from "./ScheduleTab";
import { IntervalTab } from "./IntervalTab";
import { useState } from "react";

const TabMap = {
  EVENTS: "events",
  SCHEDULE: "schedule",
  INTERVAL: "interval",
};

export const ListItemTabs = ({ data, onBackClick, onNextClick }: any) => {
  const [currentTab, setCurrentTab] = useState("events");

  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };

  return (
    <>
      <div
        style={{
          boxShadow: "0px 9px 28px 8px #0000000D",
          borderRadius: "10px",
        }}
      >
        <div
          className="rounded-lg overflow-hidden shadow-react-flow-container"
          style={{
            boxShadow: "0px 9px 28px 8px #0000000D",
          }}
        >
          <div className="flex items-center justify-between bg-accent-lightGreen">
            <div className="p-3 bg-[#E1F4EF] flex items-center rounded-t-[10px] w-full">
              <WebTrigerLighting color="#04A777" />
              <span className="text-[#04A777] ml-3 text-xs">TRIGGER</span>
            </div>
          </div>
          <div className="p-4 shadow-react-flow-container relative">
            <ul className="-mb-[5px]">
              <li
                data-key={data.id}
                className={`flex items-center my-[5px] pb-4 rounded-[10px] hover:border-accent-p2`}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[#F2F1FD]">
                  <img src={data.imageUrl} alt="" width={28} height={28} />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-sm">{data.name}</h3>
                  <p className="text-sm text-tertiary">{data.description}</p>
                </div>
              </li>
            </ul>

            <Tabs
              defaultValue={currentTab}
              value={currentTab}
              onValueChange={handleTabChange}
            >
              <TabsList aria-label="List of tabs">
                <TabsTrigger value={TabMap.EVENTS} className="flex-[1]">
                  Events
                </TabsTrigger>
                <TabsTrigger value={TabMap.SCHEDULE} className="flex-[1]">
                  Schedule
                </TabsTrigger>
                <TabsTrigger value={TabMap.INTERVAL} className="flex-[1]">
                  Interval
                </TabsTrigger>
              </TabsList>

              <TabsContent value={TabMap.EVENTS} className="pt-[32px]">
                <EventsTab onBackClick={onBackClick} data={{}} />
              </TabsContent>
              <TabsContent value={TabMap.SCHEDULE} className="pt-[32px]">
                <ScheduleTab />
              </TabsContent>
              <TabsContent value={TabMap.INTERVAL} className="pt-[32px]">
                <IntervalTab />
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex justify-between items-center pt-[20px] pb-4 px-4">
            <Button
              variant="ghost"
              className="px-7 rounded-[100px]"
              size="lg"
              onClick={onBackClick}
            >
              Back
            </Button>
            <Button
              variant="primary"
              className="px-7 rounded-[100px]"
              size="lg"
              onClick={onNextClick}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
