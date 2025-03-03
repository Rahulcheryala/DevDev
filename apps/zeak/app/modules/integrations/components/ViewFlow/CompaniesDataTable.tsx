import { DataTable } from "../../../../components/DataTable";
import { useIntegrationContext } from "../../context";
import { CompanyTableColumns } from "./CompanyTableColumns";

export default function CompaniesDataTable() {
  const {
    state: { selectedIntegration },
  } = useIntegrationContext();

  const companies = selectedIntegration?.companies;
  // console.log(records);
  // console.log(companies);
  return (
    <DataTable
      type="company"
      columns={CompanyTableColumns}
      data={companies!}
    ></DataTable>
  );
}
