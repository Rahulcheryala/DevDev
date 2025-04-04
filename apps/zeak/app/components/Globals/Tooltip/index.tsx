"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "@zeak/react";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    showArrow?: boolean;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
  }
>(
  (
    {
      className,
      side = "top",
      align = "center",
      sideOffset = 4,
      alignOffset = 0,
      showArrow = false,
      ...props
    },
    ref
  ) => (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className={cn(
          "relative z-50 max-w-[280px] rounded-lg p-3 dark:bg-[#101828] dark:text-white  shadow-lg bg-popover  text-sm text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {props.children}
        {showArrow && (
          <TooltipPrimitive.Arrow
            width={16}
            height={8}
            className={cn(
              "fill-popover drop-shadow-[0_1px_0_hsl(var(--border))]",
              {
                "-rotate-270": side === "left", // Arrow pointing to the right
                "rotate-270": side === "right", // Arrow pointing to the left
                "rotate-0": side === "bottom", // Arrow pointing upward
              }
            )}
          />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
