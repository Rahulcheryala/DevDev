import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { ActionButtons } from "./ActionButtons";
import { OrganizationDropdown } from "./OrganizationDropdown";
import { UserAvatar } from "./UserAvatar";

const MenuLabel = () => {
    return (
        <div className="fixed top-0 w-full flex justify-between items-center p-6 bg-[#F0F4FD] h-[72px]">
            <Logo />
            <SearchBar />
            <div className="flex items-center gap-2">
                <ActionButtons />
                <OrganizationDropdown />
                <UserAvatar />
            </div>
        </div>
    )
}

export default MenuLabel