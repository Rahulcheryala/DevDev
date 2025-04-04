import { BarChart3 } from "lucide-react";
import { Charts } from "@zeak/ui";

export default function ChartsDocumentation() {
    return (
        <div className="container mx-auto p-6">
            <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Charts Component</h1>
                <p className="text-gray-600 text-lg">
                    A versatile component for displaying chart widgets with customizable title and icon.
                </p>
            </header>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} Charts {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Basic Usage</h2>
                <div className="flex flex-col gap-6 p-6 bg-[#F0F4FD] rounded-lg border border-gray-200">
                    <div>
                        <Charts />
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Customizable chart title</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Replaceable chart icon</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Click handler for interactive charts</span>
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
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">title</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"Charts"</div>
                        <div>Text to display as the chart title</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">icon</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">React.ReactNode</code></div>
                        <div>No</div>
                        <div>Default chart icon</div>
                        <div>Custom icon to display next to the title</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onClick</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">() {'=>'} void</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Function called when the chart is clicked</div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Examples</h2>
                <h3 className="text-xl font-medium text-indigo-600">Custom Title</h3>
                <p className="text-gray-600 mb-4">A chart with a custom title:</p>
                <div className="mb-8">
                    <Charts title="Sales Analytics" />
                </div>

                <h3 className="text-xl font-medium text-indigo-600">Custom Icon</h3>
                <p className="text-gray-600 mb-4">A chart with a custom icon:</p>
                <div className="mb-8">
                    <Charts
                        title="Revenue Metrics"
                        icon={<BarChart3 className="w-5 h-5 text-indigo-600" />}
                    />
                </div>

                <h3 className="text-xl font-medium text-indigo-600">With Click Handler</h3>
                <p className="text-gray-600 mb-4">A chart with a click handler:</p>
                <div>
                    <Charts
                        title="Interactive Chart"
                        onClick={() => alert('Chart clicked!')}
                    />
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Implementation Example</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`import { Charts } from '@zeak/ui';
import { BarChart3, LineChart, PieChart } from 'lucide-react';

const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Charts 
        title="Sales Overview" 
        icon={<BarChart3 className="w-5 h-5" />}
        onClick={() => console.log('Sales chart clicked')}
      />
      
      <Charts 
        title="Revenue Trends" 
        icon={<LineChart className="w-5 h-5" />}
        onClick={() => console.log('Revenue chart clicked')}
      />
      
      <Charts 
        title="Customer Demographics" 
        icon={<PieChart className="w-5 h-5" />}
        onClick={() => console.log('Demographics chart clicked')}
      />
    </div>
  );
};`}</pre>
                </div>
            </section>
        </div>
    );
}