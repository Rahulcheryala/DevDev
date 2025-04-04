import TableEmptyState from '~/components/Globals/TableEmptyState'

interface CreateCompanyProps {
  title?: string;
  link?: string;
}

export default function CreateCompany({ title = "Create your first company", link = "/x/access-settings/companies/new" }: CreateCompanyProps) {
  return (
    <TableEmptyState title={title} link={link} />
  )
}
