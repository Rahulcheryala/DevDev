"use client"

import { ChevronLeft, Search } from "lucide-react"
import { Button } from "@zeak/react"
import { Input } from "@zeak/react"
import { useState } from "react"

type FilterOption = "All" | "System" | "User Defined"

export default function FilterInterface() {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("All")

  return (
    <div className="max-w-md mx-auto py-4  space-y-6 bg-white rounded-zeak">
      {/* Header */}
      <div className=" pl-[18px]">

      <div className="flex items-center gap-2">
          <ChevronLeft className="h-6 w-6 text-[#475467]" />
        <span className="text-xl text-gray-600">Back</span>
      </div>
      </div>

      {/* Search */}
      <div className="relative px-4">
        <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#475467]" />
        <Input type="search" placeholder="Search" className="w-full pl-12 h-12 bg-[#F0F4FD] border-none text-lg" />
      </div>

      {/* Filters */}
      <div className="flex gap-4 px-4">
        {["All", "System", "User Defined"].map((filter) => (
          <Button
            key={filter}
            variant="ghost"
            className={`px-3 py-2.5 rounded-lg text-base font-normal  ${
              selectedFilter === filter ? "bg-[#D3DFE8] text-[#475467]" : "text-[#101828] hover:bg-[#D3DFE8]"
            }`}
            onClick={() => setSelectedFilter(filter as FilterOption)}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  )
}

