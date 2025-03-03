import InputPreview from "./InputPreview"
import InputControls from "./InputControls"

export default function Inputs() {
    return (<div className="flex  gap-2 w-full h-full ">
        <div className="flex flex-col gap-2 w-3/4 items-center">
            <InputPreview />
        </div>
        <div className="flex flex-col gap-2 w-1/4 items-center">
            <InputControls />
        </div>
    </div>)
}