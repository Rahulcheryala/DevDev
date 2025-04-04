import { PageHeader } from '@zeak/ui';
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
      onGoBack={() => { navigate("/x")}}
      showActions={true}
      onActions={() => {}}
      showClose={true}
      onClose={() => { navigate("/x")}}
    />
  );
}
