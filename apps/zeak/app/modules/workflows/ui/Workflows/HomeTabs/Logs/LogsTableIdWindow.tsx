// import { Hr } from "@react-email/components";
// import LoadingSpinner from "../../../LoadingSpinner";
// import moment from "moment";

// import ReactJson from 'react-json-view'

// const testJsonData = [
//   {
//     value: [
//       {
//         BOMId: "BOM12345",
//         Barcode: "123456789012",
//         NGPCode: 12345,
//         RouteId: "Route001",
//         CFOPCode: "CFOP123",
//         ProjectId: "Proj001",
//         ItemNumber: "M0005",
//         LineAmount: 198375.2,
//         LineNumber: 1,
//         UnitWeight: 0.0,
//         dataAreaId: "usmf",
//         "Codata.etag": "W/AJzAsNTYzNZEONjA3Nj",
//         Tax1099Type: "F1099MISC",
//         Tax1099BoxId: "MISC-07",
//         GSTHSTTaxType: "None",
//         IsLineStopped: "No",
//         OriginStateId: "State001",
//         ProductSizeId: "Size001",
//         PurchasePrice: 79.99,
//         Tax1099Amount: 0.0,
//         BarCodeSetupId: "Setup001",
//         ProductColorId: "Color001",
//         ProductStyleId: "Style001",
//         Tax1099StateId: "State002",
//         IntrastatPortId: "Port001",
//         IsNewFixedAsset: "No",
//         ItemBatchNumber: "Batch001",
//         LineDescription: "Enclosure",
//         ReceivingSiteId: "1",
//         Tax1099GTaxYear: 2024,
//         FixedAssetNumber: "FixedAsset001",
//         ProductVersionId: "Version001",
//       },
//     ],
//   },
// ];
// export const LogsTableIdWindow = (props: any) => {
//   console.log(props);
//   const formatJsonData = (data: any) => {
//     return JSON.stringify(data, null, 2); // Format JSON with indentation
//   };

//   const sideBarData = {} as any;
// const [sideBarData, setSideBarData] = useState<any>({});

// const createGetRequest = async (url: any, body_data?: any) => {
//   try {
//     const { data } = await axios.get(url);
//     console.log(data, "setSideBarData(transformData(data.data))");
//     setSideBarData(data);
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// const convertTimestampToReadableFormat = (timestamp: string): string => {
//   return moment(timestamp).format("MMMM D, YYYY, h:mm:ss A");
// };

// useEffect(() => {
//   console.log(runId, "selectedDetails.runId");
//   createGetRequest(
//     `https://2df4-2405-201-6823-f82a-9960-de9b-9743-e969.ngrok-free.app/get-run?runId=${runId}`
//   );
// }, [runId]);

import { Hr } from "@react-email/components";
import LoadingSpinner from "../../../LoadingSpinner";
import { useEffect, useState } from "react";
import { Enumerable } from "@zeak/react";
import { useActionData } from "@remix-run/react";

interface Props {
  details: any;
  totalRecords: number | undefined;
}
export const LogsTableIdWindow = ({ details, totalRecords }: Props) => {
  // console.log(props);
  const [media, setMedia] = useState<string>("one");
  const [isHidden, setIsHidden] = useState<string>("hidden");

  // Use useEffect to update the isHidden state based on logs.totalRecords
  useEffect(() => {
    if (totalRecords !== undefined) {
      setIsHidden("");
    } else {
      setIsHidden("hidden");
    }
  }, [totalRecords]); // Update whenever logs.totalRecords changes

  // Fetch the data returned from the server action
  const actionData = useActionData();
  console.log(JSON.stringify(actionData));

  const handleMediaChange = (value: string) => {
    setMedia(value);
  };

  const formatJsonData = (data: any) => {
    return JSON.stringify(data, null, 2); // Format JSON with indentation
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="flex gap-[60px] text-[#050607] mb-3">
        <div className="w-1/5 flex flex-col items-center gap-2">
          <span>Status</span>
          {(details.status === "Running" && (
            <p className="flex flex-row gap-2 align-middletext-black">
              <h3>
                <Enumerable className="text-xs" value={"Running"}></Enumerable>
              </h3>
              <LoadingSpinner size={6} />
            </p>
          )) || (
            <h3 className="text-xs">
              <Enumerable
                className="text-xs"
                value={details.status}
              ></Enumerable>
            </h3>
          )}
        </div>
        <div className="w-1/5 flex flex-col gap-2 items-center">
          <h3>Started</h3>
          <h5 className="text-xs text-black">
            {details.logs?.startedAt
              ? new Date(details.logs?.startedAt).toLocaleString("default", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "NaN"}
          </h5>
        </div>
        <div className="w-1/5 flex flex-col gap-2 items-center">
          <h3>Duration </h3>
          <h5 className="text-xs text-black">{details.duration}</h5>
        </div>
        <div className="w-1/5 flex flex-col gap-2 items-center ">
          <h3>Run No </h3>{" "}
          <h5 className="text-xs text-black">
            {actionData?.tasks.find(
              (task: any) => task.id === details.logs.taskIdentifier,
            )!.noOfRuns || "Loading..."}
          </h5>
        </div>
      </div>
      <Hr />
      <section className="min-h-[60vh] py-8 px-4 space-y-8">
        <h2 className="font-bold text-primary-content text-2xl tracking-tight mb-4">
          Task Details
        </h2>
        <div className="grid grid-cols-1 gap-8">
          <div className="border border-gray-300 rounded-lg">
            <button
              onClick={() => handleMediaChange("one")}
              className="w-full p-4 text-left text-lg font-medium focus:outline-none"
            >
              1. Task Overview
            </button>
            {media === "one" && (
              <div className="p-4 text-primary-content/70 font-thin">
                <p>Task Identifier: {details.logs.taskIdentifier}</p>
                <p className={isHidden}>
                  Total Records: {details.logs.totalRecords}
                </p>
                <p className={isHidden}>
                  Total Successful Rows:{" "}
                  {(details.logs.successfulRows !== 0 &&
                    details.logs.successfulRows) ||
                    0}
                </p>
                <p className={isHidden}>
                  Total Failed Rows: {details.logs.failedRows}
                </p>
              </div>
            )}
          </div>
          <div className="border border-gray-300 rounded-lg">
            <button
              onClick={() => handleMediaChange("two")}
              className="w-full p-4 text-left text-lg font-medium focus:outline-none"
            >
              2. Performance Metrics
            </button>
            {media === "two" && (
              <div className="p-4 text-primary-content/70 font-thin">
                <p>
                  Total Compute Duration:{" "}
                  {(details.logs.totalComputeDuration !== 0 &&
                    details.logs.totalComputeDuration) ||
                    0}{" "}
                  ms
                </p>
                <p className={isHidden}>
                  Successful Rows in Current Batch:{" "}
                  {(details.logs.successfulRowsInBatch !== 0 &&
                    details.logs.successfulRowsInBatch) ||
                    0}
                </p>
                <p className={isHidden}>
                  Failed Rows in Current Batch:{" "}
                  {details.logs.failedRowsInBatch ?? 0}
                </p>
              </div>
            )}
          </div>
          <div className="border border-gray-300 rounded-lg">
            <button
              onClick={() => handleMediaChange("three")}
              className="w-full p-4 text-left text-lg font-medium focus:outline-none"
            >
              3. Logs and Debugging Information
            </button>
            {media === "three" && (
              <div className="p-4 text-primary-content/70 font-thin">
                <pre className="text-black bg-[#F6F8FA] p-4 rounded text-xs font-mono">
                  {formatJsonData(details)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </section>
      <Hr />
    </div>
  );
};
