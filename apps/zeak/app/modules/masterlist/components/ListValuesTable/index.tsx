
import { useMasterlistStore, useMasterlistValues } from "~/modules/masterlist"
import { useParams } from "@remix-run/react"
import { DataTable } from '@zeak/datatable'
import { columns } from './columns'
import { TableEmptyState } from "~/components/Common"
import AddNewRowForm from "./AddNewRowForm"


interface ListValuesTableProps {
    userId: string
}

export default function ListValuesTable({ userId }: ListValuesTableProps) {
    const { id } = useParams()
    const { setIsCreateNewValueActive, isCreateNewValueActive } = useMasterlistStore()

    if (!id) {
        return <div>No id</div>
    }

    const { data, isPending, isError, isFetching } = useMasterlistValues(id)

    if (isPending || isFetching) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error...</div>
    }

    // Using key prop to force re-render when id changes
    return (
        <div>

            <DataTable
                showAddNewRowForm={isCreateNewValueActive}
                addNewRowForm={<AddNewRowForm userId={userId} masterlistId={id} onCancel={() => setIsCreateNewValueActive(false)} />}
                onClickNewBtn={() => setIsCreateNewValueActive(true)}
                topTitle="Values"
                key={id} // Add key prop with id
                columns={columns}
                addNewText="New Value"
                data={data.values}
            />
            {data.values.length === 0 && !isCreateNewValueActive && <TableEmptyState onClick={() => setIsCreateNewValueActive(true)} title="Create new value" link="Create Value" />}
        </div>
    )
}
