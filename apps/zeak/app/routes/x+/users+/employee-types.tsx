import { VStack } from "@zeak/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { EmployeeTypesTable, getEmployeeTypes } from "~/modules/users";
import { requirePermissions } from "~/services/auth/auth.server";
import type { Handle } from "~/utils/handle";
import { path } from "~/utils/path";
import { getGenericQueryFilters } from "~/utils/query";

export const handle: Handle = {
  breadcrumb: "Employee Types",
  to: path.to.employeeTypes,
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { client, companyId } = await requirePermissions(request, {
    view: "users",
    role: "employee",
  });

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const search = searchParams.get("search");
  const { limit, offset, sorts, filters } =
    getGenericQueryFilters(searchParams);

  const employeeTypes = await getEmployeeTypes(client, companyId, {
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

export default function EmployeeTypesRoute() {
  const { data, count } = useLoaderData<typeof loader>();

  return (
    <VStack spacing={0} className="h-full">
      <EmployeeTypesTable data={data ?? []} count={count ?? 0} />
      <Outlet />
    </VStack>
  );
}
