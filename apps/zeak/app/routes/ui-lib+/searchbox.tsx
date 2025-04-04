import { SearchBox } from "@zeak/ui";
import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";

export default function SearchBoxDocumentation() {
    const [searchValue, setSearchValue] = useState("");
    const [copied, setCopied] = useState(false);
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">SearchBox Component</h1>
                <p className="text-gray-600 text-lg">
                    A customizable search input component with an integrated search icon.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} SearchBox {"}"} from '@zeak/ui';</code>
                    <button
                        onClick={() => copyToClipboard("import { SearchBox } from '@zeak/ui';")}
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
                        <div className="max-w-md">
                            <SearchBox
                                value={searchValue}
                                onChange={setSearchValue}
                                placeholder="Search items..."
                            />
                        </div>
                        <div className="text-sm mt-4">
                            Current value: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{searchValue}</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { SearchBox } from '@zeak/ui';
import { useState } from 'react';

const MyComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  
  return (
    <SearchBox
      value={searchValue}
      onChange={setSearchValue}
      placeholder="Search items..."
    />
  );
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { SearchBox } from '@zeak/ui';\nimport { useState } from 'react';\n\nconst MyComponent = () => {\n  const [searchValue, setSearchValue] = useState("");\n  \n  return (\n    <SearchBox\n      value={searchValue}\n      onChange={setSearchValue}\n      placeholder="Search items..."\n    />\n  );\n};`)}
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
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">value</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">undefined</div>
                            <div className="px-6 py-4 text-sm">The controlled input value</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">onChange</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">(value: string) {"=>"} void</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">undefined</div>
                            <div className="px-6 py-4 text-sm">Callback when input value changes</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">placeholder</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">"Search"</div>
                            <div className="px-6 py-4 text-sm">Placeholder text for the input</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">className</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">undefined</div>
                            <div className="px-6 py-4 text-sm">Additional classes for the container</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">inputClassName</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">undefined</div>
                            <div className="px-6 py-4 text-sm">Additional classes for the input element</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">iconClassName</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">undefined</div>
                            <div className="px-6 py-4 text-sm">Additional classes for the search icon</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">Basic Search</h3>
                        </div>
                        <div className="p-6">
                            <SearchBox placeholder="Search..." />
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<SearchBox placeholder="Search..." />`}</code>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">Custom Styling</h3>
                        </div>
                        <div className="p-6">
                            <SearchBox
                                placeholder="Custom styled search..."
                                className="px-0"
                                inputClassName="bg-blue-50 border border-blue-200 rounded-full"
                                iconClassName="text-blue-500"
                            />
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<SearchBox 
  placeholder="Custom styled search..."
  className="px-0"
  inputClassName="bg-blue-50 border border-blue-200 rounded-full"
  iconClassName="text-blue-500"
/>`}</code>
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
                            <span className="ml-3 text-gray-700">Controlled and uncontrolled input modes</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Customizable styling for container, input, and icon</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Built-in search icon from Lucide React</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Responsive design that works in various layouts</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
