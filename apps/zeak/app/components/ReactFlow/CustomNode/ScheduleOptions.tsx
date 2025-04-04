import React from "react";

type ScheduleType =
  | "immediate"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "interval";

interface ScheduleOptionsProps {
  scheduleType: ScheduleType;
  scheduleDetails: {
    [key: string]: any;
  };
  onChange: (name: string, value: any) => void;
}

const ScheduleOptions: React.FC<ScheduleOptionsProps> = ({
  scheduleType,
  scheduleDetails,
  onChange,
}) => {
  const inputClassName =
    "mt-1 block w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500";

  const labelClassName = "block text-sm font-medium text-gray-700 mb-1";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    onChange(name, newValue);
  };

  switch (scheduleType) {
    case "daily":
      return (
        <div>
          <label htmlFor="dailyTime" className={labelClassName}>
            Daily Time
          </label>
          <input
            type="time"
            id="dailyTime"
            name="dailyTime"
            value={scheduleDetails.dailyTime || ""}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />
        </div>
      );
    case "weekly":
      return (
        <>
          <div className="mb-4">
            <p className={labelClassName}>Days of Week</p>
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <div key={day} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`weekday-${day}`}
                  name={`weeklyDays.${day}`}
                  checked={scheduleDetails.weeklyDays?.[day] || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`weekday-${day}`}
                  className="ml-2 block text-sm text-gray-900"
                >
                  {day}
                </label>
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="weeklyTime" className={labelClassName}>
              Weekly Time
            </label>
            <input
              type="time"
              id="weeklyTime"
              name="weeklyTime"
              value={scheduleDetails.weeklyTime || ""}
              onChange={handleInputChange}
              className={inputClassName}
              required
            />
          </div>
        </>
      );
    case "monthly":
      return (
        <>
          <div>
            <label htmlFor="monthlyDate" className={labelClassName}>
              Day of Month (1-31)
            </label>
            <input
              type="number"
              id="monthlyDate"
              name="monthlyDate"
              value={scheduleDetails.monthlyDate || ""}
              onChange={handleInputChange}
              className={inputClassName}
              required
              min="1"
              max="31"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="monthlyTime" className={labelClassName}>
              Time
            </label>
            <input
              type="time"
              id="monthlyTime"
              name="monthlyTime"
              value={scheduleDetails.monthlyTime || ""}
              onChange={handleInputChange}
              className={inputClassName}
              required
            />
          </div>
        </>
      );
    case "yearly":
      return (
        <>
          <div>
            <label htmlFor="yearlyDate" className={labelClassName}>
              Date (MM-DD)
            </label>
            <input
              type="date"
              id="yearlyDate"
              name="yearlyDate"
              value={scheduleDetails.yearlyDate || ""}
              onChange={handleInputChange}
              className={inputClassName}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="yearlyTime" className={labelClassName}>
              Time
            </label>
            <input
              type="time"
              id="yearlyTime"
              name="yearlyTime"
              value={scheduleDetails.yearlyTime || ""}
              onChange={handleInputChange}
              className={inputClassName}
              required
            />
          </div>
        </>
      );
    case "interval":
      return (
        <>
          <div>
            <label htmlFor="intervalValue" className={labelClassName}>
              Interval Value
            </label>
            <input
              type="number"
              id="intervalValue"
              name="intervalValue"
              value={scheduleDetails.intervalValue || ""}
              onChange={handleInputChange}
              className={inputClassName}
              required
              min="1"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="intervalUnit" className={labelClassName}>
              Interval Unit
            </label>
            <select
              id="intervalUnit"
              name="intervalUnit"
              value={scheduleDetails.intervalUnit || ""}
              onChange={handleInputChange}
              className={inputClassName}
              required
            >
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
            </select>
          </div>
        </>
      );
    case "immediate":
      return null; // No additional options for immediate schedule
    default:
      return (
        <p className="text-sm text-red-600">
          Unsupported schedule type: {scheduleType}
        </p>
      );
  }
};

export default ScheduleOptions;
