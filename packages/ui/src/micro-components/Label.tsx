import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

import { cn } from "../utils";

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    {
        variants: {
            variant: {
                default: "",
                secondary: "text-[14px] font-semibold text-[#475467]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface LabelProps extends ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
    required?: boolean;
}

const Label = forwardRef<
    ElementRef<typeof LabelPrimitive.Root>,
    LabelProps
>(({ className, required = false, children, variant, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants({ variant }), className)}
        {...props}
    >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
    </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
