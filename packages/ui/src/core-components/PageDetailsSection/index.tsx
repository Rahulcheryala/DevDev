import { useState, ReactNode, useEffect } from 'react';
import { cn } from '../../utils';
import { Badge } from '../Badge';
import { Label } from '../../micro-components';
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, PenLine } from 'lucide-react';

export interface DefaultFormField {
    label: string;
    value: string | ReactNode;
    type?: 'text' | 'date' | 'badge';
    badgeProps?: {
        items: Array<{
            label: string;
            value: string;
            selected?: boolean;
        }>;
        className?: string;
        defaultIcon?: ReactNode;
    };
}

export interface PageDetailsSectionProps {
    /** Section title */
    title?: string;
    /** Custom class name for the container */
    className?: string;
    /** Custom class name for the label */
    labelClassName?: string;
    /** Custom class name for the value */
    valueClassName?: string;
    /** Custom edit button */
    editButton?: ReactNode;
    /** Whether the section is being edited */
    editing?: boolean;
    /** Custom edit click handler */
    onEditClick: () => void;
    /** Custom expand button */
    expandButton?: ReactNode;
    /** Whether the section is expanded by default */
    defaultIsExpanded?: boolean;
    /** Children to render in the content area */
    children?: ReactNode;
    /** Whether the section can be edited */
    editable?: boolean;
    /** Whether the section can be expanded */
    expandable?: boolean;
    /** Default form fields */
    defaultFields?: DefaultFormField[][];
    /** Editing form */
    editingForm?: ReactNode;
}

const defaultFormFields: DefaultFormField[][] = [
    [
        { label: "Company Name", value: "Marck & Co 1920", type: "text" },
        { label: "Company Code", value: "XCMA01", type: "text" }
    ],
    [
        { label: "Zeak URL", value: "marck&co1920.zeak.io", type: "text" },
        { label: "Company Website", value: "www.website.com", type: "text" }
    ],
    [
        {
            label: "Status",
            value: "active",
            type: "badge",
            badgeProps: {
                items: [{ label: "ACTIVE", value: "active", selected: false }],
                className: "text-[#007D1B]",
                defaultIcon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <rect x="1.5" y="1.5" width="9" height="9" rx="4.5" stroke="#31DE4B" strokeWidth="3" />
                        <circle cx="6" cy="6" r="3.75" fill="#31DE4B" stroke="white" strokeWidth="1.5" />
                    </svg>
                )
            }
        },
        {
            label: "Type",
            value: "system",
            type: "badge",
            badgeProps: {
                items: [{ label: "SYSTEM", value: "system", selected: true }],
                className: "rounded-[12px] bg-[#00FF7B] opacity-80 p-2 text-[#101828] font-[500] leading-[18px] tracking-[0.2px]",
                defaultIcon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="11.25" stroke="url(#paint0_linear_3528_243028)" strokeWidth="1.5" />
                        <path d="M8 17.2661C8 16.6315 8.19636 16.0159 8.56374 15.5019L14.4861 7.25177H15.9937C15.9937 7.88639 15.7973 8.50198 15.4236 9.00967L9.46952 17.2661H8Z" fill="url(#paint1_linear_3528_243028)" />
                        <path d="M14.4861 7.25177H8V8.93986H13.2763L14.4861 7.25177Z" fill="#8695C3" />
                        <path d="M9.46942 17.2663H15.9999V15.5782H10.6919" fill="#8695C3" />
                        <defs>
                            <linearGradient id="paint0_linear_3528_243028" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#01FF7B" />
                                <stop offset="1" stopColor="#0176E0" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_3528_243028" x1="11.7932" y1="7.25177" x2="8" y2="20.5279" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00FF7B" />
                                <stop offset="1" stopColor="#004DFF" />
                            </linearGradient>
                        </defs>
                    </svg>
                )
            }
        }
    ],
    [
        { label: "Start Date", value: "01 / 31 / 2024", type: "date" },
        { label: "End Date", value: "-- / -- / --", type: "date" }
    ]
];

const DefaultFormContent = ({ fields, labelClassName, valueClassName }: { fields: DefaultFormField[][], labelClassName: string, valueClassName: string }) => (
    <div className="flex flex-col gap-8">
        {fields.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-[1fr_1fr] gap-x-8">
                {row.map((field, fieldIndex) => (
                    <div key={fieldIndex} className='flex flex-col gap-2'>
                        <div>
                            <Label className={cn("text-sm font-semibold text-secondary-tertiary h-auto", labelClassName)}>
                                {field.label}
                            </Label>
                            {field.type === 'badge' && field.badgeProps && (
                                <Badge
                                    items={field.badgeProps.items}
                                    className={field.badgeProps.className}
                                    defaultIcon={field.badgeProps.defaultIcon}
                                    showIcon
                                />
                            )}
                        </div> 
                        <div className={cn("flex items-center", valueClassName)}>
                            <span className="text-accent-dark font-medium ">{field.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        ))}
    </div>
);

export const PageDetailsSection = ({
    title = "General",
    className,
    labelClassName,
    valueClassName,
    editButton,
    editing,
    onEditClick,
    expandButton,
    children,
    defaultIsExpanded = true,
    editable = true,
    expandable = true,
    defaultFields = defaultFormFields,
    editingForm,
}: PageDetailsSectionProps) => {
    // console.log("editing", editing);
    const [isExpanded, setIsExpanded] = useState(defaultIsExpanded);
    const [isEditing, setIsEditing] = useState(editing);

    useEffect(() => {
        setIsEditing(editing);
    }, [editing]);

    const handleEditToggle = () => {
        const newState = !isEditing;
        setIsEditing(newState);
        onEditClick();
    };

    const defaultEditButton = (
        <button
            onClick={handleEditToggle}
            className="text-[#475467] hover:text-[#101828] transition-colors"
        >
            <PenLine className="w-6 h-6 text-text-tertiary transition-transform duration-200" />
        </button>
    );

    const defaultExpandButton = (
        <button
            onClick={() => setIsExpanded(false)}
            className="text-[#475467] hover:text-[#101828] transition-colors"
        >
            <ChevronUp className="w-6 h-6 text-text-tertiary transition-transform duration-200" />
        </button>
    );

    return (
        <div className={cn("flex w-full rounded-zeak", className)}>
            {/* Title Section */}
            <div className="w-[400px] p-6 bg-[#F7F9FE] rounded-l-zeak">
                <h2 className="text-[26px] font-[450] text-secondary-tertiary">{title}</h2>
            </div>

            {/* Content Section */}
            <div className="flex-1 bg-white rounded-r-zeak">
                {/* Content Area */}
                <AnimatePresence mode="wait">
                {isExpanded ? (
                    <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="relative overflow-hidden"
                    >
                        <div className="px-10 py-8">
                            {isEditing ? editingForm : (
                                children || 
                                <DefaultFormContent 
                                    fields={defaultFields} 
                                    labelClassName={labelClassName} 
                                    valueClassName={valueClassName} 
                                />
                            )} 
                        </div>

                        {/* Header Actions */}
                        <div className="absolute top-[22px] right-6 z-20">
                            <div className="flex items-center gap-4">
                                {editable && (editButton || defaultEditButton)}
                                {expandable && (expandButton || defaultExpandButton)}
                            </div>
                        </div>
                    </motion.div>
                ): (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex justify-end px-10 relative"
                    >
                      <div className="absolute top-7 right-6 z-20">
                        <button onClick={() => setIsExpanded(true)}>
                          <ChevronDown className="w-6 h-6 text-text-tertiary 
                          transition-transform duration-200" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PageDetailsSection;