
import { PageHeader } from "~/components/Shared";

export default function NotificationPageHeader() {
  const breadcrumbs = [
    {
      label: "Settings",
      to: "/"
    },
    {
      label: "Notifications"
    }
  ];

  return (
    <PageHeader
      breadcrumbs={breadcrumbs}
      title="Notifications"
      onEdit={() => {}}
      onMore={() => {}}
      onClose={() => {}}
      showDropdown={true}
    />
  );
}
