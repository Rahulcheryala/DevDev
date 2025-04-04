"use client"
import { ChevronDown, Check } from 'lucide-react'
import { cn } from "@zeak/react"
import React from 'react'

export interface StepItem {
    title: string
    content: string
    subTitle?: string
}

export interface StepsProps {
    items: StepItem[]
    activeStep: number
    onStepChange: (step: number) => void
    className?: string
}

export default function Steps({
    items,
    activeStep,
    onStepChange,
    className
}: StepsProps) {
    return (
        <div className={cn("w-full", className)}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "rounded-lg transition-all bg-white py-[18px] px-[22px]",
                        {
                            "bg-[#FFDF41] rounded-t-none": activeStep === index,
                            "rounded-none": activeStep > index
                        }
                    )}
                >
                    <button
                      
                        className={cn("flex items-center justify-between w-full text-left", {
                            "mb-[22px]": activeStep === index,
                        })}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border text-sm font-medium">
                                {index + 1}
                            </div>
                            {activeStep !== index && <h3 className="text-[#475467] font-[400] text-[16px]">{item.title}</h3>}
                        </div>
                        {activeStep > index ? <Check className="text-[#28CD41]" /> : <ChevronDown
                            className={cn(
                                "h-4 w-4 shrink-0 transition-transform duration-200",
                                activeStep === index && "rotate-180"
                            )}
                        />}
                    </button>
                    {activeStep === index && (
                        <div className="">
                            <h1 className="text-[#475467] font-[400] text-[26px] mb-[22px] tracking-[0.2px]">{item.title}</h1>
                            <p className="text-sm text-gray-600">{item.subTitle}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
