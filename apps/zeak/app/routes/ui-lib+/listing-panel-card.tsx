import { ListingPanelCard } from "@zeak/ui";
import { Code, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function ListingPanelCardExample() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">ListingPanelCard Component</h1>
                <p className="text-gray-600 text-lg">
                    A versatile card component that displays customizable content with last updated information.
                    Perfect for listing panels to show items with active/inactive states.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} ListingPanelCard {"}"} from '@zeak/ui';</code>
                    <button
                        onClick={() => copyToClipboard("import { ListingPanelCard } from '@zeak/ui';")}
                        className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
                        aria-label="Copy code"
                    >
                        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-gray-400" />}
                    </button>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Props</h2>
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-4">
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Prop</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Required</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</div>
                    </div>
                    <div className="divide-y divide-gray-200 bg-white">
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">isActive</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">boolean</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">Yes</div>
                            <div className="px-6 py-4 text-sm">Whether the card is in active state (blue background) or inactive state (white background)</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">lastUpdatedBy</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">Yes</div>
                            <div className="px-6 py-4 text-sm">Name of the person who last updated the item</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">updatedAt</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">Date</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">Yes</div>
                            <div className="px-6 py-4 text-sm">Date when the item was last updated</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">link</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">No</div>
                            <div className="px-6 py-4 text-sm">URL to navigate to when the card is clicked (default: "#")</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">topContent</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">React.ReactNode</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm">Yes</div>
                            <div className="px-6 py-4 text-sm">Custom content to display at the top of the card</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Examples</h2>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="font-medium mb-4">Active Card</h3>
                        <ListingPanelCard
                            isActive={true}
                            lastUpdatedBy="John Doe"
                            updatedAt={new Date()}
                            link="#"
                            topContent={<div className="mb-2 font-medium">Active Card Example</div>}
                        />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`<ListingPanelCard 
  isActive={true} 
  lastUpdatedBy="John Doe" 
  updatedAt={new Date()} 
  link="#" 
  topContent={<div className="mb-2 font-medium">Active Card Example</div>} 
/>`}</pre>
                        <button
                            onClick={() => copyToClipboard(`<ListingPanelCard 
  isActive={true} 
  lastUpdatedBy="John Doe" 
  updatedAt={new Date()} 
  link="#" 
  topContent={<div className="mb-2 font-medium">Active Card Example</div>} 
/>`)}
                            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                            aria-label="Copy code"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="font-medium mb-4">Inactive Card</h3>
                        <ListingPanelCard
                            isActive={false}
                            lastUpdatedBy="Jane Smith"
                            updatedAt={new Date()}
                            link="#"
                            topContent={<div className="mb-2 font-medium">Inactive Card Example</div>}
                        />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`<ListingPanelCard 
  isActive={false} 
  lastUpdatedBy="Jane Smith" 
  updatedAt={new Date()} 
  link="#" 
  topContent={<div className="mb-2 font-medium">Inactive Card Example</div>} 
/>`}</pre>
                        <button
                            onClick={() => copyToClipboard(`<ListingPanelCard 
  isActive={false} 
  lastUpdatedBy="Jane Smith" 
  updatedAt={new Date()} 
  link="#" 
  topContent={<div className="mb-2 font-medium">Inactive Card Example</div>} 
/>`)}
                            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                            aria-label="Copy code"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="font-medium mb-4">With Complex Top Content</h3>
                        <ListingPanelCard
                            isActive={false}
                            lastUpdatedBy="Alex Johnson"
                            updatedAt={new Date()}
                            link="#"
                            topContent={
                                <div className="mb-2">
                                    <h4 className="font-medium">Card Title</h4>
                                    <p className="text-sm text-gray-600 mb-1">Description text goes here</p>
                                    <div className="flex gap-2">
                                        <span className="bg-gray-200 text-xs px-2 py-1 rounded">Tag 1</span>
                                        <span className="bg-gray-200 text-xs px-2 py-1 rounded">Tag 2</span>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`<ListingPanelCard 
  isActive={false} 
  lastUpdatedBy="Alex Johnson" 
  updatedAt={new Date()} 
  link="#" 
  topContent={
    <div className="mb-2">
      <h4 className="font-medium">Card Title</h4>
      <p className="text-sm text-gray-600 mb-1">Description text goes here</p>
      <div className="flex gap-2">
        <span className="bg-gray-200 text-xs px-2 py-1 rounded">Tag 1</span>
        <span className="bg-gray-200 text-xs px-2 py-1 rounded">Tag 2</span>
      </div>
    </div>
  } 
/>`}</pre>
                        <button
                            onClick={() => copyToClipboard(`<ListingPanelCard 
  isActive={false} 
  lastUpdatedBy="Alex Johnson" 
  updatedAt={new Date()} 
  link="#" 
  topContent={
    <div className="mb-2">
      <h4 className="font-medium">Card Title</h4>
      <p className="text-sm text-gray-600 mb-1">Description text goes here</p>
      <div className="flex gap-2">
        <span className="bg-gray-200 text-xs px-2 py-1 rounded">Tag 1</span>
        <span className="bg-gray-200 text-xs px-2 py-1 rounded">Tag 2</span>
      </div>
    </div>
  } 
/>`)}
                            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                            aria-label="Copy code"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                        </button>
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
                            <span className="ml-3 text-gray-700">Visual distinction between active and inactive states</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Displays last updated information with user attribution</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Customizable top content for flexible display options</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Interactive with clickable navigation to specified links</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Responsive design that works across different screen sizes</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}