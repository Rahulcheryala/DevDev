import React from 'react'
import { Input, Button } from '@zeak/react'
import {Avatar} from '@zeak/react'
export default function InappPreview() {
  return (
    <div className="pt-8 px-10 pb-10 relative flex-1 flex-grow h-full">
          <div className="flex items-center gap-10 mb-8">
                <Input
                  
                  placeholder="Select users, teams, departments to test"
                  className="bg-white rounded-zeak"
                />
                <Button variant="secondary" className="px-6 py-3 bg-[#D3DFE8] h-[56px] text-[14px] font-medium tracking-[0px]"  >
                  Send Test
                </Button>
              </div>
              {/* In-App Preview */}
              <div className="bg-white rounded-zeak  p-6">
                <div className="flex gap-6">
                    <div className="">
                        
                  <Avatar className="h-10 w-10" />
                  </div>
                  <div>
                    <p className="">
                      <span className="text-[16px] font-medium"> Zeak Admin</span>
                      &nbsp;
                      <span className="text-[16px] font-medium text-[#475467]"> sent you a notification</span>
                    </p>
                    <span className="text-[14px] font-[450] text-[#677281]">Just now</span>
                <div className="p-4 bg-[#F7F7F8] mt-5 rounded-zeak">
                 <h1 className='text-[16px] font-medium'>Welcome $First_Name$ $Last_Name$,</h1>
                 <p className="text-[14px] font-[450] text-[#677281]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida id etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam.
                 </p>
                </div>
                <div className="mt-8 flex space-x-8">
                    <Button variant="secondary" className="px-6 py-3 bg-[#D3DFE8] h-[56px] text-[14px] font-medium tracking-[0px]"  >
                        View Now
                    </Button>
                    <Button variant="secondary" disabled className="px-6 py-3 bg-[#D3DFE8] h-[56px] text-[14px] font-medium tracking-[0px]"  >Mark as read</Button>
                </div>
                  </div>
                </div>
              </div>
              <div className=" absolute bottom-36 right-0 py-4 px-10 bg-white w-full flex gap-4">
                <div className="flex justify-between w-full">
                <Button className="h-[56px] min-w-[160px] " variant="ghost">Back</Button>
                <Button className="h-[56px] bg-[#0D0844] min-w-[160px]" >Save</Button>
                </div>
              </div>
    </div>
  )
}
