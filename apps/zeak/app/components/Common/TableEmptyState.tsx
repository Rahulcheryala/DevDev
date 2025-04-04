
import { TbPlus } from 'react-icons/tb'
import { cn } from "@zeak/react"
interface TableEmptyStateProps {
  title: string,
  link?: string,
  className?: string,
  onClick?: () => void
}



export default function TableEmptyState({ title, className, onClick }: TableEmptyStateProps) {
  return (
    <div className={cn("relative w-full h-[553px]", className)}>

      <div className="w-full height-[553px] inset-0 bg-[#66d4CF] z-0 absolute opacity-10 rounded-zeak"></div>
      <div className="w-full height-[489px] bottom-0 right-0 top-[64px] left-0 bg-[#66d4CF] z-10 absolute opacity-10 rounded-zeak"></div>
      <div className="w-full height-[489px] bottom-0 right-0 top-[128px] left-0 bg-[#66d4CF] z-10 absolute opacity-[0.15] rounded-zeak"></div>
      <div className='bg-transparent absolute z-50 top-[160px] left-8 '>
        <div className="bg-white p-3 rounded-full h-[56px] w-[56px] ">
          <div className="block h-full " onClick={onClick}>
            <TbPlus className="w-8 h-8 " color="#000" />
          </div>
        </div>
        <h1 className="text-[#101828] text-[36px] mb-4 font-[450] tracking-[0px]">{title}</h1>
      </div>
    </div>

  )
}