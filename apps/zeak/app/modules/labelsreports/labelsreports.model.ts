import { z } from "zod";
import { zfd } from "zod-form-data";

export const AWS_LABELS_FOLDER_NAME = "labelsReports";

export const labelStatusType = [
  "Draft",
  "Submitted",
  "Approved",
  "Not Approved",
  "Hold",
] as const;

export const labelType = ["Document", "Label"] as const;

export const labelValidator = z.object({
  id: zfd.text(z.string().optional()),
  name: z.string().min(2, { message: "Name is required" }),
  width: zfd.numeric(z.number().min(0, { message: "Width are required" })),
  height: zfd.numeric(z.number().min(0, { message: "Height are required" })),
  size: z.string().min(2, { message: "Size selection is required" }),
  configuration: z.any().optional(),
  previewUrl: z.string().optional(),
  labelType: z.string().optional(),
});

export const editLabelValidator = z.object({
  id: zfd.text(z.string().min(1, { message: "Id is required" })),
  name: z.string().min(2, { message: "Name is required" }).optional(),
  width: zfd
    .numeric(z.number().min(0, { message: "Width are required" }))
    .optional(),
  height: zfd
    .numeric(z.number().min(0, { message: "Height are required" }))
    .optional(),
  size: z.string().min(2, { message: "Size selection is required" }).optional(),
  configuration: z.any().optional(),
  previewUrl: z.string().optional(),
  isFavorite: z.string().optional(),
  flashSuccessMsg: z.string().optional(),
  status: z.string().optional(),
});

export const DocType = ["Label", "Document"];

export type StatusColor =
  | "default"
  | "orange"
  | "green"
  | "destructive"
  | "orange";

export const labelStatusColorMap: { [key: string]: StatusColor } = {
  Draft: "default",
  Submitted: "orange",
  Approved: "green",
  "Not Approved": "destructive",
  Hold: "orange",
};

export enum labelViewMode {
  List = "List",
  GridCard = "GridCard",
}

export const DEFAULT_PREVIEW_URL =
  "labelsReports/1715094178593_Hazard-1-cot456ame0l02mvqhfrg.png";

export const removeLabelValidator = z.object({
  ids: z.string().min(2, { message: "Id is required" }),
});

export const commentValidator = z.object({
  functionName: z.string().min(1, { message: "Function name is required" }),
  args: z.any().optional(),
});
