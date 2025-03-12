import { useUnifiedContext } from "../../../context";
import { useState } from "react";
import Image from "../../../../../components/Image";
import { PiSpinnerGap } from "react-icons/pi";
import { RiLoopRightLine } from "react-icons/ri";
import { FaPlug } from "react-icons/fa";
import { ZeakLogo } from "@zeak/icons";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

type TestStatus = {
  event: string;
  message: string;
  date: string;
  time: string;
  status: "progress" | "passed" | "failed";
};

export const TestConnection = () => {
  const { state } = useUnifiedContext();
  const [testStatuses, setTestStatuses] = useState<TestStatus[]>([
    {
      event: "Integration Test",
      message: "Testing in Progress",
      date: "24 Aug, 2024",
      time: "02:55 PM | CST",
      status: "progress",
    },
    {
      event: "Integration Test",
      message: "Test Complete",
      date: "24 Aug, 2024",
      time: "02:55 PM | CST",
      status: "passed",
    },
  ]);

  const status: TestStatus["status"] = "progress";

  const getStatusIcon = (status: TestStatus["status"]) => {
    if (status === "progress")
      return <PiSpinnerGap className="w-5 h-5 animate-spin text-white bg-gray-400 rounded-full p-0.5" />;
    if (status === "passed")
      return <IoIosCheckmarkCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />;
    if (status === "failed")
      return <IoIosCloseCircle className="w-6 h-6 text-red-500 bg-white rounded-full" />;
    return null;
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
                  src={state.integrationForm.logo}
                  alt={state.integrationForm.name}
                  className="w-full h-full rounded-full"
                />
                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full flex items-center justify-center">
                  {getStatusIcon(status)}
                </div>
              </div>
              <div className="text-center w-32">
                <p className="font-medium text-wrap">
                  {state.integrationForm.name}
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
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full">
                  {getStatusIcon(status)}
                </div>
              </div>
            </div>

            {/* OData */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center relative">
                <FaPlug className="w-8 h-8" />
                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full flex items-center justify-center">
                  {getStatusIcon(status)}
                </div>
              </div>
              <div className="text-center">
                <p className="font-medium">
                  {state.integrationForm.authentication}
                </p>
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
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full">
                  {getStatusIcon(status)}
                </div>
              </div>
            </div>

            {/* Zeak */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center relative p-3">
                <ZeakLogo />
                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full flex items-center justify-center">
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
        <button className="bg-gray-300 text-black px-6 py-3 rounded-lg inline-block">
          {status === "progress" ? (
            <div className="flex items-center gap-2">
              <PiSpinnerGap className="w-4 h-4 animate-spin" />
              Testing in Progress
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <RiLoopRightLine className="w-4 h-4" />
              Test Connection
            </div>
          )}
        </button>
      </div>

      {/* Testing Status */}
      <div className="px-10 mb-10">
        <div className="bg-[#F7F7F8] rounded-lg">
          {/* Test Status Table */}
          <div className="">
            <table className="w-full table-fixed">
              <thead className="text-left">
                <tr className="border-b-4 border-white bg-[#F0F4FD] rounded-t-lg">
                  <th className="py-4 px-6 font-medium w-1/3">Event</th>
                  <th className="py-4 px-6 font-medium w-1/3">Message</th>
                  <th className="py-4 px-6 font-medium w-1/3">Time</th>
                </tr>
              </thead>
              <tbody className="text-left">
                {testStatuses.map((status, index) => (
                  <tr key={index} className="bg-[#F8FAFE] border-b border-white divide-x divide-white">
                    <td className="py-4 px-6 w-1/3">{status.event}</td>
                    <td className="py-4 px-6 w-1/3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(status.status)}
                        {status.message}
                      </div>
                    </td>
                    <td className="py-2 px-6 w-1/3">
                      <div className="flex flex-col justify-center items-start gap-1">
                        <span>{status.date}</span>
                        <span className="text-textLink text-xs">
                          {status.time}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
