import { memo, useCallback, useMemo, useState } from "react";
import { usePermissions, useRouteData } from "~/hooks";
import { useNavigate, useRevalidator } from "@remix-run/react";
import { toast, useDisclosure } from "@zeak/react";
import type {
  Row,
} from "@tanstack/react-table";
import { companyStatusMap, type CompanyType } from "~/modules/access-settings";
import { path } from "~/utils/path";
import { ConfirmDelete } from "~/components/Modals";
import { TrashIcon } from "@zeak/icons";
import axios from "axios";
import { formatStringArray } from "~/utils/helper";
import { type Company } from "~/modules/settings";

import CreateCompany from "./CreateNewCompany";

import { DataTable } from "@zeak/datatable";
import { columns } from "~/components/Globals/DataTable/Columns";
import { Edit, Copy, Trash, Trash2, List, MoreVertical, Upload } from "lucide-react";
import { Button, Popup } from "@zeak/ui";

type CompanyTypeTableProps = {
  data: CompanyType[];
  count: number;
};

const formatDate = (date: any) => {
  if (!date) return "";
  const d = new Date(date);
  return d
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", "");
};

const formatTime = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Chicago",
  };
  return d.toLocaleTimeString("en-US", options) + " | CST";
};

const CompanyList = memo(({ data, count }: CompanyTypeTableProps) => {
  const navigate = useNavigate();
  const permissions = usePermissions();
  const closeCompanyModal = useDisclosure();
  const revalidator = useRevalidator();
  const [selectedCompanys, setSelectedCompanys] = useState<Array<CompanyType>>(
    []
  );

  // const [localData, setLocalData] = useState<CompanyType[]>(data);
  const routeData = useRouteData<{ company: Company }>(
    path.to.authenticatedRoot
  );
  // const [isCompact, setIsCompact] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const changeStatus = useCallback(
    async (row: any) => {
      const formData = new FormData();
      formData.append("id", `${row.id}`);
      formData.append(
        "status",
        `${row.status === companyStatusMap.ACTIVE
          ? companyStatusMap.INACTIVE
          : companyStatusMap.ACTIVE
        }`
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
    [revalidator]
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

  const deleteCompanyCb = useCallback((row: (typeof data)[number]) => {
    if (row?.id === (routeData?.company?.id as string)) {
      toast.error("Currently active company cannot be deleted");
    } else {
      setSelectedCompanys([row]);
      closeCompanyModal.onOpen();
    }
  }, [closeCompanyModal, routeData?.company?.id]);

  const duplicateCompanyCb = useCallback((row: (typeof data)[number]) => {
    console.log(row);
  }, []);

  const changeStatusCompanyCb = useCallback((row: (typeof data)[number]) => {
    changeStatus(row);
  }, [changeStatus]);

  const editCompanyCb = useCallback((row: (typeof data)[number]) => {
    navigate(path.to.companyEdit(row?.id as string));
  }, [navigate]);

  const ActionMenu = ({ row }: { row: Row<Company> }) => (
    <Popup
      trigger={<button className="p-2 rounded-full hover:bg-gray-100">
        <MoreVertical className="h-5 w-5" />
      </button>}
      buttons={[
        {
          icon: <Edit className="h-5 w-5" />,
          label: "Edit Company",
          onClick: () => editCompanyCb(row)
        },
        {
          icon: <List className="w-5 h-5 text-gray-600" />,
          label: "Manage Company",
          onClick: () => alert("Manage Company clicked")
        },
        {
          icon: <Copy className="w-5 h-5 text-gray-600" />,
          label: "Duplicate Company",
          onClick: () => duplicateCompanyCb(row)
        },
        {
          icon: <Trash className="h-5 w-5" />,
          label: `${row.original.status === "active" ? "Disable" : "Enable"} Company`,
          onClick: () => changeStatusCompanyCb(row)
        },
        {
          icon: <Trash2 className="w-5 h-5 text-gray-600" />,
          label: "Delete Company",
          onClick: () => deleteCompanyCb(row)
        },
        {
          icon: <Upload className="w-5 h-5 text-gray-600" />,
          label: 'Export Data',
          onClick: () => alert('Export Data clicked')
        }
      ]}
    />
  )

  const tableColumns = useMemo(() => {
    return columns.map((c) => {
      if (c.id === "actions") {
        return {
          ...c,
          cell: ({ row }) => <ActionMenu row={row} />
        }
      }
      return c;
    });
  }, []);

  return (
    <>
      {count === 0 ? (
        <CreateCompany />
      ) : (
        <DataTable
          columns={tableColumns}
          data={data}
          onClickNewBtn={() => navigate("/x/access-settings/companies/new")}
        />
      )}

      {!!selectedCompanys?.length && (
        <ConfirmDelete
          action={path.to.CompanyDelete(
            selectedCompanys.map((c) => c.id).join() as string
          )}
          isOpen={closeCompanyModal.isOpen}
          name={formatStringArray(
            (selectedCompanys || []).map((c) => c.name) as Array<string>
          )}
          text={`Are you sure you want to permanently delete this company => ${formatStringArray(
            (selectedCompanys || []).map((c) => c.name) as Array<string>
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
