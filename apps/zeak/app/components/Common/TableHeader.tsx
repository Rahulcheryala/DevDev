import React from "react";
import { ChevronsUpDown, EllipsisVertical } from "lucide-react";
import { cn, Popover, PopoverContent, PopoverTrigger } from "@zeak/react";
import { FilterLinesIcon, DragIcon } from "@zeak/icons";
import { Input } from "@zeak/react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm bg-gray-200 ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-none",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current" />
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const tableHeaderVariants = cva("bg-white px-3 py-3 w-60 space-y-2", {
  variants: {
    variant: {
      default: "",
      labelOnly: "px-6 py-4",
      labelOnlyWithCheckbox: "px-6 py-4",
      iconOnly: "h-[56px] w-[56px] flex items-center justify-center",
      checkboxOnly: "flex h-[64px] w-[60px] items-center justify-center rounded-l-[12px] bg-white gap-2",
    },
    isSelected: {
      true: "bg-[#FFDF41]",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TableHeaderProps extends VariantProps<typeof tableHeaderVariants> {
  name: string;
  className?: string;
  showCheckbox?: boolean;
  isSelected?: boolean;
  icon?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
}

export default function TableHeader({
  name,
  className,
  variant,
  showCheckbox = false,
  isSelected = false,
  icon,
  onCheckedChange,
}: TableHeaderProps) {
  return variant === "checkboxOnly" ? (
       <div>
        <div className={cn("flex h-[64px] w-[60px]  rounded-l-[12px] items-center justify-center bg-white gap-2", {
        "bg-[#FFDF41]": isSelected,
      })}>
            <DragIcon className="h-4 w-4 cursor-pointer text-white hover:text-gray-500" />
      <div
        className={cn(
          " flex items-center justify-center rounded-l-[12px] relative",
         
        )}
      >
        <Checkbox
          className={cn("rounded-full", {
            "bg-white": isSelected,
          })}
          checked={isSelected}
          onCheckedChange={onCheckedChange}
          aria-label="Select row"
        />
      </div>
      </div>
    </div>
  ) : variant === "iconOnly" ?
  <div className={cn(tableHeaderVariants({ variant }), className)}>
    {icon && icon}
  </div>
  
  : (
    <div className={cn(tableHeaderVariants({ variant }), className)}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {showCheckbox && (
            <Checkbox
              className="rounded-full"
              checked={isSelected}
              onCheckedChange={onCheckedChange}
              aria-label="Select column"
            />
          )}
          <div className="text-[14px] font-semibold leading-[18px]">{name}</div>
          {variant !== "labelOnly" && <ChevronsUpDown className="h-4 w-4 text-gray-500" />}
        </div>

        {variant !== "labelOnly" && (
          <Popover>
            <PopoverTrigger>
              <EllipsisVertical className="h-4 w-4 text-gray-500" />
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex items-center justify-between gap-2">
                <Input type="text" className="h-8 border-none focus:ring-0" placeholder="Search" />
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {variant !== "labelOnly" && (
        <div className="flex items-center justify-between gap-2">
          <Input type="text" className="h-8 border-none focus:ring-0" placeholder="Search" />
          <FilterLinesIcon className="h-4 w-4 text-gray-500" />
        </div>
      )}
    </div>
  );
}
