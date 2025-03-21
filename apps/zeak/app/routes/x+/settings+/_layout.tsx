// import { VStack } from "@zeak/react";
import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
// import { GroupedContentSidebar } from "~/components/Layout";
// import { useSettingsSubmodules } from "~/modules/settings";
import type { Handle } from "~/utils/handle";
import { path } from "~/utils/path";

export const meta: MetaFunction = () => {
  return [{ title: "Xcelpros | Settings" }];
};

export const handle: Handle = {
  breadcrumb: "Settings",
  to: path.to.company,
  module: "settings",
};

export default function SettingsRoute() {
  // const { groups } = useSettingsSubmodules();

  return (
    <Outlet />
    // <div className="grid grid-cols-[auto_1fr] w-full h-full">
    //   <GroupedContentSidebar groups={groups} />
    //   <VStack spacing={0} className="h-full">
    //     <Outlet />
    //   </VStack>
    // </div>
  );
}
