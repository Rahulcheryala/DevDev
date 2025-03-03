import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import type { Handle } from "~/utils/handle";
import { path } from "~/utils/path";

export const meta: MetaFunction = () => {
  return [{ title: "Xcelpros | Settings" }];
};

export const handle: Handle = {
  breadcrumb: "Settings",
  to: path.to.profile,
};

export default function SettingsRoute() {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
}
