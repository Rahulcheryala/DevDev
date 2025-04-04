"use client";

import * as React from "react";
import { CheckIcon } from "@zeak/icons";
import { ChevronDown } from "lucide-react"

import {
  cn,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@zeak/react";

import { TbTable } from "react-icons/tb";

export interface ViewOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface DataTableViewProps {
  options?: ViewOption[];
  defaultValue?: string;
  placeholder?: string;
  width?: string;
  emptyMessage?: string;
  searchPlaceholder?: string;
  onChange?: (value: string) => void;
}

export default function DataTableView({
  options = [
    {
      value: "default",
      label: "Default View",
      icon: <TbTable className="h-5 w-5" />
    },
    {
      value: "kiran",
      label: "Kiran's View",
      icon: <TbTable className="h-5 w-5" />
    },
  ],
  defaultValue = "default",
  placeholder = "Select View...",
  width = "w-[200px]",
  emptyMessage = "No view found.",
  searchPlaceholder = "Search view...",
  onChange,
}: DataTableViewProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={() => setOpen(!open)}
          role="combobox"
          aria-expanded={open}
          className={`${width} gap-3 items-center flex`}
        >
          {value && options.find((option) => option.value === value)?.icon}
          {value ? (
            <span className="uppercase">
              {options.find((option) => option.value === value)?.label}
            </span>
          ) : (
            placeholder
          )}
          <ChevronDown className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className={`${width} p-0`}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                >
                  {option.icon && <span className="mr-2">{option.icon}</span>}
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
