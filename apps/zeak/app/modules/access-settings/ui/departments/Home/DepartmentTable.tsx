import { memo, useCallback, useMemo, useState } from "react";
import { usePermissions } from "~/hooks";
import { useNavigate, useRevalidator } from "@remix-run/react";
import {
  Avatar,
  Badge,
  Button,
  HStack,
  MenuItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useDisclosure,
} from "@zeak/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Hyperlink, Table } from "~/components";
import {
  departmentStatus,
  departmentStatusMap,
  type DepartmentListType,
  type DepartmentType,
} from "~/modules/access-settings";
import { path } from "~/utils/path";
import moment from "moment";
import debounce from "lodash/debounce";
import { ConfirmDelete } from "~/components/Modals";
import axios from "axios";
import { FaRegCopy } from "react-icons/fa";
import { EditIcon, ProhibitedIcon, TrashIcon } from "@zeak/icons";
import { axiosApiCall, formatStringArray } from "~/utils/helper";
import { useViewTableConfStore } from "~/stores";

type DepartmentTypeTableProps = {
  data: Array<DepartmentListType>;
  count: number;
};

const DepartmentTable = memo(({ data, count }: DepartmentTypeTableProps) => {
  const navigate = useNavigate();
  const permissions = usePermissions();
  const closeDepartmentModal = useDisclosure();
  const revalidator = useRevalidator();
  const [selectedDepartments, setSelectedDepartments] = useState<
    Array<DepartmentType>
  >([]);
  const [viewTableConf, setViewTableConf] = useViewTableConfStore();

  const columns = useMemo<ColumnDef<(typeof data)[number]>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "Department Name",
        cell: ({ row }) => (
          <HStack>
            <Avatar
              size="sm"
              name={row?.original?.name ?? undefined}
              src={row?.original?.logoSignedUrl ?? undefined}
            />

            <Hyperlink
              to={``}
              className="text-accent-primary"
            >{`${row?.original?.name}`}</Hyperlink>
          </HStack>
        ),
        ...(viewTableConf?.colWidthInTableConf?.name && {
          size: viewTableConf?.colWidthInTableConf?.name,
        }),
      },
      {
        accessorKey: "departmentCode",
        header: "Department Code",
        cell: (item) => (
          <p className="truncate max-w-[200px]">{item.getValue() as string}</p>
        ),
        ...(viewTableConf?.colWidthInTableConf?.departmentCode && {
          size: viewTableConf?.colWidthInTableConf?.departmentCode,
        }),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (item) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="truncate max-w-[200px]">{item.getValue() as any}</p>
            </TooltipTrigger>
            <TooltipContent side="right">
              {<span>{item.getValue() as any}</span>}
            </TooltipContent>
          </Tooltip>
        ),
        ...(viewTableConf?.colWidthInTableConf?.description && {
          size: viewTableConf?.colWidthInTableConf?.description,
        }),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (item) => (
          <Badge
            variant={
              (item.getValue() as string) === "Active" ? "green" : "gray"
            }
            className="uppercase"
          >
            {item.getValue() as string}
          </Badge>
        ),
        // meta: {
        //   getCellContext: (context: any) => {
        //     return {
        //       className:
        //         context.getValue() === "Active"
        //           ? `bg-[rgba(4,_167,_119,_0.2)] text-center text-[#04A777]`
        //           : `bg-[rgba(0,_0,_0,_0.06)] text-center text-[#5E626D]`,
        //     };
        //   },
        // },
        ...(viewTableConf?.colWidthInTableConf?.status && {
          size: viewTableConf?.colWidthInTableConf?.status,
        }),
      },
      {
        accessorKey: "departmentMember.length",
        header: "No. of users",
        cell: (item) => (
          <p className="truncate max-w-[100px] text-accent-primary">
            {item.getValue() as string}
          </p>
        ),
        ...(viewTableConf?.colWidthInTableConf?.status && {
          size: viewTableConf?.colWidthInTableConf?.status,
        }),
      },
      {
        accessorKey: "supervisor",
        header: "Supervisor",
        cell: ({ row }) => (
          <p className="truncate max-w-[200px]">
            {row?.original?.supervisorDetails?.fullName}
          </p>
        ),
        ...(viewTableConf?.colWidthInTableConf?.supervisor?.fullName && {
          size: viewTableConf?.colWidthInTableConf?.supervisor?.fullName,
        }),
      },
      {
        accessorKey: "createdOn",
        header: "Created",
        cell: (item) =>
          moment(`${item.getValue()}`).format("DD.MM.YYYY h:mm A"),
        ...(viewTableConf?.colWidthInTableConf?.createdOn && {
          size: viewTableConf?.colWidthInTableConf?.createdOn,
        }),
      },
    ];
  }, [viewTableConf]);

  const createDuplicate = useCallback(
    async (row: any) => {
      const department = row;

      const duplicateCheckFormData = new FormData();
      duplicateCheckFormData.append("name", `${department.name}`);

      const res = await axios({
        method: "post",
        url: path.to.api.checkDuplicateDepartmentName,
        data: duplicateCheckFormData,
      });
      const {
        data: { isDuplicate: isDuplicateName, count: duplicateNameCount },
      } = res;
      const duplicateCheckCodeFormData = new FormData();
      duplicateCheckCodeFormData.append(
        "departmentCode",
        `${department.departmentCode}`,
      );

      const {
        data: { isDuplicate: isDuplicateCode, count: duplicateCodeCount },
      } = await axios({
        method: "post",
        url: path.to.api.checkDuplicateDepartmentCode,
        data: duplicateCheckCodeFormData,
      });

      const formData = new FormData();

      formData.append(
        "name",
        `${department.name}${
          isDuplicateName && duplicateNameCount > 1
            ? ` (${duplicateNameCount})`
            : ""
        }`,
      );
      formData.append("companyId", `${department.company?.id}`);
      formData.append("description", `${department.description}`);
      formData.append(
        "departmentCode",
        `${department.departmentCode}${
          isDuplicateCode && duplicateCodeCount > 1
            ? `_${duplicateCodeCount}`
            : ""
        }`,
      );
      formData.append(
        "effectiveStartDate",
        department.effectiveStartDate || "",
      );
      formData.append("effectiveEndDate", department.effectiveEndDate || "");
      formData.append("supervisor", department?.supervisor);
      formData.append("status", `${department.status}`);
      await axiosApiCall(
        "post",
        path.to.api.createDuplicateDepartment,
        formData,
      );
      revalidator.revalidate();
    },
    [revalidator],
  );

  const changeStatus = useCallback(
    async (row: any) => {
      const formData = new FormData();
      formData.append("id", `${row.id}`);
      formData.append(
        "status",
        `${
          row.status === departmentStatus[0]
            ? departmentStatus[1]
            : departmentStatus[0]
        }`,
      );

      await axios({
        method: "post",
        url: path.to.api.changeStatusDepartment,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      revalidator.revalidate();
    },
    [revalidator],
  );

  const renderContextMenu = useCallback(
    (row: (typeof data)[number]) => {
      return (
        <>
          <MenuItem
            className="px-4"
            disabled={
              !permissions.can("update", "users") ||
              row.status === departmentStatusMap.INACTIVE
            }
            onClick={() => {
              navigate(path.to.departmentUsers(row.id));
            }}
          >
            <EditIcon /> <span className="ms-4">Manage Users</span>
          </MenuItem>
          <MenuItem
            className="px-4"
            disabled={
              !permissions.can("update", "users") ||
              row.status === departmentStatusMap.INACTIVE
            }
            onClick={() => {
              navigate(path.to.departmentUsers(row.id));
            }}
          >
            <EditIcon /> <span className="ms-4">Edit Department</span>
          </MenuItem>
          <MenuItem
            className="px-4"
            disabled={!permissions.can("update", "users")}
            onClick={() => {
              changeStatus(row);
            }}
          >
            <ProhibitedIcon />{" "}
            <span className="ms-4">
              {row.status === departmentStatus[0] ? "Disable" : "Enable"}{" "}
              Department
            </span>
          </MenuItem>
          <MenuItem
            className="px-4"
            disabled={
              !permissions.can("update", "users") ||
              row.status === departmentStatusMap.INACTIVE
            }
            onClick={() => {
              createDuplicate(row);
            }}
          >
            <FaRegCopy size={18} />{" "}
            <span className="ms-4">Duplicate Department</span>
          </MenuItem>
          <MenuItem
            className="px-4"
            disabled={
              !permissions.can("delete", "users") ||
              row.status === departmentStatusMap.INACTIVE
            }
            onClick={() => {
              setSelectedDepartments([row]);
              closeDepartmentModal.onOpen();
            }}
          >
            <TrashIcon color="#D11149" />{" "}
            <span className="ms-4">Delete Department</span>
          </MenuItem>
        </>
      );
    },
    [
      navigate,
      permissions,
      closeDepartmentModal,
      changeStatus,
      createDuplicate,
    ],
  );

  const onSelectedRowsChange = useCallback((elements: typeof data) => {
    setSelectedDepartments(elements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHeaderIconClick = useCallback(() => {
    if (selectedDepartments && selectedDepartments.length) {
      closeDepartmentModal.onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartments]);

  const headerIcons = useMemo(() => {
    return (
      <Button variant="ghost" className="px-2" onClick={onHeaderIconClick}>
        <TrashIcon color="#D11149" />
      </Button>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onHeaderIconClick]);

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
      <Table<(typeof data)[number]>
        headerIcons={headerIcons}
        data={data}
        columns={columns}
        count={count}
        withSearch={false}
        withColumnOrdering={false}
        withSimpleSorting={false}
        withColumnResizing={true}
        onColumnResizing={onColumnResizing}
        renderContextMenu={renderContextMenu}
        onSelectedRowsChange={onSelectedRowsChange}
        withSelectableRows
      />

      {selectedDepartments && selectedDepartments.length ? (
        <ConfirmDelete
          action={path.to.departmentsDelete(
            selectedDepartments.map((c) => c.id).join() as string,
          )}
          isOpen={closeDepartmentModal.isOpen}
          name={formatStringArray(
            (selectedDepartments || []).map((c) => c.name) as Array<string>,
          )}
          text={`Are you sure you want to permanently delete ${formatStringArray(
            (selectedDepartments || []).map((c) => c.name) as Array<string>,
          )}?`}
          onCancel={() => {
            closeDepartmentModal.onClose();
            setSelectedDepartments([]);
          }}
          onSubmit={() => {
            closeDepartmentModal.onClose();
            setSelectedDepartments([]);
          }}
        />
      ) : null}
    </>
  );
});

DepartmentTable.displayName = "DepartmentTable";
export default DepartmentTable;
