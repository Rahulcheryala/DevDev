import type { Database } from "@zeak/database";
import { redis } from "@zeak/redis";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { CustomFieldsTableType } from "../settings";
import type { S3Client } from "@aws-sdk/client-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function assign(
  client: SupabaseClient<Database>,
  args: {
    id: string;
    table: string;
    assignee: string;
  },
) {
  const { id, table, assignee } = args;

  return (
    client
      // @ts-ignore
      .from(table)
      .update({ assignee: assignee ? assignee : null })
      .eq("id", id)
  );
}

export async function getCustomFieldsCacheKey(args?: {
  companyId?: string;
  module?: string;
  table?: string;
}) {
  return `customFields:${args?.companyId}:${args?.module ?? ""}:${
    args?.table ?? ""
  }`;
}

export async function getCustomFieldsSchemas(
  client: SupabaseClient<Database>,
  args?: {
    companyId: string;
    module?: string;
    table?: string;
  },
) {
  const key = await getCustomFieldsCacheKey(args);
  let schema: CustomFieldsTableType[] | null = null;

  try {
    schema = JSON.parse((await redis.get(key)) || "null");
  } finally {
    if (schema) {
      return {
        data: schema as CustomFieldsTableType[],
        error: null,
      };
    }

    const query = client.from("customFieldTables").select("*");

    if (args?.companyId) {
      query.eq("companyId", args.companyId);
    }

    if (args?.module) {
      query.eq("module", args.module);
    }

    if (args?.table) {
      query.eq("table", args.table);
    }

    const result = await query;
    if (result.data) {
      await redis.set(key, JSON.stringify(result.data));
    }

    return result;
  }
}

// Function to handle the multipart upload
export async function uploadFile(
  s3Client: S3Client,
  file: any,
  bucketName: string,
  key: string,
) {
  try {
    const uploader = new Upload({
      client: s3Client,
      params: {
        Bucket: bucketName,
        Key: key,
        Body: file,
      },
    });

    // Optional: Monitor upload progress
    uploader.on("httpUploadProgress", (progress) => {
      console.log(`Upload progress: ${progress.loaded}/${progress.total}`);
    });

    // Perform the upload
    await uploader.done();
    console.log("File uploaded successfully!");
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

export function generateSignedUrl(
  s3Client: S3Client,
  bucketName: string,
  objectKey: string,
  expiresIn = 24 * 3600,
) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  try {
    return getSignedUrl(s3Client, command, { expiresIn });
  } catch (error) {
    console.error("Error generating signed URL", error);
    return null;
  }
}

export const populateSignedUrlInList = async (
  s3Client: S3Client,
  list: Array<any> = [],
  s3keyName: string,
  signedUrlKeyName?: string,
  bucketName?: string,
) => {
  const urlPromisesList: Array<Promise<string> | null> = [];
  list?.forEach((item, index: number) => {
    urlPromisesList[index] = item[s3keyName]
      ? generateSignedUrl(
          s3Client,
          bucketName ?? (process.env.AWS_BUCKET_NAME as string),
          item[s3keyName],
        )
      : null;
  });

  const urlList = await Promise.all(urlPromisesList);
  const detail = (list ?? []).map((c, i) => ({
    ...c,
    [signedUrlKeyName || s3keyName]: urlList[i],
  }));

  return detail;
};
