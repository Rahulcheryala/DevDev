import { Button, IconButton } from "@zeak/react";
// import { GrRefresh, GrSave } from "react-icons/gr";
// import { HiOutlineSquares2X2 } from "react-icons/hi2";
// import { IoListOutline } from "react-icons/io5";
import { TableFilters } from "~/components/Layout";
import { DebouncedInput } from "~/components/Search";
// import { usePermissions, useUrlParams } from "~/hooks";
// import { path } from "~/utils/path";
// import {
//   labelStatusType,
//   labelType,
//   // labelViewMode,
// } from "../../labelsreports.model";
import {
  WebAngleDown,
  WebDownload,
  WebReload,
  WebSearch,
  WebTrashcan,
  WebUpload,
} from "@zeak/icons";
import View from "~/components/View";

const LabelsReportsTableFilters = (props: {
  onSaveViewClick?: any;
  onDownload?: any;
  onTemplateDownload?: any;
}) => {
  // const [params, setParams] = useUrlParams();
  // const permissions = usePermissions();

  // const statusOptions = labelStatusType.map((status) => ({
  //   label: status,
  //   value: status,
  // }));

  // const labelTypeOptions = labelType.map((type) => ({
  //   label: type,
  //   value: type,
  // }));

  return (
    <TableFilters className="p-0 mb-[16px] border-0">
      {/* <HStack className="p-0">
        <DebouncedInput
          param="name"
          placeholder="Name"
          className="h-[40px] w-[300px] placeholder:text-secondary text-accent text-sm pl-[40px] pr-[16px] "
        />
        <Select
          size="md"
          value={params.get("labelType") ?? ""}
          isClearable
          options={labelTypeOptions}
          onChange={(selected) => {
            setParams({ labelType: selected });
          }}
          aria-label="Label Type"
          placeholder="Label Type"
          className="h-[40px] rounded-md"
        />
        <Select
          size="md"
          value={params.get("status") ?? ""}
          isClearable
          options={statusOptions}
          onChange={(selected) => {
            setParams({ status: selected });
          }}
          aria-label="Status"
          placeholder="Status"
          className="h-[40px] rounded-md"
        />
      </HStack>
      <HStack className="p-0">
        <Button
          variant={"ghost"}
          className="text-sm leading-[20px] font-light text-accent mr-[20px] hover:bg-transparent"
          leftIcon={<GrSave size={20} />}
          onClick={onSaveViewClick}
        >
          Save View
        </Button>
        <Button
          variant={"ghost"}
          className="text-sm leading-[20px] font-light text-accent mr-[20px] hover:bg-transparent"
          leftIcon={<GrRefresh size={20} />}
        >
          Refresh
        </Button>

        <Button
          variant={"ghost"}
          className="p-0 w-[25px] h-[25px] hover:bg-transparent"
          onClick={() => {
            setParams({ view: labelViewMode.GridCard });
          }}
        >
          <HiOutlineSquares2X2 size={20} className="text-[#5E626D]" />
        </Button>
        <Button
          variant={"ghost"}
          className="p-0 w-[25px] h-[25px] hover:bg-transparent"
          onClick={() => {
            setParams({ view: labelViewMode.List });
          }}
        >
          <IoListOutline size={20} className="text-[#5E626D]" />
        </Button>
        {permissions.can("create", "labelsreports") && (
          <New label="" to={path.to.labelsreportsLabelNew} />
        )}
      </HStack> */}

      <div className="flex gap-5 items-center flex-wrap">
        <View tableName={"LabelsReports"} />
        <div className="relative">
          <span className="absolute top-1/2 left-3 -translate-y-1/2">
            <WebSearch color="#5E626D" />
          </span>
          <DebouncedInput
            param="search"
            size="sm"
            placeholder="Search"
            className="h-[40px] w-[300px] pl-[40px]"
          />
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <IconButton
          aria-label="reload"
          icon={<WebReload />}
          className="bg-transparent hover:bg-transparent text-accent shadow-none h-12 w-12"
        />
        <IconButton
          aria-label="upload"
          icon={<WebUpload />}
          className="bg-transparent hover:bg-transparent text-accent shadow-none h-12 w-12"
        />
        <IconButton
          onClick={() => props?.onDownload && props.onDownload()}
          aria-label="download"
          icon={<WebDownload />}
          className="bg-transparent hover:bg-transparent text-accent shadow-none h-12 w-12"
        />
        <IconButton
          onClick={() => props?.onDownload && props.onTemplateDownload()}
          aria-label="download"
          icon={<WebDownload />}
          className="bg-transparent hover:bg-transparent text-accent shadow-none h-12 w-12"
        />
        <IconButton
          aria-label="delete"
          icon={<WebTrashcan />}
          className="bg-transparent hover:bg-transparent text-accent shadow-none h-12 w-12"
        />
        <Button className="bg-transparent h-12 hover:bg-transparent text-accent shadow-none p-0 font-light flex items-center gap-2">
          <span className="flex flex-col text-accent">
            <span className="rotate-180 -mb-1">
              <WebAngleDown stroke="#19110B" />
            </span>
            <span className="-mt-1">
              <WebAngleDown stroke="#19110B" />
            </span>
          </span>
          <span>Sort by</span>
        </Button>
      </div>
    </TableFilters>
  );
};

export default LabelsReportsTableFilters;
