import { useMount } from "@zeak/react";
import { useFetcher } from "@remix-run/react";
import { useMemo, useCallback } from "react";
import { path } from "~/utils/path";
import type { getViews } from "./view.service";

export const useViews = (
  table: string = "None",
  viewType: "my" | "sharedWithMe" | "public",
) => {
  const viewFetcher = useFetcher<typeof getViews>();

  const fetchViews = useCallback(() => {
    viewFetcher.load(
      `${path.to.api.getViews}?table=${table}&viewType=${viewType}`,
    );
  }, [table, viewType, viewFetcher]);

  useMount(fetchViews);

  const options = useMemo(
    () => (viewFetcher.data ? viewFetcher.data : []),
    [viewFetcher.data],
  );

  return { options, refetch: fetchViews };
};
