// "use client"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from "react";
import { forwardRef } from "react";


import { cn } from "./utils/cn";

type RadioGroupItemProps = ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
> & {
  icon?: ReactNode;
};

const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, icon, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "h-6 w-6 mr rounded-full group  border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2  disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
               <svg width="26" className="group-data-[state=unchecked]:block hidden" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="11" fill="white" stroke="#9BA2AC" strokeWidth="2"/>
      </svg>
      <RadioGroupPrimitive.Indicator className="">
        {icon ? (
          icon
        ) : (
         <svg width="26" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="11" fill="white" stroke="#19110B" strokeWidth="2"/>
<circle cx="12" cy="12" r="8" fill={"#19110B"} className="data-[state=unchecked]:hidden" />
</svg>

        )}
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
