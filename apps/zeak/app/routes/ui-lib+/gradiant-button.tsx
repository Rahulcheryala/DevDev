import { BackGradiantButton } from "@zeak/ui";
import { Code, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function GradiantButton() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">BackGradiantButton Component</h1>
                <p className="text-gray-600 text-lg">
                    A stylish back button component with gradient text effect that can be used for navigation or to trigger custom actions.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} BackGradiantButton {"}"} from '@zeak/ui';</code>
                    <button
                        onClick={() => copyToClipboard("import { BackGradiantButton } from '@zeak/ui';")}
                        className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
                        aria-label="Copy code"
                    >
                        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-gray-400" />}
                    </button>
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
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">label</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 text-sm">Button text (default: "Back")</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">className</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 text-sm">Additional classes for the container</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">iconClassName</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 text-sm">Classes for the chevron icon</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">textClassName</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 text-sm">Classes for the button text</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">onClick</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">() {"=>"} void</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 text-sm">Function to call when button is clicked</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Examples</h2>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="font-medium mb-4">Default Button</h3>
                        <BackGradiantButton label="Back" />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`<BackGradiantButton label="Back" />`}</pre>
                        <button
                            onClick={() => copyToClipboard(`<BackGradiantButton label="Back" />`)}
                            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                            aria-label="Copy code"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="font-medium mb-4">Custom Label</h3>
                        <BackGradiantButton label="Go Back" />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`<BackGradiantButton label="Go Back" />`}</pre>
                        <button
                            onClick={() => copyToClipboard(`<BackGradiantButton label="Go Back" />`)}
                            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                            aria-label="Copy code"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="font-medium mb-4">With Custom Classes</h3>
                        <BackGradiantButton
                            label="Return"
                            className="bg-gray-100 rounded"
                            iconClassName="text-blue-500"
                        />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`<BackGradiantButton 
  label="Return" 
  className="bg-gray-100 rounded"
  iconClassName="text-blue-500"
/>`}</pre>
                        <button
                            onClick={() => copyToClipboard(`<BackGradiantButton 
  label="Return" 
  className="bg-gray-100 rounded"
  iconClassName="text-blue-500"
/>`)}
                            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                            aria-label="Copy code"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="font-medium mb-4">With Click Handler</h3>
                        <BackGradiantButton
                            label="Click Me"
                            onClick={() => alert('Button clicked!')}
                        />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`<BackGradiantButton 
  label="Click Me" 
  onClick={() => alert('Button clicked!')}
/>`}</pre>
                        <button
                            onClick={() => copyToClipboard(`<BackGradiantButton 
  label="Click Me" 
  onClick={() => alert('Button clicked!')}
/>`)}
                            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                            aria-label="Copy code"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                        </button>
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
                            <span className="ml-3 text-gray-700">Stylish gradient text effect for visual appeal</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Customizable label text to fit any context</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Flexible styling options with custom class props</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Interactive with customizable click handlers</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Intuitive design with chevron icon for clear navigation</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}