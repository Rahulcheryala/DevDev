import { DateTableCell } from "@zeak/datatable";
import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";

export default function DateCellDocumentation() {
    const timeZone = "America/Chicago";
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setMonth(pastDate.getMonth() - 1);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">DateTableCell Component</h1>
                <p className="text-gray-600 text-lg">
                    A component for displaying formatted dates with timezone support in tables.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-2xl font-semibold">Installation</h2>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
                    <code className="font-mono text-sm">import {"{"} DateTableCell {"}"} from '@zeak/datatable';</code>
                    <button
                        onClick={() => copyToClipboard("import { DateTableCell } from '@zeak/datatable';")}
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
                        <DateTableCell date={currentDate} timeZone={timeZone} />
                        <div className="mt-4 text-sm">
                            Current date displayed with timezone: <span className="font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">{timeZone}</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 relative">
                        <pre className="font-mono text-sm overflow-x-auto p-2">{`import { DateTableCell } from '@zeak/datatable';

const MyComponent = () => {
  return <DateTableCell date={new Date()} timeZone="America/Chicago" />;
};`}</pre>
                        <button
                            onClick={() => copyToClipboard(`import { DateTableCell } from '@zeak/datatable';\n\nconst MyComponent = () => {\n  return <DateTableCell date={new Date()} timeZone="America/Chicago" />;\n};`)}
                            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                            aria-label="Copy code"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                        </button>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Examples</h2>

                <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-xl font-medium mb-3">Custom Date Format</h3>
                            <DateTableCell
                                date={currentDate}
                                timeZone={timeZone}
                                dateFormat="yyyy/MM/dd"
                            />
                        </div>
                        <div className="bg-gray-50 p-4 relative">
                            <pre className="font-mono text-sm overflow-x-auto p-2">{`<DateTableCell 
  date={new Date()} 
  timeZone="America/Chicago" 
  dateFormat="yyyy/MM/dd" 
/>`}</pre>
                            <button
                                onClick={() => copyToClipboard(`<DateTableCell\n  date={new Date()}\n  timeZone="America/Chicago"\n  dateFormat="yyyy/MM/dd"\n/>`)}
                                className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                                aria-label="Copy code"
                            >
                                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-xl font-medium mb-3">Custom Time Format</h3>
                            <DateTableCell
                                date={currentDate}
                                timeZone={timeZone}
                                timeFormat="HH:mm:ss"
                            />
                        </div>
                        <div className="bg-gray-50 p-4 relative">
                            <pre className="font-mono text-sm overflow-x-auto p-2">{`<DateTableCell 
  date={new Date()} 
  timeZone="America/Chicago" 
  timeFormat="HH:mm:ss" 
/>`}</pre>
                            <button
                                onClick={() => copyToClipboard(`<DateTableCell\n  date={new Date()}\n  timeZone="America/Chicago"\n  timeFormat="HH:mm:ss"\n/>`)}
                                className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                                aria-label="Copy code"
                            >
                                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-xl font-medium mb-3">Hide Time</h3>
                            <DateTableCell
                                date={currentDate}
                                timeZone={timeZone}
                                showTime={false}
                            />
                        </div>
                        <div className="bg-gray-50 p-4 relative">
                            <pre className="font-mono text-sm overflow-x-auto p-2">{`<DateTableCell 
  date={new Date()} 
  timeZone="America/Chicago" 
  showTime={false} 
/>`}</pre>
                            <button
                                onClick={() => copyToClipboard(`<DateTableCell\n  date={new Date()}\n  timeZone="America/Chicago"\n  showTime={false}\n/>`)}
                                className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                                aria-label="Copy code"
                            >
                                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Props</h2>
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-4">
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Prop</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Default</div>
                        <div className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</div>
                    </div>
                    <div className="divide-y divide-gray-200 bg-white">
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">date</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string | Date</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">-</div>
                            <div className="px-6 py-4 text-sm">The date to display. Can be a Date object or a string that can be parsed into a Date.</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">timeZone</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">-</div>
                            <div className="px-6 py-4 text-sm">The timezone to use for formatting the date (e.g., "America/Chicago", "Europe/London").</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">dateFormat</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">"dd MMM, yyyy"</div>
                            <div className="px-6 py-4 text-sm">Format string for the date part. Uses date-fns-tz format patterns.</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">timeFormat</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">"HH:mm"</div>
                            <div className="px-6 py-4 text-sm">Format string for the time part. Uses date-fns-tz format patterns.</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">className</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">string</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">-</div>
                            <div className="px-6 py-4 text-sm">CSS class to apply to the container div.</div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">showTime</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">boolean</div>
                            <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">true</div>
                            <div className="px-6 py-4 text-sm">Whether to display the time part below the date.</div>
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
                            <span className="ml-3 text-gray-700">Timezone-aware date formatting</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Customizable date and time formats</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Option to show or hide time information</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Accepts both Date objects and date strings</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="ml-3 text-gray-700">Styled for use in data tables with customizable appearance</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}