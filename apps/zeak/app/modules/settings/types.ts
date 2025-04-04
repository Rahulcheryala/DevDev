import type { getCompanies } from "./settings.service";

export type Company = NonNullable<
  Awaited<ReturnType<typeof getCompanies>>["data"]
>[number];
