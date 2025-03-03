"use client";

import * as React from "react";
import { CheckIcon } from "@zeak/icons";
import {ChevronDown} from "lucide-react"

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

const frameworks = [
  {
    value: "default",
    label: "Default View",
  },
  {
    value: "kiran",
    label: "Kiran's View",
  },
];

export default function DataTableView() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("default");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={() => setOpen(!open)}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] gap-3 items-center flex"
        >
          <TbTable className="h-5 w-5" />
          {value ? (
            <span className="uppercase">
              {frameworks.find((framework) => framework.value === value)?.label}
            </span>
          ) : (
            "Select View..."
          )}
          <ChevronDown className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search view..." />
          <CommandList>
            <CommandEmpty>No view found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0",
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
