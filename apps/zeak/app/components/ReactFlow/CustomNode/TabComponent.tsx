import { useState } from "react";
import EventTab from "./EventTab";
import CustomEventTab from "./CustomEventTab";

const TabComponent = ({
  setNewCustomData,
  CategoryId,
  type,
  initialData,
  tables,
  setIsNextDisabled,
}: {
  setNewCustomData: any;
  CategoryId: any;
  type: any;
  initialData: any;
  tables?: any;
  setIsNextDisabled: any;
}) => {
  const [activeTab, setActiveTab] = useState("events");
  const [customData, setCustomData] = useState<any>(initialData);

  const tabs = [
    { id: "events", label: "Events" },
    // { id: 'schedule', label: 'Schedule' },
    // { id: 'interval', label: 'Interval' },
  ];

  const handleSetCustomData = (data: any) => {
    // setCustomData((prev: any) => ({
    //   ...prev,
    //   ...data,
    // }));

    setCustomData({
      // id: nanoid(),
      // category_id: CategoryId,
      // type_id: nanoid(),
      // type: type,
      ...data,
    });
  };

  const handleSaveCustomData = () => {
    setNewCustomData(customData);
    setIsNextDisabled(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "events":
        return type === "trigger" ? (
          <EventTab
            CustomData={customData}
            setCustomData={handleSetCustomData}
            tables={tables}
            type={type}
          />
        ) : (
          <CustomEventTab
            CustomData={customData}
            setCustomData={handleSetCustomData}
            tables={tables}
            type={type}
          />
        );
      // case 'schedule':
      //   return <ScheduleTab />;
      // case 'interval':
      //   return <div>Interval content goes here</div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-2 px-4 text-sm font-medium text-center focus:outline-none ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="my-2 p-4">{renderContent()}</div>
      <button
        onClick={handleSaveCustomData}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        save
      </button>
    </div>
  );
};

export default TabComponent;
