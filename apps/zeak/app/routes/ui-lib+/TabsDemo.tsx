import { FileText, Share, Star } from "lucide-react";
import { Tabs, TabsContent, Charts } from "@zeak/ui";

export default function TabsDocumentation() {
    const tabItems = [
        { label: 'All', value: 'all', icon: FileText },
        { label: 'Text', value: 'text', icon: FileText },
        { label: 'Shared', value: 'shared', icon: Share },
        { label: 'Favorites', value: 'favorites', icon: Star },
        { label: 'Disabled', value: 'disabled', disabled: true },
        { label: 'Disabled', value: 'disabled2', disabled: true },
        { label: 'Disabled', value: 'disabled3', disabled: true },
    ]

    const moduleTabs = [
        {
            label: "Dashboard",
            value: "dashboard",
        },
        {
            label: "All Modules",
            value: "allModules",
        },
        {
            label: "Disabled Module",
            value: "disabledModule",
            disabled: true,
        },
    ];

    return (
        <div className="container mx-auto p-6">
            <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Tabs Component</h1>
                <p className="text-gray-600 text-lg">
                    A set of components that enable users to switch between different views within the same context.
                </p>
            </header>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} Tabs, TabsContent, Charts {"}"} from "@zeak/ui";</code>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Basic Usage</h2>
                <div className="flex flex-col gap-6 p-6 bg-[#F0F4FD] rounded-lg border border-gray-200">
                    <div className="rounded-xl px-6 flex flex-col gap-16 w-full">
                        <div>
                            <h3 className="text-lg font-medium mb-4">Default Variant</h3>
                            <Tabs variant="default" items={tabItems} />
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-4">Underline Variant</h3>
                            <Tabs variant="underline"
                                items={moduleTabs}
                                defaultTab={moduleTabs[0].value}
                                backgroundColor="#FFFFFF"
                            >
                                <TabsContent value={moduleTabs[0].value}>
                                    <Charts />
                                    <div>
                                        <h3>Dashboard Content</h3>
                                    </div>
                                </TabsContent>
                                <TabsContent value={moduleTabs[1].value}>
                                    <Charts />
                                    <div>
                                        <h3>All Companies Content</h3>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Accessible, following WAI-ARIA design pattern</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Keyboard navigation support</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Automatic activation with keyboard focus</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Supports controlled and uncontrolled modes</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Custom styling possibilities</span>
                    </li>
                </ul>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Props</h2>

                <h3 className="text-xl font-medium mt-6 mb-2">Tabs Component</h3>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-8">
                    <div className="grid grid-cols-5 gap-4 border-b pb-3 pt-3 px-4 font-medium bg-gray-50 text-gray-700">
                        <div>Prop</div>
                        <div>Type</div>
                        <div>Required</div>
                        <div>Default</div>
                        <div>Description</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">items</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">{"Array<TabItem>"}</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>Array of tab items with label, value, icon, and disabled properties</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">variant</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">"default" | "underline"</code></div>
                        <div>No</div>
                        <div>"default"</div>
                        <div>Visual style variant of the tabs</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">defaultTab</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Value of the default selected tab</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">backgroundColor</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Background color of the tabs container</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">className</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Additional CSS classes</div>
                    </div>
                </div>

                <h3 className="text-xl font-medium mt-6 mb-2">TabItem Type</h3>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-8">
                    <div className="grid grid-cols-5 gap-4 border-b pb-3 pt-3 px-4 font-medium bg-gray-50 text-gray-700">
                        <div>Property</div>
                        <div>Type</div>
                        <div>Required</div>
                        <div>Default</div>
                        <div>Description</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">label</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>Display text for the tab</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">value</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>Unique identifier for the tab</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">icon</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">React.ComponentType</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Icon component to display with the tab label</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">disabled</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">boolean</code></div>
                        <div>No</div>
                        <div>false</div>
                        <div>Whether the tab is disabled</div>
                    </div>
                </div>

                <h3 className="text-xl font-medium mt-6 mb-2">TabsContent Component</h3>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-5 gap-4 border-b pb-3 pt-3 px-4 font-medium bg-gray-50 text-gray-700">
                        <div>Prop</div>
                        <div>Type</div>
                        <div>Required</div>
                        <div>Default</div>
                        <div>Description</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">value</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>Value this content is associated with</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">children</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">React.ReactNode</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>Content to display when tab is active</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">className</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Additional CSS classes</div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Accessibility</h2>
                <div className="space-y-4">
                    <p className="text-gray-700">The Tabs component adheres to the <a href="https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel" className="text-indigo-600 hover:text-indigo-800 underline" target="_blank" rel="noopener noreferrer">WAI-ARIA design pattern</a>.</p>

                    <h3 className="text-lg font-medium mt-4">Keyboard Interactions</h3>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <div className="grid grid-cols-2 gap-4 border-b pb-3 pt-3 px-4 font-medium bg-gray-50 text-gray-700">
                            <div>Key</div>
                            <div>Action</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                            <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">Tab</code></div>
                            <div>Moves focus to the next focusable element</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                            <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">Shift + Tab</code></div>
                            <div>Moves focus to the previous focusable element</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                            <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">Arrow Left/Up</code></div>
                            <div>Moves focus to the previous tab and activates it</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                            <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">Arrow Right/Down</code></div>
                            <div>Moves focus to the next tab and activates it</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                            <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">Home</code></div>
                            <div>Moves focus to the first tab and activates it</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-3 px-4 hover:bg-gray-50 transition-colors">
                            <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">End</code></div>
                            <div>Moves focus to the last tab and activates it</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}