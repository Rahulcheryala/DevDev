import {
  Avatar,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandTrigger,
  HStack,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  cn,
} from "@zeak/react";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef, useState } from "react";
import { MdClose } from "react-icons/md";

export type UserMultiselectProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "onChange"
> & {
  size?: "sm" | "md" | "lg";
  value?: string[];
  options: {
    label: string;
    value: string;
    avatarUrl: string;
    email: string;
    helper?: string;
  }[];
  isClearable?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
  existingMembers: any[];
  onChange?: (selected: string[]) => void;
};

const UserMultiselect = forwardRef<HTMLButtonElement, UserMultiselectProps>(
  (
    {
      size,
      value = [],
      options,
      isClearable,
      isReadOnly,
      placeholder,
      existingMembers,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (selectedValue: string) => {
      const newValue = existingMembers.includes(selectedValue)
        ? existingMembers.filter((v) => v !== selectedValue)
        : [...existingMembers, selectedValue];
      onChange?.(newValue);
    };

    const handleClear = () => {
      onChange?.([]);
    };

    return (
      <HStack className="w-full" spacing={1}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <CommandTrigger
              size={size}
              role="UserMultiselect"
              className={cn(
                "h-full max-w-[600px] w-full",
                !value.length && "text-muted-foreground",
              )}
              icon={<></>}
              ref={ref}
              onClick={() => setOpen(true)}
              {...props}
            >
              {value.length ? (
                <div className="flex flex-wrap gap-1">
                  {value.map((val) => (
                    <div
                      key={val}
                      className="flex items-center bg-gray-200 rounded px-2 py-1"
                    >
                      {options.find((option) => option.value === val)?.label}
                      <IconButton
                        variant="ghost"
                        aria-label="Remove"
                        icon={<MdClose />}
                        size="md"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(val);
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <span className="!text-muted-foreground">
                  {placeholder ?? "Share by user email"}
                </span>
              )}
            </CommandTrigger>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder="Search..." className="h-9" />
              <ScrollArea className="overflow-auto max-h-96">
                <CommandEmpty>No option found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      value={
                        typeof option.label === "string"
                          ? option.label + option.helper
                          : undefined
                      }
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                      className={cn(
                        "flex items-center p-2",
                        existingMembers.includes(option.value) && "bg-gray-200",
                      )}
                    >
                      <Avatar
                        name={option.avatarUrl || option.label}
                        size="sm"
                        src={option.avatarUrl}
                        className="mr-2"
                      />
                      <div>
                        <h3 className="text-sm font-medium">{option.label}</h3>
                        <p className="text-xs text-gray-500">{option.email}</p>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </Command>
          </PopoverContent>
        </Popover>
        {isClearable && !isReadOnly && value.length > 0 && (
          <IconButton
            variant="ghost"
            aria-label="Clear"
            icon={<MdClose />}
            onClick={handleClear}
            size={size === "sm" ? "md" : size}
          />
        )}
      </HStack>
    );
  },
);

UserMultiselect.displayName = "UserMultiselect";

export default UserMultiselect;
