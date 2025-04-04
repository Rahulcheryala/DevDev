"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../utils/cn"
import { Button } from "./Button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../Command"
import { Popover, PopoverContent, PopoverTrigger } from "../Popover"

const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
]

export function MultiSelectCombobox() {
    const [open, setOpen] = React.useState(false)
    const [selectedItems, setSelectedItems] = React.useState<typeof frameworks>([])

    const handleSelect = (item: (typeof frameworks)[number]) => {
        setSelectedItems((current) => {
            if (current.find((selected) => selected.value === item.value)) {
                return current.filter((selected) => selected.value !== item.value)
            } else {
                return [...current, item]
            }
        })
    }

    const handleRemove = (item: (typeof frameworks)[number]) => {
        setSelectedItems((current) => current.filter((selected) => selected.value !== item.value))
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-left truncate"
                    title={selectedItems.map((item) => item.label).join(", ")}
                >
                    {selectedItems.length > 0 ? selectedItems.map((item) => item.label).join(", ") : "Select frameworks..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem key={framework.value} onSelect={() => handleSelect(framework)}>
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedItems.some((item) => item.value === framework.value) ? "opacity-100" : "opacity-0",
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

