import { PassThrough } from "stream";
import { writeAsyncIterableToWritable } from "@remix-run/node";
import { uploadFile } from "./shared.server";
import { s3Client } from "~/lib/s3";

const uploadStream = (key: string) => {
  const pass = new PassThrough();
  return {
    writeStream: pass,
    promise: uploadFile(
      s3Client,
      pass,
      process.env.AWS_BUCKET_NAME as string,
      key,
    ),
  };
};

export async function uploadStreamToS3(data: any, filename: string) {
  const stream = uploadStream(filename);
  await writeAsyncIterableToWritable(data, stream.writeStream);
  await stream.promise;
  return filename;
}
