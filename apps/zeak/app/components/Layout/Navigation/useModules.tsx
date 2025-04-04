
import { useMount } from "@zeak/react";
import { useFetcher } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import type { getModuleConfig } from "~/modules/shared";
import { path } from "~/utils/path";

export function useModules() {
  const abilityFetcher =
    useFetcher<Awaited<ReturnType<typeof getModuleConfig>>>();

  useMount(() => {
    abilityFetcher.load(path.to.api.sidebarMenu);
  });

  const options: any = useMemo(
    () =>
      abilityFetcher.data?.data ? abilityFetcher.data?.data?.configuration : [],
    [abilityFetcher.data],
  );

  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (options && options.length) sidebarMenuSetup(options);
  }, [options]);

  const sidebarMenuSetup = (options: any) => {
    const m = options.map((item: any) => {
      return {
        permission: item.permission,
        name: item.name,
        to: item.to,
        icon: () => (
          <img
            src={item.icon.src}
            alt={item.icon.alt}
            className={item.icon.className}
          />
        ),
      };
    });
    setModules(m);
  };


  return modules;
}
