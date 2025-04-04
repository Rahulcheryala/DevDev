import { PageDetailsSection } from "@zeak/ui";

export default function PageDetailsSectionDocumentation() {
    return (
        <div className="container mx-auto p-6">
            <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">PageDetailsSection Component</h1>
                <p className="text-gray-600 text-lg">
                    A component for displaying detailed information sections with consistent styling and layout.
                </p>
            </header>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} PageDetailsSection {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Basic Usage</h2>
                <div className="flex flex-col gap-6 p-6 bg-[#F0F4FD] rounded-lg border border-gray-200">
                    <PageDetailsSection />
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Other Usage</h2>
                <div className="flex flex-col gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <PageDetailsSection
                        title="Product Information"
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Product Name</h3>
                                <p className="mt-1 text-base font-medium">Premium Widget Pro</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">SKU</h3>
                                <p className="mt-1 text-base font-medium">WID-PRO-2023</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Manufacturer</h3>
                                <p className="mt-1 text-base font-medium">Acme Corporation</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                                <p className="mt-1 text-base font-medium">Electronics</p>
                            </div>
                        </div>
                    </PageDetailsSection>
                </div>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`import { PageDetailsSection } from "@zeak/ui";

const ProductDetails = () => {
  return (
    <PageDetailsSection
      title="Product Information"
      subtitle="Key details about the product"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Product Name</h3>
          <p className="mt-1 text-base font-medium">Premium Widget Pro</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">SKU</h3>
          <p className="mt-1 text-base font-medium">WID-PRO-2023</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Manufacturer</h3>
          <p className="mt-1 text-base font-medium">Acme Corporation</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Category</h3>
          <p className="mt-1 text-base font-medium">Electronics</p>
        </div>
      </div>
    </PageDetailsSection>
  );
};`}</pre>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Consistent section styling</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Optional title and subtitle</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Customizable content via children prop</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Support for action buttons</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Responsive design</span>
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
                        <div>No</div>
                        <div>-</div>
                        <div>Title for the section</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">subtitle</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Subtitle displayed below the title</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">children</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">ReactNode</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Content to display within the section</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">actions</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">ReactNode</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Action elements to display in the title area</div>
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
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Examples</h2>

                <h3 className="text-xl font-medium mt-6 mb-3">With Action Buttons</h3>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md mb-8">
                    <pre>{`import { PageDetailsSection } from "@zeak/ui";
import { Button } from "@zeak/react";

const UserProfileSection = () => {
  return (
    <PageDetailsSection
      title="User Profile"
      subtitle="Personal information"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Edit</Button>
          <Button variant="primary" size="sm">Save</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
          <p className="mt-1 text-base font-medium">John Doe</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          <p className="mt-1 text-base font-medium">john.doe@example.com</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Role</h3>
          <p className="mt-1 text-base font-medium">Administrator</p>
        </div>
      </div>
    </PageDetailsSection>
  );
};`}</pre>
                </div>

                <h3 className="text-xl font-medium mt-6 mb-3">Multiple Sections</h3>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`import { PageDetailsSection } from "@zeak/ui";

const ProductPage = () => {
  return (
    <div className="space-y-6">
      <PageDetailsSection
        title="Basic Information"
        subtitle="Product details"
      >
        {/* Basic product information */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Content here */}
        </div>
      </PageDetailsSection>
      
      <PageDetailsSection
        title="Pricing"
        subtitle="Costs and discounts"
      >
        {/* Pricing information */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Content here */}
        </div>
      </PageDetailsSection>
      
      <PageDetailsSection
        title="Inventory"
        subtitle="Stock and availability"
      >
        {/* Inventory information */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Content here */}
        </div>
      </PageDetailsSection>
    </div>
  );
};`}</pre>
                </div>
            </section>
        </div>
    );
}