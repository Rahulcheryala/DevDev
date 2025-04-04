import ListCard from "./ListCard";
import { useAllMasterlist, useMasterlistStore, useSearchMasterlist } from "~/modules/masterlist";
import { ScrollArea } from "@zeak/react";
import LoadingCard from "./LoadingCard";

interface ListViewProps {
    systemDefinedMasterLists: any;
}

export default function AllMasterlist({ systemDefinedMasterLists }: ListViewProps) {
    const { masterListView } = useMasterlistStore()
    const { data: res, isPending, isError } = useAllMasterlist()

    if (isPending) {
        return <div>
            <LoadingCard />
        </div>;
    }
    if (isError) {
        return <div>Error fetching master lists</div>;
    }
    if (!res || res?.data?.length === 0) {
        return <div>No master lists available</div>;
    }

    return (
        <ScrollArea className="h-[calc(100vh-420px)]">

            <div className="space-y-[2px]">

                {masterListView === "All" ? res?.data?.map((masterList: any) => (
                    <ListCard
                        name={masterList.name}
                        id={masterList.id}
                        key={masterList.id}
                        type={masterList.type}
                        createdBy={masterList.createdBy}
                        isActive={masterList.isActive}
                        lastUpdatedBy={masterList.lastUpdatedBy}
                        updatedAt={masterList.updatedAt}
                    />
                )) : masterListView === "System" ? systemDefinedMasterLists.map((masterList: any) => (
                    <ListCard
                        name={masterList.name}
                        id={masterList.id}
                        key={masterList.id}
                        type="system"
                        createdBy="Zeak"
                        isActive={masterList.isActive}
                        lastUpdatedBy="Zeak"
                        updatedAt={new Date()}
                    />
                ))

                    : masterListView === "User Defined" ? res?.data?.map((masterList: any) => (
                        <ListCard
                            name={masterList.name}
                            id={masterList.id}
                            key={masterList.id}
                            type={masterList.type}
                            createdBy={masterList.createdBy}
                            isActive={masterList.isActive}
                            lastUpdatedBy={masterList.lastUpdatedBy}
                            updatedAt={masterList.updatedAt}
                        />
                    )) : null}

            </div>
        </ScrollArea>
    );
}
