
import Step from './Step'
import { RxSlash } from 'react-icons/rx'

interface ProgressProps {
  breadcrumbs: string [],
  description: string,
  currentStep: number,
  steps: {
    id: number,
    title: string,
    description: string,
    isSkipped?:boolean,
    isRequired?:boolean
  }[]
  
}

export default function Progress({breadcrumbs,description,currentStep,steps}:ProgressProps) {
  return (
    <div className="flex flex-col xl:min-w-[384px] xl:w-[384px] 2xl:min-w-[506px] 2xl:w-[506px]  rounded-zeak" >
  <div className="bg-white rounded-t-zeak space-y-3  py-[15px] px-[22px] ">
    <div className="">
        <div
          className={`h-full w-full`}
        >
          <div className=" bg-white w-full mb-2 rounded-md">
            {/* New Breadcumbs */}
            <ul className="grid grid-flow-col auto-cols-max gap-1 text-secondary">
           {breadcrumbs.map((breadcrumb, index) => (
         <div className="flex items-center gap-1" key={index}>
        <li>
            <span className="text-accent text-sm leading-[22px] text-[#475467]">
                {breadcrumb}
            </span>
        </li>
         {index !== breadcrumbs.length - 1 && ( // Check if it's not the last item
        <li>
        <span className="text-secondary text-base leading-[20px] h-[24px] flex items-center justify-center">
          <RxSlash />
        </span>
      </li>
    )}
    </div>
    ))}
            </ul>
                {/* New Breadcumbs */}
            <h1 className="text-[22px] font-[400]  text-secondary">{description}  </h1>
          </div>
        </div>
      </div>
    </div>
      {steps.map((step,index)=>(
        <Step key={index} isActive={index===currentStep} isSkipped={step.isSkipped} isRequired={step.isRequired} passed={index<currentStep} id={step.id} title={step.title} description={step.description} />
      ))}
    </div>
  )
}

