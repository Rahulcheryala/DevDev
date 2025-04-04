import { Tabs, TabsContent, Charts } from "@zeak/ui";
import { UnifiedProvider } from "../../context";
import { integrationListingTabs } from "../../models/constants";
import IntegrationList from "./IntegrationList";
import ConnectionList from "../ViewFlow/integration/ConnectionList";

export default function IntegrationPageTabs() {
  return (
    <UnifiedProvider key="integration-list-provider">
      <Tabs
        variant="underline"
        items={integrationListingTabs}
        defaultTab={integrationListingTabs[1].value}
        backgroundColor="#FFFFFF"
      >
        {/* Dashboard */}
        <TabsContent value={integrationListingTabs[0].value}>
          <Charts />
          <div className="bg-white flex flex-col items-center justify-center h-full rounded-zeak">
            <div className="text-2xl font-bold py-10">No Dashboard</div>
          </div>
        </TabsContent>
        {/* Integrations */}
        <TabsContent value={integrationListingTabs[1].value}>
          <Charts />
          <IntegrationList />
        </TabsContent>
        {/* Connections */}
        <TabsContent value={integrationListingTabs[2].value}>
          <Charts />
          <ConnectionList component="listing" />
        </TabsContent>
        {/* Favorites */}
        <TabsContent value={integrationListingTabs[3].value}>
          <Charts />
          <IntegrationList type="favorites" />
        </TabsContent>
      </Tabs>
    </UnifiedProvider>
  );
}
