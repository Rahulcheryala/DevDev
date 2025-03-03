import { Calendar, Settings, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { RadioGroup } from "@zeak/react"
import { GoInfinity } from "react-icons/go";
import { OnDate, RadioItem, OnEvent, OnOccurrences, DonotEnd } from './EndDate';
import { Flag5 } from '@zeak/icons';

export default function EndDateSelection() {
  const [selectedOption, setSelectedOption] = useState('infinity')

  return (
    <div className="w-full h-full p-6 flex gap-6 bg-[#F7F7F8] rounded-zeak">
      <div className="flex-1 h-full">
        <div className="flex w-full  justify-between">

        <div className="space-y-2 mb-8">
          <h2 className="text-[20px] font-medium tracking-[0px]">Ends</h2>
          <p className="text-[14px] tracking-[0px] text-secondary opacity-50">
            Set an optional end date/time if the notification should stop after a certain period.
          </p>
        </div>
        <Flag5 />
        </div>
        <div className="flex items-stretch gap-[60px] self-stretch h-full">
          {/*  Left side */}
          <div className="flex-1  p-6 rounded-zeak">
            <RadioGroup 
              value={selectedOption}
              onValueChange={setSelectedOption}
              className="space-y-6"
            >
              <RadioItem value="infinity" label="Do not end" checked={selectedOption === "infinity"} icon={<GoInfinity className="h-5 w-5 text-muted-foreground" />} />
              <RadioItem value="date" label="On a Date" checked={selectedOption === "date"} icon={<Calendar className="h-5 w-5 text-muted-foreground" />} />
              <RadioItem value="event" label="Based on an Event" checked={selectedOption === "event"} icon={<Settings className="h-5 w-5 text-muted-foreground" />} />
              <RadioItem value="occurrences" label="After a number of Occurrences" checked={selectedOption === "occurrences"} icon={<RefreshCw className="h-5 w-5 text-muted-foreground" />} />
            </RadioGroup>
          </div>
          {/*  Right side */}
          <div className="flex p-6 flex-col flex-1 justify-center  items-start gap-3 rounded-zeak bg-[#FFF]">
            {selectedOption === 'infinity' && <DonotEnd />}
            {selectedOption === 'date' && <OnDate />}
            {selectedOption === 'event' && <OnEvent />}
            {selectedOption === 'occurrences' && <OnOccurrences />}
          </div>
        </div>
      </div>
    </div>
  )
}