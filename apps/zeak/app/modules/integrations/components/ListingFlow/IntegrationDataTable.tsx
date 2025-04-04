import { useState } from "react";
import { DataTable } from "@zeak/datatable";
import { Dropdown } from "@zeak/ui";
import { useUnifiedContext } from "../../context";
import { IIntegrationModel } from "../../models/integration.model";
import { IntegrationTableColumns } from "./IntegrationTableColumns";
import IntegrationCard from "./IntegrationCard";
// icons
import { IoRocketOutline, IoListOutline, IoGridOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";

type IntegrationDataTableProps = {
  records: IIntegrationModel[];
};

export default function IntegrationDataTable({
  records,
}: IntegrationDataTableProps) {
  const { openIntegrationDrawer } = useUnifiedContext();
  const [view, setView] = useState("list");

  function DataTableToolBarIcons() {
    return (
      <div className="flex items-center gap-4 justify-center">
        <div className="w-[125px] h-6">
        <Dropdown
          name="view"
          placeholder="Select View"
          className="w-full border-r"
          inputClasses="bg-white border-none text-[#0D0C22] text-md h-6 pr-4"
          value={view}
          onChange={(value: string) => setView(value)}
          showIcon={true}
          items={[
            { label: "List", value: "list", icon: <IoListOutline className="w-5 h-5" /> },
            { label: "Grid", value: "grid", icon: <IoGridOutline className="w-5 h-5" /> },
          ]}
        />
        </div>
        <div className="flex items-center gap-3 border-r pr-[28px] cursor-pointer">
          <RiDeleteBin6Line className="w-5 h-5" />
          Delete
        </div>
        <div className="flex items-center gap-3 border-r pr-[28px] cursor-pointer">
          <BiEditAlt className="w-5 h-5" />
          Edits
          <FaChevronDown className="h-3 w-3" />
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <IoRocketOutline className="w-5 h-5" />
          Actions
          <FaChevronDown className="h-3 w-3" />
        </div>
      </div>
    );
  }

  return (
    <DataTable
      data={records}
      columns={IntegrationTableColumns}
      addNewText="New Integration"
      onClickNewBtn={() => openIntegrationDrawer("create")}
      topIconsComponent={<DataTableToolBarIcons />}
      selectedView={view}
      listViews={[
        {
          name: "list",
        },
        {
          name: "grid",
          component: <IntegrationCard records={records} />,
        }
      ]}
    />
  );
}