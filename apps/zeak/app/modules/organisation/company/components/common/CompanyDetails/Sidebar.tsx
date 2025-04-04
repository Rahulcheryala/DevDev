import { useMemo, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { Plus } from "lucide-react";
import { ListingPanelContainer, type SortOrder, ListingPanelCard, cn, toast } from '@zeak/ui';
import { useCompanyEditStore } from "~/shared/companyEditStore";
import { path } from "~/utils/path";

export default function Sidebar() {
    const { companies, setCompanies, currentCompanyId, setCurrentCompanyId, activeSection, setActiveSection, isEditing } = useCompanyEditStore();

    const [searchValue, setSearchValue] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState<SortOrder | undefined>(undefined);
    const navigate = useNavigate();

    // toast.success(
    //     "Success",
    //     "Your document has been saved.",
    //     {
    //         actions: [
    //             {
    //                 label: "View",
    //                 onClick: () => console.log("View clicked")
    //             },
    //             {
    //                 label: "Dismiss",
    //                 onClick: () => console.log("Dismissed")
    //             }
    //         ]
    //     }
    // )

    const renderCompanyListItems = useMemo(() => {
        return companies.map((company) => {

            const TopContentRenderer = (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "w-[40px] h-[40px] rounded-full flex items-center justify-center text-[14px] font-sans font-[450] leading-[20px] tracking-[0.5] bg-[#66D4CF] text-[#0D0844]"
                        )}>
                            {company.logo}
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className={cn(
                                "text-[14px] font-sans font-[500] leading-[20px] tracking-[0.2] text-[#475467] group-hover:group-enabled:text-white",
                                company.selected && "text-white",
                                company.id === currentCompanyId && "text-white"
                            )}>
                                {company.generalInfo.companyName}
                            </span>
                            <span className={cn(
                                "text-[12px] font-sans font-[450] leading-[16px] tracking-[0.2] text-[12px] font-[450] leading-normal tracking-[0.2] text-[#677281] uppercase] uppercase group-hover:group-enabled:text-white/80",
                                company.selected && "text-white/80",
                                company.id === currentCompanyId && "text-white/80"
                            )}>
                                {company.generalInfo.status}
                            </span>
                        </div>
                    </div>
                    <span className={cn(
                        "text-[14px] font-sans mb-auto font-[450] leading-normal tracking-[0.2] text-[#677281] uppercase group-hover:group-enabled:text-white",
                        company.selected && "text-white",
                        company.id === currentCompanyId && "text-white"
                    )}>
                        {company.generalInfo.companyCode}
                    </span>
                </div>
            )
            return (
                <ListingPanelCard
                    key={company.id}
                    id={company.id}
                    isActive={company.selected || company.id === currentCompanyId}
                    lastUpdatedBy={company.additionalMeta.updatedBy}
                    updatedAt={company.additionalMeta.updatedAt}
                    link={path.to.companyEdit(company.id)}
                    topContent={TopContentRenderer}
                    onClick={(id: string) => {
                        setCurrentCompanyId(id);
                    }}
                />
            )
        })
    }, [companies, currentCompanyId, setCurrentCompanyId]);

    return (
        <ListingPanelContainer
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            searchPlaceholder="Search"
            filterOptions={["All", "Active", "Inactive", "Archived"]}
            defaultFilterSelected={selectedFilter}
            onFilterChange={setSelectedFilter}
            totalRecords={companies.length}
            sortList={sortOrder}
            setSortList={setSortOrder}
            bottomButtonText="New Company"
            bottomButtonIcon={<Plus className="h-5 w-5 font-medium text-white" />}
            onBottomBtnClick={() => {
                navigate("/x/access-settings/companies/new")
            }}
        >
            <div className="bg-white p-4 rounded-b-lg h-[400px] overflow-y-auto">
                {renderCompanyListItems}
            </div>
        </ListingPanelContainer>
    );
}