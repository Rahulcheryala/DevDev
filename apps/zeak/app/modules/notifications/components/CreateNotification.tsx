import React from 'react'
import { TbPlus } from 'react-icons/tb'
import { Link } from '@remix-run/react'

export default function CreateNotification() {
  return (
    <div className="w-full h-full bg-white flex-1 flex-grow rounded-[12px] ">
      <div className="h-[64px] w-full bg-[rgba(102,_212,_207,_0.10)] rounded-t-zeak"></div>
      <div className="h-[64px] w-full bg-[rgba(102,212,206,0.2)]"></div>
      <Link to="/x/notifications/new" className="block h-full">
        <div className="flex flex-col p-8 h-full gap-4 bg-[rgba(102,212,206,0.30)] overflow-y-hidden">
          <h1 className="text-[#101828] text-[36px] font-[450] tracking-[0px]">Create your first notification</h1>
          <TbPlus className="w-8 h-8" color="#9BA2AC" />
        </div>
      </Link>
    </div>
  )
}
