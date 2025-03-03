import { Enumerable } from "@zeak/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { GridCard } from "~/components";
import { type LabelsReports } from "~/modules/labelsreports";

type LabelsReportsGridCardProps = {
  data: LabelsReports[];
  count: number;
};

const LabelsReportsGridCard = memo(
  ({ data, count }: LabelsReportsGridCardProps) => {
    const columns = useMemo<ColumnDef<LabelsReports>[]>(() => {
      return [
        {
          accessorKey: "id",
          header: "Id",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "name",
          header: "Name",
          cell: (item) => <Enumerable value={item.getValue<string>()} />,
        },
        {
          accessorKey: "width",
          header: "Width",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "height",
          header: "Height",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "size",
          header: "Size",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "category",
          header: "Category",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "isArchived",
          header: "Is Archived",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "isFavorite",
          header: "Is Favorite",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "labelType",
          header: "Label Type",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "previewUrl",
          header: "Preview Url",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "status",
          header: "Status",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "createdOn",
          header: "Created On",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "createdBy",
          header: "Created By",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "modifiedOn",
          header: "Modified On",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "modifiedBy",
          header: "Modified By",
          cell: (item) => item.getValue(),
        },
      ];
    }, []);

    return (
      <GridCard<LabelsReports>
        count={count}
        columns={columns}
        data={data}
        withFilters={true}
        withPagination={true}
      />
    );
  },
);
LabelsReportsGridCard.displayName = "LabelsReportsGridCard";

export default LabelsReportsGridCard;
