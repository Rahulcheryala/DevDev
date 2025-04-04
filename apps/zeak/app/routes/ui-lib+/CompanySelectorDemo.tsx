import { useState } from "react";
import { CompanySelector } from "@zeak/ui";

export default function CompanySelectorDocumentation() {
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

    // Example companies data
    const companies = [
        { id: '1', primaryLabel: 'Pfizer USA', secondaryLabel: 'PUS' },
        { id: '2', primaryLabel: 'Pfizer India', secondaryLabel: 'PIN' },
        { id: '3', primaryLabel: 'Pfizer Argentina', secondaryLabel: 'PAR' },
        { id: '4', primaryLabel: 'Pfizer Canada', secondaryLabel: 'PCA' },
        { id: '5', primaryLabel: 'Pfizer Mexico', secondaryLabel: 'PMX' },
        { id: '6', primaryLabel: 'Pfizer Brazil', secondaryLabel: 'PBR' },
    ];

    return (
        <div className="container mx-auto p-6">
            <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Company Selector Component</h1>
                <p className="text-gray-600 text-lg">
                    A customizable dropdown selector for companies with search functionality and single selection.
                </p>
            </header>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} CompanySelector {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Basic Usage</h2>
                <div className="flex flex-col gap-6 p-6 bg-[#F0F4FD] items-center rounded-lg border border-gray-200">
                    <div>
                        <CompanySelector
                            items={companies}
                            onSelectionChange={setSelectedCompany}
                        />
                    </div>
                    {selectedCompany && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-blue-800">
                                Selected company ID: <strong>{selectedCompany}</strong>
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Searchable company list with filtering</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Single selection with checkbox indicator</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Primary and secondary labels for each item</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Customizable item rendering</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Custom filtering function support</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Default selection capability</span>
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
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">SelectableItem[]</code></div>
                        <div className="text-green-600 font-medium">Yes</div>
                        <div>-</div>
                        <div>Array of items to display in the selector</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onSelectionChange</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(selectedId: string | null) {'=>'} void</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Callback when selection changes</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">searchPlaceholder</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"Search"</div>
                        <div>Placeholder text for search input</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">className</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"w-[471px]"</div>
                        <div>Additional CSS classes for the container</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">defaultSelectedId</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string | null</code></div>
                        <div>No</div>
                        <div>null</div>
                        <div>ID of initially selected item</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">filterFn</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(item: T, query: string) {'=>'} boolean</code></div>
                        <div>No</div>
                        <div>Default filter</div>
                        <div>Custom filter function for search</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">renderItem</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(item: T, isSelected: boolean) {'=>'} React.ReactNode</code></div>
                        <div>No</div>
                        <div>Default renderer</div>
                        <div>Custom item renderer function</div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">SelectableItem Interface</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-5 gap-4 border-b pb-3 pt-3 px-4 font-medium bg-gray-50 text-gray-700">
                        <div>Property</div>
                        <div>Type</div>
                        <div>Required</div>
                        <div>Default</div>
                        <div>Description</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">id</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div className="text-green-600 font-medium">Yes</div>
                        <div>-</div>
                        <div>Unique identifier for the item</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">primaryLabel</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div className="text-green-600 font-medium">Yes</div>
                        <div>-</div>
                        <div>Main display text for the item</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">secondaryLabel</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Additional display text (e.g., abbreviation)</div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Examples</h2>
                <h3 className="text-xl font-medium text-indigo-600">With Default Selection</h3>
                <p className="text-gray-600 mb-4">A company selector with a pre-selected item:</p>
                <div className="mb-8">
                    <CompanySelector
                        items={companies}
                        defaultSelectedId="3"
                    />
                </div>

                <h3 className="text-xl font-medium text-indigo-600">Custom Search Placeholder</h3>
                <p className="text-gray-600 mb-4">A company selector with custom placeholder text:</p>
                <div className="mb-8">
                    <CompanySelector
                        items={companies}
                        searchPlaceholder="Find a company..."
                    />
                </div>

                <h3 className="text-xl font-medium text-indigo-600">Custom Width</h3>
                <p className="text-gray-600 mb-4">A company selector with a custom width:</p>
                <div>
                    <CompanySelector
                        items={companies}
                        className="w-[300px]"
                    />
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Advanced Usage</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`import { CompanySelector } from '@zeak/ui';
import { Badge } from '@zeak/react';
import { useState } from 'react';

const AdvancedExample = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  const companies = [
    { id: '1', primaryLabel: 'Pfizer USA', secondaryLabel: 'PUS', status: 'active' },
    { id: '2', primaryLabel: 'Pfizer India', secondaryLabel: 'PIN', status: 'inactive' },
    { id: '3', primaryLabel: 'Pfizer Argentina', secondaryLabel: 'PAR', status: 'active' },
  ];
  
  // Custom render function to show status badges
  const renderCompanyItem = (company, isSelected) => (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <span>{company.primaryLabel}</span>
        <span className="text-gray-500">{company.secondaryLabel}</span>
      </div>
      <Badge 
        variant={company.status === 'active' ? 'success' : 'warning'}
      >
        {company.status}
      </Badge>
    </div>
  );
  
  // Custom filter that also checks status
  const customFilter = (company, query) => {
    const searchLower = query.toLowerCase();
    return (
      company.primaryLabel.toLowerCase().includes(searchLower) ||
      company.secondaryLabel.toLowerCase().includes(searchLower) ||
      company.status.toLowerCase().includes(searchLower)
    );
  };
  
  return (
    <CompanySelector
      items={companies}
      onSelectionChange={setSelectedCompany}
      renderItem={renderCompanyItem}
      filterFn={customFilter}
      searchPlaceholder="Search by name or status"
    />
  );
};`}</pre>
                </div>
            </section>
        </div>
    );
}