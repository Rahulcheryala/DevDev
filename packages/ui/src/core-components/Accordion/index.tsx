import { Children, useState } from 'react'
import { Edit, Trash2, Paperclip, ChevronDown } from 'lucide-react'
import * as Accordion from '@radix-ui/react-accordion'

import { cn } from '../../utils'
import { Badge } from './Badge'
import { Label } from './Label'

export interface CustomAccordiontProps {
    title?: string
    isDefault?: boolean
    isActive?: boolean
    defaultExpanded?: boolean
    // address?: {
    //     street: string
    //     city: string
    //     state: string
    //     zip: string
    // }
    // contact?: {
    //     name: string
    //     email: string
    //     phone: string
    // }
    onEdit?: (e: React.MouseEvent) => void
    onDelete?: (e: React.MouseEvent) => void
    onAttach?: (e: React.MouseEvent) => void
    onDotsClick?: (e: React.MouseEvent) => void
    // onMore?: (e: React.MouseEvent) => void
    className?: string
    children?: React.ReactNode
}

export function CustomAccordion({
    title = "Headquarters",
    isDefault = false,
    isActive = false,
    defaultExpanded = false,
    // address = {
    //     street: "1441 S Kostner Ave",
    //     city: "Chicago",
    //     state: "Illinois(IL)",
    //     zip: "60623"
    // },
    // contact = {
    //     name: "John Doe",
    //     email: "Johndoe@mail.com",
    //     phone: "+911234567809"
    // },
    onEdit,
    onDelete,
    onAttach,
    onDotsClick,
    // onMore,
    className,
    children
}: CustomAccordiontProps) {
    const [isEnabled, setIsEnabled] = useState(defaultExpanded);

    return (
        <Accordion.Root
            type="single"
            defaultValue={defaultExpanded ? "headquarters" : undefined}
            collapsible
            className={cn("w-full rounded-[12px] bg-[#F7F7F8] mb-6", className)}
        >
            <Accordion.Item value={title}>
                <div className="flex items-center justify-between w-full py-[8px] px-[24px] rounded-[12px] rounded-b-none bg-[#E5EAF2]">
                    <div className="flex items-center gap-4">
                        {/* <h3 className="font-['Suisse Int\'l'] text-[#0D0C22] text-[20px] leading-[28px] tracking-[0.2px] font-medium">
                            {title}
                        </h3> */}
                        <Label
                            htmlFor={title}
                            className="text-[#0D0C22] text-lg font-['Suisse Int\'l'] font-medium"
                        >
                            {title}
                        </Label>
                        {isDefault && (
                            <span className="bg-[#FFDF41] px-[12px] py-[4px] rounded-[200px] font-['Suisse Int\'l'] text-[#101828] text-[14px] tracking-[0.2px] font-[450]">
                                Default
                            </span>
                        )}
                        {isActive && (
                            // <span className="flex items-center gap-1">
                            //     <span className="w-1.5 h-1.5 bg-[#12B76A] rounded-full" />
                            //     <span className="text-[#12B76A] text-sm font-medium uppercase">
                            //         ACTIVE
                            //     </span>
                            // </span>
                            <Badge showIcon={true} items={[{ label: "ACTIVE", value: "ACTIVE", selected: false }]} className='bg-white text-[#28CD41] text-[14px] leading-[18px] tracking-[0.2px] font-medium' />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {onEdit && (
                            <button
                                onClick={onEdit}
                                className="p-2 text-[#475467] hover:text-[#101828] transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 20.0002H21M3 20.0002H4.67454C5.16372 20.0002 5.40832 20.0002 5.63849 19.945C5.84256 19.896 6.03765 19.8152 6.2166 19.7055C6.41843 19.5818 6.59138 19.4089 6.93729 19.063L19.5 6.50023C20.3285 5.6718 20.3285 4.32865 19.5 3.50023C18.6716 2.6718 17.3285 2.6718 16.5 3.50023L3.93726 16.063C3.59136 16.4089 3.4184 16.5818 3.29472 16.7837C3.18506 16.9626 3.10425 17.1577 3.05526 17.3618C3 17.5919 3 17.8365 3 18.3257V20.0002Z" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={onDelete}
                                className="p-2 text-[#475467] hover:text-[#101828] transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18.2987 16.5193L19 6H5L5.70129 16.5193C5.8065 18.0975 5.85911 18.8867 6.19998 19.485C6.50009 20.0118 6.95276 20.4353 7.49834 20.6997C8.11803 21 8.90891 21 10.4907 21H13.5093C15.0911 21 15.882 21 16.5017 20.6997C17.0472 20.4353 17.4999 20.0118 17.8 19.485C18.1409 18.8867 18.1935 18.0975 18.2987 16.5193Z" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10 10.5V15.5M14 10.5V15.5" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3 6H21" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9 3H15" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        )}
                        {onAttach && (
                            <button
                                onClick={onAttach}
                                className="p-2 text-[#475467] hover:text-[#101828] transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M17.5 5.25581V16.5C17.5 19.5376 15.0376 22 12 22C8.96243 22 6.5 19.5376 6.5 16.5V5.66667C6.5 3.64162 8.14162 2 10.1667 2C12.1917 2 13.8333 3.64162 13.8333 5.66667V16.4457C13.8333 17.4583 13.0125 18.2791 12 18.2791C10.9875 18.2791 10.1667 17.4583 10.1667 16.4457V6.65116" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        )}
                        {onDotsClick && (
                            <button
                                onClick={onDotsClick}
                                className="p-2 text-[#475467] hover:text-[#101828] transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="#475467" />
                                    <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" fill="#475467" />
                                    <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" fill="#475467" />
                                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        )}
                        <Accordion.Trigger className="p-2 text-[#475467] hover:text-[#101828] transition-colors" onClick={() => setIsEnabled(!isEnabled)}>
                            <ChevronDown className={cn("w-6 h-6 text-secondary transition-transform duration-200 data-[state=open]:rotate-180", {
                                "-rotate-90": !isEnabled,
                            })} />
                        </Accordion.Trigger>
                    </div>
                </div>
                <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden w-full p-[24px]">
                    {/* <div className="flex items-start">
                        <div className="flex flex-col gap-4">
                            <span className="text-sm font-medium text-[#475467] uppercase">
                                ADDRESS
                            </span>
                            <div className="text-[#101828]">
                                <p>{address.street}</p>
                                <p>{address.city}, {address.state}, {address.zip}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 ml-24">
                            <span className="text-sm font-medium text-[#475467] uppercase">
                                CONTACT
                            </span>
                            <div className="text-[#101828]">
                                <p>{contact.name}</p>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="text-[#007AF5] hover:underline"
                                    >
                                        {contact.email}
                                    </a>
                                    <span>|</span>
                                    <a
                                        href={`tel:${contact.phone}`}
                                        className="text-[#007AF5] hover:underline"
                                    >
                                        {contact.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onMore}
                            className="ml-auto flex items-center self-end gap-1 text-[#007AF5] hover:underline"
                        >
                            <span>MORE</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div> */}
                    {/* <div className='flex items-center justify-between'>
                        {children}
                        <button
                            onClick={onMore}
                            className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-normal tracking-[0.2px] text-[#007AFF] uppercase hover:underline flex self-end"
                        >
                            <span>MORE</span>
                            <ChevronDown className="w-5 h-5" />
                        </button>
                    </div> */}
                    {children}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    )
}