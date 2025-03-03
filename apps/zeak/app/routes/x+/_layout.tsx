import { Toaster, TooltipProvider, useMount } from "@zeak/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Outlet,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigation,
} from "@remix-run/react";
import NProgress from "nprogress";
import { useEffect, useMemo, useState } from "react";
import { IconSidebar, Topbar } from "~/components/Layout";
import { SupabaseProvider, getSupabase } from "~/lib/supabase";
import { getCompanies } from "~/modules/settings";
import type { getModuleConfig } from "~/modules/shared";
import { RealtimeDataProvider } from "~/modules/shared";
import {
  generateSignedUrl,
  getCustomFieldsSchemas,
  populateSignedUrlInList,
} from "~/modules/shared/shared.server";
import {
  getUser,
  getUserClaims,
  getUserDefaults,
} from "~/modules/users/users.server";
import {
  destroyAuthSession,
  requireAuthSession,
} from "~/services/session.server";
import { path } from "~/utils/path";

import type { ShouldRevalidateFunction } from "@remix-run/react";
import { useGlobalTableConfStore } from "~/stores";
import { s3Client } from "~/lib/s3";
import { toast, ToastContainer } from "react-toastify";
import { supabaseClient } from "~/lib/supabase/client";
import { FloatingAiButton } from "~/modules/shared/ui/FloatingAIButton";

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentUrl,
  defaultShouldRevalidate,
}) => {
  if (
    currentUrl.pathname.startsWith("/x/settings") ||
    currentUrl.pathname.startsWith("/x/users")
  ) {
    return true;
  }

  return defaultShouldRevalidate;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { accessToken, companyId, expiresAt, expiresIn, userId } =
    await requireAuthSession(request, { verify: false });

  // share a client between requests
  const client = getSupabase(accessToken);

  // parallelize the requests
  const [companies, user, claims, defaults] = await Promise.all([
    getCompanies(client, userId),
    // getCustomFieldsSchemas(client, { companyId }),
    getUser(client, userId),
    getUserClaims(userId),
    getUserDefaults(client, userId, companyId),
  ]);

  if (!claims || user.error || !user.data) {
    await destroyAuthSession(request);
  }

  const company = companies.data?.find((c) => c.id === companyId);

  const requiresOnboarding = !companies.data?.[0]?.name;
  if (requiresOnboarding) {
    throw redirect(path.to.onboarding.root);
  }

  // populate s3 signedUrl in avatarSignedUrl for user detail
  let userData: { avatarSignedUrl: string | null } = {
    ...user.data,
    avatarSignedUrl: null,
  };

  if (user?.data?.avatarUrl) {
    userData.avatarSignedUrl = await generateSignedUrl(
      s3Client,
      process.env.AWS_BUCKET_NAME as string,
      user.data.avatarUrl,
    );
  }

  // populate s3 signedUrl in logo for companyDetail
  const companyDetail = await populateSignedUrlInList(
    s3Client,
    companies?.data ?? [],
    "logo",
  );

  return json({
    session: {
      accessToken,
      expiresIn,
      expiresAt,
    },
    company,
    companies: companyDetail ?? [],
    customFields: [], // customFields.data ?? [],
    defaults: defaults.data,
    integrations: [],
    groups: [],
    permissions: claims?.permissions,
    role: claims?.role,
    user: userData,
  });
}

export default function AuthenticatedRoute() {
  const [menuPinned, setMenuPinned] = useState(false);
  const { session } = useLoaderData<typeof loader>();
  const location = useLocation();
  const isEditorView = location.pathname.includes("labels/editor");
  // const isLabelsHomeView = location.pathname.includes("labels-reports/home");
  // const isLabelsView = location.pathname.includes("labels-reports/");

  const transition = useNavigation();
  const [, setTableConf] = useGlobalTableConfStore();

  /* NProgress */
  useEffect(() => {
    if (
      (transition.state === "loading" || transition.state === "submitting") &&
      !NProgress.isStarted()
    ) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [transition.state]);

  /* Fetch table settings */
  const abilityFetcher =
    useFetcher<Awaited<ReturnType<typeof getModuleConfig>>>();

  useMount(() => {
    abilityFetcher.load(path.to.api.tableConf);
  });

  const options: any = useMemo(
    () =>
      abilityFetcher.data?.data
        ? abilityFetcher.data?.data?.configuration
        : null,
    [abilityFetcher.data],
  );

  useEffect(() => {
    if (options) {
      setTableConf(options);
    }
  }, [options, setTableConf]);

  useEffect(() => {
    const channel = supabaseClient
      .channel("public:notifications")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notfQueue" },
        (payload) => {
          if (payload.eventType === "INSERT" && payload.new?.webContent) {
            toast.success(payload.new.webContent);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            payload.new;
          }
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Subscribed to workflow_logs changes");
        }
      });

    // fetchNotifications();
    // Clean up the subscription on unmount
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);

  const handleMenuPinned = (value: boolean) => {
    if (value) {
      setMenuPinned(true);
    } else {
      setMenuPinned(false);
    }
  };

  const [, setSettingOpen] = useState(false);

  const handleSettingOpen = (value: boolean) => {
    setSettingOpen(value);
  };

  return (
    <SupabaseProvider session={session}>
      <RealtimeDataProvider>
        <TooltipProvider>
          <div className="h-screen min-h-[0px] basis-0 flex-1">
            {!isEditorView ? (
              <>
                <Topbar />
                <div
                  className={`flex h-[calc(100vh_-_96px)] overflow-hidden relative ${menuPinned ? "" : "pl-[80px]"
                    }`}
                //Removed conditional application of TW pl-380 when the settingOpen state is toggled ON
                >
                  {/* If the blue gradient banner is not present then change from h-[calc(100vh_-_96px)] to h-[calc(100vh_-_64px)] */}

                  <IconSidebar
                    onMenuPinned={handleMenuPinned}
                    onSettingClicked={handleSettingOpen}
                  />
                  <div className="w-full h-full pl-[12px] flex flex-col justify-between">
                    <div
                      className="h-full bg-[#F0F4FD] rounded-tl-[10px] overflow-y-auto overflow-x-hidden"
                      id="main-layout"
                    >
                      <Outlet />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-screen overflow-hidden">
                <Outlet />
              </div>
            )}
            <Toaster />
            <FloatingAiButton />
          </div>
          <ToastContainer theme="dark" />
        </TooltipProvider>
      </RealtimeDataProvider>
    </SupabaseProvider>
  );
}