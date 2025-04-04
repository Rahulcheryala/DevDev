import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "./Badge";
import { Command, CommandGroup, CommandItem } from "./Command";
import { cn } from "./utils/cn";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleRemove = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  return (
    <Command className={cn("relative", className)}>
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {value.map((v) => {
            const option = options.find((o) => o.value === v);
            return (
              <Badge
                key={v}
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {option?.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRemove(v);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleRemove(v)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
          <button
            className="rounded-sm px-2 py-1 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={() => setOpen(true)}
          >
            {value.length === 0 && (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </button>
        </div>
      </div>
      <div className="relative mt-2">
        {open && (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto max-h-[200px]">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
}
