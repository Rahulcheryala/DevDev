import { useState } from "react";
import { DualButton } from "@zeak/ui";
import { Code, Package, ChevronRight, Check } from "lucide-react";

export default function DualButtonDocumentation() {
    return (
        <div className="container mx-auto p-8 space-y-12 w-full">
            <header className="space-y-3 border-l-4 border-indigo-600 pl-6 py-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">DualButton Component</h1>
                <p className="text-gray-600 text-lg">
                    A versatile component for displaying a dual button with primary and secondary actions, perfect for multi-step forms and complex user flows.
                </p>
            </header>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">
                    <Package className="h-5 w-5 text-indigo-600" />
                    Installation
                </h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} DualButton {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">
                    <Code className="h-5 w-5 text-indigo-600" />
                    Basic Usage
                </h2>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1 p-6 border rounded-xl shadow-sm bg-white">
                        <DualButton
                            primaryText="Primary Action"
                            secondaryText="Secondary Action"
                            onClick={() => console.log('Primary action clicked')}
                            onSecondaryClick={() => console.log('Secondary action clicked')}
                        />
                    </div>
                    <div className="flex-1 bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                        <pre>{`import { DualButton } from '@zeak/ui';

const MyComponent = () => {
  return (
    <DualButton
      primaryText="Next"
      secondaryText="Save As Draft"
      onClick={() => console.log('Primary action clicked')}
      onSecondaryClick={() => console.log('Secondary action clicked')}
    />
  );
};`}</pre>
                    </div>
                </div>
            </section>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">
                    <Check className="h-5 w-5 text-indigo-600" />
                    Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Primary and secondary action buttons in one component</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Optional dropdown menu for additional actions</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Customizable dimensions and styling</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Support for custom children elements</span>
                    </div>
                </div>
            </section>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">
                    Props
                </h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onClick</code></td>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">() {'=>'} void</code></td>
                                <td className="px-6 py-4 whitespace-nowrap">-</td>
                                <td className="px-6 py-4">Function called when the primary button is clicked</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onSecondaryClick</code></td>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">() {'=>'} void</code></td>
                                <td className="px-6 py-4 whitespace-nowrap">-</td>
                                <td className="px-6 py-4">Function called when the secondary button is clicked</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">primaryText</code></td>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></td>
                                <td className="px-6 py-4 whitespace-nowrap">"Next"</td>
                                <td className="px-6 py-4">Text to display on the primary button</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">secondaryText</code></td>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></td>
                                <td className="px-6 py-4 whitespace-nowrap">"Save As Draft"</td>
                                <td className="px-6 py-4">Text to display on the secondary button</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">topButtonOptions</code></td>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">TopButtonOption[]</code></td>
                                <td className="px-6 py-4 whitespace-nowrap">[]</td>
                                <td className="px-6 py-4">Array of options for the dropdown menu</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">width</code></td>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></td>
                                <td className="px-6 py-4 whitespace-nowrap">"216px"</td>
                                <td className="px-6 py-4">Width of the button component</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">height</code></td>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></td>
                                <td className="px-6 py-4 whitespace-nowrap">"56px"</td>
                                <td className="px-6 py-4">Height of the button component</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">primaryClassName</code></td>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></td>
                                <td className="px-6 py-4 whitespace-nowrap">-</td>
                                <td className="px-6 py-4">Additional CSS classes for the primary button</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">secondaryClassName</code></td>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></td>
                                <td className="px-6 py-4 whitespace-nowrap">-</td>
                                <td className="px-6 py-4">Additional CSS classes for the secondary button</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">dropdownClassName</code></td>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></td>
                                <td className="px-6 py-4 whitespace-nowrap">-</td>
                                <td className="px-6 py-4">Additional CSS classes for the dropdown element</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">type</code></td>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">"submit" | "button" | "reset"</code></td>
                                <td className="px-6 py-4 whitespace-nowrap">"submit"</td>
                                <td className="px-6 py-4">HTML button type attribute</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">children</code></td>
                                <td className="px-6 py-4 whitespace-nowrap"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">ReactNode</code></td>
                                <td className="px-6 py-4 whitespace-nowrap">-</td>
                                <td className="px-6 py-4">Custom content for the primary button (replaces primaryText)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">
                    <ChevronRight className="h-5 w-5 text-indigo-600" />
                    Examples
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-xl font-medium text-gray-800">Default</h3>
                        <div className="p-6 bg-white rounded-lg shadow-sm flex justify-center">
                            <DualButton
                                primaryText="Primary Action"
                                secondaryText="Secondary Action"
                                onClick={() => console.log('Primary action clicked')}
                                onSecondaryClick={() => console.log('Secondary action clicked')}
                            />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-md text-sm font-mono overflow-x-auto">
                            <code>{`<DualButton 
  primaryText="Primary Action" 
  secondaryText="Secondary Action" 
/>`}</code>
                        </div>
                    </div>

                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-xl font-medium text-gray-800">Custom Styling</h3>
                        <div className="p-6 bg-white rounded-lg shadow-sm flex justify-center">
                            <DualButton
                                primaryText="Submit"
                                secondaryText="Save Draft"
                                primaryClassName="bg-blue-600 hover:bg-blue-700"
                                secondaryClassName="bg-blue-600 hover:bg-blue-700"
                                onClick={() => console.log('Primary action clicked')}
                                onSecondaryClick={() => console.log('Secondary action clicked')}
                            />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-md text-sm font-mono overflow-x-auto">
                            <code>{`<DualButton 
  primaryText="Submit" 
  secondaryText="Save Draft" 
  primaryClassName="bg-blue-600 hover:bg-blue-700" 
  secondaryClassName="bg-blue-600 hover:bg-blue-700" 
/>`}</code>
                        </div>
                    </div>

                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-xl font-medium text-gray-800">Custom Dimensions</h3>
                        <div className="p-6 bg-white rounded-lg shadow-sm flex justify-center">
                            <DualButton
                                primaryText="Wider Button"
                                secondaryText="Secondary Option"
                                width="300px"
                                height="48px"
                                onClick={() => console.log('Primary action clicked')}
                                onSecondaryClick={() => console.log('Secondary action clicked')}
                            />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-md text-sm font-mono overflow-x-auto">
                            <code>{`<DualButton 
  primaryText="Wider Button" 
  secondaryText="Secondary Option" 
  width="300px" 
  height="48px" 
/>`}</code>
                        </div>
                    </div>

                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-xl font-medium text-gray-800">Button Type</h3>
                        <div className="p-6 bg-white rounded-lg shadow-sm flex justify-center">
                            <DualButton
                                primaryText="Submit Form"
                                secondaryText="Reset Form"
                                type="submit"
                                onClick={() => console.log('Primary action clicked')}
                                onSecondaryClick={() => console.log('Secondary action clicked')}
                            />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-md text-sm font-mono overflow-x-auto">
                            <code>{`<DualButton 
  primaryText="Submit Form" 
  secondaryText="Reset Form" 
  type="submit" 
/>`}</code>
                        </div>
                    </div>

                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-xl font-medium text-gray-800">With Custom Children</h3>
                        <div className="p-6 bg-white rounded-lg shadow-sm flex justify-center">
                            <DualButton
                                secondaryText="Alternative"
                                onClick={() => console.log('Primary action clicked')}
                                onSecondaryClick={() => console.log('Secondary action clicked')}
                            >
                                <div className="flex items-center gap-2">
                                    <span>Continue</span>
                                    <span>→</span>
                                </div>
                            </DualButton>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-md text-sm font-mono overflow-x-auto">
                            <code>{`<DualButton secondaryText="Alternative">
  <div className="flex items-center gap-2">
    <span>Continue</span>
    <span>→</span>
  </div>
</DualButton>`}</code>
                        </div>
                    </div>

                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-xl font-medium text-gray-800">With Dropdown Options</h3>
                        <div className="p-6 bg-white rounded-lg shadow-sm flex justify-center">
                            <DualButton
                                primaryText="Save"
                                topButtonOptions={[
                                    { text: "Save As Draft", onClick: () => console.log("Save as draft") },
                                    { text: "Save & Exit", onClick: () => console.log("Save and exit") },
                                    { text: "Save & New", onClick: () => console.log("Save and create new") }
                                ]}
                                onClick={() => console.log('Primary action clicked')}
                            />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-md text-sm font-mono overflow-x-auto">
                            <code>{`<DualButton 
  primaryText="Save" 
  topButtonOptions={[
    { text: "Save As Draft", onClick: () => console.log("Save as draft") },
    { text: "Save & Exit", onClick: () => console.log("Save and exit") },
    { text: "Save & New", onClick: () => console.log("Save and create new") }
  ]} 
/>`}</code>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}