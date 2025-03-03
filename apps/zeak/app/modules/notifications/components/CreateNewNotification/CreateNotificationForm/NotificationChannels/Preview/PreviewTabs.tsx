
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@zeak/react'
import { Bell } from 'lucide-react'
import { MessageTextOutline } from '@zeak/icons'
import { LuMailOpen } from "react-icons/lu";
import InappPreview from './InappPreview'
import { ExternalLink } from '@zeak/icons'
import EmailPreview from './EmailPreview'
import SmsPreview from './SmsPreview'
export default function PreviewTabs() {
  return (
    <Tabs defaultValue="in-app" className="w-full h-full">
      <TabsList className="grid w-full grid-cols-5 border-none">
        <TabsTrigger className='flex flex-col items-center data-[state=active]:border-0  group data-[state=active]:py-0' value="in-app">
          <div className='flex items-center gap-3 h-[60px]'>
            <Bell className='h-5 w-5' color='#475467' />
            <span className='text-[16px] group-data-[state=active]:font-semibold tracking-[0px]'>In-App</span>
          </div>
          <div className="w-full h-[6px]  bg-[#ACBBD6] rounded-t-[3px] hidden group-data-[state=active]:block"></div>
        </TabsTrigger>
        <TabsTrigger className='flex flex-col items-center data-[state=active]:border-0  group data-[state=active]:py-0' value="email">
          <div className="flex items-center gap-3 h-[60px]">
            <LuMailOpen className='h-5 w-5' color='#475467' />
            <span className='text-[16px] group-data-[state=active]:font-semibold tracking-[0px]'>Email</span>
          </div>
          <div className="w-full h-[6px]  bg-[#ACBBD6] rounded-t-[3px] hidden group-data-[state=active]:block"></div>
        </TabsTrigger>
        <TabsTrigger className='flex flex-col items-center data-[state=active]:border-0  group data-[state=active]:py-0' value="sms">
          <div className="flex items-center gap-3 h-[60px]">
            <MessageTextOutline className='h-5 w-5' color='#475467' />
            <span className='text-[16px] group-data-[state=active]:font-semibold tracking-[0px]'>SMS</span>
          </div>
          <div className="w-full h-[6px]  bg-[#ACBBD6] rounded-t-[3px] hidden group-data-[state=active]:block"></div>
        </TabsTrigger>
        <div className="col-span-2 flex p-4 justify-end items-center gap-2">
          <h2 className="text-[14px] font-[450] tracking-[0px] text-[#677281]">Template Editor</h2>
          <ExternalLink />
        </div>
      </TabsList>
      {/* In-App */}
      <TabsContent value="in-app" className="bg-[#F7F7F8]  h-full">
        <InappPreview />
      </TabsContent>
      {/* Email */}
      <TabsContent value="email" className="h-full bg-[#F7F7F8]">
        <EmailPreview />
      </TabsContent>
      {/* SMS */}
      <TabsContent value="sms" className="h-full bg-[#F7F7F8]">
        <SmsPreview />
      </TabsContent>
    </Tabs>
  )
}
