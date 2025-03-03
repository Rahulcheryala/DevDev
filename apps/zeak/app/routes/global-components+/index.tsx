import React, { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import Avatar from '~/components/Globals/Avatar';
import ActionMenuDemo from './ActionMenuDemo';
import MenuLabel from '~/components/Globals/MenuLabel';
import { PrimaryInput, PhoneInput } from '~/components/Globals/Input';
import MultiSelectDemo from './MultiSelectDemo';
import SignupHeader from '~/components/Globals/SignupHeader';
import DropdownDemo from './DropdownDemo';
import PageHeaderDemo from './PageHeaderDemo';
import MainMenu from '~/components/Globals/MainMenu';

type GlobalComponentsProps = {
    children: React.ReactNode;
};

type AccordionItem = {
    id: string;
    title: string;
    content: React.ReactNode;
    codeExample?: string;
    figmaLink?: string;
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
                    <Accordion.Trigger className="w-full h-[60px] flex items-center justify-between px-4 bg-[#F0F4FD] hover:bg-[#E4EAF5] transition-colors">
                        <h2 className="text-lg font-medium">{item.title}</h2>
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
            figmaLink: 'https://www.figma.com/design/b3k8czEuBqWkZxrA1vE1FT/Main-Components?node-id=13602-78067&p=f&t=bxYikf1HHkW7WuyG-0',
            content: <SignupHeader />,
            codeExample: `import SignupHeader from '~/components/Globals/SignupHeader';\n
<SignupHeader />`
        },
        {
            id: 'dropdown',
            title: 'Dropdown',
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
            figmaLink: 'https://www.figma.com/design/b3k8czEuBqWkZxrA1vE1FT/Main-Components?node-id=13736-35742&p=f&t=bxYikf1HHkW7WuyG-0',
            content: <MainMenu />,
            codeExample: `import MainMenu from '~/components/Globals/MainMenu';\n
<MainMenu />`
        }
    ];

    return (
        <div className='h-screen grid grid-rows-[auto_1fr]'>
            {/* Header */}
            <header className='h-[72px]'>
                <MenuLabel />
            </header>

            {/* Main Content */}
            <main className='bg-[#F0F4FD] p-6 pt-0 grid grid-cols-[auto_1fr] gap-4 overflow-y-auto'>
                {/* Left Panel */}
                <div className='left-panel'>
                    <ActionMenuDemo />
                </div>

                {/* Main Panel */}
                <div className='main-panel'>
                    {children}
                    <div className="w-full pl-4">
                        <ComponentShowcase items={showcaseItems} defaultOpenItem="input" />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default GlobalComponents;