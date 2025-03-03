import {  cn } from "@zeak/react"


export default function TemplateCard({name, onClick, selected}:{name:string, onClick:()=>void, selected:boolean}) {
  return (
     <div onClick={onClick} className={cn("flex   relative min-w-[273px] h-[156px] min-h-[156px] hover:cursor-pointer hover:border-[#1677FF] items-start content-start flex-wrap rounded-zeak border-[2px] bg-[#FFF]", {
      "border-[#1677FF]": selected
     })}>
              <div className="flex w-full h-full  flex-col p-2 ">
                <div className="px-4 h-10 items-center  flex text-sm font-medium">{name}</div>
               <div className="bg-gray-100 w-full h-full  flex-grow text-center justify-center items-center flex-1">
                <h3 className="text-sm font-medium">Template Preview</h3>
               </div>
              </div>
            </div>
  )
}