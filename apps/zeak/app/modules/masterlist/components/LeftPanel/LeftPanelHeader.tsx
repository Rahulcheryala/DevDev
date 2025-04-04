
import { ChevronsUpDown, ChevronDown, ChevronUp } from 'lucide-react'
import { useAllMasterlist, useMasterlistStore } from "~/modules/masterlist"

export default function LeftPanelHeader() {
    const { data: masterLists, isPending, isError } = useAllMasterlist()
    const { sortList, setSortList } = useMasterlistStore()


    return (
        <div className="px-4 py-3 rounded-t-zeak bg-white flex justify-between items-center" >
            <div className="flex items-center gap-2">
                <span> Sort By</span>
                {sortList === "none" ? <ChevronsUpDown className="w-4 h-4" onClick={() => setSortList("asc")} /> : sortList === "asc" ? <ChevronUp className="w-4 h-4" onClick={() => setSortList("desc")} /> : <ChevronDown className="w-4 h-4" onClick={() => setSortList("none")} />}
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
