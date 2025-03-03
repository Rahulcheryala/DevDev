"use client"
import { ChevronDown, Check } from 'lucide-react'
import { cn } from "@zeak/react"


interface StepperProps {

  isActive: boolean
  title: string
  description: string
  isSkipped?:boolean
  isRequired?:boolean
  passed:boolean
  id:number
}

export default function Stepper({isActive,title,description, id,passed,isRequired,isSkipped}:StepperProps) {


  return (
    <div className="w-full   ">
        <div
          className={cn(
            " rounded-lg transition-all bg-white py-[18px] px-[22px]",
       {
             "bg-[#FFDF41] rounded-t-none": isActive,
             "rounded-none": isActive
            }
          )}
        >
          <button
                
            className={cn("flex items-center justify-between w-full  text-left ",{
              "mb-[22px]": isActive,
              
            })}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border text-sm font-medium">
            {id}
              </div>
              {!isActive  && <h3 className="text-[#475467] font-[400] text-[16px]">{title}</h3>}
            </div>
            <div className="flex items-center gap-2">

           {isActive && isRequired && <div className=" text-red-500 text-[14px] font-[450]">
                Required
            </div>}
            {isSkipped ?
            <div className="text-[#9BA2AC] text-[14px] font-[450]">
                Skipped
            </div>
            : passed  ?<Check className="text-[#28CD41]" />:<ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isActive  && "rotate-180"
          )}
                
        />}
            </div>
          </button>
          {isActive  && (
            <div className="">
              <h1 className="text-[#475467] font-[400] text-[26px] mb-[22px] tracking-[0.2px]">{title}</h1>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          )}
        </div>
    </div>
  )
}

