import { DataTable } from "@zeak/datatable"
import { columns } from "./columns"
import { AddNewRowFrom } from "./AddNewRowFrom";

interface MappingTableProps {
    data: any;
    toolBarVariant?: "main" | "side";
    isCreateNewMappingActive: boolean;
    setIsCreateNewMappingActive: (value: boolean) => void;
    isLoading?: boolean;
    isFetching?: boolean;
    id: string;
    userId?: string;
}

export default function MappingTable({
    data,
    toolBarVariant = "main",
    isCreateNewMappingActive,
    setIsCreateNewMappingActive,
    isLoading = false,
    isFetching = false,
    id,
    userId
}: MappingTableProps) {
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isFetching) {
        return <div>Fetching...</div>;
    }
    return (
        <div className="">
            <DataTable
                key={id}
                toolBarVariant={toolBarVariant}
                columns={columns}
                data={data}
                addNewRowForm={<AddNewRowFrom masterListId={id} userId={userId} />}
                addNewText="New Mapping"
                onClickNewBtn={() => setIsCreateNewMappingActive(true)}
                showAddNewRowForm={isCreateNewMappingActive}
            />
        </div>)
}
