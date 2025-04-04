import { Popup } from "@zeak/ui";
import { useState } from "react";
import { Code, Copy, Check, MoreVertical, Edit, Trash, Download } from "lucide-react";

export default function PopupPage() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">Popup Component</h1>
                <p className="text-gray-600 text-lg">
                    A reusable popup component that displays a list of actions when triggered.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} Popup {"}"} from '@zeak/ui';</code>
                    <button
                        onClick={() => copyToClipboard("import { Popup } from '@zeak/ui';")}
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
                        <div className="flex justify-end">
                            <Popup
                                trigger={<button className="p-2 rounded-full hover:bg-gray-100"><MoreVertical className="h-5 w-5" /></button>}
                                buttons={[
                                    {
                                        icon: <Edit className="h-5 w-5" />,
                                        label: "Edit",
                                        onClick: () => alert("Edit clicked")
                                    },
                                    {
                                        icon: <Trash className="h-5 w-5" />,
                                        label: "Delete",
                                        onClick: () => alert("Delete clicked")
                                    }
                                ]}
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-4">Click the three dots icon above to see the popup in action.</p>
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { Popup } from '@zeak/ui';
import { MoreVertical, Edit, Trash } from 'lucide-react';

const MyComponent = () => {
  return (
    <Popup
      trigger={<button className="p-2 rounded-full hover:bg-gray-100">
        <MoreVertical className="h-5 w-5" />
      </button>}
      buttons={[
        {
          icon: <Edit className="h-5 w-5" />,
          label: "Edit",
          onClick: () => alert("Edit clicked")
        },
        {
          icon: <Trash className="h-5 w-5" />,
          label: "Delete",
          onClick: () => alert("Delete clicked")
        }
      ]}
    />
  );
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { Popup } from '@zeak/ui';\nimport { MoreVertical, Edit, Trash } from 'lucide-react';\n\nconst MyComponent = () => {\n  return (\n    <Popup\n      trigger={<button className="p-2 rounded-full hover:bg-gray-100">\n        <MoreVertical className="h-5 w-5" />\n      </button>}\n      buttons={[\n        {\n          icon: <Edit className="h-5 w-5" />,\n          label: "Edit",\n          onClick: () => alert("Edit clicked")\n        },\n        {\n          icon: <Trash className="h-5 w-5" />,\n          label: "Delete",\n          onClick: () => alert("Delete clicked")\n        }\n      ]}\n    />\n  );\n};`)}
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
                        <div className="flex justify-end">
                            <Popup
                                trigger={<button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Actions</button>}
                                buttons={[
                                    {
                                        icon: <Edit className="h-5 w-5" />,
                                        label: "Edit Item",
                                        onClick: () => alert("Edit clicked")
                                    },
                                    {
                                        icon: <Download className="h-5 w-5" />,
                                        label: "Download",
                                        onClick: () => alert("Download clicked")
                                    },
                                    {
                                        icon: <Trash className="h-5 w-5" />,
                                        label: "Delete",
                                        onClick: () => alert("Delete clicked"),
                                        disabled: true
                                    }
                                ]}
                                contentClassName="bg-gray-50 border border-gray-200"
                                align="center"
                            />
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`<Popup
  trigger={<button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
    Actions
  </button>}
  buttons={[
    {
      icon: <Edit className="h-5 w-5" />,
      label: "Edit Item",
      onClick: () => alert("Edit clicked")
    },
    {
      icon: <Download className="h-5 w-5" />,
      label: "Download",
      onClick: () => alert("Download clicked")
    },
    {
      icon: <Trash className="h-5 w-5" />,
      label: "Delete",
      onClick: () => alert("Delete clicked"),
      disabled: true
    }
  ]}
  contentClassName="bg-gray-50 border border-gray-200"
  align="center"
/>`}</pre>
                        <button
                            onClick={() => copyToClipboard(`<Popup\n  trigger={<button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">\n    Actions\n  </button>}\n  buttons={[\n    {\n      icon: <Edit className="h-5 w-5" />,\n      label: "Edit Item",\n      onClick: () => alert("Edit clicked")\n    },\n    {\n      icon: <Download className="h-5 w-5" />,\n      label: "Download",\n      onClick: () => alert("Download clicked")\n    },\n    {\n      icon: <Trash className="h-5 w-5" />,\n      label: "Delete",\n      onClick: () => alert("Delete clicked"),\n      disabled: true\n    }\n  ]}\n  contentClassName="bg-gray-50 border border-gray-200"\n  align="center"\n/>`)}
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
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-4">
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Prop</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Default</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</div>
                    </div>
                    <div className="divide-y divide-gray-200 bg-white">
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">trigger</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">ReactNode</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">required</div>
                            <div className="px-6 py-4 text-sm">Element that triggers the popup when clicked</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">buttons</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">ActionButtonProps[]</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">required</div>
                            <div className="px-6 py-4 text-sm">Array of action buttons to display in the popup</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">contentClassName</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">undefined</div>
                            <div className="px-6 py-4 text-sm">Additional classes for the popup content</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">align</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">"start" | "center" | "end"</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">"end"</div>
                            <div className="px-6 py-4 text-sm">Alignment of the popup relative to the trigger</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">sideOffset</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">number</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">4</div>
                            <div className="px-6 py-4 text-sm">Offset distance from the trigger</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">disabled</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">boolean</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">false</div>
                            <div className="px-6 py-4 text-sm">Whether the popup trigger is disabled</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">ActionButtonProps</h2>
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-4">
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Prop</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Default</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</div>
                    </div>
                    <div className="divide-y divide-gray-200 bg-white">
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">icon</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">ReactNode</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">required</div>
                            <div className="px-6 py-4 text-sm">Icon to display with the action button</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">label</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">required</div>
                            <div className="px-6 py-4 text-sm">Text label for the action button</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">onClick</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">() {"=>"} void</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">required</div>
                            <div className="px-6 py-4 text-sm">Function to call when the button is clicked</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">disabled</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">boolean</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">false</div>
                            <div className="px-6 py-4 text-sm">Whether the action button is disabled</div>
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
                            <span className="ml-3 text-gray-700">Customizable trigger element</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Configurable action buttons with icons</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Support for disabled buttons</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Adjustable positioning and alignment</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Custom styling options</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}