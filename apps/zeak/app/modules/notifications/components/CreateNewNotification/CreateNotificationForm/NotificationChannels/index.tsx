'use client'

import { useState } from 'react'

import Section from './Section'
import EmailSection from './EmailSection'
import InAppSection from './InAppSection'
import SmsSection from './SmsSection'
import { StepHeader } from '../StepHeader'
  
export default function NotificationSettings() {
  const [deliveryMethods, setDeliveryMethods] = useState({
    inApp: true,
    email: false,
    sms: false,
  })

  return (
    <div className="">
  <StepHeader title="Notification Channels"/>

<div className="2xl:px-[60px] px-10">
      <div className="flex items-center justify-between mb-8">
        <div>
       
          <p className="font-[450] mt-2 text-[#475467]">
            Email, In-App, or SMS. Notifications will be sent using the selected methods <br/>  
            based on user preferences and availability.
          </p>
        </div>
    
      </div>

      <div className="space-y-6">
        {/* In-App Section */}
        <Section title="In App Notification">
          <InAppSection />
        </Section>
       
        {/* Email Section */}
        <Section title="E-mail"  >
          <EmailSection />
        </Section>

        {/* SMS Section */}
          <Section title="SMS"  >
              <SmsSection />
        </Section>

        </div>
    </div>
    </div>
  )
}
