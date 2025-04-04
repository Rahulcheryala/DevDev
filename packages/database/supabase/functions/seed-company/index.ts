import { serve } from "https://deno.land/std@0.175.0/http/server.ts";
import { DB, getConnectionPool, getDatabaseClient } from "../lib/database.ts";

import { corsHeaders } from "../lib/headers.ts";
import { integrations } from "../lib/seed.ts";
import { getSupabaseServiceRole } from "../lib/supabase.ts";
import { Database } from "../lib/types.ts";

const pool = getConnectionPool(1);
const db = getDatabaseClient<DB>(pool);

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  const { companyId: id, userId, employeeTypeId } = await req.json();

  try {
    if (!id) throw new Error("Payload is missing id");
    if (!userId) throw new Error("Payload is missing userId");
    const companyId = id as string;
    const supabaseClient = getSupabaseServiceRole(
      req.headers.get("Authorization"),
    );

    await db.transaction().execute(async (trx) => {
      // await trx
      //   .insertInto("companyUsers")
      //   .values([{ userId, companyId }])
      //   .execute();

      // get the modules
      const modules = await trx.selectFrom("modules").select("name").execute();

      // create employee type permissions for admin
      const employeeTypePermissions = modules.reduce((acc, module) => {
        if (module.name) {
          acc.push({
            employeeTypeId: employeeTypeId,
            module: module.name,
            create: [companyId],
            update: [companyId],
            delete: [companyId], 
            view: [companyId],
          });
        }
        return acc;
      }, [] as Database["public"]["Tables"]["employeeTypePermission"]["Insert"][]);

      // insert employee type permissions
      await trx
        .insertInto("employeeTypePermission")
        .values(employeeTypePermissions)
        .execute();

      // // insert employee
      // await trx
      //   .insertInto("employee")
      //   .values([
      //     {
      //       id: String(userId),
      //       employeeTypeId,
      //       companyId,
      //     },
      //   ])
      //   .execute();

      // await trx
      //   .insertInto("integration")
      //   .values(integrations.map((i) => ({ ...i, companyId })))
      //   .execute();

      const user = await supabaseClient
        .from("user")
        .select("permissions")
        .eq("id", userId)
        .single();
      if (user.error) throw new Error(user.error.message);

      const currentPermissions = (user.data?.permissions ?? {}) as Record<
        string,
        number[]
      >;
      const newPermissions = { ...currentPermissions };

      modules.forEach(({ name }) => {
        const module = name?.toLowerCase();
        if (`${module}_view` in newPermissions) {
          newPermissions[`${module}_view`].push(companyId);
        } else {
          newPermissions[`${module}_view`] = [companyId];
        }

        if (`${module}_create` in newPermissions) {
          newPermissions[`${module}_create`].push(companyId);
        } else {
          newPermissions[`${module}_create`] = [companyId];
        }

        if (`${module}_update` in newPermissions) {
          newPermissions[`${module}_update`].push(companyId);
        } else {
          newPermissions[`${module}_update`] = [companyId];
        }

        if (`${module}_delete` in newPermissions) {
          newPermissions[`${module}_delete`].push(companyId);
        } else {
          newPermissions[`${module}_delete`] = [companyId];
        }
      });

      const { error } = await supabaseClient
        .from("user")
        .update({ permissions: newPermissions })
        .eq("id", userId);
      if (error) throw new Error(error.message);
    });

    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify(err), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
