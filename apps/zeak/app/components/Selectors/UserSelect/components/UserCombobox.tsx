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

export type UserComboboxProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "onChange"
> & {
  size?: "sm" | "md" | "lg";
  value?: string;
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
  onChange?: (selected: string) => void;
};

const UserCombobox = forwardRef<HTMLButtonElement, UserComboboxProps>(
  (
    {
      size,
      value,
      options,
      isClearable,
      isReadOnly,
      placeholder,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    return (
      <HStack className="w-[calc(100%_-_40px)]" spacing={1}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <CommandTrigger
              size={size}
              role="Usercombobox"
              className={cn(
                "max-w-[600px] w-full",
                !value && "text-muted-foreground",
              )}
              ref={ref}
              onClick={() => setOpen(true)}
              {...props}
            >
              {value ? (
                options.find((option) => option.value === value)?.label
              ) : (
                <span className="!text-muted-foreground">
                  {placeholder ?? "Select"}
                </span>
              )}
            </CommandTrigger>
          </PopoverTrigger>
          <PopoverContent className="w-[600px] w-[--radix-popover-trigger-width] p-0">
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
                      onSelect={() => {
                        onChange?.(option.value);
                        setOpen(false);
                      }}
                      className="bg-foreground"
                    >
                      {JSON.stringify(option.helper)}
                      <div>
                        <Avatar name={option.avatarUrl || option.label} />
                      </div>
                      <div className="pl-[20px]">
                        <h3 className="text-sm text-accent">{option.label}</h3>
                        <p className="text-primary-blue text-xs mt-1 font-medium">
                          {option.email}
                        </p>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </Command>
          </PopoverContent>
        </Popover>
        {isClearable && !isReadOnly && value && (
          <IconButton
            variant="ghost"
            aria-label="Clear"
            icon={<MdClose />}
            onClick={() => onChange?.("")}
            size={size === "sm" ? "md" : size}
          />
        )}
      </HStack>
    );
  },
);
UserCombobox.displayName = "UserCombobox";

export default UserCombobox;
