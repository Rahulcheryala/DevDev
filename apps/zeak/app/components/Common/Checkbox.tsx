import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { LuCheck } from "react-icons/lu";

import { cn } from "@zeak/react";

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
      "peer h-5 w-5 shrink-0 rounded-[4px] border-2 border-gray-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#007AF5] data-[state=checked]:border-[#007AF5] data-[state=checked]:text-white focus:ring-4 ring-gray-200 focus:ring-opacity-60 data-[state=checked]:focus:ring-pink-100 data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-white",
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
        <div>
<LuCheck className="w-4 h-4" />
        </div>
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
