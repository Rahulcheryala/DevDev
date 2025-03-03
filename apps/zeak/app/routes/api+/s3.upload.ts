import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { uploadStreamToS3 } from "~/modules/shared/s3.server";
import Busboy from "busboy";
import { Readable } from "stream";

// Helper function for file uploads to S3 with folder support
const handleFileUpload = (
  stream: Readable,
  folder: string,
  filename: string,
) => {
  const filePath = `${folder}/${filename}`; // Construct the file path in S3
  return uploadStreamToS3(stream, filePath);
};

// Convert the request body to a stream
function requestToStream(request: Request): Readable {
  const stream = new Readable();
  stream._read = () => {};
  request.arrayBuffer().then((buffer) => {
    stream.push(Buffer.from(buffer));
    stream.push(null);
  });
  return stream;
}

export const action: ActionFunction = async ({ request }) => {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({
      headers: {
        ...request.headers,
        "content-type": request.headers.get("content-type"),
      } as any,
    });

    const fileStreams: {
      fieldname: string;
      file: Readable;
      filename: string;
    }[] = [];
    const promisesList: Array<Promise<any>> = [];
    let folder: string | undefined;

    busboy.on("file", async (fieldname, file, { filename }) => {
      if (fieldname === "files") {
        if (folder) {
          try {
            // Folder is already set, process the file immediately
            promisesList.push(handleFileUpload(file, folder, filename));
            // const url = await handleFileUpload(file, folder, filename);
            // fileUrls.push(url);
            file.resume();
          } catch (error) {
            console.error("Error uploading file:", error);
            reject(
              json(
                { success: false, message: "Failed to upload file" },
                { status: 500 },
              ),
            );
          }
        } else {
          // Folder not set yet, buffer the file
          const fileBuffer: Buffer[] = [];
          file.on("data", (data) => {
            fileBuffer.push(data);
          });
          file.on("end", () => {
            fileStreams.push({
              fieldname,
              file: Readable.from(Buffer.concat(fileBuffer)),
              filename,
            });
          });
        }
      } else {
        file.resume();
      }
    });

    busboy.on("field", async (fieldname, value) => {
      if (fieldname === "folder") {
        folder = value;
      }
    });

    busboy.on("finish", async () => {
      if (fileStreams?.length) {
        try {
          for (const { file, filename } of fileStreams) {
            promisesList.push(
              handleFileUpload(file, folder as string, filename),
            );
          }
          // Clear the buffered files array
          fileStreams.length = 0;
        } catch (error) {
          console.error("Error uploading file:", error);
          reject(
            json(
              { success: false, message: "Failed to upload file" },
              { status: 500 },
            ),
          );
        }
      }
      const fileList = await Promise.all(promisesList);
      if (fileList.length > 0) {
        resolve(json({ success: true, files: fileList }));
      } else {
        resolve(
          json(
            { success: false, message: "No files were uploaded." },
            { status: 400 },
          ),
        );
      }
    });

    busboy.on("error", (error) => {
      console.error("Failed to process form data:", error);
      reject(
        json(
          {
            success: false,
            message: "Error processing upload. Please try again later.",
          },
          { status: 500 },
        ),
      );
    });

    const stream = requestToStream(request);
    stream.pipe(busboy);
  });
};
