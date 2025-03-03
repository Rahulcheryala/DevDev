"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, ChevronsUpDown, CalendarIcon } from "lucide-react"
import { cn } from "../utils/cn"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "../Popover"

interface DatePickerProps {
    value?: Date
    onChange?: (date: Date) => void
    defaultValue?: Date
}

export default function DatePicker({ value, onChange, defaultValue }: DatePickerProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(value || defaultValue || new Date())
    const [isOpen, setIsOpen] = useState(false)
    const [isMonthYearSelectorOpen, setIsMonthYearSelectorOpen] = useState(false)
    const monthYearRef = useRef<HTMLDivElement>(null)

    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay()
    }

    const getDaysArray = () => {
        const currentMonth = selectedDate.getMonth()
        const currentYear = selectedDate.getFullYear()
        const daysInMonth = getDaysInMonth(currentYear, currentMonth)
        const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
        const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1)

        const days = []

        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({
                date: daysInPrevMonth - i,
                isCurrentMonth: false,
                isPrevMonth: true,
            })
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                date: i,
                isCurrentMonth: true,
                isSelected: i === selectedDate.getDate(),
            })
        }

        // Next month days
        const remainingDays = 42 - days.length // 6 rows * 7 days
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: i,
                isCurrentMonth: false,
                isNextMonth: true,
            })
        }

        return days
    }

    const handleDateSelect = (day: number) => {
        const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
        setSelectedDate(newDate)
        onChange?.(newDate)
    }

    const handleMonthChange = (increment: number) => {
        const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + increment, 1)
        setSelectedDate(newDate)
    }

    const handleMonthYearSelect = (month: number, year: number) => {
        const newDate = new Date(year, month, 1)
        setSelectedDate(newDate)
        setIsMonthYearSelectorOpen(false)
    }

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear()
        const years = []
        for (let i = 0; i < 40; i++) {
            years.push(currentYear - i)
        }
        return years
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (monthYearRef.current && !monthYearRef.current.contains(event.target as Node)) {
                setIsMonthYearSelectorOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (value) {
            setSelectedDate(value)
        }
    }, [value])

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className={cn(
                        "w-full justify-between bg-white h-[56px] rounded-zeak text-left font-normal",
                        "inline-flex items-center   px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        !selectedDate && "text-muted-foreground",
                    )}
                >
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    <CalendarIcon className="mr-2 h-4 w-4" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="w-full max-w-md mx-auto bg-white rounded-3xl border border-[#e8e8e8] shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <button
                            type="button"
                            onClick={() => handleMonthChange(-1)}
                            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#f7f7f9] transition-colors"
                        >
                            <ChevronLeft className="h-4 w-4 text-[#475467]" />
                        </button>
                        <div ref={monthYearRef} className="relative">
                            <button
                                type="button"
                                onClick={() => setIsMonthYearSelectorOpen(!isMonthYearSelectorOpen)}
                                className="flex items-center gap-1 px-4 py-1 text-[#101828] font-medium hover:bg-[#fafafa] rounded-md"
                            >
                                {format(selectedDate, "MMMM yyyy")}
                                <ChevronsUpDown className="h-4 w-4 text-[#475467]" />
                            </button>
                            {isMonthYearSelectorOpen && (
                                <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                                    <div className="max-h-60 overflow-y-auto">
                                        {generateYearOptions().map((year) => (
                                            <div key={year} className="p-2 border-b border-gray-100">
                                                <div className="font-medium text-sm text-gray-600">{year}</div>
                                                <div className="grid grid-cols-3 gap-1 mt-1">
                                                    {months.map((month, index) => (
                                                        <button
                                                            key={month}
                                                            onClick={() => handleMonthYearSelect(index, year)}
                                                            className="text-xs p-1 hover:bg-gray-100 rounded"
                                                        >
                                                            {month.slice(0, 3)}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => handleMonthChange(1)}
                            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#f7f7f9] transition-colors"
                        >
                            <ChevronRight className="h-4 w-4 text-[#475467]" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 mb-2">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="text-center text-sm font-medium text-[#475467]">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {getDaysArray().map((day, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => day.isCurrentMonth && handleDateSelect(day.date)}
                                className={cn(
                                    "h-10 w-10 rounded-lg flex items-center justify-center text-sm transition-colors",
                                    day.isCurrentMonth ? "text-[#101828]" : "text-[#677281]",
                                    day.isSelected && "bg-[#007af5] text-white",
                                    !day.isSelected && day.isCurrentMonth && "hover:bg-[#f7f7f9]",
                                )}
                            >
                                {day.date}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <div className="text-[#101828] font-medium">{format(selectedDate, "MMMM dd, yyyy")}</div>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 bg-[#007af5] hover:bg-[#007af5]/90 text-white rounded-lg transition-colors"
                        >
                            Select
                        </button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
