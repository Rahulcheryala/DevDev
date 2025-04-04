import { PageViewHeader } from "@zeak/ui";
import { AlertCircle, PlusIcon, DownloadIcon } from "lucide-react";

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
                            onGoBack={() => { console.log("Go back") }}
                            organization={[{
                                label: "Previous",
                                link: "/previous"
                            }, {
                                label: "Next",
                            }]}
                            title="Page Title"
                            showLogo={true}
                            showTitleDropdown={true}
                            onTitleDropdownClick={() => { console.log("Title dropdown clicked") }}
                            status="active"
                            metadata={{
                                since: "AUGUST 2024",
                                departments: ["PFIZER EU", "PFIZER SALES"],
                                email: "OLIVIA.HILLS@ZEAK.IO",
                                phone: "522-799-0171"
                            }}
                            navigationTabs={[
                                {
                                    label: "General",
                                    value: "General",
                                },
                                {
                                    label: "Team",
                                    value: "Team",
                                },
                                {
                                    label: "Settings",
                                    value: "Settings",
                                },
                                {
                                    label: "Permissions",
                                    value: "Permissions",
                                    disabled: true,
                                },
                            ]}
                            showNavigation={true}
                            prevItem="Previous"
                            nextItem="Next"
                            activePage={5}
                            totalItems={32}
                            onPrevClick={() => { console.log("Previous") }}
                            onNextClick={() => { console.log("Next") }}
                            notes={{
                                icon: AlertCircle,
                                label: "Notes title",
                                onClick: () => { console.log("Notes clicked") }
                            }}
                            topActions={{
                                actions: [
                                    {
                                        label: "Add New",
                                        icon: PlusIcon,
                                        onClick: () => { console.log("Add New") },
                                        variant: "primary"
                                    },
                                    {
                                        label: "Export",
                                        icon: DownloadIcon,
                                        onClick: () => { console.log("Export") },
                                        variant: "outline-primary",
                                        disabled: true
                                    }
                                ],
                                // customContent: (
                                //     <>
                                //         <Button
                                //             variant="primary"
                                //             onClick={() => { console.log("Custom Action") }}
                                //         >
                                //             Custom Action
                                //         </Button>
                                //     </>
                                // )
                            }}
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
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">title</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div className="text-green-600 font-medium">Yes</div>
                        <div>-</div>
                        <div>The main title displayed in the header</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">navigationTabs</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">NavigationTab[]</code></div>
                        <div className="text-green-600 font-medium">Yes</div>
                        <div>[]</div>
                        <div>Array of navigation tabs with labels, values, and content</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">defaultTab</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>First tab value</div>
                        <div>The initially selected tab value</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">topActions</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">TopActions</code></div>
                        <div>No</div>
                        <div>undefined</div>
                        <div>Configuration for header actions and custom content</div>
                    </div>
                </div>

                <h3 className="text-xl font-medium mt-6 mb-2">NavigationTab Type</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                    <pre>{`interface NavigationTab {
  label: string;    // Display text for the tab
  value: string;    // Unique identifier for the tab
  content?: React.ReactNode;  // Content to display when tab is active
}`}</pre>
                </div>

                <h3 className="text-xl font-medium mt-6 mb-2">TopActions Type</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                    <pre>{`interface TopActions {
  actions?: {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'ghost';
    disabled?: boolean;
  }[];
  customContent?: React.ReactNode;
}`}</pre>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Example Usage</h2>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                    <pre>{`import { PageViewHeader } from "@zeak/ui";
import { Plus, Download } from "lucide-react";

<PageViewHeader
  title="Dashboard"
  navigationTabs={[
    {
      label: "Overview",
      value: "overview",
      content: <OverviewContent />
    },
    {
      label: "Details",
      value: "details",
      content: <DetailsContent />
    }
  ]}
  defaultTab="overview"
  topActions={{
    actions: [
      {
        label: "Add New",
        icon: Plus,
        onClick: () => handleAdd(),
        variant: "default"
      },
      {
        label: "Export",
        icon: Download,
        onClick: () => handleExport(),
        variant: "outline"
      }
    ],
    customContent: <CustomComponent />
  }}
/>`}</pre>
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