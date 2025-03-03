import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

import { LuCheck } from "react-icons/lu";
import { MdOutlineHorizontalRule } from "react-icons/md";

import { cn } from "./utils/cn";

export interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  isChecked?: boolean;
  isIndeterminate?: boolean;
}

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ isChecked, isIndeterminate, className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border-2 border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-white data-[state=checked]:border-black data-[state=checked]:text-primary",
      isIndeterminate && "bg-primary text-primary-foreground",
      className,
    )}
    {...props}
    checked={typeof isChecked === "boolean" ? isChecked : props.checked}
    onCheckedChange={props.onCheckedChange}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current ")}
    >
      {isIndeterminate ? (
        <MdOutlineHorizontalRule className="w-4 h-4" />
      ) : (
        <div className="w-4 h-4 bg-black rounded-full" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
