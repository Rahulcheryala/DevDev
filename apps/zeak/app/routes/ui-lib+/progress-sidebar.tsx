import { ProgressSidebar, type TopSectionProps, type StepsProps } from "@zeak/ui"
import { useState } from "react"
import { Code, Copy, Check } from "lucide-react"

export default function ProgressSidebarExample() {
    const [activeStep, setActiveStep] = useState(0)
    const [copied, setCopied] = useState(false)
    
    const topSection: TopSectionProps = {
        breadcrumbs: [{ label: "Home", to: "/" },],
        title: "Progress Sidebar",
    }
    
    const steps: StepsProps = {
        items: [
            { title: "Step 1", content: "This is the content of step 1" }, 
            { title: "Step 2", content: "This is the content of step 2" }, 
            { title: "Step 3", content: "This is the content of step 3" }
        ],
        activeStep: activeStep,
        onStepChange: (step: number) => setActiveStep(step)
    }
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">ProgressSidebar Component</h1>
                <p className="text-gray-600 text-lg">
                    A modern, customizable component that displays a multi-step process with a sidebar navigation and expandable content sections.
                </p>
            </div>
            
            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} ProgressSidebar, type TopSectionProps, type StepsProps {"}"} from '@zeak/ui';</code>
                    <button
                        onClick={() => copyToClipboard("import { ProgressSidebar, type TopSectionProps, type StepsProps } from '@zeak/ui';")}
                        className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
                        aria-label="Copy code"
                    >
                        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-gray-400" />}
                    </button>
                </div>
            </section>
            
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Basic Usage</h2>
                <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="p-6 border-b  border-gray-200">
                        <ProgressSidebar topSection={topSection} steps={steps} />
                        
                        <div className="flex gap-2 mt-6">
                            <button
                                className="bg-indigo-500 text-white px-4 py-2 rounded-md disabled:opacity-50 hover:bg-indigo-600 transition-colors"
                                onClick={() => setActiveStep(activeStep - 1)}
                                disabled={activeStep <= 0}
                            >
                                Previous
                            </button>
                            <button
                                className="bg-indigo-500 text-white px-4 py-2 rounded-md disabled:opacity-50 hover:bg-indigo-600 transition-colors"
                                onClick={() => setActiveStep(activeStep + 1)}
                                disabled={activeStep >= steps.items.length - 1}
                            >
                                Next
                            </button>
                        </div>
                        <div className="mt-4 text-sm">
                            Current step: <span className="font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">{activeStep}</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { ProgressSidebar, type TopSectionProps, type StepsProps } from '@zeak/ui';
import { useState } from 'react';

const MyComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const topSection: TopSectionProps = {
    breadcrumbs: [{ label: "Home", to: "/" }],
    title: "Progress Sidebar",
  };
  
  const steps: StepsProps = {
    items: [
      { title: "Step 1", content: "Content for step 1" },
      { title: "Step 2", content: "Content for step 2" },
      { title: "Step 3", content: "Content for step 3" }
    ],
    activeStep: activeStep,
    onStepChange: (step) => setActiveStep(step)
  };
  
  return (
    <ProgressSidebar topSection={topSection} steps={steps} />
  );
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { ProgressSidebar, type TopSectionProps, type StepsProps } from '@zeak/ui';\nimport { useState } from 'react';\n\nconst MyComponent = () => {\n  const [activeStep, setActiveStep] = useState(0);\n  \n  const topSection: TopSectionProps = {\n    breadcrumbs: [{ label: "Home", to: "/" }],\n    title: "Progress Sidebar",\n  };\n  \n  const steps: StepsProps = {\n    items: [\n      { title: "Step 1", content: "Content for step 1" },\n      { title: "Step 2", content: "Content for step 2" },\n      { title: "Step 3", content: "Content for step 3" }\n    ],\n    activeStep: activeStep,\n    onStepChange: (step) => setActiveStep(step)\n  };\n  \n  return (\n    <ProgressSidebar topSection={topSection} steps={steps} />\n  );\n};`)}
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
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">topSection</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">TopSectionProps</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">Yes</div>
                            <div className="px-6 py-4 text-sm">Configuration for the top section with breadcrumbs and title</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">steps</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">StepsProps</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">Yes</div>
                            <div className="px-6 py-4 text-sm">Configuration for the steps with items, active step, and change handler</div>
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
                            <span className="ml-3 text-gray-700">Top section with breadcrumbs and title</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Step-by-step navigation with expandable content</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Visual indicators for active and completed steps</span>
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
    )
}