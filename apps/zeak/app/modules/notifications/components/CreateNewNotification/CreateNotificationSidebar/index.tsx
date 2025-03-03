import React from 'react'
import TopSection from './TopSection'
import Steps from './Steps'
export default function CreateNotificationSidebar() {
  return (
    <div className="flex flex-col xl:min-w-[384px] xl:w-[384px] 2xl:min-w-[506px] 2xl:w-[506px]  rounded-zeak" >
      <TopSection />
      <Steps />
    </div>
  )
}
