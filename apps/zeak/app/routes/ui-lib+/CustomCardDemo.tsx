import { useState } from "react";
import { CustomCard } from "@zeak/ui";

export default function CustomCardDemo() {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="container mx-auto p-6">
            <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Custom Card Component</h1>
                <p className="text-gray-600 text-lg">
                    A versatile card component for displaying application integrations with customizable content and actions.
                </p>
            </header>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} CustomCard {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Basic Usage</h2>
                <div className="flex flex-col items-center gap-6 p-6 bg-[#F0F4FD] rounded-lg border border-gray-200">
                    <div className="mt-4">
                        <CustomCard
                            // All props are optional and will use defaults if not provided
                            onFavoriteToggle={(isFavorite) => setIsFavorite(isFavorite)}
                            onActionClick={() => console.log('Action button clicked')}
                        />
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-800">
                            Favorite status: <strong>{isFavorite ? 'Favorited' : 'Not favorited'}</strong>
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Customizable logo and branding</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>External URL linking</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Configurable title and description</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Connection count display</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Timestamp information for last update</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Favorite toggle functionality</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Customizable action button</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Clean, modern design with consistent styling</span>
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
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">logo</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">React.ReactNode</code></div>
                        <div>No</div>
                        <div>Default logo</div>
                        <div>Logo component to display in the card</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">url</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"#"</div>
                        <div>URL for the external link</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">title</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"Microsoft Dynamics 365"</div>
                        <div>Title of the card</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">subtitle</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"ERP"</div>
                        <div>Subtitle/category text</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">description</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>Lorem ipsum...</div>
                        <div>Description text for the card</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">connections</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">number | 'NA'</code></div>
                        <div>No</div>
                        <div>'NA'</div>
                        <div>Number of connections to display</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">lastUpdated</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">{"{ date: string, time: string, timezone: string }"}</code></div>
                        <div>No</div>
                        <div>{"{"} date: '01/31/2024', time: '02:33 PM', timezone: 'CST' {"}"}</div>
                        <div>Last updated timestamp information</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">actionButtonText</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"Add Connection"</div>
                        <div>Text for the action button</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onActionClick</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">() {"=>"} void</code></div>
                        <div>No</div>
                        <div>Empty function</div>
                        <div>Handler for action button click</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onFavoriteToggle</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(isFavorite: boolean) {"=>"} void</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Handler for favorite toggle</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">defaultFavorite</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">boolean</code></div>
                        <div>No</div>
                        <div>false</div>
                        <div>Initial favorite state</div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Implementation Example</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`import { CustomCard } from '@zeak/ui';
import { useState } from 'react';
import { Building2, BarChart4, Package } from 'lucide-react';

const IntegrationsDashboard = () => {
  const [favorites, setFavorites] = useState({
    dynamics: false,
    salesforce: true,
    quickbooks: false
  });
  
  const handleFavoriteToggle = (key, status) => {
    setFavorites(prev => ({
      ...prev,
      [key]: status
    }));
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CustomCard
        title="Microsoft Dynamics 365"
        subtitle="ERP"
        connections={3}
        defaultFavorite={favorites.dynamics}
        onFavoriteToggle={(status) => handleFavoriteToggle('dynamics', status)}
        onActionClick={() => console.log('Connect to Dynamics')}
      />
      
      <CustomCard
        title="Salesforce"
        subtitle="CRM"
        logo={<BarChart4 size={40} className="text-blue-500" />}
        connections={5}
        defaultFavorite={favorites.salesforce}
        onFavoriteToggle={(status) => handleFavoriteToggle('salesforce', status)}
        onActionClick={() => console.log('Connect to Salesforce')}
      />
      
      <CustomCard
        title="QuickBooks"
        subtitle="Accounting"
        logo={<Package size={40} className="text-green-500" />}
        connections={2}
        defaultFavorite={favorites.quickbooks}
        onFavoriteToggle={(status) => handleFavoriteToggle('quickbooks', status)}
        actionButtonText="View Details"
        onActionClick={() => console.log('View QuickBooks details')}
      />
    </div>
  );
};`}</pre>
                </div>
            </section>
        </div>
    );
}

