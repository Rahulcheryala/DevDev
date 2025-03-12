import { Tabs, TabsList, TabsTrigger, TabsContent } from "@zeak/react";
import { IntegrationTab, integrationTabs } from "../../models/constants";
import IntegrationCharts from "./IntegrationCharts";
import IntegrationList from "./IntegrationList";
import ConnectionList from "../ViewFlow/integration/ConnectionList";
import { UnifiedProvider } from "../../context";
export default function IntegrationPageTabs() {
  return (
    <UnifiedProvider key="integration-list-provider">
      <Tabs
        defaultValue={IntegrationTab.INTEGRATIONS}
        className="w-full flex-1"
      >
        <TabsList
          aria-label="List of tabs"
          className="px-[60px] bg-white rounded-b-[12px]"
        >
          {integrationTabs.map((tab) => (
            <TabsTrigger
              className="flex flex-col items-center data-[state=active]:border-0 group data-[state=active]:py-0"
              key={tab.id}
              value={tab.value}
            >
              <div className="px-4 pt-4 pb-2 leading-[20px] ">{tab.title}</div>
              <div className="w-full h-[6px] bg-[#ACBBD6] rounded-t-[3px] hidden group-data-[state=active]:block"></div>
            </TabsTrigger>
          ))}
        </TabsList>
        {/* Dashboard */}
        <TabsContent
          value={IntegrationTab.DASHBOARD}
          className="h-full flex flex-col"
        >
          <IntegrationCharts />
          <div className="bg-white flex flex-col items-center justify-center h-full rounded-zeak">
            <div className="text-2xl font-bold py-10">No Dashboard</div>
          </div>
        </TabsContent>

        <TabsContent
          value={IntegrationTab.INTEGRATIONS}
          className="h-full mt-2"
        >
          <IntegrationCharts />
          <IntegrationList />
        </TabsContent>

        <TabsContent
          value={IntegrationTab.CONNECTIONS}
          className="h-full mt-2"
        >
          <IntegrationCharts />
          <ConnectionList component="listing" />
        </TabsContent>

        <TabsContent
          value={IntegrationTab.FAVORITES}
          className="h-full mt-2"
        >
          <IntegrationCharts />
          <IntegrationList type="favorites" />
        </TabsContent>
      </Tabs>
    </UnifiedProvider>
  );
}
