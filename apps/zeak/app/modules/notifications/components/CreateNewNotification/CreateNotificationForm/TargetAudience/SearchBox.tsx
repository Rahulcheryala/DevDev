import {Input, Popover, PopoverContent, PopoverTrigger} from "@zeak/react"
import {SearchIcon} from "lucide-react"
import {UserIcon }from "@zeak/icons"
import SearchBoxContent from "./SearchBoxContent"
export default function SearchBox() {
  return (
    <Popover>
        <PopoverTrigger>

    <div className="relative w-full ">
      <Input type="text" className="pr-4 pl-10 border-none rounded-zeak" placeholder="Select users, teams or departments" />
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5  text-muted-foreground" />
    </div>
        </PopoverTrigger>
        <PopoverContent className="w-full flex-1">
               <SearchBoxContent />
        </PopoverContent>
    </Popover>
  )
}