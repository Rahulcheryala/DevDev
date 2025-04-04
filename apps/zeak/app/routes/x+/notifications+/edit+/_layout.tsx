import { Outlet } from "@remix-run/react";
import CreationLayout from "~/components/LayoutTypes/CreationLayout";

const EditNotificationLayout = () => {
  return (
    <CreationLayout createTitle="Edit Notification" innerView={<Outlet />} />
  );
};

export default EditNotificationLayout;
