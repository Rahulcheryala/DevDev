import { ListingPanelContainer } from "@zeak/ui";
import { useState } from "react";
import { Code, Copy, Check, Plus } from "lucide-react";

export default function ListingPanelDocumentation() {
    const [searchValue, setSearchValue] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
    const [copied, setCopied] = useState(false);
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">ListingPanelContainer Component</h1>
                <p className="text-gray-600 text-lg">
                    A comprehensive panel for displaying and managing lists with search, filtering, and sorting capabilities.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} ListingPanelContainer {"}"} from '@zeak/ui';</code>
                    <button
                        onClick={() => copyToClipboard("import { ListingPanelContainer } from '@zeak/ui';")}
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
                        <ListingPanelContainer
                            onBottomBtnClick={() => alert("Add new item clicked")}
                        >
                            <div className="bg-white p-4 rounded-b-lg h-[400px] overflow-y-auto">
                                <p className="text-gray-500 text-center">List items would appear here</p>
                            </div>
                        </ListingPanelContainer>
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { ListingPanelContainer } from '@zeak/ui';

const MyComponent = () => {
  return (
    <ListingPanelContainer 
      onBottomBtnClick={() => {
        // Handle adding new item
      }} 
    >
      {/* Your list content goes here */}
      <div className="bg-white p-4 rounded-b-lg h-[400px] overflow-y-auto">
        <p className="text-gray-500 text-center">List items would appear here</p>
      </div>
    </ListingPanelContainer>
  );
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { ListingPanelContainer } from '@zeak/ui';\n\nconst MyComponent = () => {\n  return (\n    <ListingPanelContainer \n      onBottomBtnClick={() => {\n        // Handle adding new item\n      }} \n    >\n      {/* Your list content goes here */}\n      <div className="bg-white p-4 rounded-b-lg h-[400px] overflow-y-auto">\n        <p className="text-gray-500 text-center">List items would appear here</p>\n      </div>\n    </ListingPanelContainer>\n  );\n};`)}
                            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                            aria-label="Copy code"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                        </button>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">With Custom Configuration</h2>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-200">
                        <ListingPanelContainer
                            searchValue={searchValue}
                            onSearchChange={setSearchValue}
                            searchPlaceholder="Search lists..."
                            filterOptions={["All", "Active", "Archived"]}
                            defaultFilterSelected={selectedFilter}
                            onFilterChange={setSelectedFilter}
                            totalRecords={42}
                            sortList={sortOrder}
                            setSortList={setSortOrder}
                            bottomButtonText="Create New"
                            bottomButtonIcon={<Plus className="h-5 w-5 font-medium text-white" />}
                            onBottomBtnClick={() => alert("Create new clicked")}
                        >
                            <div className="bg-white p-4 rounded-b-lg h-[400px] overflow-y-auto">
                                <p className="text-gray-500 text-center">Custom filtered and sorted items would appear here</p>
                            </div>
                        </ListingPanelContainer>
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { ListingPanelContainer } from '@zeak/ui';
import { Plus } from "lucide-react";
import { useState } from "react";

const MyComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  return (
    <ListingPanelContainer 
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      searchPlaceholder="Search lists..."
      filterOptions={["All", "Active", "Archived"]}
      defaultFilterSelected={selectedFilter}
      onFilterChange={setSelectedFilter}
      totalRecords={42}
      sortList={sortOrder}
      setSortList={setSortOrder}
      bottomButtonText="Create New"
      bottomButtonIcon={<Plus className="h-5 w-5 font-medium text-white" />}
      onBottomBtnClick={() => {
        // Handle creating new item
      }}
    >
      {/* Your list content goes here */}
      <div className="bg-white p-4 rounded-b-lg h-[400px] overflow-y-auto">
        <p className="text-gray-500 text-center">Custom filtered and sorted items would appear here</p>
      </div>
    </ListingPanelContainer>
  );
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { ListingPanelContainer } from '@zeak/ui';\nimport { Plus } from "lucide-react";\nimport { useState } from "react";\n\nconst MyComponent = () => {\n  const [searchValue, setSearchValue] = useState("");\n  const [selectedFilter, setSelectedFilter] = useState("All");\n  const [sortOrder, setSortOrder] = useState("none");\n\n  return (\n    <ListingPanelContainer \n      searchValue={searchValue}\n      onSearchChange={setSearchValue}\n      searchPlaceholder="Search lists..."\n      filterOptions={["All", "Active", "Archived"]}\n      defaultFilterSelected={selectedFilter}\n      onFilterChange={setSelectedFilter}\n      totalRecords={42}\n      sortList={sortOrder}\n      setSortList={setSortOrder}\n      bottomButtonText="Create New"\n      bottomButtonIcon={<Plus className="h-5 w-5 font-medium text-white" />}\n      onBottomBtnClick={() => {\n        // Handle creating new item\n      }}\n    >\n      {/* Your list content goes here */}\n      <div className="bg-white p-4 rounded-b-lg h-[400px] overflow-y-auto">\n        <p className="text-gray-500 text-center">Custom filtered and sorted items would appear here</p>\n      </div>\n    </ListingPanelContainer>\n  );\n};`)}
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
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">width</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">"350px"</div>
                            <div className="px-6 py-4 text-sm">Width of the container</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">height</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">"calc(100vh-120px)"</div>
                            <div className="px-6 py-4 text-sm">Height of the container</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">backButtonTo</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">"/"</div>
                            <div className="px-6 py-4 text-sm">URL for back button navigation</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">backButtonLabel</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">"Back"</div>
                            <div className="px-6 py-4 text-sm">Label for the back button</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">onBackButtonClick</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">() {"=>"} void</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">undefined</div>
                            <div className="px-6 py-4 text-sm">Handler for back button click</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">searchValue</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">undefined</div>
                            <div className="px-6 py-4 text-sm">Current search input value</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">onSearchChange</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">(value: string) {"=>"} void</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">undefined</div>
                            <div className="px-6 py-4 text-sm">Handler for search input changes</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">onBottomBtnClick</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">() {"=>"} void</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">Yes</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">-</div>
                            <div className="px-6 py-4 text-sm">Handler for bottom button click</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">bottomButtonText</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">"New List"</div>
                            <div className="px-6 py-4 text-sm">Text for the bottom button</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">bottomButtonIcon</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">React.ReactNode</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">Plus icon</div>
                            <div className="px-6 py-4 text-sm">Icon for the bottom button</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">totalRecords</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">number</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">100</div>
                            <div className="px-6 py-4 text-sm">Total number of records to display</div>
                        </div>
                        <div className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">sortList</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">"none" | "asc" | "desc"</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">"none"</div>
                            <div className="px-6 py-4 text-sm">Current sort order</div>
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
                            <span className="ml-3 text-gray-700">Integrated back button for navigation</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Search functionality with customizable placeholder</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Filter tabs for categorizing content</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Sorting header with ascending/descending options</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Customizable bottom action button with icon</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Responsive design with adjustable dimensions</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Flexible container for custom list content</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}