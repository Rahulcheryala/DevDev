import type { User } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { admin, claims, permissions, moduleConfiguration } from "./seed/index";
import type { Database } from "./types";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_API_URL!,
  process.env.SUPABASE_ANON_PUBLIC!
)

const supabaseAdmin = createClient<Database>(
  process.env.SUPABASE_API_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

const getUserId = async (): Promise<string> => {
  const existingUserId = await supabaseAdmin.auth.admin
    .listUsers()
    .then(
      ({ data }) =>
        data.users.find((user: User) => user?.email! === admin.email)?.id,
    );

  if (existingUserId) return existingUserId;

  const newUserId = await supabaseAdmin.auth.admin
    .createUser({
      email: admin.email,
      password: admin.password,
      email_confirm: true,
    })
    .then(({ data }) => data.user?.id)
    .catch((e) => {
      throw e;
    });

  if (newUserId) return newUserId;

  throw new Error("Could not create or get user");
};

async function seed() {
  const id = await getUserId();

  const upsertAdmin = await supabaseAdmin.from("user").upsert([
    {
      id,
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
      permissions,
    },
  ]);
  if (upsertAdmin.error) throw upsertAdmin.error;

  // give the admin user all the claims
  await supabaseAdmin.auth.admin.updateUserById(id, {
    app_metadata: claims,
  });

  const deleteModuleConfiguration = await supabaseAdmin
    .from("moduleConfiguration")
    .delete()
    .neq("id", 0);
  if (deleteModuleConfiguration.error) throw deleteModuleConfiguration.error;

  Object.keys(moduleConfiguration).forEach(async (key: any) => {
    if (key) {
      const insertModuleConfiguration = await supabaseAdmin
        .from("moduleConfiguration")
        .insert({
          name: key,
          configuration:
            moduleConfiguration[key as keyof typeof moduleConfiguration],
        });
      if (insertModuleConfiguration.error)
        throw insertModuleConfiguration.error;
    }
  });

  await supabase.functions.invoke('track-schema-changes')

  console.log(`Database has been seeded. 🌱\n`);
  console.log(
    `Admin user is 👇 \n🆔: ${id}\n📧: ${admin.email}\n🔑: ${admin.password}`,
  );
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
