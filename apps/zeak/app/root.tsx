// root.tsx
import { Button, Heading, toast } from "@zeak/react";
import { validator } from "@zeak/remix-validated-form";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useLocation,
  useRouteError,
  LiveReload,
} from "@remix-run/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { Analytics } from "@vercel/analytics/react";
import React, { useEffect } from "react";
import { getBrowserEnv } from "~/config/env";
import { getMode, setMode } from "~/services/mode.server";
import Background from "~/styles/background.css?url";
import NProgress from "~/styles/nprogress.css?url";
import CustomStyles from "~/styles/custom-style.css?url";
import Tailwind from "~/styles/tailwind.css?url";
import ReactFlow from "~/styles/react-flow.css?url";
import Filepond from "~/styles/filepond.css?url";
import ReactQuillCss from "~/styles/react-quill.css?url";
import SonnerCss from "~/styles/sonner.css?url";
import { error } from "~/utils/result";
import { useMode } from "./hooks/useMode";
import { getSessionFlash } from "./services/session.server";
import { modeValidator } from "./types/validators";
import useMarkerio from "./hooks/useMarkerio";
import i18nServer from "./i18n/i18next.server";
import { QueryProvider } from "./components/Providers";
import StoreProvider from "~/shared/StoreProvider";

export function links() {
  return [
    { rel: "stylesheet", href: Tailwind },
    { rel: "stylesheet", href: Background },
    { rel: "stylesheet", href: NProgress },
    { rel: "stylesheet", href: CustomStyles },
    { rel: "stylesheet", href: ReactFlow },
    { rel: "stylesheet", href: Filepond },
    { rel: "stylesheet", href: ReactQuillCss },
    { rel: "stylesheet", href: "/assets/theme.css" },
    { rel: "stylesheet", href: SonnerCss },
  ];
}

export const meta: MetaFunction = () => {
  return [
    {
      title: "XcelPros ERP",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const {
    POSTHOG_API_HOST,
    POSTHOG_PROJECT_PUBLIC_KEY,
    SUPABASE_API_URL,
    SUPABASE_ANON_PUBLIC,
    MARKER_PROJECT_ID,
  } = getBrowserEnv();

  const sessionFlash = await getSessionFlash(request);
  const locale = await i18nServer.getLocale(request);

  return json(
    {
      env: {
        POSTHOG_API_HOST,
        POSTHOG_PROJECT_PUBLIC_KEY,
        SUPABASE_API_URL,
        SUPABASE_ANON_PUBLIC,
        MARKER_PROJECT_ID,
      },
      mode: getMode(request),
      result: sessionFlash?.result,
      locale,
    },
    {
      headers: sessionFlash?.headers,
    },
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const validation = await validator(modeValidator).validate(
    await request.formData(),
  );

  if (validation.error) {
    return json(error(validation.error, "Invalid mode"), {
      status: 400,
    });
  }

  return json(
    {},
    {
      headers: { "Set-Cookie": setMode(validation.data.mode) },
    },
  );
}

function Document({
  children,
  title = "XcelPros ERP",
  mode = "dark",
  lang = 'en'
}: {
  children: React.ReactNode;
  title?: string;
  mode?: "light" | "dark";
  lang: string
}) {
  const location = useLocation();
  const isLogin = location.pathname.includes("login");
  return (
    <html lang={lang} className={`${mode} h-full overflow-hidden`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body className={`h-full ${isLogin ? "bg-white" : "bg-background"}`}>
        {children}

        <ScrollRestoration />
        <Scripts />
        {/* <LiveReload /> */}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}

export default function App() {
  const loaderData = useLoaderData<typeof loader>();
  const env = loaderData?.env ?? {};
  const result = loaderData?.result;

  const markerioWidget = useMarkerio(env.MARKER_PROJECT_ID as string);

  const handleFeedback = () => {
    if (markerioWidget) {
      markerioWidget.capture("fullscreen");
    }
  };

  /* Toast Messages */
  useEffect(() => {
    if (result?.success === true) {
      toast.success(result.message);
    } else if (result?.message) {
      toast.error(result.message);
    }
  }, [result]);

  /* Dark/Light Mode */
  const mode = useMode();

  return (
    <Document lang={loaderData?.locale ?? "en"} mode={mode}>
      <button onClick={handleFeedback} className="hidden">
        Report Feedback
      </button>
      <QueryProvider>
        <StoreProvider>
          <Outlet />
        </StoreProvider>
        <ReactQueryDevtools />
      </QueryProvider>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.env = ${JSON.stringify(env)}`,
        }}
      />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const loaderData = useLoaderData<typeof loader>();


  const message = isRouteErrorResponse(error)
    ? (error.data.message ?? error.data)
    : error instanceof Error
      ? error.message
      : String(error);

  return (
    <Document lang={loaderData?.locale ?? "en"} title="Error!">
      <div className="dark">
        <div className="flex flex-col w-full h-screen bg-zinc-900 items-center justify-center space-y-4 ">
          <img
            src="/zeak-logo-light.png"
            alt="Zeak Logo"
            className="block max-w-[60px]"
          />
          <Heading size="h1">Something went wrong</Heading>
          <p className="text-muted-foreground max-w-2xl">{message}</p>
          <Button
            onClick={() => (window.location.href = "/")}
            variant={"primary"}
          >
            Back Home
          </Button>
        </div>
      </div>
    </Document>
  );
}
