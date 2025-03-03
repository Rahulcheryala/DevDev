import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requirePermissions } from "~/services/auth/auth.server";
import { getEmployeesSimpleList } from "~/modules/users";
import { populateSignedUrlInList } from "~/modules/shared/shared.server";
import { s3Client } from "~/lib/s3";
import { error } from "~/utils/result";
import { flash } from "~/services/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { client, companyId } = await requirePermissions(request, {});

  const userList = await getEmployeesSimpleList(client, companyId);
  if (userList.error) {
    return json(
      null,
      await flash(request, error(userList.error, "Failed to get employeeList")),
    );
  }
  const employeeList = await populateSignedUrlInList(
    s3Client,
    userList.data || [],
    "avatarUrl",
  );
  return json({ data: employeeList });
}
