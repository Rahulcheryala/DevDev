import type { LoaderFunctionArgs } from "@remix-run/node";
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@zeak/react";
import { HiPlus } from "react-icons/hi";
import { json, redirect, useLoaderData } from "@remix-run/react";
import {
  Dashboard,
  Templates,
  Favorites,
  MyProjects,
  History,
  Workflow,
  Archives,
} from "~/modules/labelsreports/ui/Label/HomeTabs";
import type {
  LabelsReports,
  LabelModuleConfigType,
} from "~/modules/labelsreports";
import {
  LabelCreateNew,
  labelViewMode,
  getLabelsReports,
  getLabelsReportsCount,
} from "~/modules/labelsreports";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { path } from "~/utils/path";
import { getGenericQueryFilters } from "~/utils/query";
import { error } from "~/utils/result";
import { getModuleConfig, getTableColDetails } from "~/modules/shared";
import { useUrlParams } from "~/hooks";
import { generateSignedUrl } from "~/modules/shared/shared.server";
import { s3Client } from "~/lib/s3";
import { useState } from "react";
import { Breadcrumbs } from "~/components";
import type { Handle } from "~/utils/handle";
import { WebArrowLeft } from "@zeak/icons";

const HomeTabMap = {
  DASHBOARD: "dashboard",
  TEMPLATES: "templates",
  FAVORITES: "favorites",
  MYPROJECTS: "myprojects",
  WORKFLOWS: "workflows",
  HISTORY: "history",
  ARCHIVES: "archives",
};

export const handle: Handle = {
  breadcrumb: "Home",
  to: path.to.labelsreportsHome(),
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { client, companyId } = await requirePermissions(request, {
    view: "labelsreports",
  });

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const selectedtab = searchParams.get("tab");
  const name = searchParams.get("name");
  const status = searchParams.get("status");
  const labelType = searchParams.get("labelType");

  const { limit, offset, sorts, filters } =
    getGenericQueryFilters(searchParams);

  const [
    moduleConfig,
    labelsReports,
    labelsCount,
    labelsReportsTableColDetails,
  ] = await Promise.all([
    getModuleConfig(client, "labelsreports"),
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
    getLabelsReportsCount(client, companyId),
    getTableColDetails(client, "labelsreports"),
  ]);

  if (moduleConfig.error) {
    redirect(
      request.url,
      await flash(
        request,
        error(moduleConfig.error, "Failed to fetch details"),
      ),
    );
  }
  if (labelsReports.error) {
    redirect(
      request.url,
      await flash(
        request,
        error(labelsReports.error, "Failed to fetch labels & reports"),
      ),
    );
  }
  if (labelsCount.error) {
    redirect(
      request.url,
      await flash(
        request,
        error(labelsCount.error, "Failed to fetch labels & reports count"),
      ),
    );
  }

  if (labelsReportsTableColDetails.error) {
    redirect(
      request.url,
      await flash(
        request,
        error(labelsCount.error, "Failed to fetch labels & reports count"),
      ),
    );
  }

  const addPreviewUrlToLabel = async (list: Array<LabelsReports> = []) => {
    if (!list?.length) return list;

    const signedUrlList = await Promise.all(
      list.map((label: LabelsReports) => {
        return !label.previewUrl && !process.env.AWS_BUCKET_NAME
          ? undefined
          : generateSignedUrl(
              s3Client,
              process.env.AWS_BUCKET_NAME as string,
              label.previewUrl as string,
            );
      }),
    );
    return list.map((label: LabelsReports, index: number) => {
      return {
        ...label,
        previewSignedUrl: signedUrlList[index],
      };
    });
  };

  if (labelsReports?.data?.length) {
    labelsReports.data = await addPreviewUrlToLabel(labelsReports.data || []);
  }

  if (
    (moduleConfig?.data?.configuration as LabelModuleConfigType)
      ?.defaultTemplateList?.length
  ) {
    ((moduleConfig as any).data.configuration as any).defaultTemplateList =
      await addPreviewUrlToLabel(
        (moduleConfig?.data?.configuration as LabelModuleConfigType)
          ?.defaultTemplateList,
      );
  }

  return json({
    companyId,
    count: labelsCount.count || 0,
    labelsReports: (labelsReports.data as Array<LabelsReports>) ?? [],
    selectedtab,
    moduleConfig: moduleConfig?.data?.configuration as LabelModuleConfigType,
    labelsReportsTableColDetails: labelsReportsTableColDetails?.data,
  });
}

export default function Home() {
  const { labelsReports, moduleConfig, count, labelsReportsTableColDetails } =
    useLoaderData<typeof loader>();
  const [params, setParams] = useUrlParams();
  const [showCreateNewModal, setShowCreateNewModal] = useState(false);

  const tab = params.get("tab") || HomeTabMap.DASHBOARD;
  const defaultTab = tab
    ? (HomeTabMap as { [key: string]: string })[tab.toUpperCase()]
    : HomeTabMap.DASHBOARD;

  const [currentTab, setCurrentTab] = useState(defaultTab);

  const viewMode = (params.get("view") as labelViewMode) || labelViewMode.List;

  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
    setParams({ tab: tabName });
  };

  return (
    <>
      <div className="py-[26px] px-[50px]">
        {/* <div className="flex items-center">
          <Link
            to={"/"}
            className="text-accent text-base leading-[20px] tracking-wider mr-[5px] h-[24px] w-[24px] flex items-center justify-center"
          >
            <HiOutlineArrowLeft />
          </Link>
          <ul className="flex items-center mx-[-2px]">
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
                <HiOutlineChevronRight />
              </span>
            </li>
            <li className="px-2">
              <span className="text-accent text-sm leading-[20px] tracking-wider">
                Labels & reports
              </span>
            </li>
          </ul>
        </div> */}
        <div className="flex items-center gap-2">
          <WebArrowLeft />
          <Breadcrumbs />
        </div>
        <div className="mt-[16px] flex justify-between h-[56px]">
          <h2 className="text-[32px] text-accent leading-[36px] font-semibold tracking-wider w-[calc(100%_-_160px)]">
            Home
          </h2>
          {currentTab === HomeTabMap.DASHBOARD && (
            <Button
              variant="ghost"
              className="rounded-[100px] font-normal border border-stroke w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-accent"
              leftIcon={<HiPlus size={20} />}
              onClick={() => setShowCreateNewModal(true)}
            >
              Create New
            </Button>
          )}

          <LabelCreateNew
            isOpen={showCreateNewModal}
            onCancel={() => setShowCreateNewModal(false)}
          />
        </div>
        <Tabs
          defaultValue={currentTab}
          onValueChange={handleTabChange}
          value={currentTab}
        >
          <TabsList aria-label="List of tabs">
            <TabsTrigger value={HomeTabMap.DASHBOARD}>Dashboard</TabsTrigger>
            <TabsTrigger value={HomeTabMap.TEMPLATES}>Templates</TabsTrigger>
            <TabsTrigger value={HomeTabMap.FAVORITES}>Favorites</TabsTrigger>
            <TabsTrigger value={HomeTabMap.MYPROJECTS}>My projects</TabsTrigger>
            <TabsTrigger value={HomeTabMap.HISTORY}>History</TabsTrigger>
            <TabsTrigger value={HomeTabMap.WORKFLOWS}>Workflow</TabsTrigger>
            <TabsTrigger value={HomeTabMap.ARCHIVES}>Archive</TabsTrigger>
          </TabsList>
          <TabsContent value={HomeTabMap.DASHBOARD} className="pt-[32px]">
            <Dashboard
              LRList={labelsReports || []}
              LRColDetails={labelsReportsTableColDetails}
              quickCreateList={moduleConfig?.defaultTemplateList || []}
              viewMode={viewMode}
              onSeeAllClick={() => handleTabChange(HomeTabMap.TEMPLATES)}
              labelsCount={(count as number) || 0}
            />
          </TabsContent>
          <TabsContent value={HomeTabMap.TEMPLATES} className="pt-[20px]">
            <Templates LRList={moduleConfig?.defaultTemplateList || []} />
          </TabsContent>
          <TabsContent value={HomeTabMap.FAVORITES} className="pt-[20px]">
            <Favorites
              LRList={labelsReports?.filter((l) => l?.isFavorite) || []}
            />
          </TabsContent>
          <TabsContent value={HomeTabMap.MYPROJECTS} className="pt-[20px]">
            <MyProjects LRList={labelsReports || []} />
          </TabsContent>
          <TabsContent value={HomeTabMap.HISTORY} className="pt-[20px]">
            <History />
          </TabsContent>
          <TabsContent value={HomeTabMap.WORKFLOWS} className="pt-[20px]">
            <Workflow />
          </TabsContent>
          <TabsContent value={HomeTabMap.ARCHIVES} className="pt-[20px]">
            <Archives
              LRList={labelsReports?.filter((l) => l?.isArchived) || []}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
