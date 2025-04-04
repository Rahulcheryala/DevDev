import { Button, VStack } from "@zeak/react";
import type { TabPros } from "./types";
import type { LabelsReports } from "~/modules/labelsreports";
import {
  LabelsReportsTable,
  LabelsReportsTableFilters,
  labelViewMode,
} from "~/modules/labelsreports";
import LabelsReportsGridCard from "~/modules/labelsreports/ui/Label/LabelsReportsGridCard";
import Templates from "./Templates";
import * as XLSX from "xlsx";
// import { Select } from "~/components";
// import { DebouncedInput } from "~/components/Search";
// import {
//   WebAngleDown,
//   WebDownload,
//   WebReload,
//   WebTrashcan,
//   WebUpload,
// } from "@zeak/icons";
// import { Filter } from "~/components/Table/components/Filter";

export default function Dashboard({
  LRList,
  viewMode,
  quickCreateList,
  onSeeAllClick,
  LRColDetails,
  // onSaveViewClick,
  // latestView,
  labelsCount,
}: TabPros & {
  quickCreateList: Array<LabelsReports>;
  onSeeAllClick: any;
  // onSaveViewClick: any;
  // latestView: any;
  labelsCount: number;
  LRColDetails: any;
}) {
  const download = (filename = "data.xlsx") => {
    const workbook = XLSX.utils.book_new();
    const res = [];
    const meta = LRColDetails.reduce(
      (acc: any, item: any) => {
        acc[0][item.columnName] = item.dataType;
        acc[1][item.columnName] = item.isRequired ? "required" : "optional";
        return acc;
      },
      [{}, {}],
    );
    res.push(...meta);
    res.push({});
    res.push(...LRList);
    const worksheet = XLSX.utils.json_to_sheet(res);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, filename);
  };

  const templateDownload = (filename = "template.xlsx") => {
    const workbook = XLSX.utils.book_new();
    const res = [];
    const meta = LRColDetails.reduce(
      (acc: any, item: any) => {
        acc[0][item.columnName] = item.dataType;
        acc[1][item.columnName] = item.isRequired ? "required" : "optional";
        return acc;
      },
      [{}, {}],
    );
    res.push(...meta);
    const worksheet = XLSX.utils.json_to_sheet(res);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, filename);
  };

  return (
    <>
      <div className="bg-[#FAFAFA] rounded-md p-[20px]">
        <div className="flex items-center justify-between pb-[10px] border-b">
          <h2 className="text-base text-[#141527] tracking-wider">
            Quick create
          </h2>
          <Button
            className="font-light text-sm leading-[20px] text-[#5E626D] hover:bg-transparent p-0"
            variant="ghost"
            onClick={onSeeAllClick}
          >
            See all
          </Button>
        </div>
        <Templates LRList={quickCreateList} showAction={false} />
        {/* <div className="flex flex-wrap mx-[-20px]">
          <div className="2xl:w-1/5 xl:w-1/4 px-[20px] mt-[40px]">
            <Card>
              <CardContent className="p-0">
                <div className="w-full h-[208px] bg-[#FAFAFA] border-b border-[#E5E7EB] flex items-center justify-center py-[34px] px-[24px] rounded-tl-lg rounded-tr-lg">
                  <img
                    src="https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-[24px]">
                  <span className="text-sm tracking-wider leading-[20px] block font-light text-secondary mb-[8px]">
                    <span className="text-[#DC0073] inline-block">Label</span> |{" "}
                    <span>2 x 4 inch</span>
                  </span>
                  <h3 className="text-accent text-sm leading-[20px] tracking-wider truncate">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </h3>
                  <div className="flex items-center justify-between mt-[8px]">
                    <p className="text-[#8A8A8F] text-[12px] leading-[16px] tracking-wider">
                      25 Nov, 2023
                    </p>
                    <Tags variant="default">Draft</Tags>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="2xl:w-1/5 xl:w-1/4 px-[20px] mt-[40px]">
            <Card>
              <CardContent className="p-0">
                <div className="w-full h-[208px] bg-[#FAFAFA] border-b border-[#E5E7EB] flex items-center justify-center py-[34px] px-[24px] rounded-tl-lg rounded-tr-lg">
                  <img
                    src="https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-[24px]">
                  <span className="text-sm tracking-wider leading-[20px] block font-light text-secondary mb-[8px]">
                    <span className="text-[#DC0073] inline-block">Label</span> |{" "}
                    <span>2 x 4 inch</span>
                  </span>
                  <h3 className="text-accent text-sm leading-[20px] tracking-wider truncate">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </h3>
                  <div className="flex items-center justify-between mt-[8px]">
                    <p className="text-[#8A8A8F] text-[12px] leading-[16px] tracking-wider">
                      25 Nov, 2023
                    </p>
                    <Tags variant="default">Draft</Tags>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="2xl:w-1/5 xl:w-1/4 px-[20px] mt-[40px]">
            <Card>
              <CardContent className="p-0">
                <div className="w-full h-[208px] bg-[#FAFAFA] border-b border-[#E5E7EB] flex items-center justify-center py-[34px] px-[24px] rounded-tl-lg rounded-tr-lg">
                  <img
                    src="https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-[24px]">
                  <span className="text-sm tracking-wider leading-[20px] block font-light text-secondary mb-[8px]">
                    <span className="text-[#DC0073] inline-block">Label</span> |{" "}
                    <span>2 x 4 inch</span>
                  </span>
                  <h3 className="text-accent text-sm leading-[20px] tracking-wider truncate">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </h3>
                  <div className="flex items-center justify-between mt-[8px]">
                    <p className="text-[#8A8A8F] text-[12px] leading-[16px] tracking-wider">
                      25 Nov, 2023
                    </p>
                    <Tags variant="default">Draft</Tags>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="2xl:w-1/5 xl:w-1/4 px-[20px] mt-[40px]">
            <Card>
              <CardContent className="p-0">
                <div className="w-full h-[208px] bg-[#FAFAFA] border-b border-[#E5E7EB] flex items-center justify-center py-[34px] px-[24px] rounded-tl-lg rounded-tr-lg">
                  <img
                    src="https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-[24px]">
                  <span className="text-sm tracking-wider leading-[20px] block font-light text-secondary mb-[8px]">
                    <span className="text-[#DC0073] inline-block">Label</span> |{" "}
                    <span>2 x 4 inch</span>
                  </span>
                  <h3 className="text-accent text-sm leading-[20px] tracking-wider truncate">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </h3>
                  <div className="flex items-center justify-between mt-[8px]">
                    <p className="text-[#8A8A8F] text-[12px] leading-[16px] tracking-wider">
                      25 Nov, 2023
                    </p>
                    <Tags variant="default">Draft</Tags>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="2xl:w-1/5 xl:w-1/4 px-[20px] mt-[40px]">
            <Card>
              <CardContent className="p-0">
                <div className="w-full h-[208px] bg-[#FAFAFA] border-b border-[#E5E7EB] flex items-center justify-center py-[34px] px-[24px] rounded-tl-lg rounded-tr-lg">
                  <img
                    src="https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-[24px]">
                  <span className="text-sm tracking-wider leading-[20px] block font-light text-secondary mb-[8px]">
                    <span className="text-[#DC0073] inline-block">Label</span> |{" "}
                    <span>2 x 4 inch</span>
                  </span>
                  <h3 className="text-accent text-sm leading-[20px] tracking-wider truncate">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </h3>
                  <div className="flex items-center justify-between mt-[8px]">
                    <p className="text-[#8A8A8F] text-[12px] leading-[16px] tracking-wider">
                      25 Nov, 2023
                    </p>
                    <Tags variant="default">Draft</Tags>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div> */}
      </div>

      <VStack spacing={0} className="mt-[60px]">
        <div className="flex items-center justify-between pb-[10px] border-b mb-[20px] w-full">
          <h2 className="text-base text-[#141527] tracking-wider">Recents</h2>
          <Button
            className="font-light text-sm leading-[20px] text-[#5E626D] hover:bg-transparent p-0"
            variant="ghost"
          >
            See all
          </Button>
        </div>
      </VStack>
      <LabelsReportsTableFilters
        onDownload={() => download()}
        onTemplateDownload={() => templateDownload()}
        // onSaveViewClick={onSaveViewClick}
      />

      {viewMode === labelViewMode.List ? (
        <LabelsReportsTable
          data={LRList}
          colDetails={LRColDetails}
          count={labelsCount}
        />
      ) : (
        <LabelsReportsGridCard data={LRList} count={LRList?.length || 0} />
      )}
    </>
  );
}
