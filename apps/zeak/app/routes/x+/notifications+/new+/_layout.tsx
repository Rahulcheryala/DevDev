import React from "react";
import { Outlet } from "@remix-run/react";

const NewNotificationLayout = () => {
  return (
    <div>
   
      <Outlet />
    </div>
  );
};

export default NewNotificationLayout;
