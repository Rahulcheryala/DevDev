// TODO cleanup after stable
// import { VStack } from "@zeak/react";
import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
// import { ContentSidebar } from "~/components/Layout/Navigation";
// import { useAccountSubmodules } from "~/modules/account";
import type { Handle } from "~/utils/handle";
import { path } from "~/utils/path";

export const meta: MetaFunction = () => {
  return [{ title: "Xcelpros | My Account" }];
};

export const handle: Handle = {
  breadcrumb: "Account",
  to: path.to.profile,
  module: "account",
};

export default function AccountRoute() {
  // const { links } = useAccountSubmodules();

  return (
    <Outlet />
    // <div className="grid w-full h-full grid-cols-[auto_1fr]">
    //   <ContentSidebar links={links} />
    //   <VStack spacing={0} className="h-full p-4">
    //     <Outlet />
    //   </VStack>
    // </div>
  );
}
