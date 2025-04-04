import { EmptyTableState } from '@zeak/ui'

interface CreateCompanyProps {

}

export default function CreateCompany() {
  return (
    <EmptyTableState title="No items found"
      link="/x/access-settings/companies/new" />
  )
}
