import { VStack } from "@zeak/react";
import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { GroupedContentSidebar } from "~/components/Layout";
import { useUsersSubmodules } from "~/modules/users";
import type { Handle } from "~/utils/handle";
import { path } from "~/utils/path";

export const meta: MetaFunction = () => {
  return [{ title: "Xcelpros | Users" }];
};

export const handle: Handle = {
  breadcrumb: "Users",
  to: path.to.employeeAccounts,
  module: "users",
};

export default function UsersRoute() {
  const { groups } = useUsersSubmodules();

  return (
    <div className="grid grid-cols-[auto_1fr] w-full h-full">
      <GroupedContentSidebar groups={groups} />
      <VStack spacing={0} className="h-full">
        <Outlet />
      </VStack>
    </div>
  );
}
