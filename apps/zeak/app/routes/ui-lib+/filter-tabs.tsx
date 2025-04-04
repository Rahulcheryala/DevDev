import { FilterTabs } from "@zeak/ui";
import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";

export default function FilterTabsDocumentation() {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">FilterTabs Component</h1>
                <p className="text-gray-600 text-lg">
                    A modern, customizable tab-based filter component for categorizing content.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} FilterTabs {"}"} from '@zeak/ui';</code>
                    <button
                        onClick={() => copyToClipboard("import { FilterTabs } from '@zeak/ui';")}
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
                        <FilterTabs
                            options={["All", "System", "User Defined"]}
                            defaultSelected="All"
                            onChange={setSelectedFilter}
                        />
                        <div className="mt-4 text-sm">
                            Selected filter: <span className="font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">{selectedFilter}</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { FilterTabs } from '@zeak/ui';
import { useState } from 'react';

const MyComponent = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  
  return (
    <FilterTabs
      options={["All", "System", "User Defined"]}
      defaultSelected="All"
      onChange={setSelectedFilter}
    />
  );
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { FilterTabs } from '@zeak/ui';\nimport { useState } from 'react';\n\nconst MyComponent = () => {\n  const [selectedFilter, setSelectedFilter] = useState("All");\n  \n  return (\n    <FilterTabs\n      options={["All", "System", "User Defined"]}\n      defaultSelected="All"\n      onChange={setSelectedFilter}\n    />\n  );\n};`)}
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
                        <FilterTabs
                            options={["Daily", "Weekly", "Monthly"]}
                            defaultSelected="Weekly"
                            className="justify-center"
                            activeClassName="bg-indigo-500 text-white"
                            inactiveClassName="text-gray-700 hover:bg-indigo-100"
                        />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`<FilterTabs
  options={["Daily", "Weekly", "Monthly"]}
  defaultSelected="Weekly"
  className="justify-center"
  activeClassName="bg-indigo-500 text-white"
  inactiveClassName="text-gray-700 hover:bg-indigo-100"
/>`}</pre>
                        <button
                            onClick={() => copyToClipboard(`<FilterTabs\n  options={["Daily", "Weekly", "Monthly"]}\n  defaultSelected="Weekly"\n  className="justify-center"\n  activeClassName="bg-indigo-500 text-white"\n  inactiveClassName="text-gray-700 hover:bg-indigo-100"\n/>`)}
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
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">options</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string[]</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">{`["All", "System", "User Defined"]`}</div>
                            <div className="px-6 py-4 text-sm">Array of filter options to display</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">defaultSelected</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">"All"</div>
                            <div className="px-6 py-4 text-sm">Initially selected filter option</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">onChange</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">{`(selected: string) => void`}</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">undefined</div>
                            <div className="px-6 py-4 text-sm">Callback when a filter option is selected</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">className</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">undefined</div>
                            <div className="px-6 py-4 text-sm">Additional classes for the container</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">activeClassName</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">"bg-[#D3DFE8] text-[#475467]"</div>
                            <div className="px-6 py-4 text-sm">Classes applied to the active tab</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">inactiveClassName</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">"text-[#101828] hover:bg-[#D3DFE8]"</div>
                            <div className="px-6 py-4 text-sm">Classes applied to inactive tabs</div>
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
                            <span className="ml-3 text-gray-700">Simple and intuitive filtering interface</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Customizable styling for active and inactive states</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Controlled component with onChange callback</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Default selection support</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Flexible layout with customizable container classes</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
