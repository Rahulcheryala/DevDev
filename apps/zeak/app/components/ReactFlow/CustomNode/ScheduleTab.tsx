import React, { useState, useEffect } from "react";
import ScheduleOptions from "./ScheduleOptions";

type ScheduleType =
  | "immediate"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "interval";

interface TriggerActionData {
  name: string;
  dateTimeConfig: {
    startDateTime: string;
    endDateTime: string;
    indefinitelyRecurring: boolean;
    scheduleType: ScheduleType;
    scheduleDetails: {
      [key: string]: any;
    };
  };
  processingDetails: {
    runAsBackgroundProcess: boolean;
    runAsCriticalJob: boolean;
    runAsMultithreadJob: boolean;
    numberOfThreads: number;
    jobPriority: "Low" | "Medium" | "High";
  };
}

interface TriggerActionSchedulerProps {
  onSave: (data: TriggerActionData) => void;
}

const TriggerActionScheduler: React.FC<TriggerActionSchedulerProps> = ({
  onSave,
}) => {
  const [data, setData] = useState<TriggerActionData>({
    name: "",
    dateTimeConfig: {
      startDateTime: "",
      endDateTime: "",
      indefinitelyRecurring: false,
      scheduleType: "immediate",
      scheduleDetails: {},
    },
    processingDetails: {
      runAsBackgroundProcess: false,
      runAsCriticalJob: false,
      runAsMultithreadJob: false,
      numberOfThreads: 1,
      jobPriority: "Medium",
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [dateTimeConfigOpen, setDateTimeConfigOpen] = useState(true);
  const [processingDetailsOpen, setProcessingDetailsOpen] = useState(true);

  useEffect(() => {
    const validateForm = () => {
      const isNameValid = data.name.trim() !== "";
      const isStartDateTimeValid = !!data.dateTimeConfig.startDateTime;
      const isEndDateTimeValid =
        data.dateTimeConfig.indefinitelyRecurring ||
        !!data.dateTimeConfig.endDateTime;

      let isScheduleValid = true;
      if (data.dateTimeConfig.scheduleType !== "immediate") {
        // Add specific validation for each schedule type if needed
      }

      setIsFormValid(
        isNameValid &&
          isStartDateTimeValid &&
          isEndDateTimeValid &&
          isScheduleValid,
      );
    };

    validateForm();
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setData((prev) => {
      let newData = { ...prev };
      if (name === "name") {
        newData.name = value;
      } else if (name.startsWith("dateTimeConfig.")) {
        const key = name.split(".")[1];
        newData.dateTimeConfig = {
          ...newData.dateTimeConfig,
          [key]: type === "checkbox" ? checked : value,
        };
      } else if (name.startsWith("processingDetails.")) {
        const key = name.split(".")[1];
        newData.processingDetails = {
          ...newData.processingDetails,
          [key]: type === "checkbox" ? checked : value,
        };
      }
      return newData;
    });
  };

  const handleScheduleDetailsChange = (name: string, value: any) => {
    setData((prev) => ({
      ...prev,
      dateTimeConfig: {
        ...prev.dateTimeConfig,
        scheduleDetails: {
          ...prev.dateTimeConfig.scheduleDetails,
          [name]: value,
        },
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSave(data);
    }
  };

  const inputClassName =
    "mt-1 block w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500";

  return (
    <div className="p-6 max-w-[600px] mx-auto bg-gray-50 rounded-lg shadow w-full">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Comprehensive Trigger Action Scheduler
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </div>

        <div className="border border-gray-200 rounded-md">
          <button
            type="button"
            className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
            onClick={() => setDateTimeConfigOpen(!dateTimeConfigOpen)}
          >
            <span>Date and Time Configuration</span>
            <span>{dateTimeConfigOpen ? "▼" : "▶"}</span>
          </button>
          {dateTimeConfigOpen && (
            <div className="p-4 space-y-4">
              <div>
                <label
                  htmlFor="startDateTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date and Time
                </label>
                <input
                  type="datetime-local"
                  id="startDateTime"
                  name="dateTimeConfig.startDateTime"
                  value={data.dateTimeConfig.startDateTime}
                  onChange={handleChange}
                  className={inputClassName}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="endDateTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date and Time
                </label>
                <input
                  type="datetime-local"
                  id="endDateTime"
                  name="dateTimeConfig.endDateTime"
                  value={data.dateTimeConfig.endDateTime}
                  onChange={handleChange}
                  className={inputClassName}
                  disabled={data.dateTimeConfig.indefinitelyRecurring}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="indefinitelyRecurring"
                  name="dateTimeConfig.indefinitelyRecurring"
                  checked={data.dateTimeConfig.indefinitelyRecurring}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="indefinitelyRecurring"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Indefinitely recurring job
                </label>
              </div>
              <div>
                <label
                  htmlFor="scheduleType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Schedule Type
                </label>
                <select
                  id="scheduleType"
                  name="dateTimeConfig.scheduleType"
                  value={data.dateTimeConfig.scheduleType}
                  onChange={handleChange}
                  className={inputClassName}
                >
                  <option value="immediate">Run immediately</option>
                  <option value="daily">Run daily at a specific time</option>
                  <option value="weekly">
                    Run weekly on specific days at a specific time
                  </option>
                  <option value="monthly">
                    Run monthly on a specific date at a specific time
                  </option>
                  <option value="yearly">
                    Run yearly on a specific date at a specific time
                  </option>
                  <option value="interval">Run at regular intervals</option>
                </select>
              </div>
              <ScheduleOptions
                scheduleType={data.dateTimeConfig.scheduleType}
                scheduleDetails={data.dateTimeConfig.scheduleDetails}
                onChange={handleScheduleDetailsChange}
              />
            </div>
          )}
        </div>

        <div className="border border-gray-200 rounded-md">
          <button
            type="button"
            className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
            onClick={() => setProcessingDetailsOpen(!processingDetailsOpen)}
          >
            <span>Processing Details</span>
            <span>{processingDetailsOpen ? "▼" : "▶"}</span>
          </button>
          {processingDetailsOpen && (
            <div className="p-4 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="runAsBackgroundProcess"
                  name="processingDetails.runAsBackgroundProcess"
                  checked={data.processingDetails.runAsBackgroundProcess}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="runAsBackgroundProcess"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Run as background process
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="runAsCriticalJob"
                  name="processingDetails.runAsCriticalJob"
                  checked={data.processingDetails.runAsCriticalJob}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="runAsCriticalJob"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Run as critical job
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="runAsMultithreadJob"
                  name="processingDetails.runAsMultithreadJob"
                  checked={data.processingDetails.runAsMultithreadJob}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="runAsMultithreadJob"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Run as multithread job
                </label>
              </div>
              <div>
                <label
                  htmlFor="numberOfThreads"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of Threads
                </label>
                <input
                  type="number"
                  id="numberOfThreads"
                  name="processingDetails.numberOfThreads"
                  value={data.processingDetails.numberOfThreads}
                  onChange={handleChange}
                  className={inputClassName}
                  min="1"
                  disabled={!data.processingDetails.runAsMultithreadJob}
                />
              </div>
              <div>
                <label
                  htmlFor="jobPriority"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Priority
                </label>
                <select
                  id="jobPriority"
                  name="processingDetails.jobPriority"
                  value={data.processingDetails.jobPriority}
                  onChange={handleChange}
                  className={inputClassName}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 h-10 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isFormValid}
        >
          Save Configuration
        </button>
      </form>
    </div>
  );
};

export default TriggerActionScheduler;
