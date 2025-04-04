import { VStack } from "@zeak/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import {
  Employee,
  EmployeesTable,
  getEmployeeTypes,
  getEmployees,
} from "~/modules/users";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import type { Handle } from "~/utils/handle";
import { path } from "~/utils/path";
import { getGenericQueryFilters } from "~/utils/query";
import { error } from "~/utils/result";
import { getSupabaseServiceRole } from "~/lib/supabase";

export const handle: Handle = {
  breadcrumb: "Employees",
  to: path.to.employeeAccounts,
};

const getInviteStatus = (authUser: any): 'Accepted' | 'Pending' => {
  return authUser.last_sign_in_at ? 'Accepted' : 'Pending';
};

// Main function to merge employee data with auth status
const mergeEmployeeStatus = (employees: Employee[], authUsers: any[]) => {
  // Create a map of auth users by ID for faster lookup
  const authUserMap = new Map(
    authUsers.map(user => [user.id, user])
  );

  // Merge the data
  return employees.map(employee => {
    const authUser = authUserMap.get(employee.id);
    return {
      ...employee,
      inviteStatus: authUser ? getInviteStatus(authUser) : 'Pending'
    };
  });
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

  const [employees, employeeTypes] = await Promise.all([
    getEmployees(client, companyId, { search, limit, offset, sorts, filters }),
    getEmployeeTypes(client, companyId),
  ]);

  if (employees.error) {
    throw redirect(
      path.to.users,
      await flash(request, error(employees.error, "Error loading employees")),
    );
  }
  if (employeeTypes.error) {
    throw redirect(
      path.to.users,
      await flash(
        request,
        error(employeeTypes.error, "Error loading employee types"),
      ),
    );
  }

  const { data: authEmployees } = await getSupabaseServiceRole().auth.admin.listUsers()
  const employeesWithStatus = mergeEmployeeStatus(employees.data ?? [], authEmployees.users);

  return json({
    count: employees.count ?? 0,
    employees: employeesWithStatus,
    employeeTypes: employeeTypes.data,
  });
}

export default function UsersEmployeesRoute() {
  const { count, employees, employeeTypes } = useLoaderData<typeof loader>();

  return (
    <VStack spacing={0} className="h-full">
      <EmployeesTable
        data={employees}
        count={count}
        employeeTypes={employeeTypes}
      />
      <Outlet />
    </VStack>
  );
}
