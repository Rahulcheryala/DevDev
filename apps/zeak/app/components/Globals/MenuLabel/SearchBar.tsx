import { Input } from "@zeak/react";
import { SearchIcon } from "@zeak/icons";

export const SearchBar = () => (
    <div className="flex items-center w-[600px] h-[48px] bg-[#FFFFFF] rounded-[12px] relative">
        <SearchIcon
            className="absolute left-[16px] text-[#475467]"
        />
        <Input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-4 w-full h-full rounded-[12px] text-[#475467] placeholder:text-[#475467] text-[16px] font-weight-400 line-height-20 letter-spacing-0.2 !border-none !outline-none appearance-none focus:!outline-none focus:!border-none active:!border-none hover:!border-none focus:!ring-0 focus:shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)]"
        />
    </div>
) 