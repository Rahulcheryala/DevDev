import { ChevronNavigation } from "@zeak/ui";
import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";

export default function ChevronNavigationPage() {
    const [copied, setCopied] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
    const totalItems = items.length;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePrevClick = () => {
        if (activePage > 0) {
            setActivePage(activePage - 1);
        }
    };

    const handleNextClick = () => {
        if (activePage < totalItems - 1) {
            setActivePage(activePage + 1);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">ChevronNavigation Component</h1>
                <p className="text-gray-600 text-lg">
                    A sleek, intuitive navigation component for paginating through items with chevron controls.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} ChevronNavigation {"}"} from '@zeak/ui';</code>
                    <button
                        onClick={() => copyToClipboard("import { ChevronNavigation } from '@zeak/ui';")}
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
                    <div className="p-6 border-b border-gray-200 flex flex-col items-center bg-gray-400">
                        <ChevronNavigation
                            prevItem={activePage > 0 ? items[activePage - 1] : ""}
                            nextItem={activePage < totalItems - 1 ? items[activePage + 1] : ""}
                            activePage={activePage}
                            totalItems={totalItems}
                            onPrevClick={handlePrevClick}
                            onNextClick={handleNextClick}
                        />
                        <div className="mt-6 text-center">
                            <p className="text-lg font-medium">Current Item: {items[activePage]}</p>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { ChevronNavigation } from '@zeak/ui';
import { useState } from 'react';

const MyComponent = () => {
  const [activePage, setActivePage] = useState(0);
  const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
  const totalItems = items.length;

  const handlePrevClick = () => {
    if (activePage > 0) {
      setActivePage(activePage - 1);
    }
  };

  const handleNextClick = () => {
    if (activePage < totalItems - 1) {
      setActivePage(activePage + 1);
    }
  };
  
  return (
    <ChevronNavigation
      prevItem={activePage > 0 ? items[activePage - 1] : ""}
      nextItem={activePage < totalItems - 1 ? items[activePage + 1] : ""}
      activePage={activePage}
      totalItems={totalItems}
      onPrevClick={handlePrevClick}
      onNextClick={handleNextClick}
    />
  );
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { ChevronNavigation } from '@zeak/ui';\nimport { useState } from 'react';\n\nconst MyComponent = () => {\n  const [activePage, setActivePage] = useState(0);\n  const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];\n  const totalItems = items.length;\n\n  const handlePrevClick = () => {\n    if (activePage > 0) {\n      setActivePage(activePage - 1);\n    }\n  };\n\n  const handleNextClick = () => {\n    if (activePage < totalItems - 1) {\n      setActivePage(activePage + 1);\n    }\n  };\n  \n  return (\n    <ChevronNavigation\n      prevItem={activePage > 0 ? items[activePage - 1] : ""}\n      nextItem={activePage < totalItems - 1 ? items[activePage + 1] : ""}\n      activePage={activePage}\n      totalItems={totalItems}\n      onPrevClick={handlePrevClick}\n      onNextClick={handleNextClick}\n    />\n  );\n};`)}
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
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">prevItem</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">Required</div>
                            <div className="px-6 py-4 text-sm">Previous item identifier (empty string disables the button)</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">nextItem</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">Required</div>
                            <div className="px-6 py-4 text-sm">Next item identifier (empty string disables the button)</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">activePage</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">number</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">Required</div>
                            <div className="px-6 py-4 text-sm">Zero-based index of the current active page</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">totalItems</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">number</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">Required</div>
                            <div className="px-6 py-4 text-sm">Total number of items in the collection</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">onPrevClick</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">() {"=>"} void</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">Required</div>
                            <div className="px-6 py-4 text-sm">Callback function when previous button is clicked</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">onNextClick</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">() {"=> "}void</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">Required</div>
                            <div className="px-6 py-4 text-sm">Callback function when next button is clicked</div>
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
                            <span className="ml-3 text-gray-700">Intuitive pagination with chevron controls</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Automatic button disabling when reaching boundaries</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Current page indicator with total count</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Clean, modern design with rounded buttons</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Fully controlled component with callback functions</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
