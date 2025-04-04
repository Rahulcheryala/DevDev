import type { PropsWithChildren } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./Dropdown";
import { IconButton } from "./IconButton";
import { Menu } from "./Menu";

type ActionMenuProps = PropsWithChildren<{
  icon?: JSX.Element;
  disabled?: boolean;
}>;

const ActionMenu = ({ children, ...props }: ActionMenuProps) => {
  return (
    <Menu type="dropdown">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="border-none bg-transparent hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg focus:outline-none focus:ring-0 rounded-full data-[state=open]:bg-dropdownHoverBg"
        >
          <IconButton
            aria-label="Action Menu"
            variant="secondary"
            icon={<BsThreeDotsVertical />}
            {...props}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] shadow-2xl">
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </Menu>
  );
};

export { ActionMenu };
