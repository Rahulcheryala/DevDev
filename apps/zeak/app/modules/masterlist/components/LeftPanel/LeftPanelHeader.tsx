
import { ChevronsUpDown } from 'lucide-react'
import { useAllMasterlist } from "~/modules/masterlist"

export default function LeftPanelHeader() {
    const { data: masterLists, isPending, isError } = useAllMasterlist()
    return (
        <div className="px-4 py-3 rounded-t-zeak bg-white flex justify-between items-center" >
            <div className="flex items-center gap-2">
                <span> Sort By</span>
                <ChevronsUpDown />
            </div>
            <div className="flex items-center gap-2">
                {isPending && <span>Loading...</span>}
                {isError && <span>Error</span>}
                {masterLists && <span>{masterLists?.data?.length}</span>}
                <span>Records</span>
            </div>
        </div>
    )
}
