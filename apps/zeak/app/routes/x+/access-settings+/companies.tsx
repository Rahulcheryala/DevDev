import { Button } from "@zeak/react";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { HiPlus } from "react-icons/hi";
import { Breadcrumbs } from "~/components";
import { path } from "~/utils/path";
import { type Handle } from "~/utils/handle";
import { CompanyList } from "~/modules/company/components";
import { requirePermissions } from "~/services/auth/auth.server";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { getGenericQueryFilters } from "~/utils/query";
import { getPaginatedCompanyList } from "~/modules/company/services";
import { s3Client } from "~/lib/s3";
import { generateSignedUrl } from "~/modules/shared/shared.server";
import { GoArrowLeft } from "react-icons/go";

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
  companies.data?.forEach((c, index: number) => {
    urlPromisesList[index] = c.logo
      ? generateSignedUrl(
          s3Client,
          process.env.AWS_BUCKET_NAME as string,
          c.logo,
        )
      : null;
  });

  const urlList = await Promise.all(urlPromisesList);
  const detail = (companies?.data ?? []).map((c, i) => ({
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
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center gap-2 hidden">
        <GoArrowLeft size={24} className="text-secondary" />
        <Breadcrumbs />
      </div>
      <div className="mt-[22px] mb-[20px] min-h-[56px] flex justify-between hidden">
        <h2 className="text-[32px] text-accent leading-[36px] font-semibold tracking-wider w-[calc(100%_-_160px)]">
          Companies
        </h2>

        <Button
          variant="secondary"
          className="rounded-[100px] font-normal w-[190px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-accent bg-white hover:text-white"
          leftIcon={<HiPlus size={20} />}
          onClick={() => navigate(path.to.companyNew)}
        >
          New Company
        </Button>
      </div>
      <Outlet />
      {/* <CompanyList data={data} count={count} /> */}
    </>
  );
}
