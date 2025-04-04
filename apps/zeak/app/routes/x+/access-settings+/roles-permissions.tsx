import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@zeak/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate, Outlet } from "@remix-run/react";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useUrlParams } from "~/hooks";
import { AllRoles, CustomRoles } from "~/modules/access-settings/ui";
import { getEmployeeTypes } from "~/modules/access-settings";
import { requirePermissions } from "~/services/auth/auth.server";
import { getGenericQueryFilters } from "~/utils/query";
import { path } from "~/utils/path";
import { WebArrowLeft } from "@zeak/icons";
import { Breadcrumbs } from "~/components";
import type { Handle } from "~/utils/handle";

const RolesPermissionsTabMap = {
  ALL_ROLES: "All Roles",
  CUSTOM_ROLES: "Custom Roles",
};

export const handle: Handle = {
  breadcrumb: "Roles & permissions",
  // to: path.to.rolesPermissions,
  to: path.to.uoms,
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { client, companyId } = await requirePermissions(request, {
    view: "users",
    role: "employee",
  });

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const search = searchParams.get("search");
  const type = searchParams.get("tab");
  const { limit, offset, sorts, filters } =
    getGenericQueryFilters(searchParams);

  const employeeTypes = await getEmployeeTypes(client, companyId, {
    type: type === "Custom Roles" ? "Custom" : null,
    search,
    limit,
    offset,
    sorts,
    filters,
  });

  return json({
    data: employeeTypes.data ?? [],
    count: employeeTypes.count ?? 0,
  });
}

export default function RolesPermissions() {
  const navigate = useNavigate();
  const { data, count } = useLoaderData<typeof loader>();
  const [params, setParams] = useUrlParams();
  const tab = params.get("tab") || RolesPermissionsTabMap.ALL_ROLES;
  const defaultTab = tab
    ? (RolesPermissionsTabMap as { [key: string]: string })[
        tab.toUpperCase().replace(/ /g, "_")
      ]
    : RolesPermissionsTabMap.ALL_ROLES;
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
    setParams({ tab: tabName });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <WebArrowLeft />
        <Breadcrumbs />
        {/* <ul className="flex items-center mx-[-2px]">
          <li className="px-2">
            <Link
              to={"/"}
              className="text-secondary text-sm leading-[20px] tracking-wider"
            >
              Home
            </Link>
          </li>
          <li className="px-2">
            <span className="text-secondary text-base leading-[20px] h-[24px] flex items-center justify-center">
              /
            </span>
          </li>
          <li className="px-2">
            <span className="text-accent text-sm leading-[20px] tracking-wider">
              Roles & Permissions
            </span>
          </li>
        </ul> */}
      </div>
      <div className="mt-[22px] mb-[20px] min-h-[56px] flex justify-between">
        <h2 className="text-[32px] text-accent leading-[36px] font-semibold tracking-wider w-[calc(100%_-_160px)]">
          Roles & Permissions
        </h2>
        <Button
          variant="ghost"
          className="rounded-[100px] font-normal border border-stroke w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-accent"
          leftIcon={<HiPlus size={20} />}
          onClick={() => {
            navigate(path.to.rolesPermissionsNew);
          }}
        >
          New role
        </Button>
        <>
          <Outlet />
        </>
      </div>
      <Tabs
        defaultValue={defaultTab}
        onValueChange={handleTabChange}
        value={currentTab}
      >
        <TabsList aria-label="List of tabs">
          <TabsTrigger value={RolesPermissionsTabMap.ALL_ROLES}>
            All Roles
          </TabsTrigger>
          <TabsTrigger value={RolesPermissionsTabMap.CUSTOM_ROLES}>
            Custom Roles
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value={RolesPermissionsTabMap.ALL_ROLES}
          className="pt-[32px]"
        >
          <AllRoles data={data ?? []} count={count ?? 0} />
        </TabsContent>
        <TabsContent
          value={RolesPermissionsTabMap.CUSTOM_ROLES}
          className="pt-[32px]"
        >
          <CustomRoles data={data ?? []} count={count ?? 0} />
        </TabsContent>
      </Tabs>
    </>
  );
}
