import { RadioCheckbox } from "@zeak/ui";
import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";
import { type CheckedState } from "@radix-ui/react-checkbox";

export default function RadioCheckboxDocumentation() {
    const [isChecked, setIsChecked] = useState(false);
    const [copied, setCopied] = useState(false);
    
    const handleCheckedChange = (checked: CheckedState) => {
        if (typeof checked === 'boolean') {
            setIsChecked(checked);
        }
    };
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">RadioCheckbox Component</h1>
                <p className="text-gray-600 text-lg">
                    A checkbox component with radio-like appearance, combining the functionality of a checkbox with the visual style of a radio button.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} RadioCheckbox {"}"} from '@zeak/ui';</code>
                    <button
                        onClick={() => copyToClipboard("import { RadioCheckbox } from '@zeak/ui';")}
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
                        <RadioCheckbox
                            checked={isChecked}
                            onCheckedChange={handleCheckedChange}
                            id="example-checkbox"
                        />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { RadioCheckbox } from '@zeak/ui';
import { useState } from 'react';
import { type CheckedState } from "@radix-ui/react-checkbox";

const MyComponent = () => {
  const [isChecked, setIsChecked] = useState(false);
  
  const handleCheckedChange = (checked: CheckedState) => {
    if (typeof checked === 'boolean') {
      setIsChecked(checked);
    }
  };
  
  return (
    <RadioCheckbox 
      checked={isChecked} 
      onCheckedChange={handleCheckedChange} 
    />
  );
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { RadioCheckbox } from '@zeak/ui';\nimport { useState } from 'react';\nimport { type CheckedState } from "@radix-ui/react-checkbox";\n\nconst MyComponent = () => {\n  const [isChecked, setIsChecked] = useState(false);\n  \n  const handleCheckedChange = (checked: CheckedState) => {\n    if (typeof checked === 'boolean') {\n      setIsChecked(checked);\n    }\n  };\n  \n  return (\n    <RadioCheckbox \n      checked={isChecked} \n      onCheckedChange={handleCheckedChange} \n    />\n  );\n};`)}
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
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">checked</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">boolean</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">false</div>
                            <div className="px-6 py-4 text-sm">Whether the checkbox is checked.</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">isChecked</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">boolean</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">undefined</div>
                            <div className="px-6 py-4 text-sm">Alternative way to control the checked state.</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">isIndeterminate</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">boolean</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">false</div>
                            <div className="px-6 py-4 text-sm">Whether the checkbox is in an indeterminate state.</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">onCheckedChange</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">(checked: CheckedState) {"=>"} void</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">-</div>
                            <div className="px-6 py-4 text-sm">Callback when the checked state changes.</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">disabled</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">boolean</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">false</div>
                            <div className="px-6 py-4 text-sm">Whether the checkbox is disabled.</div>
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
                            <h3 className="text-lg font-medium text-gray-800">Basic Example</h3>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2">
                                <RadioCheckbox
                                    checked={isChecked}
                                    onCheckedChange={handleCheckedChange}
                                    id="example-checkbox"
                                />
                                <label htmlFor="example-checkbox">
                                    {isChecked ? "Checked" : "Unchecked"}
                                </label>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<RadioCheckbox checked={isChecked} onCheckedChange={handleCheckedChange} id="example-checkbox" />`}</code>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">Indeterminate State</h3>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2">
                                <RadioCheckbox
                                    isIndeterminate={true}
                                    id="indeterminate-checkbox"
                                />
                                <label htmlFor="indeterminate-checkbox">
                                    Indeterminate state
                                </label>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<RadioCheckbox isIndeterminate={true} id="indeterminate-checkbox" />`}</code>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">Disabled State</h3>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2">
                                <RadioCheckbox
                                    disabled
                                    id="disabled-checkbox"
                                />
                                <label htmlFor="disabled-checkbox">
                                    Disabled checkbox
                                </label>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <code className="text-sm font-mono text-gray-600">{`<RadioCheckbox disabled id="disabled-checkbox" />`}</code>
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
                            <span className="ml-3 text-gray-700">Combines checkbox functionality with radio button appearance</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Supports checked, unchecked, and indeterminate states</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Fully accessible with keyboard navigation and screen reader support</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Customizable styling through className prop</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}