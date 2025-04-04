
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requirePermissions } from "~/services/auth/auth.server";
import { NotificationPageHeader, NotificationPageTabs } from "~/modules/notifications";

export async function loader({ request }: LoaderFunctionArgs) {
  // const { client, companyId } = await requirePermissions(request, {
  //   view: "users",
  //   role: "employee",
  // });

  // const { data } = await client
  //   .from("notfMaster" as any)
  //   .select("*, notfCompanyMapping(companyId)")
  //   .eq("notfCompanyMapping.companyId", companyId);

  // return json({
  //   data: data,
  //   count: data?.length ?? 0,
  // });
  return json({
    data: [],
    count: 0,
  });
}

export default function Notifications() {

  return (
    <div className="bg-[#F0F4FD]  px-4">

      <NotificationPageHeader />
      <NotificationPageTabs />


    </div>
  );
}

