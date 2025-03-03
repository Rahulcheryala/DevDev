import React from 'react'
import NotificationCharts from './NotificationCharts'
import CreateNotification from '../CreateNotification'
import NotificationDataTable from '../NotificationDataTable'
export default function AllNotifcations() {
  return (
    <div className="bg-[#F0F4FD]  ">
      <NotificationCharts />
      <NotificationDataTable />
      {/* <CreateNotification /> */}
    </div>
  )
}
