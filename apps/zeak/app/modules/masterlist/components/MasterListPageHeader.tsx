import { PageHeader } from "~/components/Shared";

export default function NotificationPageHeader() {
  const breadcrumbs = [
    {
      label: "Settings",
      to: "/"
    },
    {
      label: "Master Lists"
    }
  ];

  return (
    <PageHeader
      breadcrumbs={breadcrumbs}
      title="Master Lists"
      onEdit={() => {}}
      onMore={() => {}}
      onClose={() => {}}
      showDropdown={true}
    />
  );
}