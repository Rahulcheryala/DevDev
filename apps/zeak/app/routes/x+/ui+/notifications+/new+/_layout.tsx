import React from "react";
import { Outlet } from "@remix-run/react";
import CreationLayout from "~/components/LayoutTypes/CreationLayout";

const NewNotificationLayout = () => {
  return (
    <CreationLayout
      createTitle="Create New Notification"
      innerView={<Outlet />}
    />
  );
};

export default NewNotificationLayout;
