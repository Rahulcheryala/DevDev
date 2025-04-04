import { CardRadioSelector } from "@zeak/ui";
import { useState } from "react";
import { Code, Package, Check, } from "lucide-react";


export default function RadioCardPage() {
    const [selectedValue, setSelectedValue] = useState("option1");
    const [customSelected, setCustomSelected] = useState("red");

    const handleValueChange = (value: string) => {
        setSelectedValue(value);
        console.log('Selected value:', value);
    };

    return (
        <div className="container mx-auto p-8 space-y-12 w-full">
            <header className="space-y-3 border-l-4 border-indigo-600 pl-6 py-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Radio Card Component</h1>
                <p className="text-gray-600 text-lg">
                    A stylish radio button group component with card-like appearance for intuitive option selection.
                </p>
            </header>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">
                    <Package className="h-5 w-5 text-indigo-600" />
                    Installation
                </h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} CardRadioSelector {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">
                    <Code className="h-5 w-5 text-indigo-600" />
                    Basic Usage
                </h2>
                <div className=" md:flex-row gap-8 items-start">
                    <div className="flex-1 p-6 border rounded-xl shadow-sm bg-white">
                        <CardRadioSelector
                            label="Select an option"
                            selected={selectedValue}
                            items={[
                                { value: "option1", label: "Option 1", description: "This is the first option" },
                                { value: "option2", label: "Option 2", description: "This is the second option" },
                                { value: "option3", label: "Option 3", description: "This is the third option" }
                            ]}
                            onChange={handleValueChange}
                        />
                        <p className="mt-4 text-sm text-gray-600">Selected value: <span className="font-semibold text-indigo-600">{selectedValue}</span></p>
                    </div>
                    <div className="flex-1 bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                        <pre>{`import { CardRadioSelector } from '@zeak/ui';
import { useState } from 'react';

const MyComponent = () => {
  const [selected, setSelected] = useState("option1");
  
  return (
    <CardRadioSelector
      label="Select an option"
      selected={selected}
      items={[
        { 
          value: "option1", 
          label: "Option 1", 
          description: "This is the first option" 
        },
        { 
          value: "option2", 
          label: "Option 2", 
          description: "This is the second option" 
        },
        { 
          value: "option3", 
          label: "Option 3", 
          description: "This is the third option" 
        }
      ]}
      onChange={(value) => setSelected(value)}
    />
  );
};`}</pre>
                    </div>
                </div>
            </section>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">
                    <Check className="h-5 w-5 text-indigo-600" />
                    Examples
                </h2>

                <div className="space-y-8">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-xl font-medium mb-4 text-gray-800">Required Field</h3>
                        <CardRadioSelector
                            label="Required selection"
                            isRequired={true}
                            selected={selectedValue}
                            items={[
                                { value: "yes", label: "Yes", description: "Proceed with the action" },
                                { value: "no", label: "No", description: "Cancel the action" }
                            ]}
                            onChange={handleValueChange}
                        />
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-xl font-medium mb-4 text-gray-800">Custom Styling</h3>
                        <CardRadioSelector
                            label="Select a color theme"
                            selected={customSelected}
                            items={[
                                {
                                    value: "red",
                                    label: "Red Theme",
                                    description: "Bold and energetic",
                                    icon: <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                },
                                {
                                    value: "green",
                                    label: "Green Theme",
                                    description: "Fresh and natural",
                                    icon: <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                },
                                {
                                    value: "blue",
                                    label: "Blue Theme",
                                    description: "Calm and professional",
                                    icon: <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                }
                            ]}
                            onChange={(value) => setCustomSelected(value)}
                            className="max-w-2xl"
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">
                    Props
                </h2>
                <div className="overflow-x-auto rounded-xl shadow-sm">
                    <table className="min-w-full border border-gray-200 rounded-xl">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">Prop</th>
                                <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">Type</th>
                                <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">Required</th>
                                <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 border-b"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">selected</code></td>
                                <td className="py-3 px-4 border-b"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></td>
                                <td className="py-3 px-4 border-b text-green-600 font-medium">Yes</td>
                                <td className="py-3 px-4 border-b">The currently selected value</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 border-b"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">items</code></td>
                                <td className="py-3 px-4 border-b"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">CardRadioItem[]</code></td>
                                <td className="py-3 px-4 border-b text-green-600 font-medium">Yes</td>
                                <td className="py-3 px-4 border-b">Array of items to display as selectable cards</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 border-b"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">label</code></td>
                                <td className="py-3 px-4 border-b"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></td>
                                <td className="py-3 px-4 border-b">No</td>
                                <td className="py-3 px-4 border-b">The label text for the radio group</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 border-b"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">isRequired</code></td>
                                <td className="py-3 px-4 border-b"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">boolean</code></td>
                                <td className="py-3 px-4 border-b">No</td>
                                <td className="py-3 px-4 border-b">Whether the field is required (adds * to label)</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 border-b"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onChange</code></td>
                                <td className="py-3 px-4 border-b"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(value: string) {"=>"} void</code></td>
                                <td className="py-3 px-4 border-b">No</td>
                                <td className="py-3 px-4 border-b">Callback function when selection changes</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 border-b"><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">className</code></td>
                                <td className="py-3 px-4 border-b"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></td>
                                <td className="py-3 px-4 border-b">No</td>
                                <td className="py-3 px-4 border-b">Additional CSS classes for the container</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">
                    CardRadioItem Type
                </h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`interface CardRadioItem {
  value: string;      // Value to be used when selected
  label: string;      // Display label for the option
  description?: string; // Optional description text
  icon?: React.ReactNode; // Optional icon element
  badgeText?: string; // Optional badge text
  badgeColor?: string; // Optional badge color
  className?: string; // Optional CSS class for the item
}`}</pre>
                </div>
            </section>
        </div>
    );
}