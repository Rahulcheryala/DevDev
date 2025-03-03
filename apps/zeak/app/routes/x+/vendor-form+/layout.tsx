import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import type { Handle } from "~/utils/handle";
import { path } from "~/utils/path";

export const meta: MetaFunction = () => {
  return [{ title: "Xcelpros | Vendor Onboarding" }];
};

export const handle: Handle = {
  breadcrumb: "Settings",
  to: path.to.profile,
};

export default function VendorFormOnboardingRoute() {
  return (
    <div className="py-[26px] px-[50px] w-full">
      <Outlet />
    </div>
  );
}
