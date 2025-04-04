import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@zeak/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate, Outlet } from "@remix-run/react";
import { HiPlus } from "react-icons/hi";
import { AllTeams, getTeams } from "~/modules/access-settings";
import { requirePermissions } from "~/services/auth/auth.server";
import { getGenericQueryFilters } from "~/utils/query";
import { path } from "~/utils/path";
import type { Handle } from "~/utils/handle";
import Breadcrumbs from "~/components/Breadcrumb";
import View from "~/components/View";
import { generateSignedUrl } from "~/modules/shared/shared.server";
import { s3Client } from "~/lib/s3";
import { GoArrowLeft } from "react-icons/go";

const TeamsTabMap = {
  ALL_TEAMS: "All Teams",
};

export const handle: Handle = {
  breadcrumb: "Teams",
  to: path.to.teams,
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

  const teams = await getTeams(client, companyId, {
    search,
    limit,
    offset,
    sorts,
    filters,
  });

  if (teams?.data) {
    await Promise.all(
      teams.data.map(async (data) => {
        if (data.teamMember.length) {
          const listLen =
            data.teamMember.length > 2 ? 3 : data.teamMember.length;
          for (let i = 0; i < listLen; i++) {
            const userId = data.teamMember[i]?.userId as any;
            if (userId?.avatarUrl) {
              const avatarImage = await generateSignedUrl(
                s3Client,
                process.env.AWS_BUCKET_NAME as string,
                userId.avatarUrl,
              );
              userId.avatarUrl = avatarImage;
            }
          }
        }
      }),
    );
  }

  return json({
    data: teams.data ?? [],
    count: teams.count ?? 0,
  });
}

export default function Teams() {
  const navigate = useNavigate();
  const { data, count } = useLoaderData<typeof loader>();
  const tab = TeamsTabMap.ALL_TEAMS;
  const defaultTab = tab
    ? (TeamsTabMap as { [key: string]: string })[
    tab.toUpperCase().replace(/ /g, "_")
    ]
    : TeamsTabMap.ALL_TEAMS;

  return (
    <>
      <div className="flex items-center gap-2">
        <GoArrowLeft size={24} className="text-secondary" />
        <Breadcrumbs />
      </div>
      <div className="mt-[22px] mb-[20px] min-h-[56px] flex justify-between">
        <h2 className="text-[32px] text-accent leading-[36px] font-semibold tracking-wider w-[calc(100%_-_160px)]">
          Teams
        </h2>
        <Button
          variant="ghost"
          className="rounded-[100px] font-normal border border-stroke w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-accent"
          leftIcon={<HiPlus size={20} />}
          onClick={() => {
            navigate(path.to.teamsNew());
          }}
        >
          Add Team
        </Button>
        <>
          <Outlet />
        </>
      </div>

      <Tabs
        defaultValue={defaultTab}
        onValueChange={() => { }}
        value={defaultTab}
      >
        <TabsList aria-label="List of tabs">
          <TabsTrigger value={TeamsTabMap.ALL_TEAMS}>All Teams</TabsTrigger>
        </TabsList>
        <TabsContent
          value={TeamsTabMap.ALL_TEAMS}
          className="pt-[30px] relative"
        >
          <div className="right-0 top-[30px] absolute">
            <View tableName={"Team"} />
          </div>
          <AllTeams data={data} count={count ?? 0} />
        </TabsContent>
      </Tabs>
    </>
  );
}
