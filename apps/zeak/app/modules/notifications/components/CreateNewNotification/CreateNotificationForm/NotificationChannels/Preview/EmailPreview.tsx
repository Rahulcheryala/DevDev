import React from 'react'
import { Input, Button, Avatar, ScrollArea } from '@zeak/react'

export default function EmailPreview() {
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
              {/* Email Preview */}
              <div className="bg-white rounded-zeak  p-6">
                {/* From */}
                <div className="flex gap-2.5 items-center ">
                    <div className="text-[16px] font-medium leading-[20px]">
                        From: 
                  </div>
                  <div className="bg-[#F7F7F8] rounded-zeak px-3 py-2 flex items-center gap-2.5">
                  <Avatar className="h-8 w-8" />
                    <p className="">
                      <span className="text-[16px] font-medium"> Zeak Admin</span>
                    </p>
                  </div>
                </div>
                {/* Divider */}
                <div className="h-[1px] bg-[#E5E7EB] my-4"></div>
                {/* Subject */}
                <div className="flex items-center gap-2.5">
                <div className="text-[16px] font-medium leading-[20px]">
                    Subject: 
                </div>
                <p>Sample</p>
                </div>
                {/* Body */}
                <ScrollArea className="h-[500px] mt-4">  

                <img src="https://s3-alpha-sig.figma.com/img/371e/8747/970de1133e05e18f5360a04ba65c09ce?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Z88h-h3DpG-c64e2FaombTCaa-BTOefOOe1bepFuCnD6rbJpyV4kEu~4aHiIPPaLhCUyQNMwIKktBcUyckBnOf7cgDZJnjnx~oX7pj~bxnIlwbrCI6oTBsaiuHfvyvfC81fEiYHJO4gOOezIIR8yfzglUm~mQRjhvXXoQgPIBunwijoDwcp~SSos-3B9lZ9PUMWB~BIigEej55AfegTX~CWdfeIlF5k8UmNZ2FM8GLrO0308D~-twCCUXpfsGYWqO99a1y~6fTQNFs0GKl7FkEW~z4kA8SAMcrb9dtCfRU4BOF90sj5b7hCvNQcUJyASB8y4~DCQpncBakPsRXDtlQ__" alt="email-preview" className="w-full h-auto" />  
                </ScrollArea>
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
