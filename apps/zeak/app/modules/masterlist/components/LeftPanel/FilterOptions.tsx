import { ChevronLeft, Search } from "lucide-react"
import { Button } from "@zeak/react"
import { Input } from "@zeak/react"
import { Link } from "@remix-run/react"
import { useMasterlistStore } from "~/modules/masterlist"

type FilterOption = "All" | "System" | "User Defined"

export default function FilterInterface() {
  const { masterListView, setMasterListView, searchTerm, setSearchTerm } = useMasterlistStore()
  return (
    <div className="max-w-[350px] mx-auto py-4  space-y-6 bg-white rounded-zeak">
      {/* Header */}
      <div className=" pl-[18px]">

        <Link to="/x/masterlists">
          <div className="flex items-center gap-2">

            <ChevronLeft className="h-6 w-6 text-[#475467]" />
            <span className="text-xl text-gray-600">Back</span>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="relative px-4">
        <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#475467]" />
        <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="search" placeholder="Search" className="w-full pl-12 h-12 bg-[#F0F4FD] border-none text-lg" />
      </div>

      {/* Filters */}
      <div className="flex gap-4 px-4">
        {["All", "System", "User Defined"].map((filter) => (
          <Button
            key={filter}
            variant="ghost"
            className={`px-3 py-2.5 rounded-lg text-base font-normal  ${masterListView === filter ? "bg-[#D3DFE8] text-[#475467]" : "text-[#101828] hover:bg-[#D3DFE8]"
              }`}
            onClick={() => setMasterListView(filter as FilterOption)}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  )
}

