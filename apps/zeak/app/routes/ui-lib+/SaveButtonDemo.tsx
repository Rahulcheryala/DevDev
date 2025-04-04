import { useState } from "react";
import { SaveButton } from "@zeak/ui";

export default function SaveButtonDocumentation() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [buttonAction, setButtonAction] = useState<string | null>(null);

    return (
        <div className="container mx-auto p-6">
            <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Save Button Component</h1>
                <p className="text-gray-600 text-lg">
                    A versatile button component that combines a primary action with additional dropdown options.
                </p>
            </header>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} SaveButton {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Basic Usage</h2>
                <div className="flex flex-col gap-6 p-6 bg-[#F0F4FD] rounded-lg border border-gray-200">
                    {(buttonAction || selectedOption) && <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-800">
                            {buttonAction && (
                                <span className="block mb-2"><strong>Primary Action:</strong> {buttonAction}</span>
                            )}
                            {selectedOption && (
                                <span className="block"><strong>Selected Option:</strong> {selectedOption}</span>
                            )}
                        </p>
                    </div>}
                    <div className="mt-4 border border-gray-200 rounded-lg p-4 flex justify-center">
                        <SaveButton
                            onClick={() => setButtonAction("Continue button clicked")}
                            buttonName="Continue"
                            options={["Save & Add New Connection", "Save As Draft"]}
                            onOptionClick={(option) => setSelectedOption(option as string)}
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Primary action button with customizable text</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Dropdown menu with additional actions</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Customizable callback functions for actions</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Modern design with seamless dropdown integration</span>
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
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onClick</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">() ={">"} void</code></div>
                        <div className="text-green-600 font-medium">Yes</div>
                        <div>-</div>
                        <div>Function to call when the primary button is clicked</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">buttonName</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div className="text-green-600 font-medium">Yes</div>
                        <div>-</div>
                        <div>Text to display on the primary button</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">options</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string[]</code></div>
                        <div className="text-green-600 font-medium">Yes</div>
                        <div>-</div>
                        <div>Array of options to display in the dropdown menu</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onOptionClick</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(option: string) ={">"} void</code></div>
                        <div className="text-green-600 font-medium">Yes</div>
                        <div>-</div>
                        <div>Function to call when a dropdown option is selected</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">className</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>""</div>
                        <div>Additional CSS classes for the button container</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">disabled</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">boolean</code></div>
                        <div>No</div>
                        <div>false</div>
                        <div>Whether the button is disabled</div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Implementation Example</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`import { useState } from "react";
import { SaveButton } from "@zeak/ui";
import { Form } from "@zeak/react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: ""
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSave = () => {
    // Save the product
    console.log("Saving product:", formData);
  };
  
  const handleSaveAndNew = () => {
    // Save the product and clear the form
    console.log("Saving product and creating new:", formData);
    setFormData({ name: "", description: "", price: "" });
  };
  
  const handleSaveAsDraft = () => {
    // Save as draft
    console.log("Saving product as draft:", formData);
  };
  
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      
      <Form className="space-y-4">
        <div>
          <label className="block mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="flex justify-end pt-4">
          <SaveButton
            onClick={handleSave}
            buttonName="Save Product"
            options={["Save & Add Another", "Save As Draft"]}
            onOptionClick={(option) => {
              if (option === "Save & Add Another") {
                handleSaveAndNew();
              } else if (option === "Save As Draft") {
                handleSaveAsDraft();
              }
            }}
          />
        </div>
      </Form>
    </div>
  );
};`}</pre>
                </div>
            </section>
        </div>
    );
}

