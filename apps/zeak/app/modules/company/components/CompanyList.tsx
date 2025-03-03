import { memo, useCallback, useMemo, useState } from "react";
import { usePermissions, useRouteData } from "~/hooks";
import { useNavigate, useRevalidator } from "@remix-run/react";
import { Avatar, Button, MenuItem, toast, useDisclosure } from "@zeak/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Table } from "~/components";
import { companyStatusMap, type CompanyType } from "~/modules/access-settings";
import { path } from "~/utils/path";
import { ConfirmDelete } from "~/components/Modals";
import { EditIcon, ProhibitedIcon, TrashIcon } from "@zeak/icons";
import axios from "axios";
import { formatStringArray } from "~/utils/helper";
import { type Company } from "~/modules/settings";

type CompanyTypeTableProps = {
  data: CompanyType[];
  count: number;
};

const CompanyList = memo(({ data, count }: CompanyTypeTableProps) => {
  const navigate = useNavigate();
  const permissions = usePermissions();
  const closeCompanyModal = useDisclosure();
  const revalidator = useRevalidator();
  const [selectedCompanys, setSelectedCompanys] = useState<Array<CompanyType>>(
    [],
  );
  const routeData = useRouteData<{ company: Company }>(
    path.to.authenticatedRoot,
  );

  const columns = useMemo<ColumnDef<(typeof data)[number]>[]>(() => {
    return [
      {
        accessorKey: "logo",
        cell: (item) => (
          <Avatar
            src={item.getValue() as string}
            name={item?.row?.original?.name as string}
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Company Name",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "companyCode",
        header: "Company Code",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "domainUrl",
        header: "URL",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        meta: {
          getCellContext: (context: any) => {
            return {
              className:
                context.getValue() === companyStatusMap.ACTIVE
                  ? `bg-[rgba(4,_167,_119,_0.2)] text-center text-[#04A777]`
                  : `bg-[rgba(0,_0,_0,_0.06)] text-center text-[#5E626D]`,
            };
          },
        },
      },
    ];
  }, []);

  const changeStatus = useCallback(
    async (row: any) => {
      const formData = new FormData();
      formData.append("id", `${row.id}`);
      formData.append(
        "status",
        `${
          row.status === companyStatusMap.ACTIVE
            ? companyStatusMap.INACTIVE
            : companyStatusMap.ACTIVE
        }`,
      );

      await axios({
        method: "post",
        url: path.to.api.changeStatusCompany,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      revalidator.revalidate();
    },
    [revalidator],
  );

  const onSelectedRowsChange = useCallback((elements: typeof data) => {
    setSelectedCompanys(elements);
  }, []);

  const onHeaderIconClick = useCallback(() => {
    if (selectedCompanys?.length) {
      if (
        selectedCompanys
          .map((c) => c.id)
          .includes(routeData?.company?.id as string)
      ) {
        return toast.error("Currently active company cannot be deleted");
      }
      closeCompanyModal.onOpen();
    }
  }, [selectedCompanys, routeData?.company?.id, closeCompanyModal]);

  const headerIcons = useMemo(() => {
    return (
      <Button variant="ghost" className="px-2" onClick={onHeaderIconClick}>
        <TrashIcon color="#D11149" />
      </Button>
    );
  }, [onHeaderIconClick]);

  const renderContextMenu = useCallback(
    (row: (typeof data)[number]) => {
      return (
        <>
          <MenuItem
            className="px-4"
            disabled={!permissions.can("update", "users")}
            onClick={() => {
              navigate(path.to.companyEdit(row.id as string));
            }}
          >
            <EditIcon /> <span className="ms-4">Edit Company</span>
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
              {row.status === companyStatusMap.ACTIVE ? "Disable" : "Enable"}{" "}
              Company
            </span>
          </MenuItem>
          <MenuItem
            className="px-4 text-[#D11149]"
            disabled={!permissions.can("delete", "users")}
            onClick={() => {
              if (row?.id === (routeData?.company?.id as string)) {
                toast.error("Currently active company cannot be deleted");
              } else {
                setSelectedCompanys([row]);
                closeCompanyModal.onOpen();
              }
            }}
          >
            <TrashIcon color="#D11149" />{" "}
            <span className="ms-4">Delete Company</span>
          </MenuItem>
        </>
      );
    },
    [
      permissions,
      navigate,
      changeStatus,
      routeData?.company?.id,
      closeCompanyModal,
    ],
  );

  return (
    <>
      <Table<(typeof data)[number]>
        headerIcons={headerIcons}
        data={data}
        columns={columns}
        count={count}
        withSearch={true}
        withColumnOrdering={false}
        withSimpleSorting={false}
        renderContextMenu={renderContextMenu}
        onSelectedRowsChange={onSelectedRowsChange}
        withSelectableRows
      />

      {!!selectedCompanys?.length && (
        <ConfirmDelete
          action={path.to.CompanyDelete(
            selectedCompanys.map((c) => c.id).join() as string,
          )}
          isOpen={closeCompanyModal.isOpen}
          name={formatStringArray(
            (selectedCompanys || []).map((c) => c.name) as Array<string>,
          )}
          text={`Are you sure you want to permanently delete ${formatStringArray(
            (selectedCompanys || []).map((c) => c.name) as Array<string>,
          )}?`}
          onCancel={() => {
            closeCompanyModal.onClose();
            setSelectedCompanys([]);
          }}
          onSubmit={() => {
            closeCompanyModal.onClose();
            setSelectedCompanys([]);
          }}
        />
      )}
    </>
  );
});

CompanyList.displayName = "CompanyList";
export default CompanyList;
