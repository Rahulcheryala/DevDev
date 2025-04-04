import React, { useState } from "react";
import { DataTableView } from "@zeak/datatable";
import { Code, Copy, Check } from "lucide-react";

export default function DataTableViewComponent() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">DataTableView Component</h1>
                <p className="text-gray-600 text-lg">
                    A dropdown component for selecting different table views with search functionality.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} DataTableView {"}"} from '@zeak/datatable';</code>
                    <button
                        onClick={() => copyToClipboard("import { DataTableView } from '@zeak/datatable';")}
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
                        <DataTableView />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { DataTableView } from '@zeak/datatable';

const MyComponent = () => {
  return <DataTableView />;
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { DataTableView } from '@zeak/datatable';\n\nconst MyComponent = () => {\n  return <DataTableView />;\n};`)}
                            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                            aria-label="Copy code"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                        </button>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Custom Options</h2>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-200">
                        <DataTableView
                            options={[
                                { value: "custom-view", label: "Custom View" },
                                { value: "admin-view", label: "Admin View" }
                            ]}
                            defaultValue="custom-view"
                            width="w-[250px]"
                        />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { DataTableView } from '@zeak/datatable';
import { TbTable } from "react-icons/tb";

const MyCustomView = () => {
  return (
    <DataTableView 
      options={[
        {
          value: "custom-view",
          label: "Custom View",
          icon: <TbTable className="h-5 w-5" />
        },
        {
          value: "admin-view",
          label: "Admin View",
          icon: <TbTable className="h-5 w-5" />
        },
      ]}
      defaultValue="custom-view"
      width="w-[250px]"
      onChange={(value) => console.log("Selected view:", value)}
    />
  );
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { DataTableView } from '@zeak/datatable';\nimport { TbTable } from "react-icons/tb";\n\nconst MyCustomView = () => {\n  return (\n    <DataTableView \n      options={[\n        {\n          value: "custom-view",\n          label: "Custom View",\n          icon: <TbTable className="h-5 w-5" />\n        },\n        {\n          value: "admin-view",\n          label: "Admin View",\n          icon: <TbTable className="h-5 w-5" />\n        },\n      ]}\n      defaultValue="custom-view"\n      width="w-[250px]"\n      onChange={(value) => console.log("Selected view:", value)}\n    />\n  );\n};`)}
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
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">ViewOption[]</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">Default and Kiran's View</div>
                            <div className="px-6 py-4 text-sm">Array of view options with value, label, and optional icon</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">defaultValue</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">"default"</div>
                            <div className="px-6 py-4 text-sm">The initially selected view value</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">placeholder</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">"Select View..."</div>
                            <div className="px-6 py-4 text-sm">Placeholder text when no view is selected</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">width</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">"w-[200px]"</div>
                            <div className="px-6 py-4 text-sm">Width of the dropdown component</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">emptyMessage</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">"No view found."</div>
                            <div className="px-6 py-4 text-sm">Message displayed when search returns no results</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">searchPlaceholder</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">"Search view..."</div>
                            <div className="px-6 py-4 text-sm">Placeholder for the search input</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">onChange</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">(value: string) ={">"} void</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">undefined</div>
                            <div className="px-6 py-4 text-sm">Callback function when a view is selected</div>
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
                            <span className="ml-3 text-gray-700">Searchable dropdown for table views</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Support for custom icons in dropdown options</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Customizable width and placeholder text</span>
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
                            <span className="ml-3 text-gray-700">Seamless integration with DataTable component</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
