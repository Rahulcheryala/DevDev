

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@zeak/react";

const DataTableCheckbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm bg-gray-200  data-[state=checked]:border-none ring-offset-background focus-visible:outline-none   disabled:cursor-not-allowed disabled:opacity-50 ",
            className
        )}
        {...props}
    >
        <CheckboxPrimitive.Indicator
            className={cn("flex items-center justify-center text-current")}
        ></CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
));
DataTableCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export { DataTableCheckbox };