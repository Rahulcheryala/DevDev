'use client'

import * as React from 'react'
import { Eye, X } from 'lucide-react'
import { Button } from '@zeak/react'

// import PreviewTabs from './PreviewTabs'
import {
 Drawer,
 DrawerContent,

 DrawerTrigger,
 DrawerFooter,
} from '@zeak/react'

export default function PreviewDrawer() {
  const [open, setOpen] = React.useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="gap-2 text-[#007AF5]">
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className="w-[960px] backdrop-blur-sm mt-[72px]  mr-4 rounded-t-zeak border p-0"
      >
   
          <div className="flex items-center justify-between px-10  py-3 h-[76px]">
            <h1 className="text-[#101828] text-[26px] font-[450] tracking-[0px]">Preview</h1>
            <X className='h-6 w-6' onClick={()=>setOpen(false)}/>
          </div>
         <div className="h-full">
          {/* <PreviewTabs/> */}
         </div>
      
       
      </DrawerContent>
        </Drawer>
  )
}

