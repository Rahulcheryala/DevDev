import { PageViewHeader } from "@zeak/ui";

export default function PageViewHeaderDocumentation() {
    return (
        <div className="container mx-auto p-6">
            <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">PageViewHeader Component</h1>
                <p className="text-gray-600 text-lg">
                    A comprehensive header component for detail pages with metadata, navigation controls, and status indicators.
                </p>
            </header>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} PageViewHeader {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Basic Usage</h2>
                <div className="flex flex-col gap-6 p-6 bg-white rounded-lg border border-gray-200">
                    <div>
                        <PageViewHeader
                            organization="Previous / Next"
                            title="Page Title"
                            status="active"
                            metadata={{
                                since: "AUGUST 2024",
                                departments: ["PFIZER EU", "PFIZER SALES"],
                                email: "OLIVIA.HILLS@ZEAK.IO",
                                phone: "522-799-0171"
                            }}
                            navigationTabs={["General", "Team", "Settings", "Permissions"]}
                            currentPage={5}
                            totalPages={32}
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Organization/context navigation</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Page title with status indicator</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Metadata display (since, departments, contact info)</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Navigation tabs for section switching</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Pagination indicators and controls</span>
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
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">organization</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>Organization or navigation context text</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">title</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>Main title for the page</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">status</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Status indicator (e.g., 'active', 'inactive')</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">metadata</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">MetadataProps</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Object containing metadata fields</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">navigationTabs</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string[]</code></div>
                        <div>No</div>
                        <div>[]</div>
                        <div>Array of tab names for section navigation</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">currentPage</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">number</code></div>
                        <div>No</div>
                        <div>1</div>
                        <div>Current page number for pagination</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">totalPages</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">number</code></div>
                        <div>No</div>
                        <div>1</div>
                        <div>Total number of pages for pagination</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onPrevious</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">() {'=>'} void</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Callback when previous navigation is clicked</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onNext</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">() {'=>'} void</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Callback when next navigation is clicked</div>
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
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">MetadataProps Type</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`type MetadataProps = {
  since?: string;
  departments?: string[];
  email?: string;
  phone?: string;
  [key: string]: any; // For additional custom metadata
};`}</pre>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Implementation Example</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`import { useState } from "react";
import { PageViewHeader } from "@zeak/ui";
import { useNavigate, useParams } from "react-router-dom";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("profile");
  
  // In a real app, this would come from an API
  const user = {
    id: userId,
    name: "Alexandra Smith",
    status: "active",
    joinDate: "MARCH 2022",
    departments: ["ENGINEERING", "PRODUCT"],
    email: "alex.smith@example.com",
    phone: "555-987-6543"
  };
  
  // Simulate navigation between users
  const handlePrevious = () => {
    const prevUserId = parseInt(userId || "0") - 1;
    if (prevUserId >= 1) {
      navigate(\`/users/\${prevUserId}\`);
    }
  };
  
  const handleNext = () => {
    const nextUserId = parseInt(userId || "0") + 1;
    navigate(\`/users/\${nextUserId}\`);
  };
  
  // Navigation tabs for this example
  const tabs = ["Profile", "Activity", "Performance", "Documents", "Settings"];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PageViewHeader
        organization="Users Directory"
        title={user.name}
        status={user.status}
        metadata={{
          since: user.joinDate,
          departments: user.departments,
          email: user.email,
          phone: user.phone
        }}
        navigationTabs={tabs}
        currentPage={parseInt(userId || "1")}
        totalPages={100} // Assuming 100 total users
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
      
      <div className="container mx-auto px-4 py-6">
        {/* Content for the selected tab would go here */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          {/* User profile content would be displayed here based on active tab */}
        </div>
      </div>
    </div>
  );
};`}</pre>
                </div>
            </section>
        </div>
    );
}