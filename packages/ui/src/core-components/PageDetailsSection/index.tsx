import { useState, ReactNode } from 'react';
import { cn } from '../../utils';
import { Badge } from '../Badge';
import LabelledInput from '../LabelledInput';

export interface DefaultFormField {
    label: string;
    value: string;
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
    /** Initial edit state */
    defaultIsEditing?: boolean;
    /** Control edit state externally */
    isEditing?: boolean;
    /** Callback when edit state changes */
    onEditChange?: (isEditing: boolean) => void;
    /** Custom edit button */
    editButton?: ReactNode;
    /** Custom expand button */
    expandButton?: ReactNode;
    /** Children to render in the content area */
    children?: ReactNode;
    /** Whether the section can be edited */
    editable?: boolean;
    /** Whether the section can be expanded */
    expandable?: boolean;
    /** Default form fields */
    defaultFields?: DefaultFormField[][];
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

const DefaultFormContent = ({ fields, isEditing }: { fields: DefaultFormField[][], isEditing: boolean }) => (
    <div className="flex flex-col gap-10">
        {fields.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-6">
                {row.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="flex-1">
                        {!isEditing && <div className="flex items-center justify-between mb-1.5">
                            <label className="text-sm font-medium text-[#475467]">
                                {field.label}
                            </label>
                        </div>}
                        {field.type === 'badge' && field.badgeProps ? (
                            <Badge
                                items={field.badgeProps.items}
                                className={field.badgeProps.className}
                                defaultIcon={field.badgeProps.defaultIcon}
                                showIcon
                            />
                        ) : (
                            isEditing ? (
                                <LabelledInput
                                    id={field.label}
                                    name={field.label}
                                    label={field.label}
                                    placeholder={field.label}
                                    inputClassName="bg-[#F7F7F8] border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                                    type={field.type || 'text'}
                                    defaultValue={field.value}
                                    value={field.value}
                                    onChange={(e) => {
                                        console.log(e.target.value, 'e.target.value****')
                                    }}
                                    className="w-full h-full bg-transparent text-[#101828] focus:outline-none"
                                />
                            ) : (
                                <div className="h-11 px-3.5 flex items-center">
                                    <span className="text-[#101828]">{field.value}</span>
                                </div>
                            )
                        )}
                    </div>
                ))}
            </div>
        ))}
    </div>
);

export const PageDetailsSection = ({
    title = "General",
    className,
    defaultIsEditing = false,
    isEditing: controlledIsEditing,
    onEditChange,
    editButton,
    expandButton,
    children,
    editable = true,
    expandable = true,
    defaultFields = defaultFormFields,
}: PageDetailsSectionProps) => {
    const [isEditingInternal, setIsEditingInternal] = useState(defaultIsEditing);
    const [isExpanded, setIsExpanded] = useState(true);

    // Use controlled or uncontrolled editing state
    const isEditing = controlledIsEditing ?? isEditingInternal;

    const handleEditToggle = () => {
        const newState = !isEditing;
        setIsEditingInternal(newState);
        onEditChange?.(newState);
    };

    const defaultEditButton = (
        <button
            onClick={handleEditToggle}
            className="text-[#475467] hover:text-[#101828] transition-colors"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M12 20.0002H21M3 20.0002H4.67454C5.16372 20.0002 5.40832 20.0002 5.63849 19.945C5.84256 19.896 6.03765 19.8152 6.2166 19.7055C6.41843 19.5818 6.59138 19.4089 6.93729 19.063L19.5 6.50023C20.3285 5.6718 20.3285 4.32865 19.5 3.50023C18.6716 2.6718 17.3285 2.6718 16.5 3.50023L3.93726 16.063C3.59136 16.4089 3.4184 16.5818 3.29472 16.7837C3.18506 16.9626 3.10425 17.1577 3.05526 17.3618C3 17.5919 3 17.8365 3 18.3257V20.0002Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );

    const defaultExpandButton = (
        <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#475467] hover:text-[#101828] transition-colors"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={cn(
                    "transform transition-transform duration-200",
                    isExpanded ? "rotate-180" : ""
                )}
            >
                <path
                    d="M19 9L12 16L5 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );

    return (
        <div className={cn("flex w-full", className)}>
            {/* Title Section */}
            <div className="w-[400px] p-6 bg-[rgba(255,255,255,0.50)] rounded-l-xl">
                <h2 className="text-[28px] font-medium text-[#677281]">{title}</h2>
            </div>

            {/* Content Section */}
            <div className="flex-1 bg-white rounded-r-xl">
                {/* Header Actions */}
                <div className="flex justify-end p-6">
                    <div className="flex items-center gap-2">
                        {editable && (editButton || defaultEditButton)}
                        {expandable && (expandButton || defaultExpandButton)}
                    </div>
                </div>

                {/* Content Area */}
                {isExpanded && (
                    <div className="px-10 pb-6">
                        {children || <DefaultFormContent fields={defaultFields} isEditing={isEditing} />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PageDetailsSection;