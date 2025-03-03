import { tabsLinks } from "../constants";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@zeak/react";
import AllNotifcations from "./AllNotifcations";

export default function NotificationPageTabs() {
  return (
    <Tabs defaultValue={tabsLinks[0].value} className="w-full h-full ">
      <TabsList aria-label="List of tabs" className="px-6 bg-white rounded-b-[12px] ">
        {tabsLinks.map((tab, index) => (
          <TabsTrigger className="flex flex-col  relative px-2 items-center data-[state=active]:border-0  group " key={tab.id} value={tab.value}>
            <div className="px-[14px] h-[60px] group-hover:font-semibold group-hover:text-[#0D0C22] flex items-center pt-[10px] pb-1 leading-[20px] ">
              {tab.title}
            </div>
            <div className="w-full h-[6px] absolute bottom-0 right-0 left-0 bg-[#ACBBD6] rounded-t-[3px] hidden group-hover:block group-data-[state=active]:block"></div>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent className=" " value={tabsLinks[0].value}>
        <AllNotifcations />
      </TabsContent>
    </Tabs>
  );
}
