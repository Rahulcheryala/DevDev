import {ScrollArea} from "@zeak/react"
import {Button} from "@zeak/react"

export default function ControlsContainer({children}:{children:React.ReactNode}) {
  return (<ScrollArea className="w-[300px] h-[calc(100vh-120px)] bg-gray-100">{children}
   <div className="flex justify-center items-center my-5 gap-5">
    <Button>
      Apply 
    </Button>
    <Button>
      Publish
    </Button>
   </div>
  
  </ScrollArea>)
}