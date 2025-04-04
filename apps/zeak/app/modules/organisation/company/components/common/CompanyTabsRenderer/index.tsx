import { Tabs, TabsContent } from "@zeak/ui";
import CompanyList from "../../CompanyList";

import { CompanyCharts } from "../";
import { tabsLinks } from "../../constants";

interface CompanyTabsRendererProps {
    companiesData: any;
    companiesCount: number;
}

export default function CompanyTabsRenderer({ companiesData, companiesCount }: CompanyTabsRendererProps) {
    const defaultTab = tabsLinks[1].value;

    return <Tabs variant="underline"
        items={tabsLinks}
        defaultTab={defaultTab}
        backgroundColor="#FFFFFF"
    >
        <TabsContent value="allCompanies">
            <CompanyCharts />
            <CompanyList data={companiesData} count={companiesCount} />
        </TabsContent>
    </Tabs>
}