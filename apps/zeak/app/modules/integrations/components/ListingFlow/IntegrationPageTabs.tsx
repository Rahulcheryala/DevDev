import { IntegrationTab, integrationTabs } from "../../models/constants";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@zeak/react";
import { IntegrationProvider } from "../../context";
import IntegrationList from "./IntegrationList";
import ConnectionDataTable from "../ViewFlow/integration/ConnectionDataTable";
import IntegrationCharts from "./IntegrationCharts";
import { ConnectionProvider } from "../../context/connection";

export default function IntegrationPageTabs() {
  return (
    <Tabs defaultValue={IntegrationTab.INTEGRATIONS} className="w-full flex-1">
      <TabsList
        aria-label="List of tabs"
        className="px-[60px] bg-white rounded-b-[12px]"
      >
        {integrationTabs.map((tab) => (
          <TabsTrigger
            className="flex flex-col items-center data-[state=active]:border-0  group data-[state=active]:py-0"
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
        className="h-full bg-white mt-2"
      >
        <div className="bg-white flex flex-col items-center justify-center h-full">
          <div className="text-2xl font-bold py-10">No Dashboard</div>
        </div>
      </TabsContent>

      {/* Integrations */}
      <TabsContent value={IntegrationTab.INTEGRATIONS} className="h-full mt-2">
        <IntegrationCharts />
        <IntegrationProvider>
          <ConnectionProvider>
            <IntegrationList />
          </ConnectionProvider>
        </IntegrationProvider>
      </TabsContent>

      {/* Connections */}
      <TabsContent
        value={IntegrationTab.CONNECTIONS}
        className="h-full bg-white mt-2"
      >
        <IntegrationCharts />
        <IntegrationProvider>
          <ConnectionProvider>
            <ConnectionDataTable component="listing" />
          </ConnectionProvider>
        </IntegrationProvider>
      </TabsContent>

      {/* Favorites */}
      <TabsContent
        value={IntegrationTab.FAVORITES}
        className="h-full bg-white mt-2"
      >
        <IntegrationCharts />
        <IntegrationProvider>
          <IntegrationList type="favorites" />
        </IntegrationProvider>
      </TabsContent>
    </Tabs>
  );
}
