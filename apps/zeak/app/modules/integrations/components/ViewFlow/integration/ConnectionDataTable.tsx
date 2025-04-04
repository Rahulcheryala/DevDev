import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@zeak/datatable";
import { useUnifiedContext } from "../../../context";
import { IConnectionModel } from "~/modules/integrations/models/connection.model";
import { EmptyTableState } from "@zeak/ui";

type ConnectionDataTableProps = {
  type: "listing" | "view";
  columns: ColumnDef<any>[];
  data: IConnectionModel[];
};

export default function ConnectionDataTable({
  type,
  columns,
  data,
}: ConnectionDataTableProps) {
  const { openConnectionDrawer } = useUnifiedContext();
  const addNewText = type === "view" ? "New Connection" : "";
  const onClickNewBtn = () => {
    if (type === "view") {
      openConnectionDrawer("create");
    }
  };

  return (
    <div className="bg-[#F0F4FD] flex flex-col h-full">
      <DataTable
        topTitle={type === "view" ? "Connections" : ""}
        columns={columns}
        data={data}
        addNewText={addNewText}
        onClickNewBtn={onClickNewBtn}
        emptyTableState={
          <EmptyTableState
            title="Click to Create New Connection"
            onClick={onClickNewBtn}
          />
        }
      />
    </div>
  );
}
