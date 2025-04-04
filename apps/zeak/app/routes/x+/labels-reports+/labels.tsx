import { VStack } from "@zeak/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import {
  LabelsReportsTable,
  LabelsReportsTableFilters,
  getLabelsReports,
} from "~/modules/labelsreports";
import { getTableColDetails } from "~/modules/shared";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import type { Handle } from "~/utils/handle";
import { path } from "~/utils/path";
import { getGenericQueryFilters } from "~/utils/query";
import { error } from "~/utils/result";

export const handle: Handle = {
  breadcrumb: "Labels",
  to: path.to.labelsreportsLabelList,
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { client, companyId } = await requirePermissions(request, {
    view: "labelsreports",
  });

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const name = searchParams.get("name");
  const status = searchParams.get("status");
  const labelType = searchParams.get("labelType");

  const { limit, offset, sorts, filters } =
    getGenericQueryFilters(searchParams);

  const [labelsReports, labelsReportsColDetails] = await Promise.all([
    getLabelsReports(
      client,
      {
        name,
        status,
        labelType,
        limit,
        offset,
        sorts,
        filters,
      },
      companyId,
    ),
    getTableColDetails(client, "labelsreports"),
  ]);

  if (labelsReports.error) {
    redirect(
      path.to.invoicing,
      await flash(
        request,
        error(labelsReports.error, "Failed to fetch purchase orders"),
      ),
    );
  }

  return json({
    count: labelsReports.count ?? 0,
    labelsReports: labelsReports.data ?? [],
    labelsReportsColDetails: labelsReportsColDetails,
  });
}

export default function LabelsListRoute() {
  // const matches = useMatches();
  const { count, labelsReports, labelsReportsColDetails } =
    useLoaderData<typeof loader>();
  console.log(labelsReportsColDetails);
  const location = useLocation();
  const isEditorView = location.pathname.includes(
    "labels-reports/labels/editor",
  );
  // const isEditorRoute = matches.some(match => match.pathname.includes("editor"));

  return !isEditorView ? (
    <VStack spacing={0} className="h-full">
      <LabelsReportsTableFilters />
      <LabelsReportsTable data={labelsReports} count={count} />
      <Outlet />
    </VStack>
  ) : (
    <Outlet />
  );
}
