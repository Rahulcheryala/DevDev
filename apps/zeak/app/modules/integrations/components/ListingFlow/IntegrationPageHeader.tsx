import { PageHeader } from "~/components/Shared";
import { useNavigate } from "@remix-run/react";

export default function IntegrationPageHeader() {
  const navigate = useNavigate();
  
  const breadcrumbs = [
    {
      label: "Settings",
      to: "/",
    },
    {
      label: "Integrations",
      to: "/x/access-settings/integrations",
    },
  ];

  return (
    <PageHeader
      breadcrumbs={breadcrumbs}
      title="Integrations"
      onAction={() => {}}
      onClose={() => { navigate("/x")}}
      showDropdown={true}
    />
  );
}
