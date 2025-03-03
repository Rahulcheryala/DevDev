import React from 'react'
import { Input, Button, Avatar, ScrollArea } from '@zeak/react'


export default function SmsPreview() {
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
             {/* Preview */}
             <div className="flex gap-[14px]">
              <div className="">

              <Avatar className="h-8 w-8" />
              </div>
              <div className="bg-white rounded-zeak p-4"
              >
                <h2 className="text-[16px] font-medium leading-[20px] mb-8">Welcome $first_name$,</h2>
                <div className="">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida id etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida id etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam.
                  </p>
                </div>

              </div>
              
             </div>


             {/* Footer buttons */}
              <div className=" absolute bottom-36 right-0 py-4 px-10 bg-white w-full flex gap-4">
                <div className="flex justify-between w-full">
                <Button className="h-[56px] min-w-[160px] " variant="ghost">Back</Button>
               
                <Button className="h-[56px] bg-[#0D0844] min-w-[160px]" >Save</Button>
                </div>
              </div>
    </div>
  )
}
