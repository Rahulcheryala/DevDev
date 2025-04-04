import { CardRadioSelector } from "@zeak/ui";
import { useState } from "react";
import { Clock, AlertTriangle, Info, Zap, Settings, Shield, Database, Code, X } from "lucide-react";
import { cn } from "@zeak/react";

export default function CardRadioSelectorPage() {
    const [basicSelected, setBasicSelected] = useState("1");
    const [advancedSelected, setAdvancedSelected] = useState("a1");
    const [customSelected, setCustomSelected] = useState("theme1");
    const [showBasicCode, setShowBasicCode] = useState(false);
    const [showAdvancedCode, setShowAdvancedCode] = useState(false);
    const [showCustomCode, setShowCustomCode] = useState(false);

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-12">
            <div>
                <h1 className="text-3xl font-bold mb-4 text-gray-900">Card Radio Selector</h1>
                <p className="text-gray-600 mb-8 text-lg max-w-3xl">
                    A component that displays a group of selectable cards with radio buttons.
                    Useful for selecting between different options with visual descriptions and rich content.
                </p>

                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Component Props</h2>
                <div className="mb-8 overflow-x-auto rounded-xl shadow-sm">
                    <div className="min-w-full border border-gray-200 rounded-xl">
                        {/* Table Header */}
                        <div className="grid grid-cols-4 bg-gray-50 border-b rounded-t-xl">
                            <div className="font-medium text-gray-700 p-4">Prop</div>
                            <div className="font-medium text-gray-700 p-4">Type</div>
                            <div className="font-medium text-gray-700 p-4">Default</div>
                            <div className="font-medium text-gray-700 p-4">Description</div>
                        </div>

                        {/* Table Rows */}
                        <div className="grid grid-cols-4 border-b">
                            <div className="p-4 font-mono text-sm text-indigo-600">selected</div>
                            <div className="p-4">string</div>
                            <div className="p-4">-</div>
                            <div className="p-4">The currently selected value. Required.</div>
                        </div>

                        <div className="grid grid-cols-4 border-b bg-gray-50">
                            <div className="p-4 font-mono text-sm text-indigo-600">items</div>
                            <div className="p-4">CardRadioItem[]</div>
                            <div className="p-4">-</div>
                            <div className="p-4">Array of items to display as selectable cards. Required.</div>
                        </div>

                        <div className="grid grid-cols-4 border-b">
                            <div className="p-4 font-mono text-sm text-indigo-600">label</div>
                            <div className="p-4">string</div>
                            <div className="p-4">undefined</div>
                            <div className="p-4">Optional heading text displayed above the card group.</div>
                        </div>

                        <div className="grid grid-cols-4 border-b bg-gray-50">
                            <div className="p-4 font-mono text-sm text-indigo-600">isRequired</div>
                            <div className="p-4">boolean</div>
                            <div className="p-4">false</div>
                            <div className="p-4">When true, adds a red asterisk (*) to the label to indicate required selection.</div>
                        </div>

                        <div className="grid grid-cols-4 border-b">
                            <div className="p-4 font-mono text-sm text-indigo-600">className</div>
                            <div className="p-4">string</div>
                            <div className="p-4">undefined</div>
                            <div className="p-4">Additional CSS classes to apply to the card container grid.</div>
                        </div>

                        <div className="grid grid-cols-4 bg-gray-50 rounded-b-xl">
                            <div className="p-4 font-mono text-sm text-indigo-600">onChange</div>
                            <div className="p-4">(value: string) {"=>"} void</div>
                            <div className="p-4">undefined</div>
                            <div className="p-4">Callback function triggered when selection changes.</div>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Item Properties</h2>
                <div className="mb-8 overflow-x-auto rounded-xl shadow-sm">
                    <div className="min-w-full border border-gray-200 rounded-xl">
                        {/* Table Header */}
                        <div className="grid grid-cols-4 bg-gray-50 border-b rounded-t-xl">
                            <div className="font-medium text-gray-700 p-4">Property</div>
                            <div className="font-medium text-gray-700 p-4">Type</div>
                            <div className="font-medium text-gray-700 p-4">Required</div>
                            <div className="font-medium text-gray-700 p-4">Description</div>
                        </div>

                        {/* Table Rows */}
                        <div className="grid grid-cols-4 border-b">
                            <div className="p-4 font-mono text-sm text-indigo-600">value</div>
                            <div className="p-4">string</div>
                            <div className="p-4">Yes</div>
                            <div className="p-4">Unique identifier for the item, used for selection state.</div>
                        </div>

                        <div className="grid grid-cols-4 border-b bg-gray-50">
                            <div className="p-4 font-mono text-sm text-indigo-600">label</div>
                            <div className="p-4">string</div>
                            <div className="p-4">Yes</div>
                            <div className="p-4">Primary text displayed in the card header.</div>
                        </div>

                        <div className="grid grid-cols-4 border-b">
                            <div className="p-4 font-mono text-sm text-indigo-600">description</div>
                            <div className="p-4">string</div>
                            <div className="p-4">Yes</div>
                            <div className="p-4">Explanatory text displayed in the card body.</div>
                        </div>

                        <div className="grid grid-cols-4 border-b bg-gray-50">
                            <div className="p-4 font-mono text-sm text-indigo-600">icon</div>
                            <div className="p-4">ReactNode</div>
                            <div className="p-4">No</div>
                            <div className="p-4">Icon displayed in the top-right corner of the card.</div>
                        </div>

                        <div className="grid grid-cols-4 border-b">
                            <div className="p-4 font-mono text-sm text-indigo-600">badgeText</div>
                            <div className="p-4">string</div>
                            <div className="p-4">No</div>
                            <div className="p-4">Text displayed in the badge. Defaults to the label if not provided.</div>
                        </div>

                        <div className="grid grid-cols-4 border-b bg-gray-50">
                            <div className="p-4 font-mono text-sm text-indigo-600">badgeColor</div>
                            <div className="p-4">string</div>
                            <div className="p-4">No</div>
                            <div className="p-4">Color code for the badge background and text (with opacity applied).</div>
                        </div>

                        <div className="grid grid-cols-4 rounded-b-xl">
                            <div className="p-4 font-mono text-sm text-indigo-600">className</div>
                            <div className="p-4">string</div>
                            <div className="p-4">No</div>
                            <div className="p-4">Additional CSS classes to apply to this specific card item.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Basic Example</h2>
                    <button
                        onClick={() => setShowBasicCode(!showBasicCode)}
                        className="flex items-center gap-2 text-sm bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 transition-all"
                    >
                        {showBasicCode ? <X className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                        {showBasicCode ? "Hide Code" : "Show Code"}
                    </button>
                </div>
                <p className="text-gray-600 mb-6">
                    A simple implementation with two options and minimal configuration.
                </p>
                <CardRadioSelector
                    selected={basicSelected}
                    onChange={setBasicSelected}
                    items={[
                        { value: "1", label: "Option One", description: "This is the first option with basic configuration" },
                        { value: "2", label: "Option Two", description: "This is the second option with basic configuration" },
                    ]}
                />
                <div className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <p className="text-sm text-indigo-700">Selected value: <code className="bg-indigo-100 px-2 py-1 rounded">{basicSelected}</code></p>
                </div>
                <div className={cn("mt-6 overflow-hidden transition-all duration-300",
                    showBasicCode ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")}>
                    <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl text-sm overflow-x-auto">
                        {`<CardRadioSelector
    selected={basicSelected}
    onChange={setBasicSelected}
    items={[
        { 
            value: "1", 
            label: "Option One", 
            description: "This is the first option with basic configuration" 
        },
        { 
            value: "2", 
            label: "Option Two", 
            description: "This is the second option with basic configuration" 
        },
    ]}
/>`}
                    </pre>
                </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Advanced Example with Icons and Badges</h2>
                    <button
                        onClick={() => setShowAdvancedCode(!showAdvancedCode)}
                        className="flex items-center gap-2 text-sm bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 transition-all"
                    >
                        {showAdvancedCode ? <X className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                        {showAdvancedCode ? "Hide Code" : "Show Code"}
                    </button>
                </div>
                <p className="text-gray-600 mb-6">
                    A more complex implementation with icons, colored badges, and a required label.
                </p>
                <CardRadioSelector
                    label="Select a notification trigger type"
                    isRequired={true}
                    selected={advancedSelected}
                    onChange={setAdvancedSelected}
                    items={[
                        {
                            value: "1a",
                            label: "Time-based",
                            description: "Trigger notification based on a schedule or specific time",
                            icon: <Clock className="text-[#04A777]" />,
                            badgeText: "TIME",
                            badgeColor: "#0C817B"
                        },
                        {
                            value: "2a",
                            label: "Event-based",
                            description: "Trigger notification when a specific event occurs in the system",
                            icon: <AlertTriangle className="text-[#FF9500]" />,
                            badgeText: "EVENT",
                            badgeColor: "#FF9500"
                        },
                        {
                            value: "3a  ",
                            label: "Manual",
                            description: "Send notification manually when needed by an administrator",
                            icon: <Info className="text-[#007AFF]" />,
                            badgeText: "MANUAL",
                            badgeColor: "#007AFF"
                        },
                    ]}
                />
                <div className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <p className="text-sm text-indigo-700">Selected value: <code className="bg-indigo-100 px-2 py-1 rounded">{advancedSelected}</code></p>
                </div>
                <div className={cn("mt-6 overflow-hidden transition-all duration-300",
                    showAdvancedCode ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0")}>
                    <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl text-sm overflow-x-auto">
                        {`<CardRadioSelector
    label="Select a notification trigger type"
    isRequired={true}
    selected={advancedSelected}
    onChange={setAdvancedSelected}
    items={[
        {
            value: "1",
            label: "Time-based",
            description: "Trigger notification based on a schedule or specific time",
            icon: <Clock className="text-[#04A777]" />,
            badgeText: "TIME",
            badgeColor: "#0C817B"
        },
        {
            value: "2",
            label: "Event-based",
            description: "Trigger notification when a specific event occurs in the system",
            icon: <AlertTriangle className="text-[#FF9500]" />,
            badgeText: "EVENT",
            badgeColor: "#FF9500"
        },
        {
            value: "3",
            label: "Manual",
            description: "Send notification manually when needed by an administrator",
            icon: <Info className="text-[#007AFF]" />,
            badgeText: "MANUAL",
            badgeColor: "#007AFF"
        },
    ]}
/>`}
                    </pre>
                </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Custom Layout Example</h2>
                    <button
                        onClick={() => setShowCustomCode(!showCustomCode)}
                        className="flex items-center gap-2 text-sm bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 transition-all"
                    >
                        {showCustomCode ? <X className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                        {showCustomCode ? "Hide Code" : "Show Code"}
                    </button>
                </div>
                <p className="text-gray-600 mb-6">
                    Using a custom grid layout with four items in a 2x2 grid.
                </p>
                <CardRadioSelector
                    label="Select a theme"
                    selected={customSelected}
                    onChange={setCustomSelected}
                    className="grid-cols-2 gap-6"
                    items={[
                        {
                            value: "theme1",
                            label: "Default Theme",
                            description: "Standard interface with balanced colors",
                            icon: <Settings className="text-[#6366F1]" />,
                            badgeText: "DEFAULT",
                            badgeColor: "#6366F1"
                        },
                        {
                            value: "theme2",
                            label: "Dark Mode",
                            description: "Low-light interface for night usage",
                            icon: <Shield className="text-[#8B5CF6]" />,
                            badgeText: "DARK",
                            badgeColor: "#8B5CF6"
                        },
                        {
                            value: "theme3",
                            label: "High Contrast",
                            description: "Enhanced visibility for accessibility",
                            icon: <Zap className="text-[#EC4899]" />,
                            badgeText: "CONTRAST",
                            badgeColor: "#EC4899"
                        },
                        {
                            value: "theme4",
                            label: "Compact Mode",
                            description: "Space-efficient layout for power users",
                            icon: <Database className="text-[#14B8A6]" />,
                            badgeText: "COMPACT",
                            badgeColor: "#14B8A6"
                        },
                    ]}
                />
                <div className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <p className="text-sm text-indigo-700">Selected value: <code className="bg-indigo-100 px-2 py-1 rounded">{customSelected}</code></p>
                </div>
                <div className={cn("mt-6 overflow-hidden transition-all duration-300",
                    showCustomCode ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0")}>
                    <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl text-sm overflow-x-auto">
                        {`<CardRadioSelector
    label="Select a theme"
    selected={customSelected}
    onChange={setCustomSelected}
    className="grid-cols-2 gap-6"
    items={[
        {
            value: "theme1",
            label: "Default Theme",
            description: "Standard interface with balanced colors",
            icon: <Settings className="text-[#6366F1]" />,
            badgeText: "DEFAULT",
            badgeColor: "#6366F1"
        },
        {
            value: "theme2",
            label: "Dark Mode",
            description: "Low-light interface for night usage",
            icon: <Shield className="text-[#8B5CF6]" />,
            badgeText: "DARK",
            badgeColor: "#8B5CF6"
        },
        {
            value: "theme3",
            label: "High Contrast",
            description: "Enhanced visibility for accessibility",
            icon: <Zap className="text-[#EC4899]" />,
            badgeText: "CONTRAST",
            badgeColor: "#EC4899"
        },
        {
            value: "theme4",
            label: "Compact Mode",
            description: "Space-efficient layout for power users",
            icon: <Database className="text-[#14B8A6]" />,
            badgeText: "COMPACT",
            badgeColor: "#14B8A6"
        },
    ]}
/>`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
