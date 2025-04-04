import { Table, Image, Button } from "@zeak/ui";
import { DateTableCell } from "@zeak/datatable";
import { useUnifiedContext } from "../../../context";
// icons
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { PiSpinnerGap } from "react-icons/pi";
import { RiLoopRightLine } from "react-icons/ri";
import { FaPlug } from "react-icons/fa";

type TestStatus = {
  event: string;
  message: string;
  date: string;
  status: "progress" | "passed" | "failed";
};

export const TestConnection = () => {
  const { state: { selectedIntegration } } = useUnifiedContext();
  const testStatuses: TestStatus[] = [
    {
      event: "Integration Test",
      message: "Testing in Progress",
      date: "2025-03-25 00:53:32.469966+00",
      status: "progress",
    },
    {
      event: "Integration Test",
      message: "Test Complete",
      date: "2025-03-25 20:07:03.126+00",
      status: "passed",
    },
    {
      event: "Integration Test",
      message: "Test Complete",
      date: "2025-03-26 11:00:35.767+00",
      status: "failed",
    },
  ];

  const ZeakLogo = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="92"
        height="24"
        viewBox="0 0 92 24"
        fill="none"
      >
        <path
          d="M0 21.668 12.677 4.042H.617V-.003h18.588v2.329L6.46 19.952h12.402v4.045H0zm24.805 1.44q-.924-.892-.922-2.329V-.003h18.246V4.11H28.597v5.553h12.506v4.112H28.597v6.105h13.532v4.112h-14.93q-1.467.002-2.394-.889zm36.449-4.7h-8.952l-2.12 5.59h-4.921l9.36-24h2.12c1.478 0 2.485.685 3.004 2.058l8.507 21.947H63.33l-2.082-5.59zm-7.688-3.978h6.423l-3.174-8.64h-.036zm32.694 9.567-7.89-10.082-2.29 2.47v7.612h-4.714v-24h4.714v10.358L85.576-.003h5.807l-9.837 10.53L92 24.002h-5.74z"
          fill="#31384D"
        />
        <path
          d="M0 21.668 15.584-.002h3.615v2.328L3.529 23.997H0z"
          fill="#8599D1"
        />
      </svg>
    );
  };

  const status: TestStatus["status"] = "progress";

  const getStatusIcon = (status: TestStatus["status"]) => {
    if (status === "progress")
      return (
        <PiSpinnerGap className="w-5 h-5 animate-spin text-white rounded-full p-0.5" />
      );
    if (status === "passed")
      return (
        <IoIosCheckmarkCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
      );
    if (status === "failed")
      return (
        <IoIosCloseCircle className="w-6 h-6 text-red-500 bg-white rounded-full" />
      );
    return null;
  };

  // Define table headers
  const tableHeaders = [
    { key: "event", label: "Event", width: "33%" },
    { key: "message", label: "Message", width: "33%" },
    { key: "dateTime", label: "Time", width: "33%" },
  ];

  // Map test statuses to table rows
  const tableRows = testStatuses.map((status) => ({
    event: status.event,
    message: status.message,
    dateTime: status.date,
    status: status.status,
  }));

  // Custom cell renderer
  const renderCell = (key: string, value: any, row: Record<string, any>) => {
    if (key === "message") {
      return (
        <div className="flex items-center gap-2">
          <span className="bg-gray-400 rounded-full">
            {getStatusIcon(row.status)}
          </span>
          {value}
        </div>
      );
    }

    if (key === "dateTime") {
      return (
        <DateTableCell
          date={value}
          timeZone="America/Chicago"
          className="p-0"
        />
      );
    }

    return value;
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Connection Flow Visualization */}
      <div className="px-10 pt-6">
        <div className="bg-[#F7F7F8] rounded-xl px-20 py-32">
          <div className="flex items-start justify-between">
            {/* Integration name */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center relative">
                <Image
                  src={selectedIntegration?.logo}
                  alt={selectedIntegration?.integrationName!}
                  className="w-16 h-16 rounded-full"
                />
                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full flex items-center justify-center bg-gray-400">
                  {getStatusIcon(status)}
                </div>
              </div>
              <div className="text-center w-32">
                <p className="font-medium text-wrap">
                  {selectedIntegration?.integrationName}
                </p>
                <p className="text-xs text-textLink">YOUR PLATFORM</p>
              </div>
            </div>

            {/* Connection Line 1 */}
            <div className="flex-1 mr-3 mt-12">
              <div
                className={`h-4 border-t-4 relative ${
                  status === "progress"
                    ? "border-dashed border-gray-300"
                    : status === "passed"
                      ? "border-solid border-green-500"
                      : status === "failed"
                        ? "border-solid border-red-500"
                        : "border-solid border-gray-300"
                }`}
              >
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400">
                  {getStatusIcon(status)}
                </div>
              </div>
            </div>

            {/* OData */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center relative">
                <FaPlug className="w-8 h-8" />
                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full flex items-center justify-center bg-gray-400">
                  {getStatusIcon(status)}
                </div>
              </div>
              <div className="text-center">
                <p className="font-medium">{selectedIntegration?.authType.replace(/_/g, " ")}</p>
                <p className="text-xs text-textLink">BRIDGE</p>
              </div>
            </div>

            {/* Connection Line 2 */}
            <div className="flex-1 ml-3 mt-12">
              <div
                className={`h-4 border-t-4 relative ${
                  status === "progress"
                    ? "border-dashed border-gray-300"
                    : status === "passed"
                      ? "border-solid border-green-500"
                      : status === "failed"
                        ? "border-solid border-red-500"
                        : "border-solid border-gray-300"
                }`}
              >
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400">
                  {getStatusIcon(status)}
                </div>
              </div>
            </div>

            {/* Zeak */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center relative p-3">
                <ZeakLogo />
                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full flex items-center justify-center bg-gray-400">
                  {getStatusIcon(status)}
                </div>
              </div>
              <div className="text-center">
                <p className="font-medium">Zeak</p>
                <p className="text-xs text-textLink">INTEGRATION MANAGER</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto">
        <Button
          isLoading={status === "progress"}
          className="bg-[#D3DFE8] rounded-md py-3 px-6 h-14 text-base font-medium text-[#475467]"
          onClick={() => {}}
          spinner={getStatusIcon(status)}
          spinnerClassName="scale-125 mr-1"
          leftIcon={<RiLoopRightLine className="w-5 h-5" />}
        >
          {status === "progress"
            ? "Testing in Progress"
            : "Test Connection"}
        </Button>
      </div>

      {/* Testing Status */}
      <div className="px-10 mb-10">
        <Table
          headers={tableHeaders}
          rows={tableRows}
          renderCell={renderCell}
          showDividers={true}
          isRounded={true}
          containerClassName="bg-[#F7F7F8] rounded-lg"
          headerClassName="bg-[#F0F4FD] rounded-t-lg"
          rowClassName="bg-[#F8FAFE]"
        />
      </div>
    </div>
  );
};
