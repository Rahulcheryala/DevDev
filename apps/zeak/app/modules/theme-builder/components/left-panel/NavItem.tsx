import { Button, cn } from "@zeak/react"

export default function NavItem({title, onClick, active}: {title: string, onClick: () => void, active: boolean}) {
  return (
    <Button onClick={onClick} className={cn("px-3 h-12 rounded-zeak bg-gray-100 cursor-pointer w-full  text-black hover:bg-white shadow-sm", {
        "bg-white text-black hover:bg-opacity-90": active
       })}>
         {title}
       </Button>
  )
}