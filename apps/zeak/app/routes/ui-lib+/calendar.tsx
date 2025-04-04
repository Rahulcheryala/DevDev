import { Calendar } from "@zeak/ui";
import { useState } from "react";
import { CalendarIcon, Code, Package, Check, ChevronRight } from "lucide-react";

export default function CalendarExample() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    return (
        <div className="container mx-auto p-8 space-y-12 w-full">
            <header className="space-y-3 border-l-4 border-indigo-600 pl-6 py-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Calendar Component</h1>
                <p className="text-gray-600 text-lg">
                    A modern, customizable calendar component for date selection with intuitive navigation and sleek display.
                </p>
            </header>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">
                    <Package className="h-5 w-5 text-indigo-600" />
                    Installation
                </h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} Calendar {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">
                    <CalendarIcon className="h-5 w-5 text-indigo-600" />
                    Basic Usage
                </h2>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex flex-col  gap-4 p-6 border rounded-xl shadow-sm bg-white w-1/2">
                        <Calendar
                            value={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                        />
                    </div>
                    <div className="flex-1 bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                        <pre>{`import { Calendar } from '@zeak/ui';
import { useState } from 'react';

const MyComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  return (
    <Calendar 
      value={selectedDate}
      onChange={(date) => setSelectedDate(date)}
    />
  );
};`}</pre>
                    </div>
                </div>
            </section>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">
                    <Check className="h-5 w-5 text-indigo-600" />
                    Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Month and year navigation with intuitive controls</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Month/year selector dropdown for quick navigation</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Popover interface with date selection confirmation</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Visual distinction between current, previous, and next month days</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Formatted date display in the input field</span>
                    </div>
                </div>
            </section>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">
                    <Code className="h-5 w-5 text-indigo-600" />
                    Props
                </h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-5 gap-4 border-b pb-3 pt-3 px-4 font-medium bg-gray-50 text-gray-700">
                        <div>Prop</div>
                        <div>Type</div>
                        <div>Required</div>
                        <div>Default</div>
                        <div>Description</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">value</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">Date</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>The currently selected date (controlled component)</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onChange</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(date: Date) {"=>"} void</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Callback function when a date is selected</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">defaultValue</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">Date</code></div>
                        <div>No</div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded">new Date()</code></div>
                        <div>The default date to display when no value is provided</div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Component Structure</h2>
                <div className="space-y-4">
                    <p className="text-gray-700">The Calendar component consists of:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2 p-4 rounded-lg border border-gray-200">
                            <ChevronRight className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <span>A button trigger that displays the selected date or placeholder</span>
                        </div>
                        <div className="flex items-start gap-2 p-4 rounded-lg border border-gray-200">
                            <ChevronRight className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <span>A popover containing the calendar interface</span>
                        </div>
                        <div className="flex items-start gap-2 p-4 rounded-lg border border-gray-200">
                            <ChevronRight className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <span>Month/year navigation with dropdown selector for quick jumps</span>
                        </div>
                        <div className="flex items-start gap-2 p-4 rounded-lg border border-gray-200">
                            <ChevronRight className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <span>A grid of days with weekday labels</span>
                        </div>
                        <div className="flex items-start gap-2 p-4 rounded-lg border border-gray-200">
                            <ChevronRight className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <span>Interactive date cells with visual states for current month, selected date, etc.</span>
                        </div>
                        <div className="flex items-start gap-2 p-4 rounded-lg border border-gray-200">
                            <ChevronRight className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <span>A confirmation button to apply the selection</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Styling</h2>
                <div className="space-y-4">
                    <p className="text-gray-700">
                        The Calendar component uses a clean, modern design with rounded corners and subtle hover effects.
                        It includes:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
                            <span className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></span>
                            <span>Rounded input field with calendar icon</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
                            <span className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></span>
                            <span>Rounded popover with shadow for depth</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
                            <span className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></span>
                            <span>Blue highlight for the selected date</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
                            <span className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></span>
                            <span>Subtle hover effects for interactive elements</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
                            <span className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></span>
                            <span>Visual distinction between current month days and adjacent month days</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}