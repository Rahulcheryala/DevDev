import { useEffect, useState } from "react";
import type { MarkerSdk } from "@marker.io/browser";
import markerSDK from "@marker.io/browser";

export default function useMarkerio(projectId: string) {
  const [widget, setWidget] = useState<MarkerSdk | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure client-side execution
      markerSDK.loadWidget({ project: projectId }).then(setWidget);
    }
  }, [projectId]);

  return widget;
}
