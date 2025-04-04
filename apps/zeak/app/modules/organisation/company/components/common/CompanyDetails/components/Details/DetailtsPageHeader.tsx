import {  ui } from "@zeak/react"
import { useDeactivateMasterlist, useMasterlistDetails, useSearchMasterlist } from "~/modules/masterlist"
import { useParams } from "@remix-run/react"
import { ChevronLeft, ChevronRight, X, Building2,  ChevronDown, UserCircle } from "lucide-react"
import { useMasterlistStore, useUpdateMasterlist } from "~/modules/masterlist"
import { EditIcon3, RadioIcon, Zlogo } from "@zeak/icons"
import SaveButton from "./SaveButton"
import { useCompanies } from "~/modules/masterlist"
import { cn } from "@zeak/react"
import { useNavigate , Link} from "@remix-run/react"
import { useState, useEffect } from "react"
import ActionMenu from "./ActionMenu"
export default function DetailsPageHeader({ userId }: { userId?: string }) {

    const { id } = useParams()
    const { isEditing, setIsEditing, confirmDeactivateMasterlist, setConfirmDeactivateMasterlist } = useMasterlistStore()
    const { data: companies, isLoading: isCompaniesLoading, isError: isCompaniesError } = useCompanies()

    if (!id) {
        return <div>No id</div>
    }
    const { mutate: updateMasterlist, isPending } = useUpdateMasterlist(id, userId)
    const { data: masterlist, isLoading, isError } = useMasterlistDetails(id)
    const { mutate: deactivateMasterlist } = useDeactivateMasterlist(id)
    const [isOpen, setIsOpen] = useState(false)
    const [nextListId, setNextListId] = useState("")
    const [prevListId, setPrevListId] = useState("")
    const navigation = useNavigate()

    const { data: searchResults, isPending: isSearchPending, isError: isSearchError } = useSearchMasterlist()
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        if (searchResults?.masterlist?.length) {
            const selectedIndex = searchResults?.masterlist.findIndex((masterlist: any) => masterlist.id === id)
            setActivePage(selectedIndex)
            if (selectedIndex > 0) {
                setPrevListId(searchResults?.masterlist[selectedIndex - 1]?.id || "")
            }
            if (selectedIndex < searchResults?.masterlist?.length - 1) {
                setNextListId(searchResults?.masterlist[selectedIndex + 1]?.id || "")
            }
        }
    }, [searchResults, id])
  
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error...</div>
    }
    const handleSave = () => {
        updateMasterlist()
    }
    return (

        <div className=" bg-[#e3e8ef] rounded-t-[12px]">
            <ui.AlertModal
                isOpen={confirmDeactivateMasterlist}
                fromColor="#6642F6"
                toColor="#598E39"
                onClose={() => setConfirmDeactivateMasterlist(false)}
                onConfirm={() => deactivateMasterlist()}
                title={masterlist?.isActive ? "Deactivate Master List" : "Reactivate Master List"}
                message={masterlist?.isActive ? "Are you sure you want to deactivate this master list?" : "Are you sure you want to activate this master list?"}
                buttonText="Ok"
            />

            {/* UI */}
            <ui.Warning 
            isOpen={isOpen}
            onClose={()=>setIsOpen(false)}
            title="Attention!"
            
            />
            {/* Top Navigation */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#e3e8ef]">
                <div className="flex items-center gap-2">
                    <ui.Button variant="ghost" size="icon" className="text-[#5e626d]">
                        <ChevronLeft className="h-4 w-4" />
                    </ui.Button>
                    <span className="text-[#5e626d] text-sm">Settings / Master Lists</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsEditing(true)} className="text-[#5e626d] flex items-center text-sm gap-2">
                        <EditIcon3 className="h-5 w-5" />
                        Edit
                    </button>
                    <ActionMenu masterlistId={id} isActive={masterlist?.isActive} />
                    {isEditing && <SaveButton onSave={handleSave} isLoading={isPending} />}
                    <ui.Button variant="ghost" size="icon" className="text-[#5e626d]">
                        <X className="h-4 w-4" />
                    </ui.Button>
                </div>
            </div>

            {/* Title Section */}
            <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-[#31384d] text-2xl font-semibold">{masterlist?.name}</h1>
                    <ChevronDown className="h-5 w-5 text-[#5e626d]" />
                    <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full">
                        <RadioIcon className={cn("h-4 w-4 ", masterlist?.isActive ? "text-[#31de4b]" : "text-[#5e626d]")} />
                        {masterlist?.isActive ? (
                            <span className="text-[#007d1b] text-[14px] font-medium">
                                ACTIVE
                            </span>
                        ) : (
                            <span className="text-[#5e626d] text-[14px] font-medium">
                                INACTIVE
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="px-4 py-2 flex items-center justify-between border-b border-[#e3e8ef]">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-[#5e626d]" />
                        <div className="flex items-center gap-2">
                            {isCompaniesLoading ? (
                                <div className="text-gray-500">Loading companies...</div>
                            ) : isCompaniesError ? (
                                <div className="text-red-500">Error loading companies</div>
                            ) : masterlist?.companies.length === 0 ? (
                                <div className="text-gray-500">No companies assigned</div>
                            ) : (
                                <div>
                                    {companies?.companies.filter((company: any) => masterlist?.companies.includes(company.id)).map((company: any) => (
                                        <div key={company.id}>
                                            {company.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[#8695c3]">LIST TYPE</span>
                        <div className="flex items-center gap-2">
                            {masterlist?.type === "system" ? (
                                <Zlogo />
                            ) : (
                                <UserCircle className="h-5 w-5 text-[#5e626d]" />
                            )}
                            <span className="text-sm text-[#31384d] uppercase font-medium">
                                {masterlist?.type}
                            </span>
                        </div>

                    </div>
                </div>
                <div className="flex items-center gap-[2px]">
                    <div  className="h-8 w-8 bg-white rounded-l-full flex items-center justify-center">
                        <Link to={`/x/masterlists/${prevListId}`}>
                        <ChevronLeft className="h-5 w-5" />
                        </Link>
                    </div>
                    <div className="bg-white h-8 flex items-center leading-5 justify-center py-1.5 px-4 text-[14px] font-[450]">

                        <span className="text-[#007AF5] ">  {activePage + 1} </span>  <span className="text-[#5e626d]">   / {searchResults?.masterlist?.length}</span>
                    </div>
                    <div  className="h-8 w-8 bg-white rounded-r-full flex items-center justify-center">
                        <Link to={`/x/masterlists/${nextListId}`}>
                        <ChevronRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

