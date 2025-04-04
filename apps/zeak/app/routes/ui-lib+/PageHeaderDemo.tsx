import { PageHeader } from "@zeak/ui";

export default function PageHeaderDocumentation() {
    return (
        <div className="container mx-auto p-6">
            <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">PageHeader Component</h1>
                <p className="text-gray-600 text-lg">
                    A consistent header component for page layout with support for navigation, title, and action buttons.
                </p>
            </header>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} PageHeader {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-medium mt-6 mb-4">Basic Usage</h3>
                <div className="flex flex-col gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200 mb-6">
                    <PageHeader
                        title="Dashboard"
                        breadcrumbs={[
                            {
                                label: "Home",
                                to: "/"
                            },
                            {
                                label: "Dashboard"
                            }
                        ]}
                        onEdit={() => console.log('Edit clicked')}
                        onMore={() => console.log('More clicked')}
                        onClose={() => console.log('Close clicked')}
                        showEdit={true}
                        showMore={true}
                        showClose={true}
                    />
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Consistent page header layout</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Breadcrumb navigation</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Action buttons placement</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Built-in edit, more, and close actions</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Customizable with additional className</span>
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
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">breadcrumbs</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">BreadcrumbItem[]</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>Array of breadcrumb items for navigation</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">title</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>undefined</div>
                        <div>The main title of the page</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">actions</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">ReactNode</code></div>
                        <div>No</div>
                        <div>undefined</div>
                        <div>Optional actions/buttons to display in the header</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">className</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>undefined</div>
                        <div>Additional CSS classes for the header</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onGoBack</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">() {'=>'} void</code></div>
                        <div>No</div>
                        <div>undefined</div>
                        <div>Handler for go back action</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onEdit</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">() {'=>'} void</code></div>
                        <div>No</div>
                        <div>undefined</div>
                        <div>Handler for edit action</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onMore</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">() {'=>'} void</code></div>
                        <div>No</div>
                        <div>undefined</div>
                        <div>Handler for more menu action</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onClose</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">() {'=>'} void</code></div>
                        <div>No</div>
                        <div>undefined</div>
                        <div>Handler for close action</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">showEdit</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">boolean</code></div>
                        <div>No</div>
                        <div>false</div>
                        <div>Whether to show the edit button</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">showMore</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">boolean</code></div>
                        <div>No</div>
                        <div>false</div>
                        <div>Whether to show the more menu button</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">showClose</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">boolean</code></div>
                        <div>No</div>
                        <div>false</div>
                        <div>Whether to show the close button</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">icon</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">ReactNode</code></div>
                        <div>No</div>
                        <div>undefined</div>
                        <div>Optional icon to display in the header</div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">BreadcrumbItem Type</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`type BreadcrumbItem = {
  label: string;
  to?: string;
};`}</pre>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Implementation Example</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`import { useNavigate, useLoaderData } from "@remix-run/react";
import { PageHeader, Button, Tabs, TabsList, TabsTrigger } from "@zeak/ui";
import { PlusIcon, DownloadIcon } from "@zeak/icons";

const OrdersPage = () => {
  const navigate = useNavigate();
  const { orders } = useLoaderData();
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        breadcrumbs={[
          {
            label: "Dashboard",
            to: "/"
          },
          {
            label: "Orders"
          }
        ]}
        actions={
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => console.log('Export orders')}
            >
              <span className="mr-1">⬇️</span>
              Export
            </Button>
            <Button 
              size="sm"
              onClick={() => navigate('/orders/new')}
            >
              <span className="mr-1">+</span>
              New Order
            </Button>
          </div>
        }
        onGoBack={() => navigate(-1)}
      />
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="canceled">Canceled</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Order list or table would go here */}
      <div className="bg-white rounded-lg shadow p-6">
        {orders ? (
          <div>Orders table would go here</div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;`}</pre>
                </div>
            </section>
        </div>
    );
} 