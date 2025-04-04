import React, { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./PopoverPrimitive";
import { cn } from "../../utils";

export type ActionButtonProps = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export interface PopupProps {
  trigger: ReactNode;
  buttons: ActionButtonProps[];
  contentClassName?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  disabled?: boolean;
}

/**
 * A reusable popup component that displays a list of actions when triggered.
 */
export function Popup({
  trigger,
  buttons,
  contentClassName,
  align = "end",
  sideOffset = 4,
  disabled = false,
}: PopupProps) {
  return (
    <Popover>
      <PopoverTrigger
        className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
        asChild
        disabled={disabled}
      >
        {trigger}
      </PopoverTrigger>
      <PopoverContent 
        align={align} 
        sideOffset={sideOffset} 
        className={cn("w-56 p-0 rounded-zeak", contentClassName)}
      >
        <ActionButtons buttons={buttons} />
      </PopoverContent>
    </Popover>
  );
}

export interface ActionButtonsProps {
  buttons: ActionButtonProps[];
}

/**
 * Component for rendering action buttons inside the popup
 */
export function ActionButtons({ buttons }: ActionButtonsProps) {
  return (
    <div className="flex flex-col rounded-zeak overflow-hidden">
      {buttons.map((button, index) => (
        <button
          key={index}
          className="h-14 flex items-center gap-4 px-6 text-left text-sm font-semibold text-accent-dark hover:bg-accent-bgHoverNew disabled:opacity-50 whitespace-nowrap"
          onClick={button.onClick}
          disabled={button.disabled}
        >
          {button.icon}
          {button.label}
        </button>
      ))}
    </div>
  );
}

export * from "./PopoverPrimitive";
export default Popup; 