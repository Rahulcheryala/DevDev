import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { requirePermissions } from "~/services/auth/auth.server";
import { getModuleConfig } from "~/modules/shared";
import { populateSignedUrlInList } from "~/modules/shared/shared.server";
import { s3Client } from "~/lib/s3";
import { flash } from "~/services/session.server";
import { error } from "~/utils/result";
import {
  PreviewFont,
  FontList,
} from "~/modules/access-settings/ui/font-manager";
import { useLoaderData } from "@remix-run/react";
import { type ApplicationFontType } from "~/modules/access-settings";
import { useState } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const { client } = await requirePermissions(request, {
    view: "users",
    role: "employee",
  });

  const fonts = await getModuleConfig(client, "fonts");

  if (fonts.error) {
    redirect(
      request.url,
      await flash(request, error(fonts.error, "Failed to fetch details")),
    );
  }

  // populate s3 signedUrl in assetUrl for fontsList and return whole object data
  const fontsList = (await populateSignedUrlInList(
    s3Client,
    fonts?.data?.configuration as Array<ApplicationFontType>,
    "assetUrl",
    undefined,
    process.env.AWS_XCELPROS_ASSETS_BUCKET_NAME,
  )) as Array<ApplicationFontType>;

  return json({
    data: fontsList ?? [],
    count: fontsList.length ?? 0,
  });
}

export default function ApplicationFonts() {
  const { data, count } = useLoaderData<typeof loader>();
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const [filteredFontCount, setFilteredFontCount] = useState<number>();

  return (
    <div className="pt-6">
      <div className="grid grid-cols-2 gap-x-10">
        <div className="pr-8">
          <div>
            <h4 className="text-lg font-medium mb-3">
              Fonts{" "}
              {typeof filteredFontCount == "number" && `(${filteredFontCount})`}
            </h4>
            {filteredFontCount === count && (
              <h5 className="text-sm text-secondary">All Fonts</h5>
            )}
          </div>
          <div className="pt-8">
            <FontList
              data={data}
              count={count}
              origin={"application"}
              onFontClick={(font) => setSelectedFont(font)}
              onSearch={(fontCount) => setFilteredFontCount(fontCount)}
            />
          </div>
        </div>
        <PreviewFont selectedFont={selectedFont} />
      </div>
    </div>
  );
}
