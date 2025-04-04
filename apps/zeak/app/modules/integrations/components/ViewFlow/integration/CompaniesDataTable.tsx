import { DataTable } from "@zeak/datatable";
import { useUnifiedContext } from "../../../context";
import { CompanyTableColumns } from "./CompanyTableColumns";
import { EmptyTableState } from "@zeak/ui";

export default function CompaniesDataTable() {
  const {
    state: { selectedIntegration, companies },
    dispatch
  } = useUnifiedContext();

  const integrationCompanies = companies?.filter((company) =>
    selectedIntegration?.companyIds.includes(company.id)
  );
  // console.log(integrationCompanies);

  const handleAddCompany = () => {}

  return (
    <DataTable
      addNewText=""
      columns={CompanyTableColumns}
      data={integrationCompanies!}
      emptyTableState={<EmptyTableState title="Click to add Company" onClick={handleAddCompany} />}
    />
  );
}
