import { TypePill } from "@zeak/ui";
import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";

export default function TypePillDocumentation() {
    const [copied, setCopied] = useState(false);
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">TypePill Component</h1>
                <p className="text-gray-600 text-lg">
                    A versatile pill component for displaying different types with customizable icons and labels.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} TypePill {"}"} from '@zeak/ui';</code>
                    <button
                        onClick={() => copyToClipboard("import { TypePill } from '@zeak/ui';")}
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
                        <TypePill />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { TypePill } from '@zeak/ui';

const MyComponent = () => {
  return <TypePill />;  // Default is "system" variant
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { TypePill } from '@zeak/ui';\n\nconst MyComponent = () => {\n  return <TypePill />;  // Default is "system" variant\n};`)}
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
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">variant</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">"system" | "user"</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">"system"</div>
                            <div className="px-6 py-4 text-sm">Determines the default icon and label.</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">label</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">Based on variant</div>
                            <div className="px-6 py-4 text-sm">Custom label text.</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">className</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">-</div>
                            <div className="px-6 py-4 text-sm">Additional classes for the container.</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">textClassName</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">-</div>
                            <div className="px-6 py-4 text-sm">Additional classes for the text.</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">Default (System) Variant</h3>
                        </div>
                        <div className="p-6">
                            <TypePill />
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<TypePill />`}</code>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">User Variant</h3>
                        </div>
                        <div className="p-6">
                            <TypePill variant="user" />
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<TypePill variant="user" />`}</code>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">Custom Label</h3>
                        </div>
                        <div className="p-6">
                            <TypePill label="Custom Label" />
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<TypePill label="Custom Label" />`}</code>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">Custom Styling</h3>
                        </div>
                        <div className="p-6">
                            <TypePill
                                className="bg-blue-100"
                                textClassName="text-blue-700 font-semibold"
                            />
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<TypePill className="bg-blue-100" textClassName="text-blue-700 font-semibold" />`}</code>
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
                            <span className="ml-3 text-gray-700">Versatile pill component for displaying type information</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Multiple variants with appropriate icons and labels</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Customizable styling through className and textClassName props</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Support for custom labels to override default text</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}