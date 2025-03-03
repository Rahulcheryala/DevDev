import type { Database } from "@zeak/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import { sanitize } from "~/utils/supabase";
import type { User } from "../users";

export async function getAccount(client: SupabaseClient<Database>, id: string) {
  return client.from("user").select("*").eq("id", id).single();
}

export async function updateAvatar(
  client: SupabaseClient<Database>,
  userId: string,
  avatarUrl: string | null,
) {
  return client
    .from("user")
    .update(
      sanitize({
        avatarUrl,
      }),
    )
    .eq("id", userId);
}

export async function updatePublicAccount(
  client: SupabaseClient<Database>,
  account: Partial<User> & { id: string },
) {
  return client.from("user").update(sanitize(account)).eq("id", account.id);
}
