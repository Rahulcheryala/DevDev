import { useState } from "react"
import { Button } from "@zeak/react"
import { Input } from "@zeak/react"
import { Label } from "@zeak/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@zeak/react"
import { Calendar } from "@zeak/react"
import { CalendarIcon, Clock } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@zeak/react"
import { MarkerPin } from "@zeak/icons"
import { cn } from "@zeak/react"
import { format } from "date-fns"

export default function StartForm() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>("HH/MM/SS")

  return (
    <div className="flex p-6 flex-col items-start gap-[32px] self-stretch rounded-[12px] bg-[#F7F7F8]">
    
        <div className="flex items-start justify-between w-full ">
              <div className="space-y-2">
          <Label className="text-[20px] font-medium tracking-[0px]">
            Starts
            <span className="text-red-500 ml-0.5">*</span>
          </Label>
          <div className="text-[14px] tracking-[0px] text-secondary">
            <p>
              Specify when the notification should begin triggering (e.g., start on a specific date and time)
            </p>
            <p>
              Choose a recurrence pattern (e.g., daily, weekly, or custom intervals)
            </p>
          </div>
        </div>
        <div className="">

            <MarkerPin className="w-10 h-10 text-[#04A777]" />
            </div>
        </div>
       


      <div className="flex items-stretch justify-between gap-[60px] self-stretch">
       
        
        {/* Left Side */}

        <div className="flex flex-col gap-8 self-stretch flex-1 p-8  rounded-zeak">
          <div className="flex flex-col gap-3">
            <Label className="text-[14px] font-semibold tracking-[0px]">Start Date</Label>
           
            <Popover>
              <PopoverTrigger asChild>
                <button
                 
                  className={cn(
                    "flex items-center justify-between px-4  h-[56px] rounded-zeak gap-[10px]   bg-[#FFF]",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "MM/dd/yyyy") : "MM/DD/YYYY"}
                  <CalendarIcon className="mr-2 h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
         
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-3 ">
            <Label className="text-[14px] font-semibold tracking-[0px]">Start Time</Label>
            <div className="relative">
              <Input
                type="time"
                step="1"
                value={time}
                defaultValue="HH/MM/SS"
                onChange={(e) => setTime(e.target.value)}
                placeholder="HH/MM/SS"
                className="bg-white pr-10 h-[56px] border-0"
              />
            
            </div>
          </div>

          {/* Timezone */}
          <div className="flex flex-col gap-3 w-full">
            <Label className="text-[14px] font-semibold tracking-[0px]">Timezone</Label>
            <Select defaultValue="system-default">
              <SelectTrigger className="w-full bg-white border-0 placeholder:text-[#9BA2AC]">
                <SelectValue placeholder="System Default" defaultValue="system-default" />
              </SelectTrigger>
              <SelectContent> 
                <SelectItem value="system-default">System Default</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Right Side */}
      <div className="flex p-8 flex-col flex-1 justify-center items-start gap-3 rounded-zeak bg-[#FFF]">
          <Label>Recurrence</Label>
          <Select defaultValue="one-time">
            <SelectTrigger className="w-full px-6 bg-white">
              <SelectValue placeholder="Select recurrence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">Do not repeat</SelectItem>
              <SelectItem value="daily">Weekly on Monday</SelectItem>
              <SelectItem value="weekly">Monthly on Tuesday</SelectItem>
              <SelectItem value="monthly">Annually on Wednesday</SelectItem>
              <SelectItem value="annually">Every Weekday Monday to Friday</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      
      </div>
    </div>
  )
}
