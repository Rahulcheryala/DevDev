import { useRef, useState } from "react";
import type { AddressData, DefaultFormField, FileItem } from '@zeak/ui';
import { PageViewHeader, PageDetailsSection, EditDetailsSection, Upload, ConfirmationModal } from '@zeak/ui';
import type { CalendarDate } from '@internationalized/date';
import { today, getLocalTimeZone } from '@internationalized/date';
import Auditor from "./components/Auditor";
import { AlertCircle, PlusIcon, DownloadIcon, X, ChevronDown, MoreHorizontal, Edit, Save } from "lucide-react";
import { useNavigate } from "@remix-run/react";
import { ActiveStep, Company, useCompanyEditStore } from "~/shared/companyEditStore";

const defaultAddressesData: AddressData[] = [
    {
        title: 'Headquarters',
        isPrimary: true,
        isActive: true,
        address: {
            street: '1441 S Kostner Ave',
            city: 'Chicago',
            state: 'Illinois(IL)',
            zip: '60623',
            country: 'United States'
        },
        contact: {
            name: 'John Doe',
            email: 'Johndoe@mail.com',
            phone: '+91-12345667809'
        },
        additionalContacts: [
            {
                name: 'Jane Smith',
                email: 'jane.smith@mail.com',
                phone: '+91-9876543210'
            },
            {
                name: 'Mike Johnson',
                email: 'mike.j@mail.com',
                phone: '+91-5555555555'
            }
        ]
    },
    {
        title: 'Shipping',
        isActive: false,
        address: {
            street: '1441 S Kostner Ave',
            city: 'Chicago',
            state: 'Illinois(IL)',
            zip: '60623',
            country: 'United States'
        },
        contact: {
            name: 'John Doe',
            email: 'Johndoe@mail.com',
            phone: '+91-12345667809'
        },
        additionalContacts: [
            {
                name: 'Sarah Wilson',
                email: 'sarah.w@mail.com',
                phone: '+91-1111111111'
            },
            {
                name: 'Tom Brown',
                email: 'tom.b@mail.com',
                phone: '+91-2222222222'
            }
        ]
    },
    {
        title: 'Billing',
        isActive: true,
        address: {
            street: '1441 S Kostner Ave',
            city: 'Chicago',
            state: 'Illinois(IL)',
            zip: '60623',
            country: 'United States'
        },
        contact: {
            name: 'John Doe',
            email: 'Johndoe@mail.com',
            phone: '+91-12345667809'
        },
        additionalContacts: [
            {
                name: 'Alex Davis',
                email: 'alex.d@mail.com',
                phone: '+91-3333333333'
            },
            {
                name: 'Emma White',
                email: 'emma.w@mail.com',
                phone: '+91-4444444444'
            }
        ]
    }
];

const GeneralSectionDefaultFormFields: DefaultFormField[][] = [
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
        }
    ],
    [
        { label: "Start Date", value: "01 / 31 / 2024", type: "date" },
        { label: "End Date(Optional)", value: "-- / -- / --", type: "date" }
    ]
];

const AdditionalInfoDefaultFormFields: DefaultFormField[][] = [
    [
        { label: "Primary Language", value: "EN-US", type: "text" },
        { label: "Timezone", value: "GMT-6:00 Central Timezone (US and Canada) ", type: "text" }
    ],
    [
        { label: "DUNS Number", value: "--", type: "text" },
        { label: "BBB Rating", value: "--", type: "text" }
    ],
    [
        { label: "Credit Rating", value: "--", type: "text" }
    ],
];

const FiscalPeriodDefaultFormFields: DefaultFormField[][] = [
    [
        { label: "From", value: "01 / 31 / 2024", type: "date" },
        { label: "To", value: "-- / -- / --", type: "date" }
    ]
];

const initialFiles = [
    {
        id: '1',
        name: 'company_profile.pdf',
        size: '2.4 MB',
        type: 'PDF',
        uploadDate: 'Dec 12, 2023'
    },
    {
        id: '2',
        name: 'financial_report_2023.xlsx',
        size: '1.8 MB',
        type: 'Excel',
        uploadDate: 'Dec 15, 2023'
    },
    {
        id: '3',
        name: 'presentation.pptx',
        size: '5.2 MB',
        type: 'PowerPoint',
        uploadDate: 'Dec 18, 2023'
    },
    {
        id: '4',
        name: 'very_long_filename_for_testing_truncation.pdf',
        size: '3.7 MB',
        type: 'PDF',
        uploadDate: 'Dec 19, 2023'
    }
]

export default function MainContent({
    // company,
    // companyCount,
    // onPrevClick,
    // onNextClick,
    // activeSection,
    // isEditing,
    // setIsEditing,
    onSave
}: {
    // company: any;
    // companyCount: number;
    // onPrevClick: (id: number) => void;
    // onNextClick: (id: number) => void;
    // activeSection: string;
    // isEditing: boolean;
    // setIsEditing: (value: boolean) => void;
    onSave: (data: any) => void;
}) {
    const { companies, setCompanies, currentCompanyId, setCurrentCompanyId, activeSection, isEditing, setIsEditing } = useCompanyEditStore();
    const companyListRef = useRef<Company[]>(companies);
    const company = companies.find((company) => company.id === currentCompanyId);
    const companyCount = companies.length;

    const formRef = useRef<HTMLFormElement>(null);
    const [addresses, setAddresses] = useState<AddressData[]>(defaultAddressesData);
    const [startDate, setStartDate] = useState<CalendarDate | null>(today(getLocalTimeZone()));
    const [endDate, setEndDate] = useState<CalendarDate | null>(today(getLocalTimeZone()).add({ days: 7 }));
    const [startDateError, setStartDateError] = useState<string>('');
    const [endDateError, setEndDateError] = useState<string>('');
    const [doesNotExpire, setDoesNotExpire] = useState<boolean>(false);
    const [files, setFiles] = useState<FileItem[]>(initialFiles)
    const [lastAction, setLastAction] = useState<string | null>(null)
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();

    function formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
    }

    function getFileType(mimeType: string): string {
        if (mimeType.includes('pdf')) return 'PDF'
        if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return 'Excel'
        if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'PowerPoint'
        if (mimeType.includes('png')) return 'PNG'
        if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'JPEG'
        return 'Unknown'
    }

    const handleFileUpload = (newFiles: FileList) => {
        const fileArray = Array.from(newFiles).map((file, index) => ({
            id: `new-${Date.now()}-${index}`,
            name: file.name,
            size: formatFileSize(file.size),
            type: getFileType(file.type),
            url: URL.createObjectURL(file),
            uploadDate: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })
        }))
        setFiles(prev => [...prev, ...fileArray])
        setLastAction(`Uploaded ${fileArray.length} file(s)`)
    }

    const handleFileDelete = (fileId: string) => {
        setFiles(prev => {
            const deletedFile = prev.find(file => file.id === fileId)
            const newFiles = prev.filter(file => file.id !== fileId)

            // Revoke object URL if it exists
            if (deletedFile?.url) {
                URL.revokeObjectURL(deletedFile.url)
            }

            setLastAction(`Deleted file: ${deletedFile?.name || fileId}`)
            return newFiles
        })
    }

    const handleFileView = (fileId: string) => {
        const file = files.find(f => f.id === fileId)
        if (file) {
            setLastAction(`Viewed file: ${file.name}`)
            if (file.url) {
                window.open(file.url, '_blank')
            }
        }
    }

    const validateDates = (start: CalendarDate | null, end: CalendarDate | null) => {
        if (!start && !end) return;

        if (start && end && end.compare(start) <= 0) {
            setEndDateError('End date must be after start date');
        } else {
            setEndDateError('');
        }
    };

    const handleStartDateChange = (date: CalendarDate | null) => {
        setStartDate(date);
        setStartDateError('');
        validateDates(date, endDate);
    };

    const handleEndDateChange = (date: CalendarDate | null) => {
        setEndDate(date);
        setEndDateError('');
        validateDates(startDate, date);
    };

    const toggleDoesNotExpire = () => {
        setDoesNotExpire(!doesNotExpire);
    };

    const handleEditClick = async () => {
        if (isEditing) {
            // If we're currently editing, trigger form submission
            formRef.current?.dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true })
            );
        } else {
            setIsEditing(true);
        }
    };

    const handleSave = async (data: any) => {
        setIsEditing(true);
        // optimistic update
        setCompanies(companies);

        // async update and handle error - optimistic update will be reverted in case of error
        handleSave(companies);
        try {
            setIsSaving(true);
            const response: { data: Company[], success: boolean } = await onSave(data);
            // if (response.success) {
            if (true) {
                // setCompanies(response.data);
                setCompanies(companies);
            }
        } catch (error) {
            console.error("Error saving data:", error);
            // revert optimistic update
            setCompanies(companyListRef.current);
        } finally {
            setIsSaving(false);
            setIsEditing(false);
        }
    };

    return (
        // <div className="flex-1 p-6">
        //     <div className="flex justify-between mb-6">
        //         <h2 className="text-2xl font-semibold">{company.name}</h2>
        //         <Button
        //             variant="ghost"
        //             onClick={handleEditClick}
        //         >
        //             <Edit3 className="w-5 h-5 mr-2" />
        //             {isEditing ? 'Save' : 'Edit'}
        //         </Button>
        //     </div>
        //     {renderSection()}
        // </div>
        <>
            <ConfirmationModal
                type="warning"
                title="Warning"
                message="You're about to leave this page. All changes will be lost. Continue?"
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onRightButtonClick={() => {
                    setIsConfirmationModalOpen(false);
                    navigate("/x/access-settings/companies");
                }}
                onLeftButtonClick={() => {
                    setIsConfirmationModalOpen(false);
                }}
            />
            <div className="flex-1 bg-[#F7F7F8] flex flex-col">
                <div className="bg-gray-50">
                    <PageViewHeader
                        onGoBack={() => navigate("/x/access-settings/companies")}
                        organization={[{
                            label: "Organization",
                            link: "/x/access-settings/companies"
                        }, {
                            label: "Companies"
                        }]}
                        title={company?.generalInfo.companyName || ''}
                        showLogo={true}
                        showTitleDropdown={true}
                        onTitleDropdownClick={() => { console.log("Title dropdown clicked") }}
                        status={company?.generalInfo.status as "active" | "inactive" | undefined}
                        metadata={{
                            since: company?.since || today(getLocalTimeZone()),
                            departments: ["PFIZER EU", "PFIZER SALES"],
                            email: "OLIVIA.HILLS@ZEAK.IO",
                            phone: "522-799-0171"
                        }}
                        navigationTabs={[
                            {
                                label: "General",
                                value: "General",
                            },
                            {
                                label: "Team",
                                value: "Team",
                            },
                            {
                                label: "Settings",
                                value: "Settings",
                            },
                            {
                                label: "Permissions",
                                value: "Permissions",
                                disabled: true,
                            },
                        ]}
                        showNavigation={true}
                        prevItem="Previous"
                        nextItem="Next"
                        activePage={Number(company?.id)}
                        totalItems={companyCount}
                        onPrevClick={(id: number) => { setCurrentCompanyId(id) }}
                        onNextClick={(id: number) => { setCurrentCompanyId(id) }}
                        notes={{
                            icon: AlertCircle,
                            label: "Notes title",
                            onClick: () => { console.log("Notes clicked") }
                        }}
                        topActions={{
                            customContent: (
                                <>
                                    {
                                        isEditing ? (
                                            <div role="button" tabIndex={0} aria-label="Edit" className="flex items-center h-12 px-6 text-[#fffff] bg-[#1677FF] rounded-[8px] font-['Suisse_Int'l'] text-sm font-[450] leading-5 tracking-[0.2px]" onClick={handleSave}>
                                                <Save className="h-4 w-4 mr-1.5" />
                                                Save
                                            </div>
                                        ) : (
                                            <div role="button" tabIndex={0} aria-label="Edit" className="flex items-center h-12 px-6 text-[#475467] font-['Suisse_Int'l'] text-sm font-[450] leading-5 tracking-[0.2px]" onClick={() => { setIsEditing(true); }}>
                                                <Edit className="h-4 w-4 mr-1.5" />
                                                Edit
                                            </div>
                                        )
                                    }
                                    <div role="button" tabIndex={0} aria-label="Actions" className="flex items-center h-12 px-6 text-[#475467] font-['Suisse_Int'l'] text-sm font-[450] leading-5 tracking-[0.2px]" onClick={() => { console.log("Actions") }}>
                                        <span className="mr-1">Actions</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                    <div role="button" tabIndex={0} aria-label="Close" className="text-gray-500 min-w-8 h-8 px-2" onClick={() => { setIsConfirmationModalOpen(true) }}>
                                        <X className="h-6 w-6 text-[#677281]" />
                                    </div>
                                </>
                            )
                        }}
                    />
                </div>

                {activeSection === ActiveStep.GENERAL && (
                    <>
                        {/* Main Content */}
                        <div className="flex flex-col flex-1">
                            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                                <PageDetailsSection title='General' defaultFields={GeneralSectionDefaultFormFields} onEditChange={() => {
                                    console.log("General Section Edited")
                                }} />
                                <EditDetailsSection editable={true} expandable={true} title='Addresses' addresses={addresses} onEditChange={() => {
                                    console.log("Addresses Section Edited")
                                }} />
                                <PageDetailsSection title='Additional Info' defaultFields={AdditionalInfoDefaultFormFields} onEditChange={() => {
                                    console.log("Additional Info Section Edited")
                                }} />
                                <PageDetailsSection title='Fiscal Period' defaultFields={FiscalPeriodDefaultFormFields} onEditChange={() => {
                                    console.log("Fiscal Period Section Edited")
                                }} />
                                <Upload
                                    containerWidth="w-full"
                                    files={files}
                                    onFileUpload={handleFileUpload}
                                    onFileDelete={handleFileDelete}
                                    onFileView={handleFileView}
                                />
                            </div>
                            <div className="sticky bottom-0 p-6 bg-[#F7F7F8]">
                                <Auditor />
                            </div>
                        </div>
                    </>
                )}

                {
                    activeSection === ActiveStep.TEAMS && (
                        <>
                            <div>Teams Section</div>
                        </>
                    )
                }
            </div>
        </>
    );
}