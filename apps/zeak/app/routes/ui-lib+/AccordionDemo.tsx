import { useState } from "react";
import { Accordion, Button } from "@zeak/ui";

export default function AccordionDocumentation() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="container mx-auto p-6">
            <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Accordion Component</h1>
                <p className="text-gray-600 text-lg">
                    An expandable and collapsible container with customizable actions for organizing content.
                </p>
            </header>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} Accordion {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Basic Usage</h2>
                <div className="flex flex-col gap-6 p-6 bg-white rounded-lg border border-gray-200">
                    <div>
                        <Accordion
                            isDefault
                            isActive
                            defaultExpanded={isExpanded}
                            onEdit={() => console.log('Edit clicked')}
                            onDelete={() => console.log('Delete clicked')}
                            onAttach={() => console.log('Attach clicked')}
                            onDotsClick={() => console.log('More options clicked')}
                        >
                            <div className="p-4 bg-white rounded-lg">
                                <h3 className="text-lg font-medium mb-2">Accordion Content</h3>
                                <p className="text-gray-600">This is the expandable content area of the accordion component.</p>
                            </div>
                        </Accordion>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                        >
                            Toggle Expansion
                        </Button>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Expandable and collapsible content</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Default state with visual indicator</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Active state with visual indicator</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Customizable action buttons (edit, delete, attach)</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>More options menu with dots icon</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Smooth animation for expand/collapse transitions</span>
                    </li>
                </ul>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Props</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-5 gap-4 border-b pb-3 pt-3 px-4 font-medium bg-gray-50 text-gray-700">
                        <div>Prop</div>
                        <div>Type</div>
                        <div>Required</div>
                        <div>Default</div>
                        <div>Description</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">title</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"Headquarters"</div>
                        <div>Title text displayed in the accordion header</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">isDefault</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">boolean</code></div>
                        <div>No</div>
                        <div>false</div>
                        <div>Displays a "Default" badge on the accordion</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">isActive</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">boolean</code></div>
                        <div>No</div>
                        <div>false</div>
                        <div>Displays an "ACTIVE" badge on the accordion</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">defaultExpanded</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">boolean</code></div>
                        <div>No</div>
                        <div>false</div>
                        <div>Controls whether the accordion is initially expanded</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onEdit</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(e: React.MouseEvent) {'=>'} void</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Function called when the edit button is clicked</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onDelete</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(e: React.MouseEvent) {'=>'} void</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Function called when the delete button is clicked</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onAttach</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(e: React.MouseEvent) {'=>'} void</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Function called when the attach button is clicked</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onDotsClick</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(e: React.MouseEvent) {'=>'} void</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Function called when the more options (dots) button is clicked</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">className</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Additional CSS classes to apply to the accordion container</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">children</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">React.ReactNode</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Content to display inside the expanded accordion</div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Examples</h2>
                <h3 className="text-xl font-medium text-indigo-600">Basic Accordion</h3>
                <p className="text-gray-600 mb-4">A simple accordion with no additional status indicators:</p>
                <div className="mb-8">
                    <Accordion>
                        <div className="p-4 bg-white rounded-lg">
                            <h3 className="text-lg font-medium mb-2">Basic Accordion</h3>
                            <p className="text-gray-600">This is a simple accordion with no additional options.</p>
                        </div>
                    </Accordion>
                </div>

                <h3 className="text-xl font-medium text-indigo-600">Default Accordion</h3>
                <p className="text-gray-600 mb-4">An accordion with the default status indicator:</p>
                <div className="mb-8">
                    <Accordion
                        isDefault
                    >
                        <div className="p-4 bg-white rounded-lg">
                            <h3 className="text-lg font-medium mb-2">Default Accordion</h3>
                            <p className="text-gray-600">This accordion has the default status indicator.</p>
                        </div>
                    </Accordion>
                </div>

                <h3 className="text-xl font-medium text-indigo-600">Active Accordion</h3>
                <p className="text-gray-600 mb-4">An accordion with the active status indicator:</p>
                <div className="mb-8">
                    <Accordion
                        isActive
                    >
                        <div className="p-4 bg-white rounded-lg">
                            <h3 className="text-lg font-medium mb-2">Active Accordion</h3>
                            <p className="text-gray-600">This accordion has the active status indicator.</p>
                        </div>
                    </Accordion>
                </div>

                <h3 className="text-xl font-medium text-indigo-600">Action Buttons Example</h3>
                <p className="text-gray-600 mb-4">An accordion with edit, delete, and attach action buttons:</p>
                <div className="mb-8">
                    <Accordion
                        title="Accordion with Actions"
                        onEdit={() => console.log('Edit clicked')}
                        onDelete={() => console.log('Delete clicked')}
                        onAttach={() => console.log('Attach clicked')}
                    >
                        <div className="p-4 bg-white rounded-lg">
                            <h3 className="text-lg font-medium mb-2">Actions Accordion</h3>
                            <p className="text-gray-600">This accordion has action buttons for edit, delete, and attach.</p>
                        </div>
                    </Accordion>
                </div>

                <h3 className="text-xl font-medium text-indigo-600">Custom Title Example</h3>
                <p className="text-gray-600 mb-4">An accordion with a custom title:</p>
                <div>
                    <Accordion
                        title="Custom Title"
                        isActive
                        isDefault
                    >
                        <div className="p-4 bg-white rounded-lg">
                            <h3 className="text-lg font-medium mb-2">Custom Title Accordion</h3>
                            <p className="text-gray-600">This accordion has a custom title and both status indicators.</p>
                        </div>
                    </Accordion>
                </div>
            </section>
        </div>
    );
}