import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useEffect } from "react";

import {
  commitAuthSession,
  refreshAuthSession,
} from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { path } from "~/utils/path";

// this is just for supabase provider refresh
export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const authSession = await refreshAuthSession(request);

  return json(
    { success: true },
    {
      headers: {
        "Set-Cookie": await commitAuthSession(request, {
          authSession,
        }),
      },
    }
  );
}


export default function RefreshSession() {
  const fetcher = useFetcher<{
    success: boolean;
  }>();

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.submit({}, { method: "POST" });
    }
  }, [fetcher]);

  useEffect(() => {
    if (fetcher.data?.success) {
      window.location.href = path.to.authenticatedRoot;
    }
  }, [fetcher.data]);

  return <div className="h-screen w-full flex items-center justify-center">
    <p className="text-center">Refreshing session...</p>
  </div>
}

export function ErrorBoundary() {
  const navigate = useNavigate();
  navigate(path.to.authenticatedRoot);
  return <p>here</p>;
}
