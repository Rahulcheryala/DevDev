
import { PageHeader } from "~/components/Shared";

export default function TeamPageHeader() {
  const breadcrumbs = [
    {
      label: "Settings",
      to: "/"
    },
    {
      label: "Teams"
    }
  ];

  return (
    <PageHeader
      breadcrumbs={breadcrumbs}
      title="Teams"
      onEdit={() => { }}
      onMore={() => { }}
      onClose={() => { }}
      showDropdown={true}
    />
  );
}
