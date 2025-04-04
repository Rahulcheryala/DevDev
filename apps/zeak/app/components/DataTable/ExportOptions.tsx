import { Button, Popover, PopoverContent, PopoverTrigger } from "@zeak/react";
import { Pdf } from "./Pdf";
import { AllDataPdf } from "./AllDataPdf";
import { CSVLink } from "react-csv";
export const ExportOptions = ({data, currentPageData}:{data:any[], currentPageData:any[]}) => {
    return (
        <Popover>
            <PopoverTrigger >
                <div >Export</div>
            </PopoverTrigger>
            <PopoverContent className="rounded-zeak w-[200px] p-0 ">
                <div className="flex flex-col gap-2">
                    <CSVLink data={data} filename={"data.csv"}>
                        <Button>Export to CSV</Button>
                    </CSVLink>
                    <CSVLink data={currentPageData} filename={"current-page-data.csv"}>
                        <Button>Export Current Page Data</Button>
                    </CSVLink>
                    <Pdf currentPageData={currentPageData} />
                    <AllDataPdf data={data} />
                </div>
            </PopoverContent>
        </Popover>
    )
}