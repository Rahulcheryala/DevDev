import { VStack } from "@zeak/react";
import { Outlet, useLocation } from "@remix-run/react";
import type { Handle } from "~/utils/handle";
import { path } from "~/utils/path";

export const handle: Handle = {
  breadcrumb: "Workflows",
  to: path.to.workflows,
  module: "workflows",
};

export default function Workflows() {
  const location = useLocation();
  const isLabelView = location.pathname.includes("workflows");

  return isLabelView ? (
    <Outlet />
  ) : (
    <div className="grid grid-cols-[auto_1fr] w-full h-full">
      <VStack spacing={0} className="h-full">
        <Outlet />
      </VStack>
    </div>
  );
}
