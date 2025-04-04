import { ProgressTabs } from "@zeak/ui";
import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";

export default function ProgressTabsDocumentation() {
    const [activeStep, setActiveStep] = useState(1);
    const [copied, setCopied] = useState(false);
    
    const tabs = [
        { label: "General", id: 1 },
        { label: "Values", id: 2 },
        { label: "User Defined", id: 3 },
    ];

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">ProgressTabs Component</h1>
                <p className="text-gray-600 text-lg">
                    A modern, customizable component that displays a multi-step process with visual indicators showing the current active step and completed steps.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} ProgressTabs {"}"} from '@zeak/ui';</code>
                    <button
                        onClick={() => copyToClipboard("import { ProgressTabs } from '@zeak/ui';")}
                        className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
                        aria-label="Copy code"
                    >
                        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-gray-400" />}
                    </button>
                </div>
            </section>

            <section className="mb-12 ">
                <h2 className="text-2xl font-semibold mb-6">Basic Usage</h2>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-200 ">
                        <ProgressTabs tabs={tabs} activeStep={activeStep} />

                        <div className="flex gap-2 mt-6">
                            <button
                                className="bg-indigo-500 text-white px-4 py-2 rounded-md disabled:opacity-50 hover:bg-indigo-600 transition-colors"
                                onClick={() => setActiveStep(activeStep - 1)}
                                disabled={activeStep <= 1}
                            >
                                Previous
                            </button>
                            <button
                                className="bg-indigo-500 text-white px-4 py-2 rounded-md disabled:opacity-50 hover:bg-indigo-600 transition-colors"
                                onClick={() => setActiveStep(activeStep + 1)}
                                disabled={activeStep >= tabs.length}
                            >
                                Next
                            </button>
                        </div>
                        <div className="mt-4 text-sm">
                            Current step: <span className="font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">{activeStep}</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { ProgressTabs } from '@zeak/ui';
import { useState } from 'react';

const MyComponent = () => {
  const [activeStep, setActiveStep] = useState(1);
  const tabs = [
    { label: "General", id: 1 },
    { label: "Values", id: 2 },
    { label: "User Defined", id: 3 },
  ];
  
  return (
    <ProgressTabs tabs={tabs} activeStep={activeStep} />
  );
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { ProgressTabs } from '@zeak/ui';\nimport { useState } from 'react';\n\nconst MyComponent = () => {\n  const [activeStep, setActiveStep] = useState(1);\n  const tabs = [\n    { label: "General", id: 1 },\n    { label: "Values", id: 2 },\n    { label: "User Defined", id: 3 },\n  ];\n  \n  return (\n    <ProgressTabs tabs={tabs} activeStep={activeStep} />\n  );\n};`)}
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
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Required</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</div>
                    </div>
                    <div className="divide-y divide-gray-200 bg-white">
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">tabs</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">Array&lt;{"{"}label: string, id: number{"}"}&gt;</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">Yes</div>
                            <div className="px-6 py-4 text-sm">Array of tab objects with label and id</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">activeStep</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">number</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">Yes</div>
                            <div className="px-6 py-4 text-sm">Number indicating the current active step</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">className</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 text-sm">Optional CSS class for additional styling</div>
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
                            <span className="ml-3 text-gray-700">Highlights the current active step</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Shows checkmarks for completed steps</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Visual progress indicator with highlighted active/completed steps</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Gray background for upcoming steps</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Responsive design that works across different screen sizes</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}