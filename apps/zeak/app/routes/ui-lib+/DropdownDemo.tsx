import { useState } from "react";
import { Dropdown } from "@zeak/ui";

export default function DropdownDocumentation() {
    const [status, setStatus] = useState('Active');

    const STATUS_ICONS = {
        ACTIVE: (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <g clipPath="url(#clip0_4401_36207)">
                <path d="M10.0001 18.3815C14.6025 18.3815 18.3334 14.6506 18.3334 10.0482C18.3334 5.4458 14.6025 1.71484 10.0001 1.71484C5.39771 1.71484 1.66675 5.4458 1.66675 10.0482C1.66675 14.6506 5.39771 18.3815 10.0001 18.3815Z" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.25 10.0469L8.75 12.5469L13.75 7.54688" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_4401_36207">
                    <rect width="20" height="20" fill="white" transform="translate(0 0.046875)" />
                </clipPath>
            </defs>
        </svg>),
        INACTIVE: (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <g clipPath="url(#clip0_4401_36219)">
                <path d="M12.5001 7.54818L7.50008 12.5482M7.50008 7.54818L12.5001 12.5482M18.3334 10.0482C18.3334 14.6506 14.6025 18.3815 10.0001 18.3815C5.39771 18.3815 1.66675 14.6506 1.66675 10.0482C1.66675 5.4458 5.39771 1.71484 10.0001 1.71484C14.6025 1.71484 18.3334 5.4458 18.3334 10.0482Z" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_4401_36219">
                    <rect width="20" height="20" fill="white" transform="translate(0 0.046875)" />
                </clipPath>
            </defs>
        </svg>),
        BLOCKED: (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <g clipPath="url(#clip0_4401_36230)">
                <path d="M4.10841 4.15651L15.8917 15.9398M1.66675 7.15046V12.9459C1.66675 13.1497 1.66675 13.2516 1.68977 13.3475C1.71019 13.4326 1.74386 13.5139 1.78955 13.5884C1.84108 13.6725 1.91315 13.7446 2.05727 13.8887L6.15956 17.991C6.30368 18.1351 6.37575 18.2072 6.45984 18.2587C6.5344 18.3044 6.61569 18.3381 6.70072 18.3585C6.79663 18.3815 6.89854 18.3815 7.10237 18.3815H12.8978C13.1016 18.3815 13.2035 18.3815 13.2994 18.3585C13.3845 18.3381 13.4658 18.3044 13.5403 18.2587C13.6244 18.2072 13.6965 18.1351 13.8406 17.991L17.9429 13.8887C18.087 13.7446 18.1591 13.6725 18.2106 13.5884C18.2563 13.5139 18.29 13.4326 18.3104 13.3475C18.3334 13.2516 18.3334 13.1497 18.3334 12.9459V7.15046C18.3334 6.94664 18.3334 6.84472 18.3104 6.74882C18.29 6.66379 18.2563 6.5825 18.2106 6.50794C18.1591 6.42384 18.087 6.35178 17.9429 6.20765L13.8406 2.10537C13.6965 1.96124 13.6244 1.88918 13.5403 1.83764C13.4658 1.79195 13.3845 1.75828 13.2994 1.73787C13.2035 1.71484 13.1016 1.71484 12.8978 1.71484H7.10237C6.89854 1.71484 6.79663 1.71484 6.70072 1.73787C6.61569 1.75828 6.5344 1.79195 6.45984 1.83764C6.37575 1.88918 6.30368 1.96124 6.15956 2.10537L2.05727 6.20765C1.91315 6.35178 1.84108 6.42384 1.78955 6.50794C1.74386 6.5825 1.71019 6.66379 1.68977 6.74882C1.66675 6.84472 1.66675 6.94664 1.66675 7.15046Z" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_4401_36230">
                    <rect width="20" height="20" fill="white" transform="translate(0 0.046875)" />
                </clipPath>
            </defs>
        </svg>)
    };

    return (
        <div className="container mx-auto p-6">
            <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Dropdown Component</h1>
                <p className="text-gray-600 text-lg">
                    A versatile dropdown component for selecting a single value from a list of options with icon support.
                </p>
            </header>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} Dropdown {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Basic Usage</h2>
                <div className="flex flex-col gap-6 p-6 bg-[#F0F4FD] rounded-lg border border-gray-200">
                    <div className="max-w-md">
                        <Dropdown
                            name="status"
                            label="Status"
                            placeholder="Select Status"
                            className="w-full"
                            inputClasses="bg-[#F7F7F8] border-none text-[#0D0C22] text-md font-['Suisse Int\\'l'] font-[450]"
                            value={status}
                            defaultValue="Active"
                            onChange={(value: string) => setStatus(value)}
                            items={[
                                { label: 'Active', value: 'Active', icon: STATUS_ICONS.ACTIVE },
                                { label: 'Inactive', value: 'Inactive', icon: STATUS_ICONS.INACTIVE },
                                { label: 'Blocked', value: 'Blocked', icon: STATUS_ICONS.BLOCKED },
                            ]}
                        />
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-800">
                            Selected Status: <code className="bg-white px-2 py-0.5 rounded">{status}</code>
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Single-select dropdown</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Support for icons in dropdown items</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Customizable appearance with class names</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Form control integration with name and label</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Controlled and uncontrolled usage</span>
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
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">items</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">DropdownItem[]</code></div>
                        <div className="text-green-600 font-medium">Yes</div>
                        <div>-</div>
                        <div>Array of items to display in the dropdown</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onChange</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(value: string) {'=>'} void</code></div>
                        <div className="text-green-600 font-medium">Yes</div>
                        <div>-</div>
                        <div>Function called when selection changes</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">name</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Name attribute for the form control</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">label</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Label text for the dropdown</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">value</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Current selected value (controlled)</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">defaultValue</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Initial selected value (uncontrolled)</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">placeholder</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"Select..."</div>
                        <div>Placeholder text when no selection</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">className</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>""</div>
                        <div>Additional CSS classes for container</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">inputClasses</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>""</div>
                        <div>Additional CSS classes for the input element</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">disabled</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">boolean</code></div>
                        <div>No</div>
                        <div>false</div>
                        <div>Whether the dropdown is disabled</div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">DropdownItem Type</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`type DropdownItem = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};`}</pre>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Implementation Example</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`import { useState, useEffect } from "react";
import { Dropdown } from "@zeak/ui";
import { ChevronRightIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon } from "@zeak/icons";

const ProductStatusSelector = () => {
  const [productStatus, setProductStatus] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Simulating API fetch for product data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulated product data
        setProductStatus("active");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, []);

  const handleStatusChange = (newStatus: string) => {
    setProductStatus(newStatus);
    // In a real app, you might want to save this to the backend
    console.log(\`Product status changed to: \${newStatus}\`);
  };
  
  const STATUS_ITEMS = [
    { 
      value: "active", 
      label: "Active", 
      icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />
    },
    { 
      value: "inactive", 
      label: "Inactive", 
      icon: <XCircleIcon className="w-5 h-5 text-gray-400" />
    },
    { 
      value: "out_of_stock", 
      label: "Out of Stock", 
      icon: <AlertCircleIcon className="w-5 h-5 text-amber-500" />
    },
    { 
      value: "discontinued", 
      label: "Discontinued", 
      icon: <XCircleIcon className="w-5 h-5 text-red-500" />
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Product Status</h3>
      
      {loading ? (
        <div className="h-10 bg-gray-100 animate-pulse rounded"></div>
      ) : (
        <Dropdown
          name="product_status"
          label="Current Status"
          value={productStatus}
          onChange={handleStatusChange}
          items={STATUS_ITEMS}
          placeholder="Select status..."
          className="max-w-xs"
        />
      )}
      
      <p className="text-sm text-gray-500">
        Change the product status to control its visibility and availability in the store.
      </p>
    </div>
  );
};

export default ProductStatusSelector;`}</pre>
                </div>
            </section>
        </div>
    );
} 