import { useFetcher, useNavigate } from "@remix-run/react";
import { Enumerable, MenuIcon, MenuItem, useDisclosure } from "@zeak/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo, useState } from "react";
import { ConfirmDelete } from "~/components/Modals";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import type { LabelsReports } from "~/modules/labelsreports";
import debounce from "lodash/debounce";
import { useViewTableConfStore } from "~/stores";
import { WebShare, WebTrashcan } from "@zeak/icons";
import { CiEdit } from "react-icons/ci";
import { EditableTable } from "~/components/Table/EditableTable";

type LabelsReportsTableProps = {
  data: LabelsReports[];
  count: number;
  colDetails: any;
};

const LabelsReportsTable = memo(
  ({ data, count, colDetails }: LabelsReportsTableProps) => {
    const permissions = usePermissions();
    const navigate = useNavigate();
    const fetcher = useFetcher();
    const [viewTableConf, setViewTableConf] = useViewTableConfStore();
    const [selectedLabel, setSelectedLabel] = useState<LabelsReports | null>(
      null,
    );
    const closeLabelModal = useDisclosure();

    const columns = useMemo<ColumnDef<LabelsReports>[]>(() => {
      return [
        {
          type: "text",
          editable: true,
          validations: {
            required: true,
          },
          accessorKey: "name",
          header: "Name",
          cell: (item) => item.getValue(),
          ...(viewTableConf?.colWidthInTableConf?.name && {
            size: viewTableConf?.colWidthInTableConf?.name,
          }),
        },
        {
          type: "number",
          editable: true,
          validations: {
            required: true,
          },
          accessorKey: "width",
          header: "Width",
          cell: (item) => Number(item.getValue()),
          ...(viewTableConf?.colWidthInTableConf?.width && {
            size: viewTableConf?.colWidthInTableConf?.width,
          }),
        },
        {
          type: "text",
          editable: true,
          validations: {
            required: true,
          },
          accessorKey: "height",
          header: "Height",
          cell: (item) => item.getValue(),
          ...(viewTableConf?.colWidthInTableConf?.height && {
            size: viewTableConf?.colWidthInTableConf?.height,
          }),
        },
        {
          type: "text",
          editable: true,
          validations: {
            required: true,
          },
          accessorKey: "size",
          header: "Size",
          cell: (item) => item.getValue(),
          ...(viewTableConf?.colWidthInTableConf?.size && {
            size: viewTableConf?.colWidthInTableConf?.size,
          }),
        },
        {
          type: "text",
          editable: true,
          validations: {
            required: true,
          },
          accessorKey: "category",
          header: "Category",
          cell: (item) => item.getValue(),
          ...(viewTableConf?.colWidthInTableConf?.category && {
            size: viewTableConf?.colWidthInTableConf?.category,
          }),
        },
        {
          accessorKey: "isArchived",
          header: "Is Archived",
          cell: (item) => item.getValue(),
          ...(viewTableConf?.colWidthInTableConf?.isArchived && {
            size: viewTableConf?.colWidthInTableConf?.isArchived,
          }),
        },
        {
          accessorKey: "isFavorite",
          header: "Is Favorite",
          cell: (item) => item.getValue(),
          ...(viewTableConf?.colWidthInTableConf?.isFavorite && {
            size: viewTableConf?.colWidthInTableConf?.isFavorite,
          }),
        },
        {
          type: "text",
          editable: true,
          validations: {
            required: true,
          },
          accessorKey: "labelType",
          header: "Label Type",
          cell: (item) => item.getValue(),
          ...(viewTableConf?.colWidthInTableConf?.labelType && {
            size: viewTableConf?.colWidthInTableConf?.labelType,
          }),
        },
        {
          type: "select",
          editable: true,
          options: ["Draft", "Submitted", "Approved", "Not Approved", "Hold"],
          validations: {
            required: true,
          },
          accessorKey: "status",
          header: "Status",
          cell: (item) => <Enumerable value={item.getValue<string>()} />,
          ...(viewTableConf?.colWidthInTableConf?.status && {
            size: viewTableConf?.colWidthInTableConf?.status,
          }),
        },
      ];
    }, [viewTableConf]);

    const renderContextMenu = useMemo(
      // eslint-disable-next-line react/display-name
      () => (row: LabelsReports) => (
        <>
          <MenuItem
            onClick={() => navigate(path.to.labelsreportsLabelView(row.id))}
            className="p-[16px] gap-4 text-xs leading-[13px] tracking-wider text-accent font-light font-sans hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg rounded-none focus:text-accent border-b border-stroke last:border-b-0"
          >
            <MenuIcon icon={<WebShare />} />
            View Label
          </MenuItem>
          <MenuItem
            onClick={() => navigate(path.to.labelsreportsLabelEdit(row.id))}
            className="[&>svg]:h-auto [&>svg]:w-auto [&>svg]:mr-0  p-[16px] gap-4 text-xs leading-[13px] tracking-wider text-accent font-light font-sans hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg rounded-none focus:text-accent border-b border-stroke last:border-b-0"
          >
            <MenuIcon icon={<CiEdit size={22} />} />
            Edit
          </MenuItem>
          <MenuItem
            disabled={!permissions.can("delete", "labelsreports")}
            onClick={() => {
              setSelectedLabel(row);
              closeLabelModal.onOpen();
            }}
            className="p-[16px] gap-4 text-xs leading-[13px] tracking-wider text-accent font-light font-sans hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg rounded-none focus:text-accent border-b border-stroke last:border-b-0"
          >
            <MenuIcon icon={<WebTrashcan />} />
            Delete
          </MenuItem>
        </>
      ),
      [navigate, closeLabelModal, permissions],
    );

    const defaultColumnVisibility = {
      name: true,
      previewUrl: true,
      size: true,
      width: true,
      height: true,
      status: true,
      category: true,
      labelType: true,
      isArchived: false,
      isFavorite: false,
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onColumnResizing = useCallback(
      debounce((rowConf) => {
        if (rowConf && Object.keys(rowConf).length) {
          setViewTableConf(rowConf);
        }
      }, 200),
      [],
    );

    return (
      <>
        <EditableTable<LabelsReports>
          count={count}
          columns={columns}
          data={data}
          defaultColumnVisibility={defaultColumnVisibility}
          withColumnOrdering
          // withFilters
          withPagination
          withSimpleSorting
          renderContextMenu={renderContextMenu}
          withColumnResizing={true}
          onColumnResizing={onColumnResizing}
          withSelectableRows
          withSearch={false}
        />

        {selectedLabel && selectedLabel.id && (
          <ConfirmDelete
            hasAction={false}
            isOpen={closeLabelModal.isOpen}
            name={selectedLabel.name!}
            text={`Are you sure you want to permanently delete ${selectedLabel.name!}?`}
            onCancel={() => {
              closeLabelModal.onClose();
              setSelectedLabel(null);
            }}
            onSubmit={() => {
              const formData = new FormData();
              formData.append("ids", selectedLabel.id);
              fetcher.submit(formData, {
                method: "POST",
                action: path.to.labelsreportsLabelDelete,
              });
              closeLabelModal.onClose();
              setSelectedLabel(null);
            }}
          />
        )}
      </>
    );
  },
);

LabelsReportsTable.displayName = "LabelsReportsTable";

export default LabelsReportsTable;
