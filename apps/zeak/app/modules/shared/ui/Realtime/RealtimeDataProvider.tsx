import idb from "localforage";
import { useEffect } from "react";
import { useUser } from "~/hooks";
import { useSupabase } from "~/lib/supabase";
import { usePeople } from "~/stores";

let hydratedFromIdb = false;
let hydratedFromServer = false;

const RealtimeDataProvider = ({ children }: { children: React.ReactNode }) => {
  const { supabase, accessToken } = useSupabase();
  // const {
  //   companies[0]: { id: companyId },
  // } = useUser();

  const userData = useUser();
  const { company } = userData
  const companyId = company[0]?.id

  const [, setPeople] = usePeople();

  const hydrate = async () => {
    if (!hydratedFromIdb) {
      hydratedFromIdb = true;

      idb.getItem("people").then((data) => {
        // @ts-ignore
        if (data && !hydratedFromServer) setPeople(data, true);
      });
    }

    if (!supabase || !accessToken) return;

    const [people] = await Promise.all([
      supabase
        .from("employees")
        .select("id, name, avatarUrl")
        .eq("companyId", companyId)
        .order("name"),
    ]);

    if (people.error) {
      throw new Error("Failed to fetch core data");
    }

    hydratedFromServer = true;
    // @ts-ignore
    setPeople(people.data ?? []);
  };

  useEffect(() => {
    if (!companyId) return;
    hydrate();

    if (!supabase || !accessToken) return;
    supabase.realtime.setAuth(accessToken);
    const channel = supabase
      .channel("realtime:core")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "employee",
        },
        async (payload) => {
          if ("companyId" in payload.new && payload.new.companyId !== companyId)
            return;
          // TODO: there's a cleaner way of doing this, but since customers and suppliers
          // are also in the users table, we can't automatically add/update/delete them
          // from our list of employees. So for now we just refetch.
          const { data } = await supabase
            .from("employees")
            .select("id, name, avatarUrl")
            .eq("companyId", companyId)
            .order("name");
          if (data) {
            // @ts-ignore
            setPeople(data);
          }
        },
      )
      .subscribe();

    return () => {
      if (channel) supabase?.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, accessToken, companyId]);

  return <>{children}</>;
};

export default RealtimeDataProvider;
