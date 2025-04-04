import { EmptyTableState } from "@zeak/ui";
import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";

export default function EmptyTableStateDocumentation() {
    const [copied, setCopied] = useState(false);
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">EmptyTableState Component</h1>
                <p className="text-gray-600 text-lg">
                    A modern, customizable component for displaying an empty state for tables with an optional action button.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} EmptyTableState {"}"} from '@zeak/ui';</code>
                    <button
                        onClick={() => copyToClipboard("import { EmptyTableState } from '@zeak/ui';")}
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
                        <EmptyTableState title="No items found" link="#" />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { EmptyTableState } from '@zeak/ui';

const MyComponent = () => {
  return (
    <EmptyTableState
      title="No items found"
      link="/create-new"
    />
  );
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { EmptyTableState } from '@zeak/ui';\n\nconst MyComponent = () => {\n  return (\n    <EmptyTableState\n      title="No items found"\n      link="/create-new"\n    />\n  );\n};`)}
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
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">title</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">Yes</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">-</div>
                            <div className="px-6 py-4 text-sm">The title text to display in the empty state.</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">link</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">-</div>
                            <div className="px-6 py-4 text-sm">URL to navigate to when the button is clicked.</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">onClick</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">() {"=>"} void</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">-</div>
                            <div className="px-6 py-4 text-sm">Function to call when the button is clicked.</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">className</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">-</div>
                            <div className="px-6 py-4 text-sm">Additional CSS classes for the container.</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">buttonClassName</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">-</div>
                            <div className="px-6 py-4 text-sm">Additional CSS classes for the button.</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">iconClassName</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">-</div>
                            <div className="px-6 py-4 text-sm">Additional CSS classes for the icon.</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">Basic Empty State</h3>
                        </div>
                        <div className="p-6">
                            <EmptyTableState title="No data available" link="#" />
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<EmptyTableState title="No data available" link="#" />`}</code>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">With onClick Handler</h3>
                        </div>
                        <div className="p-6">
                            <EmptyTableState
                                title="No records found"
                                onClick={() => alert('Add new item clicked')}
                            />
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<EmptyTableState title="No records found" onClick={() => alert('Add new item clicked')} />`}</code>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">Custom Styling</h3>
                        </div>
                        <div className="p-6">
                            <EmptyTableState
                                title="Your table is empty"
                                link="#"
                                className="h-[200px]"
                                buttonClassName="bg-blue-100"
                                iconClassName="text-blue-600"
                            />
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<EmptyTableState title="Your table is empty" link="#" className="h-[200px]" buttonClassName="bg-blue-100" iconClassName="text-blue-600" />`}</code>
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
                            <span className="ml-3 text-gray-700">Clean and modern design for empty table states</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Customizable action button with link or onClick handler</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Flexible styling through multiple className props</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Responsive design that works in any table context</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}