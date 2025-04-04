import { useState,useEffect } from "react";
import { useDatatableStore } from "./useDatatableStore";
import { Popover, PopoverContent, PopoverTrigger, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Label } from "@zeak/react";
import { IoFilterOutline, IoClose } from "react-icons/io5";
import { Button } from "@zeak/react";

export const ConditionalRendering = ({dataType, colId}: {dataType?: string, colId?: string}) => {
    const { matchValue, setMatchValue, matchCondition, setMatchCondition, setConditionalRenderingColId } = useDatatableStore();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const getConditionOptions = () => {
        if (dataType === "number") {
            return [
                { value: "greaterThan", label: "Greater Than" },
                { value: "lessThan", label: "Less Than" },
            ]
        } else if (dataType === "date") {
            return [
                { value: "greaterThan", label: "Greater Than" },
                { value: "lessThan", label: "Less Than" },
            ]
        } else if (dataType === "boolean") {
            return [
                { value: "true", label: "True" },
                { value: "false", label: "False" },
            ]
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
        if (colId) {
            setConditionalRenderingColId(colId);
        }
    }, [colId]);

    const handleClear=()=>{
        setMatchValue("");
        setMatchCondition("");
        setConditionalRenderingColId("");
    }

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100">
                    <IoFilterOutline className="w-4 h-4" />
                    Conditional Rendering
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Filter Options</h3>
                        <button 
                            onClick={() => setIsPopoverOpen(false)} 
                            className="p-1 rounded-md hover:bg-gray-100"
                        >
                            <IoClose className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Condition</Label>
                        <Select 
                            value={matchCondition} 
                            onValueChange={(e) => setMatchCondition(e)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Condition" />
                            </SelectTrigger>
                            <SelectContent>
                                {getConditionOptions().map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                   { matchCondition !== "blank" && matchCondition !== "notBlank" && dataType !== "boolean" && <div className="flex flex-col gap-2">
                        <Label>Value</Label>
                        <Input 
                            value={matchValue} 
                            onChange={(e) => setMatchValue(e.target.value)}
                            disabled={matchCondition === "blank" || matchCondition === "notBlank"}
                            placeholder="Enter value"
                        />
                    </div>}
                    <Button onClick={handleClear}>Clear</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};