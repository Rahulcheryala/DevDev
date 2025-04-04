
import StartDateSelection from "./StartDateSelection";
import EndDateSelection from "./EndDateSelection";
import { StepHeader } from "../StepHeader";
import Note from "./Note";
export default function FrequencyEfficiencyForm() {
    return (<div className=" bg-white rounded-zeak px-[40px] 2xl:px-[60px]">
      <div className="space-y-8">
        <StepHeader title="Frequency And Effectivity" />
        <Note />
        <StartDateSelection />
        
        <EndDateSelection />
      </div>
    </div>)
}
