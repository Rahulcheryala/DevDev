import type { ComponentProps } from "react";
import { forwardRef } from "react";
import type { ButtonProps } from "./Button";
import { Button } from "./Button";

const Menubar = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ children, ...props }, ref) => {
    return (
      <div
        {...props}
        className="min-h-[2.5rem] flex items-center bg-card border border-border rounded-lg shadow-sm justify-start p-1 w-full space-x-1 overflow-x-scroll scrollbar-hide"
      >
        {children}
      </div>
    );
  },
);
Menubar.displayName = "Menubar";

const MenubarItem = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <Button ref={ref} variant="ghost" {...props}>
        {children}
      </Button>
    );
  },
);
MenubarItem.displayName = "MenubarItem";

export { Menubar, MenubarItem };
