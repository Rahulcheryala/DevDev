
import { DataTable } from "@zeak/datatable"
import columns from "./MasterListColumns"

import { useMasterlistValues } from "~/modules/masterlist"
import { useSearchParams } from "@remix-run/react"

export default function MasterListTable() {
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const { data, isLoading, isError } = useMasterlistValues(id)
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Something went wrong</div>
    }
    if (!data || data.values.length === 0) {
        return <div className="w-full h-auto">
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-500">No values found</p>
            </div>
        </div>
    }
    return <div className="w-full h-auto">

        <DataTable addNewText="New Value" columns={columns} data={data.values} />
    </div>
}