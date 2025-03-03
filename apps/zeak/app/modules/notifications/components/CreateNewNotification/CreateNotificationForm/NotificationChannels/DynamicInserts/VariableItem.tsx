import React from 'react'

interface VariableItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function VariableItem({icon, title, description}: VariableItemProps) {
  return (
       <div className="flex items-center gap-2 py-2 justify-between">
        <div className="flex items-center gap-2">

   {icon}

                <h5 className=" tracking-[0px]">    {title}</h5>
        </div>
                <p className="text-[12px] font-[450] text-[#9BA2AC] tracking-[0px]">    {description}</p>
                  </div>
  )
}