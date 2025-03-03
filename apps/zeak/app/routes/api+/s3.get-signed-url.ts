import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { s3Client } from "~/lib/s3";
import { generateSignedUrl } from "~/modules/shared/shared.server";
import { error } from "~/utils/result";

// Post request is required to be sent
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const bucketName = process.env.AWS_BUCKET_NAME as string;
  const keyList = formData.getAll("keyList") as Array<string>;
  const expiresIn = formData.get("expiresIn");

  if (!keyList)
    return json(error(null, "No key provided"), {
      status: 400,
    });

  const getSignedUrlPromises = keyList.map(async (key: string) => {
    return generateSignedUrl(
      s3Client,
      bucketName,
      key,
      expiresIn ? Number(expiresIn) : undefined,
    );
  });

  try {
    const urlList = await Promise.all(getSignedUrlPromises);
    return json({ data: urlList });
  } catch (error: any) {
    return json(
      { error: error?.message || error.msg || JSON.stringify(error) },
      { status: 500 },
    );
  }
};
