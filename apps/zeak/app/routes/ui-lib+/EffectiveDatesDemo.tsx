import { useState } from 'react';
import type { CalendarDate } from '@internationalized/date';
import { today, getLocalTimeZone } from '@internationalized/date';
import { EffectiveDates, Button } from '@zeak/ui';

export default function EffectiveDatesDocumentation() {
    // Initialize with today's date and today + 7 days
    const [startDate, setStartDate] = useState<CalendarDate | null>(today(getLocalTimeZone()));
    const [endDate, setEndDate] = useState<CalendarDate | null>(today(getLocalTimeZone()).add({ days: 7 }));
    const [startDateError, setStartDateError] = useState<string>('');
    const [endDateError, setEndDateError] = useState<string>('');
    const [doesNotExpire, setDoesNotExpire] = useState<boolean>(false);

    const validateDates = (start: CalendarDate | null, end: CalendarDate | null) => {
        if (!start && !end) return;

        if (start && end && end.compare(start) <= 0) {
            setEndDateError('End date must be after start date');
        } else {
            setEndDateError('');
        }
    };

    const handleStartDateChange = (date: CalendarDate | null) => {
        setStartDate(date);
        setStartDateError('');
        validateDates(date, endDate);
    };

    const handleEndDateChange = (date: CalendarDate | null) => {
        setEndDate(date);
        setEndDateError('');
        validateDates(startDate, date);
    };

    const toggleDoesNotExpire = () => {
        setDoesNotExpire(!doesNotExpire);
    };

    return (
        <div className="container mx-auto p-6">
            <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Effective Dates Component</h1>
                <p className="text-gray-600 text-lg">
                    A component for selecting date ranges with validation and "does not expire" option.
                </p>
            </header>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} EffectiveDates {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Basic Usage</h2>
                <div className="flex flex-col gap-6 p-6 bg-[#F0F4FD] rounded-lg border border-gray-200">
                    <div className="flex space-x-4">
                        <Button onClick={toggleDoesNotExpire} className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white">
                            Toggle "Does Not Expire"
                        </Button>
                    </div>
                    <EffectiveDates
                        startDate={startDate}
                        endDate={endDate}
                        onStartDateChange={handleStartDateChange}
                        onEndDateChange={handleEndDateChange}
                        startDateError={startDateError}
                        endDateError={endDateError}
                        minStartDate={today(getLocalTimeZone())}
                        title="Effective Period"
                        doesNotExpire={doesNotExpire}
                    />
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-800">
                            Current Values: <br />
                            <strong>Start Date:</strong> {startDate ? startDate.toString() : 'None'} <br />
                            <strong>End Date:</strong> {doesNotExpire ? 'Does not expire' : (endDate ? endDate.toString() : 'None')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Date range selection with calendar popups</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Built-in validation for date ranges</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>"Does not expire" option for indefinite end dates</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Minimum date constraints</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Error state handling</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Customizable title</span>
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
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">startDate</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">CalendarDate | null</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>The selected start date</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">endDate</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">CalendarDate | null</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>The selected end date</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onStartDateChange</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(date: CalendarDate | null) {'=>'} void</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>Handler for start date changes</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onEndDateChange</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(date: CalendarDate | null) {'=>'} void</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>Handler for end date changes</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">startDateError</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>""</div>
                        <div>Error message for start date</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">endDateError</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>""</div>
                        <div>Error message for end date</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">minStartDate</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">CalendarDate</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Minimum allowed start date</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">title</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"Effective Period"</div>
                        <div>Section title text</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">className</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>""</div>
                        <div>Additional CSS classes</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">doesNotExpire</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">boolean</code></div>
                        <div>No</div>
                        <div>false</div>
                        <div>Whether the "does not expire" option is enabled</div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Implementation Example</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`import { useState } from 'react';
import type { CalendarDate } from '@internationalized/date';
import { today, getLocalTimeZone } from '@internationalized/date';
import { EffectiveDates } from '@zeak/ui';

const EmploymentDateRangeForm = () => {
  // Start with current date and end date as 1 year later
  const [startDate, setStartDate] = useState<CalendarDate | null>(
    today(getLocalTimeZone())
  );
  const [endDate, setEndDate] = useState<CalendarDate | null>(
    today(getLocalTimeZone()).add({ years: 1 })
  );
  const [errors, setErrors] = useState({
    start: '',
    end: ''
  });
  
  // For permanent employees
  const [isPermanent, setIsPermanent] = useState(false);
  
  const handleStartDateChange = (date: CalendarDate | null) => {
    setStartDate(date);
    validateDates(date, endDate);
  };
  
  const handleEndDateChange = (date: CalendarDate | null) => {
    setEndDate(date);
    validateDates(startDate, date);
  };
  
  const validateDates = (start: CalendarDate | null, end: CalendarDate | null) => {
    const newErrors = { start: '', end: '' };
    
    if (!start) {
      newErrors.start = 'Start date is required';
    }
    
    if (!isPermanent && !end) {
      newErrors.end = 'End date is required for temporary employees';
    }
    
    if (start && end && end.compare(start) < 0) {
      newErrors.end = 'End date must be after start date';
    }
    
    setErrors(newErrors);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Employment Period</h2>
      
      <EffectiveDates
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        startDateError={errors.start}
        endDateError={errors.end}
        minStartDate={today(getLocalTimeZone())}
        title="Contract Term"
        doesNotExpire={isPermanent}
      />
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="permanent"
          checked={isPermanent}
          onChange={(e) => setIsPermanent(e.target.checked)}
        />
        <label htmlFor="permanent">Permanent Employee (No End Date)</label>
      </div>
      
      <button 
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => console.log('Form submitted:', { startDate, endDate, isPermanent })}
      >
        Save Employment Details
      </button>
    </div>
  );
};`}</pre>
                </div>
            </section>
        </div>
    );
} 