
import { PageHeader } from "~/components/Shared";

export default function DepartmentPageHeader() {
  const breadcrumbs = [
    {
      label: "Settings",
      to: "/"
    },
    {
      label: "Departments"
    }
  ];

  return (
    <PageHeader
      breadcrumbs={breadcrumbs}
      title="Departments"
      onEdit={() => { }}
      onMore={() => { }}
      onClose={() => { }}
      showDropdown={true}
    />
  );
}
