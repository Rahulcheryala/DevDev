import React from 'react'
import TopSection, { TopSectionProps } from './TopSection'
import Steps, { StepsProps } from './Steps'
import { cn } from '../../utils'

export interface ProgressSidebarProps {
    topSection: TopSectionProps
    steps: StepsProps
    className?: string
}

export default function ProgressSidebar({
    topSection,
    steps,
    className
}: ProgressSidebarProps) {
    return (
        <div className={cn("flex flex-col xl:min-w-[384px] xl:w-[384px] 2xl:min-w-[506px] 2xl:w-[506px] rounded-zeak", className)} >
            <TopSection
                breadcrumbs={topSection.breadcrumbs}
                title={topSection.title}
                LinkComponent={topSection.LinkComponent}
                className={topSection.className}
            />
            <Steps
                items={steps.items}
                activeStep={steps.activeStep}
                onStepChange={steps.onStepChange}
                className={steps.className}
            />
        </div>
    )
}

export { type TopSectionProps } from './TopSection'
export { type StepsProps } from './Steps'