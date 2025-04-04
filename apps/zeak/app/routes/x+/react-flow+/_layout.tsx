import { VStack } from "@zeak/react";
import { Outlet, useLocation } from "@remix-run/react";
import type { Handle } from "~/utils/handle";
import { path } from "~/utils/path";

export const handle: Handle = {
  breadcrumb: "React flow",
  to: path.to.reactflow,
  module: "reactflow",
};

export default function ReactFlow() {
  const location = useLocation();
  const isLabelView = location.pathname.includes("reactflow");

  return isLabelView ? (
    <Outlet />
  ) : (
    <div className="grid w-full h-full">
      <VStack spacing={0} className="h-full w-full">
        <Outlet />
      </VStack>
    </div>
  );
}
