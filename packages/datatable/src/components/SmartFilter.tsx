import { ChevronDown } from "lucide-react";
import { Plus } from "lucide-react"
import { useDebounce } from "use-debounce"
import { Column, FilterFn, Table } from "@tanstack/react-table"
import AndOrSwitch from "./AndOrSwitch";
import { Popover, PopoverTrigger, PopoverContent, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Label, Input, DatePicker, Button } from "@zeak/react"
import { useState, useEffect } from "react";

interface Filter {
  id: string;
  columnId: string;
  filterType: string;
  filterValue: string;
  optionalValue: string;
}

export default function SmartFilter<TData>({ table }: { table: Table<TData> }) {
  const [filters, setFilters] = useState<Filter[]>([{
    id: '1',
    columnId: '',
    filterType: '',
    filterValue: '',
    optionalValue: ''
  }]);
  const [value, setValue] = useState<'AND' | 'OR'>('AND');

  const addFilter = () => {
    setFilters([...filters, {
      id: Math.random().toString(),
      columnId: '',
      filterType: '',
      filterValue: '',
      optionalValue: ''
    }]);
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const updateFilter = (id: string, updates: Partial<Filter>) => {
    setFilters(filters.map(filter =>
      filter.id === id ? { ...filter, ...updates } : filter
    ));
  };

  const clearAllFilters = () => {
    // Reset filters state
    setFilters([{
      id: '1',
      columnId: '',
      filterType: '',
      filterValue: '',
      optionalValue: ''
    }]);

    // Clear all column filters
    table.getAllColumns().forEach(column => {
      column.setFilterValue(undefined);
    });
  };

  const getFilterOptions = (column: Column<TData> | null) => {
    const variant = column?.columnDef.meta?.filterVariant;

    if (variant === "number") {
      return [
        { value: "equals", label: "Equals" },
        { value: "notEquals", label: "Does Not Equal" },
        { value: "greaterThan", label: "Greater Than" },
        { value: "lessThan", label: "Less Than" },
        { value: "between", label: "Between" },
        { value: "notBetween", label: "Not Between" },
        { value: "blank", label: "Is Blank" },
        { value: "notBlank", label: "Is Not Blank" },
        { value: "regex", label: "Regex" },
      ];
    }
    if (variant === "date") {
      return [
        { value: "equals", label: "Equals" },
        { value: "before", label: "Before" },
        { value: "after", label: "After" },
        { value: "between", label: "Between" },
        { value: "notBetween", label: "Not Between" },
        { value: "isEmpty", label: "Is Empty" },
        { value: "isNotEmpty", label: "Is Not Empty" },
      ];
    }
    if (variant === "boolean") {
      return [
        { value: "true", label: "True" },
        { value: "false", label: "False" },
        { value: "isEmpty", label: "Is Empty" },
        { value: "isNotEmpty", label: "Is Not Empty" },
      ];
    }
    return [
      { value: "contains", label: "Contains" },
      { value: "notContains", label: "Does Not Contain" },
      { value: "equals", label: "Equals" },
      { value: "notEquals", label: "Does Not Equal" },
      { value: "startsWith", label: "Starts With" },
      { value: "endsWith", label: "Ends With" },
      { value: "blank", label: "Is Blank" },
      { value: "notBlank", label: "Is Not Blank" },
      { value: "regex", label: "Regex" },
    ];
  };

  useEffect(() => {
    filters.forEach(filter => {
      if (filter.columnId) {
        const column = table.getColumn(filter.columnId);
        if (column && filter.filterType) {
          column.setFilterValue({
            filterType: filter.filterType,
            filterValue: filter.filterValue,
            optionalValue: filter.optionalValue
          });
        }
      }
    });
  }, [filters]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='flex h-[60px] cursor-pointer p-0 flex-col justify-center items-start w-[165px] relative mx-3'>
          <div className='flex items-center gap-2'>
            <div className="text-[11px] font-bold tracking-[0px] from-[#8E21E2] to-[#2440E0] bg-gradient-to-r text-transparent bg-clip-text px-4 py-2 rounded-lg">
              Smart Filter
            </div>
            <div className="h-5 w-5 rounded-full bg-[#D5DAE0] flex items-center justify-center text-white text-[11px]  tracking-[0px]">
              {filters.length}
            </div>
            <ChevronDown className="h-6 w-6" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[3px] rounded-t-zeak bg-gradient-to-r from-[#F80EDA] to-[#283FE0]"></div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[666px] ml-28 py-4 px-6 ">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filters</h3>
            <Button
              variant="outline-primary"
              onClick={clearAllFilters}
              className="text-sm"
            >
              Clear All Filters
            </Button>
          </div>

          {filters.map((filter, index) => {
            if (!filter.columnId) return null;
            const column = table.getColumn(filter.columnId);
            return (
              <div key={filter.id} className="mb-6">
                {index > 0 && (
                  <div className="mb-3">
                    <AndOrSwitch value={value} onChange={setValue} />
                  </div>
                )}
                <div className="flex gap-4 mb-3">
                  <div className="flex flex-col gap-2">
                    <Label>Field</Label>
                    <Select
                      value={filter.columnId}
                      onValueChange={(value) => updateFilter(filter.id, { columnId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a field" />
                      </SelectTrigger>
                      <SelectContent>
                        {table.getAllColumns().map((column) => (
                          column.getCanFilter() &&
                          <SelectItem key={column.id} className="text-[14px] capitalize" value={column.id}>
                            {column.columnDef.meta?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Condition</Label>
                    <Select
                      value={filter.filterType}
                      onValueChange={(value) => updateFilter(filter.id, { filterType: value })}
                    >
                      <SelectTrigger disabled={!filter.columnId}>
                        <SelectValue placeholder="Select a condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {column && getFilterOptions(column).map((option) => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {column?.columnDef.meta?.filterVariant !== "boolean" && (
                    <div className="flex flex-col gap-2">
                      <Label>Value</Label>
                      {column?.columnDef.meta?.filterVariant === "date" ? (
                        <input
                          type="date"
                          value={filter.filterValue}
                          onChange={(e) => updateFilter(filter.id, { filterValue: e.target.value })}
                        />
                      ) : (
                        <Input
                          disabled={!filter.filterType}
                          value={filter.filterValue}
                          onChange={(e) => updateFilter(filter.id, { filterValue: e.target.value })}
                          placeholder="Enter a value"
                        />
                      )}
                    </div>
                  )}

                  {(filter.filterType === "between" || filter.filterType === "notBetween") && (
                    <div className="flex flex-col gap-2">
                      <Label>To</Label>
                      {column?.columnDef.meta?.filterVariant === "date" ? (
                        <input
                          type="date"
                          value={filter.optionalValue}
                          onChange={(e) => updateFilter(filter.id, { optionalValue: e.target.value })}
                        />
                      ) : (
                        <Input
                          value={filter.optionalValue}
                          onChange={(e) => updateFilter(filter.id, { optionalValue: e.target.value })}
                          placeholder="Enter end value"
                        />
                      )}
                    </div>
                  )}

                  {filters.length > 1 && (
                    <button
                      onClick={() => removeFilter(filter.id)}
                      className="self-end mb-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          <button
            onClick={addFilter}
            className="flex items-center gap-2 text-[#007AF5] hover:text-blue-700"
          >
            <Plus className="h-5 w-5" />
            <span>ADD A FILTER</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
