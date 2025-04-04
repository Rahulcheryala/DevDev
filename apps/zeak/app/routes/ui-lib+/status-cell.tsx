import { StatusTableCell } from "@zeak/datatable";
import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";

export default function StatusCellDocumentation() {
    const [copied, setCopied] = useState(false);
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">StatusTableCell Component</h1>
                <p className="text-gray-600 text-lg">
                    A modern, customizable component for displaying active or inactive status with icons in tables.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} StatusTableCell {"}"} from '@zeak/datatable';</code>
                    <button
                        onClick={() => copyToClipboard("import { StatusTableCell } from '@zeak/datatable';")}
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
                        <StatusTableCell status={true} />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { StatusTableCell } from '@zeak/datatable';

const MyComponent = () => {
  return <StatusTableCell status={true} />;
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { StatusTableCell } from '@zeak/datatable';\n\nconst MyComponent = () => {\n  return <StatusTableCell status={true} />;\n};`)}
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
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-5">
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Prop</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Required</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Default</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</div>
                    </div>
                    <div className="divide-y divide-gray-200 bg-white">
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">status</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">boolean</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">Yes</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">-</div>
                            <div className="px-6 py-4 text-sm">Whether the status is active (true) or inactive (false).</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">maxWidth</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">number</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">-</div>
                            <div className="px-6 py-4 text-sm">Optional maximum width for the status text.</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">className</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">-</div>
                            <div className="px-6 py-4 text-sm">Additional CSS classes to apply to the component.</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">Active Status</h3>
                        </div>
                        <div className="p-6">
                            <StatusTableCell status={true} />
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<StatusTableCell status={true} />`}</code>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">Inactive Status</h3>
                        </div>
                        <div className="p-6">
                            <StatusTableCell status={false} />
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<StatusTableCell status={false} />`}</code>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">With Max Width</h3>
                        </div>
                        <div className="p-6">
                            <StatusTableCell status={true} maxWidth={80} />
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<StatusTableCell status={true} maxWidth={80} />`}</code>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">With Custom Class</h3>
                        </div>
                        <div className="p-6">
                            <StatusTableCell status={false} className="bg-gray-50 p-2 rounded" />
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<StatusTableCell status={false} className="bg-gray-50 p-2 rounded" />`}</code>
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
                            <span className="ml-3 text-gray-700">Clean and modern design for displaying status in tables</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Visual indicators with color and icons for active/inactive states</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Customizable styling through className prop</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Configurable width constraints for flexible layouts</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
