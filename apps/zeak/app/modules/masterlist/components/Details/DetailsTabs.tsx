import { masterListTabs } from "../../constants";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@zeak/react";
import DetailsView from "../DetailsView";
import { ListValuesTable } from "../index";
import WhereUsedTab from "../WhereUsedTab";
import { useParams } from "@remix-run/react";
import {Text} from "lucide-react"

interface MasterListTabsProps {
    userId: string
}

export default function MasterListTabs({ userId }: MasterListTabsProps) {
    const { id } = useParams()
    if (!id) {
        return <div>No id</div>
    }
    return (
        <Tabs defaultValue={masterListTabs[0].value} className="w-full h-full ">
            <TabsList aria-label="List of tabs" className="px-6 bg-white rounded-b-[12px] justify-between">
                <div className="flex gap-10">

                {masterListTabs.map((tab, index) => (
                    <TabsTrigger className="flex flex-col  relative px-2 items-center data-[state=active]:border-0  group " key={tab.id} value={tab.value}>
                        <div className="px-[14px] h-[60px] group-hover:font-semibold group-hover:text-[#0D0C22] flex items-center pt-[10px] pb-1 leading-[20px] ">
                            {tab.title}
                        </div>
                        <div className="w-full h-[6px] absolute bottom-0 right-0 left-0 bg-[#ACBBD6] rounded-t-[3px] hidden group-hover:block group-data-[state=active]:block"></div>
                    </TabsTrigger>
                ))}
                </div>
                <div className="flex items-center gap-1">
                    <div className="bg-[#9BA2AC] p-1 rounded-[4px]">

                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 5H1M3 9H1M9 1H1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </div>
                    <span className="text-[#475467]">

                    Notes
                    </span>
                </div>
            </TabsList>
            
            <TabsContent className=" " value={masterListTabs[0].value}>
                <div className="space-y-4">
                    <DetailsView userId={userId} />
                    <ListValuesTable userId={userId} />
                </div>
            </TabsContent>
            <TabsContent className=" " value={masterListTabs[1].value}>
                <WhereUsedTab userId={userId} />
            </TabsContent>
        </Tabs>
    );
}
