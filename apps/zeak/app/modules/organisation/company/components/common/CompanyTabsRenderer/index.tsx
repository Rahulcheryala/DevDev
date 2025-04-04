import { TabsComponent, TabsContent } from "@zeak/react";
import CompanyList from "../../CompanyList";

import { CompanyCharts } from "../";
import { tabsLinks } from "../../constants";

interface CompanyTabsRendererProps {
    companiesData: any;
    companiesCount: number;
}

export default function CompanyTabsRenderer({ companiesData, companiesCount }: CompanyTabsRendererProps) {
    const defaultTab = tabsLinks[1].value;

    return <TabsComponent variant="underline"
        items={tabsLinks}
        defaultTab={defaultTab}
        backgroundColor="#FFFFFF"
    >
        <TabsContent value="allCompanies">
            <CompanyCharts />
            <CompanyList data={companiesData} count={companiesCount} />
        </TabsContent>
    </TabsComponent>
}