import { DataTable } from "../../../../components/DataTable";
import { ConnectionTableColumns } from "./ConnectionTableColumns";


export default function ConnectionsDataTable() {
    return (
      <DataTable
        type="integration"
        columns={ConnectionTableColumns}
        data={[]}
      >
        
      </DataTable>
    );
  }