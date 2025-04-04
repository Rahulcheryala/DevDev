
import { columns } from "./columns"

import { useState } from "react"
import { useMasterlistStore } from "~/modules/masterlist"
import { useMasterlistValues, } from "~/modules/masterlist"
import AddNewRowForm from "./AddValueRow"
import { TableEmptyState } from "~/components/Common"
import { ui } from "@zeak/react"
import { DataTable } from "@zeak/datatable"


export default function EditValueTable({ userId }: { userId: string }) {
    const { createdMasterlistId, setIsCreateMasterlistOpen, setActiveStep, setCreatedMasterlistId } = useMasterlistStore()


    const { data, isPending, isError, isFetching } = useMasterlistValues(createdMasterlistId)
    const [showAddRowForm, setShowAddRowForm] = useState(false)

    const handleAddNewRow = () => {
        setShowAddRowForm(true)
    }

    if (isPending || isFetching) return <div>Loading...</div>
    if (isError) return <div>Error loading values</div>

    return (
        <div className="w-full relative  pb-20 bg-[#F0F4FD]">
            <DataTable
                key={createdMasterlistId}
                data={data.values}
                columns={columns}
                toolBarVariant="side"
                addNewText="New Mapping"
                showAddNewRowForm={showAddRowForm}
                onClickNewBtn={handleAddNewRow}
                addNewRowForm={<AddNewRowForm masterlistId={createdMasterlistId} userId={userId} onCancel={() => setShowAddRowForm(false)} />}
            />
            {data.values.length === 0 && !showAddRowForm && <TableEmptyState onClick={handleAddNewRow} title="Create a new value" />}
            {/* buttons */}
            <div className="fixed bottom-20 left-0 right-0 bg-white border-t p-4 flex justify-end gap-2">
                <ui.Button className="bg-[#0D0844] hover:bg-[#0D0844]/90 text-white hover:text-white" variant="outline" onClick={() => { setIsCreateMasterlistOpen(false); setActiveStep(1); setCreatedMasterlistId("") }}>Save and Finish</ui.Button>

            </div>
        </div>
    )
}