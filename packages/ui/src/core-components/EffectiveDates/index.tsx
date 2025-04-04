import React, { useState } from 'react'
import {
    Button,
    DatePicker,
    Label,
    cn,
    Tooltip,
    TooltipProvider,
    TooltipContent,
    TooltipTrigger,
} from "@zeak/react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { today, getLocalTimeZone } from '@internationalized/date';
import type { CalendarDate } from "@internationalized/date";

export interface EffectiveDatesProps {
    startDate: CalendarDate | null;
    endDate: CalendarDate | null;
    onStartDateChange: (date: CalendarDate | null) => void;
    onEndDateChange: (date: CalendarDate | null) => void;
    startDateError?: string;
    endDateError?: string;
    minStartDate?: CalendarDate;
    title?: string;
    isStartDateRequired?: boolean;
    startDateLabel?: string;
    endDateLabel?: string;
    className?: string;
    doesNotExpire?: boolean;
}

export const EffectiveDates: React.FC<EffectiveDatesProps> = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    startDateError,
    endDateError,
    minStartDate,
    title = "Effectivity Dates",
    isStartDateRequired = true,
    startDateLabel = "Start Date",
    endDateLabel = "End Date",
    className,
    doesNotExpire = false,
}) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const todayDate = today(getLocalTimeZone());

    const isToday = (date: CalendarDate | null) => {
        if (!date) return false;
        return date.compare(todayDate) === 0;
    };

    const getDisplayLabel = (date: CalendarDate | null, isEndDate: boolean = false) => {
        if (isEndDate && doesNotExpire) return "Does not expire";
        if (!date) return "";
        if (isToday(date)) return "Today (Default)";
        return date.toString();
    };

    return (
        <section className={cn("w-full bg-[#F7F7F8] rounded-zeak", className)}>
            <div
                className={cn(
                    "w-full flex items-center justify-between bg-[#E5EAF2] pl-6 py-4 pr-0 rounded-t-zeak",
                    {
                        "rounded-b-zeak": !isEnabled,
                    }
                )}
            >
                <div className="flex items-center gap-2">
                    <Label htmlFor="companies" className="text-[#0D0C22] text-lg font-['Suisse Int\'l'] font-medium">
                        {title}
                    </Label>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="md"
                        onClick={() => setIsEnabled(!isEnabled)}
                    >
                        {isEnabled ? (
                            <ChevronDown className="w-6 h-6" />
                        ) : (
                            <ChevronUp className="w-6 h-6" />
                        )}
                    </Button>
                </div>
            </div>

            {isEnabled && (
                <div className="grid grid-cols-2 gap-12 py-4 px-4">
                    <div className="flex flex-col gap-3">
                        <Label
                            className="text-[#475467] text-sm font-semibold leading-5 tracking-[0.2px]"
                            htmlFor="effectivityStartDate"
                        >
                            {startDateLabel} {isStartDateRequired && <span className="text-red-500 ml-0.5">*</span>}
                        </Label>

                        <DatePicker
                            onChange={onStartDateChange}
                            minValue={minStartDate}
                            inputClasses="bg-[#ffffff]"
                            value={startDate}
                            displayValue={getDisplayLabel(startDate)}
                        />
                        {startDateError && (
                            <p className="text-red-500 text-sm font-sans">
                                {startDateError}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <Label
                                className="text-[#475467] text-sm font-semibold leading-5 tracking-[0.2px]"
                                htmlFor="effectivityEndDate"
                            >
                                {doesNotExpire ? "Does this field have an end date?" : endDateLabel}
                            </Label>
                            {doesNotExpire && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="h-4 w-4 text-[#475467]" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            This field does not have an end date
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                        </div>

                        <DatePicker
                            onChange={onEndDateChange}
                            minValue={startDate ? startDate.add({ days: 1 }) : minStartDate}
                            inputClasses="bg-[#ffffff]"
                            isDisabled={doesNotExpire}
                            value={endDate}
                            displayValue={getDisplayLabel(endDate, true)}
                        />
                        {endDateError && (
                            <p className="text-red-500 text-sm font-sans">
                                {endDateError}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </section>
    )
}
