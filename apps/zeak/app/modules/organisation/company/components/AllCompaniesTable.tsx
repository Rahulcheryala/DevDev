import { DataTable } from '~/components/DataTable';
import { companiesTableColumns } from '../utils/constants';

export default function CompaniesDataTable({ companiesData }: { companiesData: any }) {
  return <DataTable columns={companiesTableColumns} data={companiesData} />;
}
