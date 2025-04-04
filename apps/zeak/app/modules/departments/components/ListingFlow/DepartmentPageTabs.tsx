import { DepartmentTab, departmentTabs } from "../../models/constants";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@zeak/react";
import { DepartmentProvider } from "../../context";
import DepartmentList from "./DepartmentList";

export default function DepartmentPageTabs() {
  return (
    <Tabs defaultValue={DepartmentTab.LIST} className="w-full flex-1">
      <TabsList aria-label="List of tabs" className="px-[60px] bg-white rounded-b-[12px]">
        {departmentTabs.map((tab) => (
          <TabsTrigger className="flex flex-col items-center data-[state=active]:border-0  group data-[state=active]:py-0" key={tab.id} value={tab.value}>
            <div className="px-8 pt-[20px] pb-1 leading-[20px] ">
              {tab.title}
            </div>
            <div className="w-full h-[6px] bg-[#ACBBD6] rounded-t-[3px] hidden group-data-[state=active]:block"></div>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={DepartmentTab.LIST} className="h-full mt-2">
        <DepartmentProvider>
          <DepartmentList />
        </DepartmentProvider>
      </TabsContent>
      <TabsContent value={DepartmentTab.DASHBOARD} className="h-full bg-white mt-2">
        <div className="flex bg-white  flex-col items-center justify-center h-full">
          <div className="text-2xl font-bold">No Dashboard</div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
