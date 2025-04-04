import { useState } from "react";
import { MultiSelect, type Option } from "@zeak/ui";

export default function MultiSelectDocumentation() {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const companies: Option[] = [
        { id: '1', value: '1', label: 'Pfizer USA', isPrimary: true },
        { id: '2', value: '2', label: 'Pfizer India' },
        { id: '3', value: '3', label: 'Pfizer Argentina' },
        { id: '4', value: '4', label: 'Pfizer Canada' },
        { id: '5', value: '5', label: 'Pfizer Brazil' },
        { id: '6', value: '6', label: 'Pfizer Mexico' },
        { id: '7', value: '7', label: 'Pfizer Chile' },
    ];

    const handleChange = (selected: Option[]) => {
        setSelectedOptions(selected);
    };

    return (
        <div className="container mx-auto p-6">
            <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">MultiSelect Component</h1>
                <p className="text-gray-600 text-lg">
                    A versatile dropdown component for selecting multiple options with support for primary selection.
                </p>
            </header>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} MultiSelect, type Option {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Basic Usage</h2>
                <div className="flex flex-col gap-6 p-6 bg-[#F0F4FD] items-center rounded-lg border border-gray-200">
                    <div className="max-w-md">
                        <MultiSelect
                            options={companies}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-800">
                            Selected Options: {selectedOptions.length === 0 ? 'None' : (
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    {selectedOptions.map(option => (
                                        <li key={option.id} className="font-medium">
                                            {option.label} {option.isPrimary && <span className="text-indigo-600 font-bold">(Primary)</span>}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Select multiple options from a dropdown</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Primary option designation</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Searchable options</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Clear selection functionality</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Visual indication of selected items</span>
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
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">options</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">Option[]</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>Array of selectable options</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onChange</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(selected: Option[]) {'=>'} void</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>Handler for selection changes</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">placeholder</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"Select options..."</div>
                        <div>Placeholder text when no options are selected</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">disabled</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">boolean</code></div>
                        <div>No</div>
                        <div>false</div>
                        <div>Whether the component is disabled</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">className</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>""</div>
                        <div>Additional CSS classes</div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Option Type</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`type Option = {
  id: string;
  value: string;
  label: string;
  isPrimary?: boolean;
};`}</pre>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Implementation Example</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`import { useState, useEffect } from "react";
import { MultiSelect, type Option } from "@zeak/ui";

const CompanySelector = () => {
  const [selectedCompanies, setSelectedCompanies] = useState<Option[]>([]);
  const [availableCompanies, setAvailableCompanies] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching companies from an API
  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        // This would be your actual API call
        // const response = await fetch('/api/companies');
        // const data = await response.json();
        
        // Simulated API response
        const mockData = [
          { id: '1', value: '1', label: 'Acme Corporation', isPrimary: true },
          { id: '2', value: '2', label: 'Globex Corporation' },
          { id: '3', value: '3', label: 'Soylent Corp' },
          { id: '4', value: '4', label: 'Initech' },
          { id: '5', value: '5', label: 'Umbrella Corporation' },
          { id: '6', value: '6', label: 'Stark Industries' },
          { id: '7', value: '7', label: 'Wayne Enterprises' },
        ];
        
        // Simulate network delay
        setTimeout(() => {
          setAvailableCompanies(mockData);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load companies');
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanySelection = (selected: Option[]) => {
    setSelectedCompanies(selected);
    
    // Example of processing the selection
    const primaryCompany = selected.find(company => company.isPrimary);
    console.log('Selected companies:', selected);
    console.log('Primary company:', primaryCompany);
    
    // This could trigger other actions in your application
    // e.g., updating a parent component, making an API call, etc.
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Company Selection</h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Select Companies
        </label>
        
        {isLoading ? (
          <div className="h-10 bg-gray-100 animate-pulse rounded"></div>
        ) : (
          <MultiSelect
            options={availableCompanies}
            onChange={handleCompanySelection}
            placeholder="Select companies..."
          />
        )}
        
        <p className="text-sm text-gray-500">
          Select one or more companies. The primary company will be highlighted.
        </p>
      </div>
      
      {selectedCompanies.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Selected Companies</h3>
          <ul className="space-y-1">
            {selectedCompanies.map(company => (
              <li key={company.id} className="flex items-center">
                <span className={company.isPrimary ? "font-bold" : ""}>
                  {company.label}
                </span>
                {company.isPrimary && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Primary
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};`}</pre>
                </div>
            </section>
        </div>
    );
} 