import { ExpandableTextArea } from "@zeak/ui";
import { useState } from "react";

export default function ExpandableTextAreaExample() {
    const [value, setValue] = useState("");
    const [baseValue, setBaseValue] = useState("");

    return (
        <div className="container mx-auto p-6 space-y-10">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold">ExpandableTextArea Component</h1>
                <p className="text-gray-600">
                    A textarea component that automatically expands when focused and collapses when blurred.
                </p>
            </header>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Installation</h2>
                <div className="bg-gray-100 p-4 rounded-md">
                    <code>import {"{"} ExpandableTextArea {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Basic Usage</h2>
                <div className="flex flex-col gap-4 p-4 border rounded-md">
                    <ExpandableTextArea
                        className="w-full"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Click to edit text..."
                    />
                </div>
                <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <pre>{`import { ExpandableTextArea } from '@zeak/ui';
import { useState } from 'react';

const MyComponent = () => {
  const [value, setValue] = useState("");
  
  return (
    <ExpandableTextArea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Click to edit text..."
    />
  );
};`}</pre>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Features</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Automatically expands when focused to fit content</li>
                    <li>Collapses to a single line when not in focus</li>
                    <li>Displays placeholder text when empty</li>
                    <li>Fully controlled or uncontrolled usage</li>
                    <li>Customizable styling</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Props</h2>
                <div className="overflow-x-auto">
                    <div className="grid grid-cols-5 gap-4 border-b pb-2 font-medium">
                        <div>Prop</div>
                        <div>Type</div>
                        <div>Required</div>
                        <div>Default</div>
                        <div>Description</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 border-b">
                        <div><code>value</code></div>
                        <div><code>string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Controlled value of the textarea</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 border-b">
                        <div><code>defaultValue</code></div>
                        <div><code>string</code></div>
                        <div>No</div>
                        <div>''</div>
                        <div>Default value for uncontrolled usage</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 border-b">
                        <div><code>placeholder</code></div>
                        <div><code>string</code></div>
                        <div>No</div>
                        <div>"Enter text here..."</div>
                        <div>Placeholder text when empty</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 border-b">
                        <div><code>className</code></div>
                        <div><code>string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Additional CSS classes for the textarea</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 border-b">
                        <div><code>onChange</code></div>
                        <div><code>ChangeEventHandler</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Event handler for value changes</div>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Examples</h2>

                <div className="space-y-4">
                    <h3 className="text-xl font-medium">Default Example</h3>
                    <div className="bg-white p-4 border rounded-md">
                        <ExpandableTextArea
                            className="w-full"
                            placeholder="Click here to start typing..."
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-medium">With Default Value</h3>
                    <div className="bg-white p-4 border rounded-md">
                        <ExpandableTextArea
                            className="w-full"
                            defaultValue="This textarea has a default value that can be edited."
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-medium">Controlled Example</h3>
                    <div className="bg-white p-4 border rounded-md">
                        <ExpandableTextArea
                            className="w-full"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="This is a controlled textarea. Type something..."
                        />
                        <div className="mt-2 text-sm text-gray-600">
                            Current value: {value ? `"${value}"` : "(empty)"}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}