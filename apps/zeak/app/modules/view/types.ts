import type { privacyType, tableNameType } from "./view.model";

import type { getViews } from "./view.service";

export type Views = NonNullable<
  Awaited<ReturnType<typeof getViews>>["data"]
>[number] & { previewSignedUrl?: string };

export type PrivacyType = (typeof privacyType)[number];

export type TableNameType = (typeof tableNameType)[number];
