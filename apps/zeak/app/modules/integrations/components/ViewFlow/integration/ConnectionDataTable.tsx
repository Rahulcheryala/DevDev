import { TbPlus } from "react-icons/tb";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../../../../components/DataTable";
import { useUnifiedContext } from "../../../context";
import { IConnectionModel } from "~/modules/integrations/models/connection.model";

type ConnectionDataTableProps = {
  type: "listing" | "view";
  columns: ColumnDef<any>[];
  data: IConnectionModel[];
};

export default function ConnectionDataTable({ type, columns, data }: ConnectionDataTableProps) {
  const { openConnectionDrawer } = useUnifiedContext();
  return (
    <div className="bg-[#F0F4FD] flex flex-col h-full">
      <DataTable
        type={type}
        columns={columns}
        data={data}
        handleAddNewConnection={() => openConnectionDrawer("create")}
      >
        <InitiateConnectionScreen />
      </DataTable>
    </div>
  );
}

function InitiateConnectionScreen() {
  const { openConnectionDrawer } = useUnifiedContext();

  return (
    <div
      className="w-full h-full rounded-[12px] bg-white flex-1 flex flex-col cursor-pointer"
      onClick={() => openConnectionDrawer("create")}
    >
      <div className="h-[64px] w-full bg-[#66D4CF1A] rounded-t-zeak"></div>
      <div className="h-[64px] w-full bg-[#66D4CF2A]"></div>
      <div className="min-h-[250px] flex flex-col flex-1 items-start gap-2 bg-[#66D4CF3A] p-8">
        <div className="p-3 rounded-full bg-white">
          <TbPlus className="w-[32px] h-[32px] font-weight" />
        </div>
        <h1 className="text-2xl font-medium">Click to create</h1>
      </div>
    </div>
  );
}
