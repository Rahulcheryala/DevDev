'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input, Avatar,  } from "@zeak/react"
import SearchItem from './SearchItem'
interface Item {
  id: string
  name: string
  image: string
}

const users: Item[] = [
  { id: '1', name: 'Ryan Navasardian', image: '/placeholder.svg' },
  { id: '2', name: 'Ryan Bavaraju', image: '/placeholder.svg' },
  { id: '3', name: 'Mary Chunduru', image: '/placeholder.svg' },
]

const teams: Item[] = [
  { id: '1', name: 'Foundery', image: '/placeholder.svg' },
  { id: '2', name: 'Marketing', image: '/placeholder.svg' },
  { id: '3', name: 'Penetrytion Testing', image: '/placeholder.svg' },
]

const departments: Item[] = [
  { id: '1', name: 'Salary', image: '/placeholder.svg' },
  { id: '2', name: 'Research and Development', image: '/placeholder.svg' },
  { id: '3', name: 'Human Resouryce', image: '/placeholder.svg' },
  { id: '4', name: 'Machinery', image: '/placeholder.svg' },
]

export default function SearchBoxContent() {
  const [search, setSearch] = useState('')

  const filterItems = (items: Item[]) => {
    return items.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  return (
    <div className="w-full  mx-auto p-4 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        <section className="w-full ">
          <h2 className="text-sm font-medium mb-3">Users</h2>
            <div className=" flex flex-wrap items-center gap-3">
            {filterItems(users).map((user: Item) => (
                <SearchItem key={user.id} name={user.name} />
            ))}
            <div className="pt-1">
              <a href="#" className="text-sm text-blue-600 hover:underline">See All</a>
            </div>
          </div>
        </section>

        <section className="w-full " >
          <h2 className="text-sm font-medium mb-3">Teams</h2>
          <div className=" flex flex-wrap items-center gap-3 ">
            {filterItems(teams).map((team: Item) => (
              <SearchItem key={team.id} name={team.name} />
            ))}
            <div className="pt-1">
              <a href="#" className="text-sm text-blue-600 hover:underline">See All</a>
            </div>
          </div>
        </section>

        <section className="w-full  ">
          <h2 className="text-sm font-medium mb-3">Departments</h2>
          <div className=" flex flex-wrap items-center gap-3">
            {filterItems(departments).map((department: Item) => (
              <SearchItem key={department.id} name={department.name} />
            ))}
            <div className="pt-1">
              <a href="#" className="text-sm text-blue-600 hover:underline">See All</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

