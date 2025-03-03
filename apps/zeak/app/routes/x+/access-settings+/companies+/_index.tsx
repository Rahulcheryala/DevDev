import { useLoaderData } from "@remix-run/react";
import { path } from "~/utils/path";
import { type Handle } from "~/utils/handle";
import { requirePermissions } from "~/services/auth/auth.server";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { getGenericQueryFilters } from "~/utils/query";
import { getPaginatedCompanyList } from "~/modules/company/services";
import { s3Client } from "~/lib/s3";
import { generateSignedUrl } from "~/modules/shared/shared.server";
import CompanyModule from "~/modules/organisation/company";

export const handle: Handle = {
  breadcrumb: "Companies",
  to: path.to.companySettings,
};

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO to be reviewed
  const { client, userId } = await requirePermissions(request, {
    view: "users",
    role: "employee",
  });

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const search = searchParams.get("search");
  const { limit, offset, sorts, filters } =
    getGenericQueryFilters(searchParams);

  const companies = await getPaginatedCompanyList(client, userId, {
    limit,
    offset,
    sorts,
    filters,
    search,
  });
  const urlPromisesList: Array<Promise<string> | null> = [];
  companies.data?.forEach((c: any, index: number) => {
    urlPromisesList[index] = c.logo
      ? generateSignedUrl(
        s3Client,
        process.env.AWS_BUCKET_NAME as string,
        c.logo,
      )
      : null;
  });

  const urlList = await Promise.all(urlPromisesList);
  const detail = (companies?.data ?? []).map((c: any, i: number) => ({
    ...c,
    logo: urlList[i],
  }));

  return json({
    data: detail,
    count: companies.count ?? 0,
  });
}

export default function CompaniesSettingsRoute() {
  const { data, count } = useLoaderData<typeof loader>();

  return <CompanyModule data={data} count={count} />;
}
