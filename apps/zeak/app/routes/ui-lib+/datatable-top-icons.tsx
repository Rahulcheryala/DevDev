import React, { useState } from "react";
import { DataTableTopIcons } from "@zeak/datatable";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoRocketOutline } from "react-icons/io5";
import { Code, Copy, Check } from "lucide-react";

export default function DataTableTopIconsPage() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const basicItems = [
        {
            icon: <BiEditAlt className="w-5 h-5" />,
            label: "Edit",
            onClick: () => console.log("Edit clicked")
        },
        {
            icon: <RiDeleteBin6Line className="w-5 h-5" />,
            label: "Delete",
            onClick: () => console.log("Delete clicked")
        },
        {
            icon: <IoRocketOutline className="w-5 h-5" />,
            label: "Actions",
            onClick: () => console.log("Actions clicked")
        }
    ];

    const advancedItems = [
        {
            icon: <BiEditAlt className="w-5 h-5" />,
            label: "Edit",
            onClick: () => console.log("Edit clicked")
        },
        {
            icon: <RiDeleteBin6Line className="w-5 h-5" />,
            label: "Delete",
            onClick: () => console.log("Delete clicked")
        },
        {
            icon: <IoRocketOutline className="w-5 h-5" />,
            label: "Actions",
            onClick: () => console.log("Actions clicked"),
            className: "text-blue-600"
        }
    ];

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">DataTableTopIcons Component</h1>
                <p className="text-gray-600 text-lg">
                    A component that displays a row of action icons with labels in a DataTable toolbar.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} DataTableTopIcons {"}"} from '@zeak/datatable';</code>
                    <button
                        onClick={() => copyToClipboard("import { DataTableTopIcons } from '@zeak/datatable';")}
                        className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
                        aria-label="Copy code"
                    >
                        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-gray-400" />}
                    </button>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Basic Usage</h2>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-200">
                        <DataTableTopIcons items={basicItems} />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { DataTableTopIcons } from '@zeak/datatable';
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoRocketOutline } from "react-icons/io5";

const MyComponent = () => {
  const items = [
    {
      icon: <BiEditAlt className="w-5 h-5" />,
      label: "Edit",
      onClick: () => console.log("Edit clicked")
    },
    {
      icon: <RiDeleteBin6Line className="w-5 h-5" />,
      label: "Delete",
      onClick: () => console.log("Delete clicked")
    },
    {
      icon: <IoRocketOutline className="w-5 h-5" />,
      label: "Actions",
      onClick: () => console.log("Actions clicked")
    }
  ];

  return <DataTableTopIcons items={items} />;
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { DataTableTopIcons } from '@zeak/datatable';\nimport { BiEditAlt } from "react-icons/bi";\nimport { RiDeleteBin6Line } from "react-icons/ri";\nimport { IoRocketOutline } from "react-icons/io5";\n\nconst MyComponent = () => {\n  const items = [\n    {\n      icon: <BiEditAlt className="w-5 h-5" />,\n      label: "Edit",\n      onClick: () => console.log("Edit clicked")\n    },\n    {\n      icon: <RiDeleteBin6Line className="w-5 h-5" />,\n      label: "Delete",\n      onClick: () => console.log("Delete clicked")\n    },\n    {\n      icon: <IoRocketOutline className="w-5 h-5" />,\n      label: "Actions",\n      onClick: () => console.log("Actions clicked")\n    }\n  ];\n\n  return <DataTableTopIcons items={items} />;\n};`)}
                            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                            aria-label="Copy code"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                        </button>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Custom Styling</h2>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-200">
                        <DataTableTopIcons items={advancedItems} className="justify-start" />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { DataTableTopIcons } from '@zeak/datatable';
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoRocketOutline } from "react-icons/io5";

const MyComponent = () => {
  const items = [
    {
      icon: <BiEditAlt className="w-5 h-5" />,
      label: "Edit",
      onClick: () => console.log("Edit clicked")
    },
    {
      icon: <RiDeleteBin6Line className="w-5 h-5" />,
      label: "Delete",
      onClick: () => console.log("Delete clicked")
    },
    {
      icon: <IoRocketOutline className="w-5 h-5" />,
      label: "Actions",
      onClick: () => console.log("Actions clicked"),
      className: "text-blue-600"
    }
  ];

  return <DataTableTopIcons items={items} className="justify-start" />;
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { DataTableTopIcons } from '@zeak/datatable';\nimport { BiEditAlt } from "react-icons/bi";\nimport { RiDeleteBin6Line } from "react-icons/ri";\nimport { IoRocketOutline } from "react-icons/io5";\n\nconst MyComponent = () => {\n  const items = [\n    {\n      icon: <BiEditAlt className="w-5 h-5" />,\n      label: "Edit",\n      onClick: () => console.log("Edit clicked")\n    },\n    {\n      icon: <RiDeleteBin6Line className="w-5 h-5" />,\n      label: "Delete",\n      onClick: () => console.log("Delete clicked")\n    },\n    {\n      icon: <IoRocketOutline className="w-5 h-5" />,\n      label: "Actions",\n      onClick: () => console.log("Actions clicked"),\n      className: "text-blue-600"\n    }\n  ];\n\n  return <DataTableTopIcons items={items} className="justify-start" />;\n};`)}
                            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                            aria-label="Copy code"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                        </button>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Props</h2>
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-3">
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Prop</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</div>
                    </div>
                    <div className="divide-y divide-gray-200 bg-white">
                        <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">items</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">DataTableTopIconsItem[]</div>
                            <div className="px-6 py-4 text-sm">Array of items to display as action icons. Required.</div>
                        </div>
                        <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">className</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 text-sm">Additional CSS classes to apply to the container.</div>
                        </div>
                        <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">labelClassName</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 text-sm">Additional CSS classes to apply to the label text.</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Item Properties</h2>
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-3">
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</div>
                    </div>
                    <div className="divide-y divide-gray-200 bg-white">
                        <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">icon</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">React.ReactNode</div>
                            <div className="px-6 py-4 text-sm">Icon element to display.</div>
                        </div>
                        <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">label</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 text-sm">Text label displayed next to the icon.</div>
                        </div>
                        <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">onClick</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">() {"=>"} void</div>
                            <div className="px-6 py-4 text-sm">Callback function triggered when the item is clicked.</div>
                        </div>
                        <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">className</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 text-sm">Additional CSS classes to apply to the individual item container.</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Features</h2>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Customizable icon and label combinations</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Flexible layout with custom positioning</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Responsive design for all screen sizes</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Supports both icon libraries and custom SVGs</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
