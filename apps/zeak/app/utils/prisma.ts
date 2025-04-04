import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { SUPABASE_DIRECT_POSTGRES_URL } from "~/config/env";

export const fetchCustomSchemaPrismaInstance = (schema: string) => {
  return new PrismaClient({
    adapter: new PrismaPg(new pg.Pool({ connectionString: SUPABASE_DIRECT_POSTGRES_URL }), { schema }),
  });
};
