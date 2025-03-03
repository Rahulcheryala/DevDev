import  { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export default function OnOccurrences() {
  const [occurrences, setOccurrences] = useState<number>(1)
  return (
    <div className="flex flex-col   items-center justify-center bg w-full flex-1  max-w-[360px] mx-auto ">
        <div className="flex flex-col gap-3 border-b-2 border-gray-400 px-4 ">
            <h1 className="text-[14px] text-center ">Occurrences</h1>
            <div className="relative">

       <input 
  type="number" 
  min={0}
  value={occurrences} 
  onChange={(e) => setOccurrences(Number(e.target.value))} 
  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center border-none bg-transparent focus:outline-none w-20 text-[#007AF5] text-[48px]"
/>
<div className="absolute right-0 top-0 h-full flex flex-col items-center justify-center">
  <ChevronUp onClick={() => setOccurrences(occurrences + 1)} className="w-5 h-5 text-muted-foreground" />
  <ChevronDown onClick={() => setOccurrences(occurrences - 1)} className="w-5 h-5 text-muted-foreground" />
</div>
            </div>

        </div>
    </div>
  )
}
