import React, { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, AlertCircle, Home, Settings, User, CheckIcon } from 'lucide-react';

import Avatar from '~/components/Globals/Avatar';
import ActionMenuDemo from './ActionMenuDemo';
import MenuLabel from '~/components/Globals/MenuLabel';
import { PrimaryInput, PhoneInput } from '~/components/Globals/Input';
import MultiSelectDemo from './MultiSelectDemo';
import SignupHeader from '~/components/Globals/SignupHeader';
import DropdownDemo from './DropdownDemo';
import PageHeaderDemo from './PageHeaderDemo';
import MainMenu from '~/components/Globals/MainMenu';

import TableEmptyState from '~/components/Globals/TableEmptyState';
import SectionHeader from '~/components/Globals/SectionHeader';
import { Checkbox } from '~/components/Globals/Checkbox';
import DatePicker from '~/components/Globals/DatePicker';
import ModalFooter from '~/components/Globals/ModalFooter';
import Progress from '~/components/Globals/Progress';
import ProgressBar from '~/components/Globals/ProgressBar';
import { Table, Thead, Tbody, Tr, Th, Td } from '~/components/Globals/Table';
import TableCaption from '~/components/Globals/TableCaption';
import DragTableColumn from '~/components/Globals/DragTableColumn';
import Toaster from '~/components/Globals/Toaster';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/Globals/Tooltip';
import Switch from '~/components/Globals/Switch';
import { Breadcrumbs, BreadcrumbItem, BreadcrumbLink } from '~/components/Globals/Breadcrumbs';
import { MultiSelect } from '~/components/Globals/MultiSelect';
import TableDemo from './TableDemo';
import { NextSteps } from '~/components/Globals/NextSteps';
import { AccordionComponent } from '~/components/Globals/AccordionComponent';

type GlobalComponentsProps = {
    children: React.ReactNode;
};

type AccordionItem = {
    id: string;
    title: string;
    content: React.ReactNode;
    codeExample?: string;
    figmaLink?: string;
    createdBy: string;
};

type ComponentShowcaseProps = {
    items: AccordionItem[];
    defaultOpenItem?: string;
};

const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({ items, defaultOpenItem }) => {
    const [openCode, setOpenCode] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopyToClipboard = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const handleFigmaClick = (link: string) => {
        window.open(link, '_blank');
    };

    return (
        <Accordion.Root type="single" collapsible defaultValue={defaultOpenItem} className="space-y-4">
            {items.map((item) => (
                <Accordion.Item
                    key={item.id}
                    value={item.id}
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-lg"
                >
                    <Accordion.Trigger className="w-full h-[60px] flex items-center justify-between px-4 bg-[#F0F4FD] hover:bg-[#E4EAF5] transition-colors group">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-medium">{item.title}</h2>
                            <span className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                Created by {item.createdBy}
                            </span>
                        </div>
                        <ChevronDown className="w-5 h-5 transition-transform duration-200 ease-out transform ui-expanded:rotate-180" />
                    </Accordion.Trigger>
                    <Accordion.Content className="bg-[#F0F4FD]">
                        <div className={`flex items-center gap-28 p-10 border-t border-gray-200 relative ${item.id === 'multi-select' ? 'h-[300px] justify-center' : ''}`}>
                            {item.content}
                        </div>
                        {(item.codeExample || item.figmaLink) && (
                            <div className="px-10 pb-4 flex justify-end gap-4">
                                {item.figmaLink && (
                                    <button
                                        className="px-4 py-2 bg-white text-black border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                                        onClick={() => handleFigmaClick(item.figmaLink!)}
                                    >
                                        Figma
                                    </button>
                                )}
                                {item.codeExample && (
                                    <button
                                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                                        onClick={() => setOpenCode(openCode === item.id ? null : item.id)}
                                    >
                                        {openCode === item.id ? 'Hide Code' : 'Show Code'}
                                    </button>
                                )}
                            </div>
                        )}
                        {openCode === item.id && (
                            <div className="relative mx-10 mb-4">
                                <pre className="bg-gray-100 p-4 rounded">
                                    {item.codeExample}
                                </pre>
                                <button
                                    onClick={() => handleCopyToClipboard(item.codeExample!, item.id)}
                                    className="absolute top-2 right-2 px-3 py-1 text-sm bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-50 transition-colors"
                                >
                                    {copiedId === item.id ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        )}
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    );
};

export const GlobalComponents: React.FC<GlobalComponentsProps> = ({ children }) => {
    const showcaseItems: AccordionItem[] = [
        {
            id: 'input',
            title: 'Input',
            createdBy: 'Vishal Singh',
            figmaLink: 'https://www.figma.com/design/b3k8czEuBqWkZxrA1vE1FT/Main-Components?node-id=13638-36831&p=f&t=bxYikf1HHkW7WuyG-0',
            content: (
                <div className='flex items-center gap-28'>
                    <PrimaryInput
                        placeholder="Enter text..."
                        name="primary"
                        id="primary"
                    />
                    <PhoneInput
                        name="phone"
                        id="phone"
                    />
                    <PhoneInput
                        value="test"
                        errorMessage="Phone number must contain only digits"
                        name="phone-error"
                        id="phone-error"
                    />
                </div>
            ),
            codeExample: `import { PrimaryInput, PhoneInput } from '~/components/Globals/Input';\n
<PrimaryInput 
    placeholder="Enter text..."
    name="primary"
    id="primary"
/>
<PhoneInput 
    name="phone"
    id="phone"
/>
<PhoneInput 
    value="test" 
    errorMessage="Phone number must contain only digits"
    name="phone-error"
    id="phone-error"
/>`
        },
        {
            id: 'multi-select',
            title: 'InputMultiSelect',
            createdBy: 'Vishal Singh',
            figmaLink: 'https://www.figma.com/design/b3k8czEuBqWkZxrA1vE1FT/Main-Components?node-id=13638-36831&p=f&t=bxYikf1HHkW7WuyG-0',
            content: <MultiSelectDemo />,
            codeExample: `import { MultiSelectInput } from "~/components/Globals/Input";
import type { Option } from "~/components/Common/types/multi-select-input-types";

const MultiSelectDemo = () => {
    const companies: Option[] = [
        { id: '1', value: '1', label: 'Pfizer USA', isPrimary: true },
        { id: '2', value: '2', label: 'Pfizer India' },
        { id: '3', value: '3', label: 'Pfizer Argentina' },
        { id: '4', value: '4', label: 'Pfizer Canada' },
        { id: '5', value: '5', label: 'Pfizer Brazil' },
        { id: '6', value: '6', label: 'Pfizer Mexico' },
        { id: '7', value: '7', label: 'Pfizer Chile' },
    ];

    const handleChange = (selected: Option[]) => {
        console.log('Selected:', selected);
    };

    return (
        <MultiSelectInput
            options={companies}
            onChange={handleChange}
        />
    );
}

export default MultiSelectDemo;`
        },
        {
            id: 'avatar',
            title: 'Avatar',
            createdBy: 'Vishal Singh',
            figmaLink: 'https://www.figma.com/design/75kPGCeneXLoiC4u7Aac8m/Table-kit?node-id=1246-6709&t=ntbVjci5hrq99FN4-4',
            content: (
                <div className='flex items-center gap-28'>
                    <Avatar src="https://github.com/shadcn.png" size='sm' fallback="VS" alt="User Avatar" className="ring-2 ring-gray-100" />
                    <Avatar src="https://github.com/shadcn.png" fallback="VS" alt="User Avatar" className="ring-2 ring-gray-100" />
                    <Avatar src="https://github.com/shadcn.png" size='lg' fallback="VS" alt="User Avatar" className="ring-2 ring-gray-100" />
                    <Avatar src="https://github.com/shadcn.png" size='xl' fallback="VS" alt="User Avatar" className="ring-2 ring-gray-100" />
                    <Avatar src="https://github.com/shadcn.png" size={80} fallback="VS" alt="User Avatar" className="ring-2 ring-gray-100" />
                    <Avatar />
                    <Avatar fallback="VS" alt="User Avatar" className="ring-2 ring-gray-100 text-white" />
                </div>
            ),
            codeExample: `import Avatar from '~/components/Globals/Avatar';\n
<Avatar 
    src="https://github.com/shadcn.png" 
    size='sm' 
    fallback="VS" 
    alt="User Avatar" 
    className="ring-2 ring-gray-100" 
/>
<Avatar 
    src="https://github.com/shadcn.png" 
    fallback="VS" 
    alt="User Avatar" 
    className="ring-2 ring-gray-100" 
/>
<Avatar 
    src="https://github.com/shadcn.png" 
    size='lg' 
    fallback="VS" 
    alt="User Avatar" 
    className="ring-2 ring-gray-100" 
/>
<Avatar 
    src="https://github.com/shadcn.png" 
    size='xl' 
    fallback="VS" 
    alt="User Avatar" 
    className="ring-2 ring-gray-100" 
/>
<Avatar 
    src="https://github.com/shadcn.png" 
    size={80} 
    fallback="VS" 
    alt="User Avatar" 
    className="ring-2 ring-gray-100" 
/>
<Avatar 
    fallback="VS" 
    alt="User Avatar" 
    className="ring-2 ring-gray-100" 
/>`
        },
        {
            id: 'signupheader',
            title: 'SignupHeader',
            createdBy: 'Vishal Singh',
            figmaLink: 'https://www.figma.com/design/b3k8czEuBqWkZxrA1vE1FT/Main-Components?node-id=13602-78067&p=f&t=bxYikf1HHkW7WuyG-0',
            content: <SignupHeader />,
            codeExample: `import SignupHeader from '~/components/Globals/SignupHeader';\n
<SignupHeader />`
        },
        {
            id: 'dropdown',
            title: 'Dropdown',
            createdBy: 'Vishal Singh',
            figmaLink: 'https://www.figma.com/design/b3k8czEuBqWkZxrA1vE1FT/Main-Components?node-id=13848-38734&p=f&t=bxYikf1HHkW7WuyG-0',
            content: <DropdownDemo />,
            codeExample: `import { Edit, Plus } from 'lucide-react';
import Dropdown from '~/components/Globals/Dropdown';\n
const dropdownItems = [
    {
        icon: Edit,
        label: 'Edit',
        onClick: () => console.log('Edit clicked')
    },
    {
        icon: Edit,
        label: 'Duplicate',
        onClick: () => console.log('Duplicate clicked')
    },
    {
        icon: Edit,
        label: 'View',
        onClick: () => console.log('View clicked')
    },
    {
        icon: Edit,
        label: 'Disable',
        onClick: () => console.log('Disable clicked')
    },
    {
        icon: Plus,
        label: 'NEW',
        onClick: () => console.log('New clicked'),
        variant: 'primary' as const
    }
];\n
<Dropdown 
    items={dropdownItems}
    className="w-fit"
/>`
        },
        {
            id: 'pageheader',
            title: 'PageHeader',
            createdBy: 'Vishal Singh',
            figmaLink: 'https://www.figma.com/design/b3k8czEuBqWkZxrA1vE1FT/Main-Components?node-id=1901-219101&t=bxYikf1HHkW7WuyG-4',
            content: <PageHeaderDemo />,
            codeExample: `import PageHeader from '~/components/Globals/PageHeader';\n
<PageHeader
            organization="Organization / Users"
            title="Chemical Synthesis"
            status="active"
            metadata={{
                since: "AUGUST 2024",
                departments: ["PFIZER EU", "PFIZER SALES"],
                email: "OLIVIA.HILLS@ZEAK.IO",
                phone: "522-799-0171"
            }}
            navigationTabs={["Text", "Text", "Text", "Text", "Text", "Text", "Text", "Text"]}
            currentPage={5}
            totalPages={32}
        />`
        },
        {
            id: 'mainmenu',
            title: 'MainMenu',
            createdBy: 'Vishal Singh',
            figmaLink: 'https://www.figma.com/design/b3k8czEuBqWkZxrA1vE1FT/Main-Components?node-id=13736-35742&p=f&t=bxYikf1HHkW7WuyG-0',
            content: <MainMenu />,
            codeExample: `import MainMenu from '~/components/Globals/MainMenu';\n
<MainMenu />`
        },
        {
            id: 'tableemptystate',
            title: 'TableEmptyState',
            createdBy: 'Sadman Shakib',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: <TableEmptyState title="No items found" link="#" />,
            codeExample: `import TableEmptyState from '~/components/Common/TableEmptyState';\n
<TableEmptyState 
    title="No items found"
    link="#"
    className="your-custom-class" // optional
/>`
        },
        {
            id: 'sectionheader',
            title: 'SectionHeader',
            createdBy: 'Sadman Shakib',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: (
                <div className="flex flex-col gap-4">
                    <SectionHeader title="Collapsed Section" isExpanded={false} />
                    <SectionHeader title="Expanded Section" isExpanded={true} expandedHeight={200} />
                </div>
            ),
            codeExample: `import SectionHeader from '~/components/Common/SectionHeader';\n
<SectionHeader 
    title="Collapsed Section"
    isExpanded={false}
/>

<SectionHeader 
    title="Expanded Section"
    isExpanded={true}
    expandedHeight={200} // optional, defaults to 400
    className="custom-class" // optional
/>`
        },
        {
            id: 'checkbox',
            title: 'Checkbox',
            createdBy: 'Sadman Shakib',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: (
                <div className="flex items-center gap-8">
                    <Checkbox />
                    <Checkbox isChecked={true} />
                    <Checkbox isIndeterminate={true} />
                    <Checkbox disabled />
                    <Checkbox disabled isChecked={true} />
                </div>
            ),
            codeExample: `import { Checkbox } from '~/components/Common/Checkbox';\n
// Default unchecked
<Checkbox />

// Checked state
<Checkbox isChecked={true} />

// Indeterminate state
<Checkbox isIndeterminate={true} />

// Disabled state
<Checkbox disabled />

// Disabled checked state
<Checkbox disabled isChecked={true} />

// With onChange handler
<Checkbox onCheckedChange={(checked) => console.log(checked)} />`
        },
        {
            id: 'datepicker',
            title: 'DatePicker',
            createdBy: 'Sadman Shakib',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: (
                <div className="flex items-center gap-8">
                    <DatePicker />
                </div>
            ),
            codeExample: `import DatePicker from '~/components/Common/DatePicker/DatePicker';\n
// Basic usage
<DatePicker />

// With custom onChange handler
<DatePicker onChange={(date) => console.log(date)} />

// With default value
<DatePicker defaultValue={new Date()} />

// With disabled state
<DatePicker disabled />`
        },
        {
            id: 'modalfooter',
            title: 'ModalFooter',
            createdBy: 'Sadman Shakib',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: (
                <div className="w-full">
                    <ModalFooter
                        currentPage={0}
                        totalItems={100}
                        pageSize={10}
                        onPageChange={(page) => console.log('Page changed:', page)}
                        onPageSizeChange={(size) => console.log('Page size changed:', size)}
                    />
                </div>
            ),
            codeExample: `import ModalFooter from '~/components/Common/ModalFooter';\n
<ModalFooter 
    currentPage={0} // Current active page (0-based index)
    totalItems={100} // Total number of items
    pageSize={10} // Number of items per page
    onPageChange={(page) => console.log('Page changed:', page)}
    onPageSizeChange={(size) => console.log('Page size changed:', size)}
    className="your-custom-class" // optional
/>`
        },
        {
            id: 'progress',
            title: 'Progress',
            createdBy: 'Sadman Shakib',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: (
                <Progress
                    breadcrumbs={['Home', 'Settings', 'Profile']}
                    description="Complete your profile"
                    currentStep={1}
                    steps={[
                        {
                            id: 1,
                            title: "Personal Information",
                            description: "Fill in your personal details",
                            isRequired: true
                        },
                        {
                            id: 2,
                            title: "Company Details",
                            description: "Add your company information",
                            isRequired: true
                        },
                        {
                            id: 3,
                            title: "Additional Info",
                            description: "Optional additional information",
                            isSkipped: true
                        }
                    ]}
                />
            ),
            codeExample: `import Progress from '~/components/Common/Progress';\n
<Progress 
    breadcrumbs={['Home', 'Settings', 'Profile']}
    description="Complete your profile"
    currentStep={1}
    steps={[
        {
            id: 1,
            title: "Personal Information",
            description: "Fill in your personal details",
            isRequired: true
        },
        {
            id: 2,
            title: "Company Details",
            description: "Add your company information",
            isRequired: true
        },
        {
            id: 3,
            title: "Additional Info",
            description: "Optional additional information",
            isSkipped: true
        }
    ]}
/>`
        },
        {
            id: 'progressbar',
            title: 'ProgressBar',
            createdBy: 'Sadman Shakib',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: (
                <div className="flex flex-col gap-4 w-full">
                    <ProgressBar value={25} />
                    <ProgressBar value={50} />
                    <ProgressBar value={75} />
                    <ProgressBar value={100} />
                </div>
            ),
            codeExample: `import ProgressBar from '~/components/Common/ProgressBar';\n
// Different progress states
<ProgressBar value={25} />
<ProgressBar value={50} />
<ProgressBar value={75} />
<ProgressBar value={100} />`
        },
        {
            id: 'table',
            title: 'Table',
            createdBy: 'Sadman Shakib',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: (
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Role</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr isEven={false}>
                            <Td>John Doe</Td>
                            <Td>Developer</Td>
                            <Td>Active</Td>
                        </Tr>
                        <Tr isEven={true}>
                            <Td>Jane Smith</Td>
                            <Td>Designer</Td>
                            <Td>Active</Td>
                        </Tr>
                        <Tr isEven={false}>
                            <Td>Bob Johnson</Td>
                            <Td>Manager</Td>
                            <Td>Inactive</Td>
                        </Tr>
                    </Tbody>
                </Table>
            ),
            codeExample: `import { Table, Thead, Tbody, Tr, Th, Td } from '~/components/Common/Table';\n
<Table>
    <Thead>
        <Tr>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Status</Th>
        </Tr>
    </Thead>
    <Tbody>
        <Tr isEven={false}>
            <Td>John Doe</Td>
            <Td>Developer</Td>
            <Td>Active</Td>
        </Tr>
        <Tr isEven={true}>
            <Td>Jane Smith</Td>
            <Td>Designer</Td>
            <Td>Active</Td>
        </Tr>
        <Tr isEven={false}>
            <Td>Bob Johnson</Td>
            <Td>Manager</Td>
            <Td>Inactive</Td>
        </Tr>
    </Tbody>
</Table>

// Optional Props
// Table: className
// Tr: isEven, evenRowBg (default="#F9FAFB"), oddRowBg (default="#fff")
// Th, Td: className`
        },
        {
            id: 'tablecaption',
            title: 'TableCaption',
            createdBy: 'Sadman Shakib',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: (
                <Table>
                    <Thead>
                        <Tr>
                            <TableCaption title="Name" />
                            <TableCaption title="Role" />
                            <TableCaption title="Status" />
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr isEven={false}>
                            <Td>John Doe</Td>
                            <Td>Developer</Td>
                            <Td>Active</Td>
                        </Tr>
                    </Tbody>
                </Table>
            ),
            codeExample: `import TableCaption from '~/components/Common/TableCaption';\n
<Table>
    <Thead>
        <Tr>
            <TableCaption title="Name" />
            <TableCaption title="Role" />
            <TableCaption title="Status" />
        </Tr>
    </Thead>
    <Tbody>
        <Tr>
            <Td>John Doe</Td>
            <Td>Developer</Td>
            <Td>Active</Td>
        </Tr>
    </Tbody>
</Table>

// Props
// title: string - The header text to display
// className?: string - Optional custom styling`
        },
        {
            id: 'dragtablecolumn',
            title: 'DragTableColumn',
            createdBy: 'Sadman Shakib',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: (
                <div className="flex items-center gap-8">
                    <DragTableColumn />
                    <DragTableColumn direction="left" />
                    <DragTableColumn direction="right" />
                </div>
            ),
            codeExample: `import DragTableColumn from '~/components/Common/DragTableColumn';\n
// Default state (both arrows white)
<DragTableColumn />

// Left arrow white, right arrow gray
<DragTableColumn direction="left" />

// Right arrow white, left arrow gray
<DragTableColumn direction="right" />

// Props
// direction?: "left" | "right" | undefined - Controls which arrow is highlighted`
        },
        {
            id: 'toaster',
            title: 'Toaster',
            createdBy: 'Sadman Shakib',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: (
                <div className="w-full flex flex-col gap-4">
                    <Toaster
                        content="This is an important notification message for the user."
                        icon={<AlertCircle className="w-6 h-6 text-[#F18F01]" />}
                    />
                    {/* // Basic warning toast */}
                    <Toaster content="This is a warning message" />

                    {/* // Success toast with custom title and close handler */}
                    <Toaster
                        content="Operation completed successfully"
                        variant="success"
                        title="Success!"
                        icon={<CheckIcon />}
                        onClose={() => console.log('close')}
                    />

                    {/* // Error toast with custom classes */}
                    <Toaster
                        content="An error occurred"
                        variant="error"
                        className="mt-4 shadow-lg"
                    />
                </div>
            ),
            codeExample: `import Toaster from '~/components/Common/Toaster';
import { AlertCircle, CheckIcon } from 'lucide-react';\n
   <Toaster
                        content="This is an important notification message for the user."
                        icon={<AlertCircle className="w-6 h-6 text-[#F18F01]" />}
                    />
                    {/* // Basic warning toast */}
                    <Toaster content="This is a warning message" />

                    {/* // Success toast with custom title and close handler */}
                    <Toaster
                        content="Operation completed successfully"
                        variant="success"
                        title="Success!"
                        icon={<CheckIcon />}
                        onClose={() => setShowToast(false)}
                    />

                    {/* // Error toast with custom classes */}
                    <Toaster
                        content="An error occurred"
                        variant="error"
                        className="mt-4 shadow-lg"
                    />

// Props
// content: string - The message to display
// icon: React.ReactNode - The icon to show next to the message`
        },
        {
            id: 'tooltip',
            title: 'Tooltip',
            createdBy: 'Sadman Shakib',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: (
                <div className="flex items-center gap-8 p-12">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>Hover me (Top)</TooltipTrigger>
                            <TooltipContent>
                                Tooltip content
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>Hover me (Bottom)</TooltipTrigger>
                            <TooltipContent side="bottom" showArrow>
                                Tooltip with arrow
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>Hover me (Left)</TooltipTrigger>
                            <TooltipContent side="left" align="center" showArrow>
                                Left aligned tooltip
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            ),
            codeExample: `import { 
                Tooltip, 
                TooltipContent, 
                TooltipProvider, 
                TooltipTrigger 
            } from '~/components/Common/tooltip';\n
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        Hover me
                    </TooltipTrigger>
                    <TooltipContent
                        side="top"          // "top" | "right" | "bottom" | "left"
                        align="center"      // "start" | "center" | "end"
                        sideOffset={4}      // spacing from trigger
                        alignOffset={0}     // offset along alignment axis
                        showArrow={true}    // show/hide arrow
                    >
                        Tooltip content
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>`
        },
        {
            id: 'toggle',
            title: 'Toggle',
            createdBy: 'Sadman Shakib',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: (
                <div className="flex items-center gap-8">
                    <Switch />
                    <Switch defaultChecked />
                    <Switch disabled />
                    <Switch disabled defaultChecked />
                </div>
            ),
            codeExample: `import Switch from '~/components/Common/Toggle';\n
// Default unchecked state
<Switch />

// Default checked state
<Switch defaultChecked />

// Disabled unchecked state
<Switch disabled />

// Disabled checked state
<Switch disabled defaultChecked />

// With onChange handler
<Switch onCheckedChange={(checked) => console.log('Toggled:', checked)} />

// With custom className
<Switch className="custom-class" />`
        },
        {
            id: 'breadcrumbs',
            title: 'Breadcrumbs',
            createdBy: 'Sadman Shakib',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: (
                <div className="flex flex-col gap-8 w-full">
                    <Breadcrumbs>
                        <BreadcrumbItem>
                            <BreadcrumbLink to="/" icon={<Home className="h-4 w-4" />}>
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink to="/settings" icon={<Settings className="h-4 w-4" />}>
                                Settings
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink to="/profile" isCurrentPage icon={<User className="h-4 w-4" />}>
                                Profile
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumbs>

                    <Breadcrumbs separator="chevron">
                        <BreadcrumbItem>
                            <BreadcrumbLink to="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink to="/settings">Settings</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink to="/profile" isCurrentPage>
                                Profile
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumbs>
                </div>
            ),
            codeExample: `import { Breadcrumbs, BreadcrumbItem, BreadcrumbLink } from '~/components/Common/Breadcrumbs';
import { Home, Settings, User } from 'lucide-react';\n
// With icons and slash separator (default)
<Breadcrumbs>
    <BreadcrumbItem>
        <BreadcrumbLink to="/" icon={<Home className="h-4 w-4" />}>
            Home
        </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
        <BreadcrumbLink to="/settings" icon={<Settings className="h-4 w-4" />}>
            Settings
        </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
        <BreadcrumbLink to="/profile" isCurrentPage icon={<User className="h-4 w-4" />}>
            Profile
        </BreadcrumbLink>
    </BreadcrumbItem>
</Breadcrumbs>

// With chevron separator
<Breadcrumbs separator="chevron">
    <BreadcrumbItem>
        <BreadcrumbLink to="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
        <BreadcrumbLink to="/settings">Settings</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
        <BreadcrumbLink to="/profile" isCurrentPage>
            Profile
        </BreadcrumbLink>
    </BreadcrumbItem>
</Breadcrumbs>

// Props
// Breadcrumbs:
//   separator?: "chevron" | "slash" - Separator style between items
//   useReactRouter?: boolean - Whether to use React Router for navigation
// BreadcrumbLink:
//   isCurrentPage?: boolean - Whether this is the current active page
//   icon?: React.ReactNode - Optional icon to display before text`
        },
        {
            id: 'multi-select-new',
            title: 'MultiSelect',
            createdBy: 'Sadman Shakib',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: (
                <div className="w-[300px]">
                    <MultiSelect
                        options={["Option 1", "Option 2", "Option 3", "Option 4"]}
                        selectedOptions={[]}
                        onSelect={(option) => console.log('Selected:', option)}
                        onDelete={(option) => console.log('Deleted:', option)}
                        width={300}
                    />
                </div>
            ),
            codeExample: `import { MultiSelect } from '~/components/Common/multi-select';\n
<MultiSelect 
    options={["Option 1", "Option 2", "Option 3", "Option 4"]}
    selectedOptions={[]}
    onSelect={(option) => console.log('Selected:', option)}
    onDelete={(option) => console.log('Deleted:', option)}
    width={300}
/>`
        },
        {
            id: 'table-demo',
            title: 'Table',
            createdBy: 'Vishal Singh',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: <TableDemo />,
        },
        {
            id: 'next-steps',
            title: 'NextSteps',
            createdBy: 'Vishal Singh',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: <NextSteps
                onAddDepartments={() => console.log('Add departments clicked')}
                onAddUsers={() => console.log('Add users clicked')}
            />,
        },
        {
            id: 'accordioncomponent',
            title: 'AccordionComponent',
            createdBy: 'Vishal Singh',
            figmaLink: 'https://www.figma.com/file/your-figma-link-here',
            content: <AccordionComponent
                isDefault
                isActive
                defaultExpanded={false}
                onEdit={() => console.log('Edit clicked')}
                onDelete={() => console.log('Delete clicked')}
                onAttach={() => console.log('Attach clicked')}
                onMore={() => console.log('More clicked')}
            />,
        },
    ];

    return (
        <div className='h-screen grid grid-rows-[72px_1fr]'>
            {/* Header */}
            <header>
                <MenuLabel />
            </header>

            {/* Main Content */}
            <div className='bg-[#F0F4FD] grid grid-cols-[auto_1fr] overflow-hidden'>
                {/* Left Panel - Fixed */}
                <div>
                    <ActionMenuDemo />
                </div>

                {/* Main Panel - Scrollable */}
                <div className='overflow-y-auto p-6 pt-0 h-full'>
                    {children}
                    <div className="w-full">
                        <ComponentShowcase items={showcaseItems} defaultOpenItem="input" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalComponents;