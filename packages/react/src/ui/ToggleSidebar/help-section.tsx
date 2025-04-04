import { useState } from 'react'
import { DotIcon } from '~/components/Common/icons'
import { MenuIcons } from '~/components/Common/icons/menu-icons'
import type { HelpSectionProps } from '~/components/Common/types/types'
import { cn } from '~/components/Common/Utils'

export function HelpSection({ isCollapsed, title, slides }: HelpSectionProps) {
    const [activeSlide, setActiveSlide] = useState(0)

    return (
        <div className="flex flex-col">
            {!isCollapsed && (
                <div className="mx-4 mb-4 p-4 rounded-xl bg-[#FFDF41] flex flex-col gap-3 h-[120px]">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[#101828] font-['Suisse_Int\\'l'] text-base font-medium leading-4">
                            {title}
                        </h3>
                        <div className="flex gap-1">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveSlide(index)}
                                    className="text-[#101828] focus:outline-none"
                                >
                                    <DotIcon active={activeSlide === index} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="text-[#475467] font-['Suisse_Int\\'l'] text-xs leading-4">
                        {slides[activeSlide]}
                    </p>
                </div>
            )}

            {/* Bottom Menu Items */}
            <div className="border-t border-[#EAECF0] pt-4 pb-4">
                <div className={cn(
                    !isCollapsed ? "px-4" : ""
                )}>
                    <button className="flex items-center w-full px-4 h-[56px] hover:bg-white hover:rounded-[30px_12px_12px_30px] hover:shadow-[0px_0px_15px_0px_rgba(132,188,218,0.30)] group">
                        <div className="flex items-center justify-center w-10 h-10 group-hover:bg-white group-hover:rounded-full">
                            <MenuIcons.AllApps className="group-hover:hidden" />
                            <MenuIcons.AllAppsHover className="hidden group-hover:block" />
                        </div>
                        {!isCollapsed && (
                            <span className="ml-3 font-['Suisse_Int\\'l'] text-base font-normal text-[#475467]">
                                All Apps
                            </span>
                        )}
                    </button>
                    <button className="flex items-center w-full px-4 h-[56px] hover:bg-white hover:rounded-[30px_12px_12px_30px] hover:shadow-[0px_0px_15px_0px_rgba(132,188,218,0.30)] group">
                        <div className="flex items-center justify-center w-10 h-10 group-hover:bg-white group-hover:rounded-full">
                            <MenuIcons.Help className="group-hover:hidden" />
                            <MenuIcons.HelpHover className="hidden group-hover:block" />
                        </div>
                        {!isCollapsed && (
                            <span className="ml-3 font-['Suisse_Int\\'l'] text-base font-normal text-[#475467]">
                                Help
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}