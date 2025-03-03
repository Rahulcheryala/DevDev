import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  name?: string;
  initialDate?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  name = 'date',
  initialDate = new Date(),
  onChange,
  className = '',
  disabled = false,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [inputValue, setInputValue] = useState<string>(formatDate(initialDate));
  const [showMonthPicker, setShowMonthPicker] = useState<boolean>(false);
  const [showYearPicker, setShowYearPicker] = useState<boolean>(false);
  const [yearRangeStart, setYearRangeStart] = useState<number>(new Date().getFullYear() - 5);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isValidDate, setIsValidDate] = useState<boolean>(true);
  const calendarRef = useRef<HTMLDivElement>(null);

  const months: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek: string[] = ["S", "M", "T", "W", "T", "F", "S"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isValidDate) {
      onChange?.(selectedDate);
    }
  }, [selectedDate, onChange, isValidDate]);

  const validateDate = (dateString: string): boolean => {
    // Allow empty input
    if (!dateString.trim()) return true;

    // Check format MM/DD/YYYY
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!regex.test(dateString)) return false;

    const [month, day, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return date.getMonth() === month - 1 &&
      date.getDate() === day &&
      date.getFullYear() === year;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Handle backspace and deletion
    if (value === '') {
      setIsValidDate(true);
      return;
    }

    // Auto-format as user types
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      let formatted = '';
      if (numbers.length > 0) formatted += numbers.slice(0, 2);
      if (numbers.length > 2) formatted += '/' + numbers.slice(2, 4);
      if (numbers.length > 4) formatted += '/' + numbers.slice(4, 8);

      setInputValue(formatted);
    }

    const isValid = validateDate(value);
    setIsValidDate(isValid);

    if (isValid && value.length === 10) {
      const [month, day, year] = value.split('/').map(Number);
      const newDate = new Date(year, month - 1, day);
      setSelectedDate(newDate);
      setCurrentDate(newDate);
    }
  };

  const handleInputBlur = () => {
    if (!isValidDate || !inputValue) {
      setInputValue(formatDate(selectedDate));
      setIsValidDate(true);
    }
  };

  const getMonthDays = (date: Date): (number | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handleDateClick = (day: number | null) => {
    if (day) {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(newDate);
      setInputValue(formatDate(newDate));
      setIsValidDate(true);
      setIsOpen(false);
    }
  };

  const handleMonthChange = (monthIndex: number) => {
    const newDate = new Date(currentDate.getFullYear(), monthIndex, 1);
    setCurrentDate(newDate);
    setShowMonthPicker(false);
  };

  const handleYearChange = (year: number) => {
    const newDate = new Date(year, currentDate.getMonth(), 1);
    setCurrentDate(newDate);
    setShowYearPicker(false);
  };

  const generateYears = (): number[] => {
    return Array.from({ length: 12 }, (_, i) => yearRangeStart + i);
  };

  const navigateMonth = (increment: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1);
    setCurrentDate(newDate);
  };

  const navigateYearRange = (increment: number) => {
    setYearRangeStart(yearRangeStart + (increment * 12));
  };

  const toggleMonthYearPicker = (picker: 'month' | 'year') => {
    if (picker === 'month') {
      setShowMonthPicker(true);
      setShowYearPicker(false);
    } else {
      setShowYearPicker(true);
      setShowMonthPicker(false);
      const currentYear = currentDate.getFullYear();
      setYearRangeStart(currentYear - 5);
    }
  };

  function formatDate(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  return (
    <div className={`relative w-full ${className}`} ref={calendarRef}>
      <div className="relative">
        <input
          type="text"
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          disabled={disabled}
          className={`w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 
            ${isValidDate ? 'focus:ring-blue-500 border-gray-300' : 'focus:ring-red-500 border-red-500'}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          placeholder="MM/DD/YYYY"
        />
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 
            ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <Calendar size={20} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-64">
          {/* Rest of the calendar popup JSX remains the same */}
          <div className="bg-white rounded-lg shadow p-4">
            {!showMonthPicker && !showYearPicker ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <button
                    type="button"
                    onClick={() => navigateMonth(-1)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    &lt;
                  </button>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => toggleMonthYearPicker('month')}
                      className="text-gray-800 font-medium hover:bg-gray-100 px-2 py-1 rounded"
                    >
                      {months[currentDate.getMonth()]}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleMonthYearPicker('year')}
                      className="text-gray-800 font-medium hover:bg-gray-100 px-2 py-1 rounded"
                    >
                      {currentDate.getFullYear()}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateMonth(1)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    &gt;
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {daysOfWeek.map((day, index) => (
                    <div key={index} className="text-center text-sm font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                  {getMonthDays(currentDate).map((day, index) => (
                    <button
                      type="button"
                      key={index}
                      className={`
                        text-center p-1 text-sm cursor-pointer
                        ${day ? 'hover:bg-gray-100' : ''}
                        ${day === selectedDate.getDate() &&
                          currentDate.getMonth() === selectedDate.getMonth() &&
                          currentDate.getFullYear() === selectedDate.getFullYear()
                          ? 'bg-blue-100 rounded-full'
                          : ''
                        }
                      `}
                      onClick={() => handleDateClick(day)}
                      disabled={!day}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </>
            ) : showMonthPicker ? (
              <div className="grid grid-cols-3 gap-2">
                {months.map((month, index) => (
                  <button
                    type="button"
                    key={month}
                    onClick={() => handleMonthChange(index)}
                    className="p-2 text-sm hover:bg-gray-100 rounded"
                  >
                    {month.slice(0, 3)}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <button
                    type="button"
                    onClick={() => navigateYearRange(-1)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    &lt;
                  </button>
                  <span className="text-sm font-medium">
                    {yearRangeStart} - {yearRangeStart + 11}
                  </span>
                  <button
                    type="button"
                    onClick={() => navigateYearRange(1)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    &gt;
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {generateYears().map((year) => (
                    <button
                      type="button"
                      key={year}
                      onClick={() => handleYearChange(year)}
                      className={`
                        p-2 text-sm hover:bg-gray-100 rounded
                        ${year === currentDate.getFullYear() ? 'bg-blue-100' : ''}
                      `}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;