import axios from "axios";
import imageCompression from "browser-image-compression";
import { path } from "./path";
import { toast } from "@zeak/react";

export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== null && obj[key] !== undefined) {
      // Ensure null or undefined values are not appended
      formData.append(key, obj[key]);
    }
  });
  return formData;
}

export function base64ToFile(base64String: string, filename: string) {
  if (base64String) {
    // Extract the base64 content from the data URL if present
    const base64Content = base64String.split(",")[1];

    // Convert the base64 string to a byte array
    const byteCharacters = atob(base64Content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create a blob from the byte array and set the appropriate type
    const mimeType = base64String.match(/data:([^;]*);/)?.[1];
    const blob = new Blob([byteArray], { type: mimeType });

    // Create a file from the blob
    const file = new File([blob], filename, { type: mimeType });

    return file;
  }
  return null;
}

export function formatStringArray(arr: Array<string>) {
  if (arr.length === 0) {
    return "";
  } else if (arr.length === 1) {
    return arr[0];
  } else if (arr.length === 2) {
    return arr.join(" and ");
  } else {
    const lastElement = arr.pop(); // Remove the last element from the array
    return `${arr.join(", ")} and ${lastElement}`;
  }
}

export async function compressImage(file: File) {
  const options = {
    maxSizeMB: 1, // Max size in MB
    maxWidthOrHeight: 512, // Max width or height in pixels
    useWebWorker: true, // Use web worker for faster compression
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
}

export async function uploadFileToS3FromBrowser(
  files: Array<File> = [],
  folderName: string
) {
  if (files.length) {
    const formData = new FormData();
    formData.append("folder", folderName);
    files.forEach((file) => {
      formData.append("files", file);
    });

    const result = await axios({
      method: "post",
      url: path.to.api.s3Upload,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (result?.data?.files?.length) {
      return result.data.files;
    }
  }
  return null;
}

export function isValidJson(jsonString: string) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
}

export async function axiosApiCall(
  method: string,
  actionUrl: string,
  data?: any,
  options?: {
    headers?: any;
    useDefaultErrorHandling: boolean;
  }
) {
  try {
    const result = await axios({
      method,
      url: actionUrl,
      data,
      headers: options?.headers || {
        "Content-Type": "multipart/form-data",
      },
    });
    return result?.data;
  } catch (e: any) {
    if (!options?.useDefaultErrorHandling) throw e;
    toast.error(e?.message || e?.msg || JSON.stringify(e));
  }
}

export function pick(o: Record<string, any>, props: Array<string>) {
  const result = props.reduce((result: Record<string, any>, prop: string) => {
    if (o.hasOwnProperty(prop)) {
      result[prop] = o[prop];
    }
    return result;
  }, {});
  return result;
}
