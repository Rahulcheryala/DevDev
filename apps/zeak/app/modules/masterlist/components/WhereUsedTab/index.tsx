import { useState } from "react";
import { useMasterlistDetails } from "~/modules/masterlist";
import { useParams } from "@remix-run/react";
import MappingTable from "../MappingTable";
import { useMasterlistStore } from "~/modules/masterlist";
export default function WhereUsedTab({ userId }: { userId: string }) {
    const { id } = useParams();
    const { isCreateNewMappingActive, setIsCreateNewMappingActive } = useMasterlistStore();
    if (!id) {
        return <div>No id</div>;
    }
    const { data, isLoading, isError, isFetching } = useMasterlistDetails(id);

    return (<div>
        <MappingTable
            id={id}
            userId={userId}
            isLoading={isLoading}
            isFetching={isFetching}
            data={data.masterListMappings}
            isCreateNewMappingActive={isCreateNewMappingActive}
            setIsCreateNewMappingActive={setIsCreateNewMappingActive} />

    </div>);
}