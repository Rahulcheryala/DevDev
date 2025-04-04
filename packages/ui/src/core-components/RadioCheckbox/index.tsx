import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

import { MdOutlineHorizontalRule } from "react-icons/md";
import { Minus } from "lucide-react";

import { cn } from "../../utils";

export interface RadioCheckboxProps
    extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    isChecked?: boolean;
    isIndeterminate?: boolean;
    showIndicator?: boolean;
}

const RadioCheckbox = forwardRef<
    ElementRef<typeof CheckboxPrimitive.Root>,
    RadioCheckboxProps
>(({ isChecked, isIndeterminate, className, showIndicator, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
            "peer h-6 w-6 shrink-0 border-2 border-gray-500  rounded-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-white data-[state=checked]:border-none data-[state=checked]:text-primary",
            isIndeterminate && "bg-white text-black ",
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
                <Minus className="w-4 h-4" />
            ) : showIndicator && (
                <svg width="26" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" fill="white" stroke="#19110B" strokeWidth="2" />
                    <circle cx="12" cy="12" r="8" fill={"#19110B"} className="data-[state=unchecked]:hidden" />
                </svg>
            )}
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
));
RadioCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export { RadioCheckbox };