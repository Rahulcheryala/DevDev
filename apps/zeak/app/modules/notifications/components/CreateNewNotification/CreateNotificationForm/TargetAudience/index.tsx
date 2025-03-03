'use client'


import { RadioGroup, RadioGroupItem, Input, Label } from "@zeak/react"
import {StepHeader} from "../StepHeader"
import { SendIcon, WorkFlow, UserIcon2 } from '@zeak/icons'
import SearchBox from "./SearchBox"

export default function TargetAudience() {
  return (
    <div className="bg-white rounded-zeak 2xl:px-[60px] px-10">
      <div className="">
        {/* Top Section */}
        <StepHeader title="Target Audience" />
        <div className="space-y-8 mt-8">
          <p className="flex flex-col justify-center text-[20px] font-[450] tracking-[0px] text-[#475467]">Select one of the following options</p>

          <RadioGroup defaultValue="all-users" className="">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 bg-[#F7F7F8] rounded-zeak">
                {/* All Users */}
                <Label
                  htmlFor="all-users"
                  className="flex flex-col h-full cursor-pointer rounded-lg  p-6 hover:border-[#007AF5]"
                >
                  <div className="flex justify-between mb-10">
                    <div className=" ">
                      <SendIcon />
                    </div>
                    <RadioGroupItem value="all-users" id="all-users" />
                  </div>
                  <div className="space-y-1 flex-grow">
                    <h1 className=" text-[20px] font-medium tracking-[0px] mb-2">All Users</h1>
                    <div className="text-[#677281]">

                    <p className="self-stretch text-[14px] tracking-[0px] leading-[22px] ">When to Use:<br/>
                  
                     For system-wide announcements like maintenance alerts, company updates, or high-priority messages affecting all users.
                    </p>
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex-1 bg-[#F7F7F8] rounded-zeak">
                {/* Undefined / Manual */}
                <Label
                  htmlFor="undefined"
                  className="flex flex-col h-full cursor-pointer rounded-zeak  p-4 hover:border-[#007AF5]"
                >
                  <div className="flex justify-between mb-10">
                    
                      <WorkFlow />
                 
                    <RadioGroupItem value="undefined" id="undefined" />
                  </div>
                  <div className="space-y-1 flex-grow">
                    <h1  className="text-[20px] font-medium mb-2">Undefined / Manual</h1>
                    <div className="text-[#677281]">

                    <p className="self-stretch text-[14px] tracking-[0px] leading-[22px]">When to Use: <br/>
                      For dynamic notifications triggered by workflows, business rules, or real-time actions.
                    </p>
                    </div>
                  </div>
                </Label>
              </div>
            </div>

                <div className="w-full bg-[#F7F7F8] rounded-zeak">
                    {/* Specific Users, Teams, or Departments */}
              <Label
                htmlFor="specific"
                className="block cursor-pointer rounded-zeak  p-6 "
              >
                <div className="flex  justify-between mb-10">
             
                    <UserIcon2 />
              
                  <RadioGroupItem value="specific" id="specific" />
                </div>
                <div className="">
                  <h1 className="text-[20px] font-medium mb-2">Specific Users, Teams, or Departments</h1>
                  <div className="text-[#677281]">
   <div className="text-[14px] text-[#677281]">

                  <p className="self-stretch text-[14px] tracking-[0px] leading-[22px]">When to Use:<br/>
                    For targeted notifications such as task assignments, team updates, or individual reminders.
                  </p>
   </div>

                    <div className="mt-6 flex flex-col w-full">
                     {/* Search Box */}
                        <SearchBox />
                  
                  </div>
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

