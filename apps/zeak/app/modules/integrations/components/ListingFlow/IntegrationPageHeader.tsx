import { PageHeader } from "~/components/Shared";

export default function IntegrationPageHeader() {
  const breadcrumbs = [
    {
      label: "Settings",
      to: "/",
    },
    {
      label: "Integrations",
    },
  ];

  return (
    <PageHeader
      breadcrumbs={breadcrumbs}
      title="Integrations"
      onAction={() => {}}
      onClose={() => {}}
      showDropdown={true}
    />
  );
}
