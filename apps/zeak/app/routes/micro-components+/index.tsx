import React, { useState } from 'react'
import { useNavigate } from '@remix-run/react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import MenuLabel from '~/components/Globals/MenuLabel';
import ActionMenuDemo from './ActionMenuDemo';
import DialogueDemo from './DialogueDemo';
import TextareaDemo from './TextareaDemo';
import TabsDemo from './TabsDemo';
import { AvatarComponent, BadgeComponent, InputComponent, MenubarComponent, Separator, TabsComponent, RadioGroup, RadioItemComponent, DatePicker, AlertModal, ButtonComponent, TooltipComponent, TooltipContentComponent, TooltipProviderComponent, TooltipTriggerComponent, ToasterComponent, CardComponent, FilePreviewComponent, FileUploadComponent, LeftDrawerComponent } from '@zeak/react';

type MicroComponentsProps = {
    children: React.ReactNode;
};

type AccordionItem = {
    id: string;
    title: string;
    createdBy: string;
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
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-medium">{item.title}</h2>
                            <span className="text-sm text-gray-500 opacity-0 hover:opacity-100 transition-opacity">
                                Created by {item.createdBy}
                            </span>
                        </div>
                        <ChevronDown className="w-5 h-5 transition-transform duration-200 ease-out transform ui-expanded:rotate-180" />
                    </Accordion.Trigger>
                    <Accordion.Content className="bg-[#F0F4FD]">
                        <div className={`flex items-center gap-28 p-10 border-t border-gray-200 relative ${(item.id === 'dialogue' || item.id === 'textarea' || item.id === 'input' || item.id === 'avatar' || item.id === 'badge' || item.id === 'calendar') ? 'justify-center' : ''}`}>
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

export const MicroComponents: React.FC<MicroComponentsProps> = ({ children }) => {
    const navigate = useNavigate();

    const showcaseItems: AccordionItem[] = [
        {
            id: 'tabs',
            title: 'Tabs',
            createdBy: 'Vishal Singh',
            content: <TabsDemo />,
            codeExample: `import { FileText, Share, Star } from "lucide-react";
import { TabsComponent } from "@zeak/react";

export default function TabsDemo() {
    const tabItems = [
        { label: 'All', value: 'all', icon: FileText },
        { label: 'Text', value: 'text', icon: FileText },
        { label: 'Shared', value: 'shared', icon: Share },
        { label: 'Favorites', value: 'favorites', icon: Star },
        { label: 'Disabled', value: 'disabled', disabled: true },
        { label: 'Disabled', value: 'disabled2', disabled: true },
        { label: 'Disabled', value: 'disabled3', disabled: true },
    ]

    const underlineTabItems = [
        { label: 'Text', value: 'text' },
        { label: 'Text', value: 'text2' },
        { label: 'Text', value: 'text3' },
        { label: 'Text', value: 'text4' },
        { label: 'Text', value: 'text5' },
        { label: 'Text', value: 'text6' },
        { label: 'Text', value: 'text7' },
        { label: 'Text', value: 'text8' },
        { label: 'Text', value: 'text9' },
        { label: 'Text', value: 'text10' },
    ]

    return <div className="bg-white rounded-xl p-6 flex flex-col gap-8">
        <div>
            <h3 className="text-lg font-medium mb-4">Default Variant</h3>
            <TabsComponent variant="default" items={tabItems} />
        </div>

        <div>
            <h3 className="text-lg font-medium mb-4">Alphabet Variant</h3>
            <TabsComponent variant="alphabet" items={[]} />
        </div>

        <div>
            <h3 className="text-lg font-medium mb-4">Underline Variant</h3>
            <TabsComponent variant="underline" items={underlineTabItems} />
        </div>
    </div>
}   `
        },
        {
            id: 'dialogue',
            title: 'Dialogue',
            createdBy: 'Vishal Singh',
            figmaLink: 'https://www.figma.com/design/TGVlCAMsX6cAbz4uMGhV4R/Full-components_ZEAK?node-id=16-32453&t=75d1SMmCHvbqLC83-0',
            content: (
                <DialogueDemo />
            ),
            codeExample: `import { Dialogue } from '@zeak/react'\n
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
               <Dialogue
                        files={files}
                        onFileUpload={handleFileUpload}
                        onFileDelete={handleFileDelete}
                        onFileView={handleFileView}
                    />`
        },
        {
            id: 'textarea',
            title: 'Textarea',
            createdBy: 'Vishal Singh',
            content: <TextareaDemo />,
            codeExample: `import { Textarea } from '@zeak/react'\n
            const [description, setDescription] = useState('')

            return (
                <Textarea
                    aria-label="Description"
                    required
                    maxLength={500}
                    placeholder="Enter your description here..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            )`
        },
        {
            id: 'input',
            title: 'Input',
            createdBy: 'Vishal Singh',
            figmaLink: 'https://www.figma.com/design/b3k8czEuBqWkZxrA1vE1FT/Main-Components?node-id=13638-36831&p=f&t=bxYikf1HHkW7WuyG-0',
            content: (
                <InputComponent
                    placeholder="Enter text..."
                    name="primary"
                    id="primary"
                    width="400px"
                />
            ),
            codeExample: `import InputComponent from '@zeak/react';\n
  <InputComponent
    placeholder="Enter text..."
    name="input"
    id="input"
/>`
        },
        {
            id: 'menubar',
            title: 'Menubar',
            createdBy: 'Vishal Singh',
            content: <MenubarComponent
                breadcrumbs={[
                    {
                        label: "Settings",
                        to: "/settings"
                    },
                    {
                        label: "Notifications"
                    }
                ]}
                onGoBack={() => navigate(-1)}
                onEdit={() => console.log('Edit clicked')}
                onMore={() => console.log('More clicked')}
                onClose={() => console.log('Close clicked')}
                showEdit={true}
                showMore={true}
                showClose={true}
                className="custom-menubar"
            />,
            codeExample: `import { MenubarComponent } from '@zeak/react';\n
            <MenubarComponent
                breadcrumbs={[
                    {
                        label: "Settings",
                        to: "/settings"
                    },
                    {
                        label: "Notifications"
                    }
                ]}
                onGoBack={() => navigate(-1)}
                onEdit={() => console.log('Edit clicked')}
                onMore={() => console.log('More clicked')}
                onClose={() => console.log('Close clicked')}
                showEdit={true}
                showMore={true}
                showClose={true}
                className="custom-menubar"
            />`
        },
        {
            id: 'separator',
            title: 'Separator',
            createdBy: 'Vishal Singh',
            content: <Separator />,
            codeExample: `import { Separator } from '@zeak/react';\n
            <Separator />`
        },
        {
            id: 'badge',
            title: 'Badge',
            createdBy: 'Vishal Singh',
            content: <BadgeComponent showIcon={true} items={[{ label: "Active", value: "active", selected: true }]} />,
            codeExample: `import { BadgeComponent } from '@zeak/react';\n
            <BadgeComponent showIcon={true} items={[{ label: "Active", value: "active", selected: true }]} />`
        },
        {
            id: 'avatar',
            title: 'Avatar',
            createdBy: 'Vishal Singh',
            content: (
                <div className='flex items-center gap-28'>
                    <AvatarComponent src="https://github.com/shadcn.png" size='md' fallback="VS" alt="User Avatar" className="ring-2 ring-gray-100" />
                    <AvatarComponent src="https://github.com/shadcn.png" size='sm' fallback="VS" alt="User Avatar" className="ring-2 ring-gray-100" />
                </div>
            ),
            codeExample: `import { AvatarComponent } from '@zeak/react';\n
            <AvatarComponent src="https://github.com/shadcn.png" size='md' fallback="VS" alt="User Avatar" className="ring-2 ring-gray-100" />
            <AvatarComponent src="https://github.com/shadcn.png" size='sm' fallback="VS" alt="User Avatar" className="ring-2 ring-gray-100" />`
        },
        {
            id: 'calendar',
            title: 'Calendar',
            createdBy: 'Sadman Shakib',
            content: <DatePicker />,
            codeExample: `import { DatePicker } from '@zeak/react';\n
<DatePicker 
    value={date}
    onChange={(newDate) => setDate(newDate)}
/>`
        },
        {
            id: 'alertModal',
            title: 'Alert Modal',
            createdBy: 'Sadman Shakib',
            content: <AlertModal
                isOpen={true}
                message="This is a sample alert message."
                onClose={() => { }}
                title="Sample Alert"
                buttonText="Close"
            />,
            codeExample: `import { AlertModal } from '@zeak/react';\n
<AlertModal 
    isOpen={true}
    message="This is a sample alert message."
    onClose={() => {
        // Handle close action
    }}
    title="Sample Alert"
    buttonText="Close"
/>`
        },
        {
            id: 'card',
            title: 'Card',
            createdBy: 'Sadman Shakib',
            content: (
                <CardComponent header={<h3>Card Header</h3>}>
                    <p>Card Content</p>
                </CardComponent>
            ),
            codeExample: `import { CardComponent } from '@zeak/react';\n
<CardComponent header={<h3>Card Header</h3>}>
    <p>Card Content</p>
</CardComponent>`
        },
        {
            id: 'filePreview',
            title: 'File Preview',
            createdBy: 'Sadman Shakib',
            content: (
                <FilePreviewComponent
                    filename="example.pdf"
                    filesize="2.5 MB"
                    fileType="PDF"
                    onView={() => console.log('View clicked')}
                    onClose={() => console.log('Close clicked')}
                />
            ),
            codeExample: `import { FilePreviewComponent } from '@zeak/react';\n
<FilePreviewComponent 
    filename="example.pdf"
    filesize="2.5 MB"
    fileType="PDF"
    onView={() => {}}
    onClose={() => {}}
/>`
        },
        {
            id: 'fileUpload',
            title: 'File Upload',
            createdBy: 'Sadman Shakib',
            content: (
                <FileUploadComponent
                    maxFiles={5}
                    maxSizeInMB={10}
                    onFilesChange={(files) => console.log('Files changed:', files)}
                />
            ),
            codeExample: `import { FileUploadComponent } from '@zeak/react';\n
<FileUploadComponent 
    maxFiles={5}
    maxSizeInMB={10}
    onFilesChange={(files) => {
        // Handle file changes
    }}
/>`
        },
        {
            id: 'leftDrawer',
            title: 'Left Drawer',
            createdBy: 'Sadman Shakib',
            content: (
                <LeftDrawerComponent
                    title="Example Drawer"
                    trigger={<button>Open Drawer</button>}
                >
                    <div>Drawer Content</div>
                </LeftDrawerComponent>
            ),
            codeExample: `import { LeftDrawerComponent } from '@zeak/react';\n
<LeftDrawerComponent
    title="Example Drawer"
    trigger={<button>Open Drawer</button>}
>
    <div>Drawer Content</div>
</LeftDrawerComponent>`
        },
        {
            id: 'radioItem',
            title: 'Radio Item',
            createdBy: 'Sadman Shakib',
            content: (
                <RadioGroup defaultValue="option1" className="flex flex-col gap-4">
                    <RadioItemComponent
                        value="option1"
                        label="Option 1"
                        description="This is a sample radio item"
                        selected={'true'} // Added missing 'selected' property
                    />
                    <RadioItemComponent
                        value="option2"
                        label="Option 2"
                        description="Another sample radio item"
                        selected={'true'}
                    />
                </RadioGroup>
            ),
            codeExample: `import { RadioGroup, RadioItemComponent } from '@zeak/react';\n
<RadioGroup defaultValue="option1" className="flex flex-col gap-4">
    <RadioItemComponent
        value="option1"
        label="Option 1"
        description="This is a sample radio item"
    />
    <RadioItemComponent
        value="option2"
        label="Option 2"
        description="Another sample radio item"
    />
</RadioGroup>`
        },
        {
            id: 'toaster',
            title: 'Toaster',
            createdBy: 'Sadman Shakib',
            content: (
                <ToasterComponent
                    content="This is a sample toast message"
                    title="Success"
                    variant="success"
                    onClose={() => console.log('Toast closed')}
                />
            ),
            codeExample: `import { ToasterComponent } from '@zeak/react';\n
<ToasterComponent
    content="This is a sample toast message"
    title="Success"
    variant="success"
    onClose={() => {}}
/>`
        },
        {
            id: 'tooltip',
            title: 'Tooltip',
            createdBy: 'Sadman Shakib',
            content: (
                <TooltipProviderComponent>
                    <TooltipComponent>
                        <TooltipTriggerComponent>Hover me</TooltipTriggerComponent>
                        <TooltipContentComponent>
                            This is a tooltip
                        </TooltipContentComponent>
                    </TooltipComponent>
                </TooltipProviderComponent>
            ),
            codeExample: `import { TooltipComponent, TooltipContentComponent, TooltipProviderComponent, TooltipTriggerComponent } from '@zeak/react';\n
<TooltipProviderComponent>
    <Tooltip>
        <TooltipTriggerComponent>Hover me</TooltipTriggerComponent>
        <TooltipContentComponent>
            This is a tooltip
        </TooltipProviderComponent>
    </TooltipComponent>
</TooltipProviderComponent>`
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
                    <div className="w-full pl-4">
                        <ComponentShowcase items={showcaseItems} defaultOpenItem="input" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MicroComponents;