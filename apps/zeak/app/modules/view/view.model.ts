import { z } from "zod";
import { zfd } from "zod-form-data";

export const privacyTypeMap = {
  Public: "Public",
  Private: "Private",
} as const;

export const privacyType = [
  privacyTypeMap.Private,
  privacyTypeMap.Public,
] as const;

export const tableNameType = [
  "None",
  "LabelsReports",
  "Company",
  "Team",
  "Department",
] as const;

export const viewValidator = z.object({
  id: zfd.text(z.string().optional()),
  name: z.string().min(2, { message: "Name is required" }).optional(),
  privacy: z.enum(privacyType).optional(),
  entity: z.enum(tableNameType).optional(),
  sharePreference: z.string().optional(),
  companyId: z.string(),
  params: z.any().optional(),
  tableConf: z.any().optional(),
  sharedWith: z
    .string()
    .optional()
    .transform((shareValue) => {
      if (shareValue) {
        try {
          return JSON.parse(shareValue);
        } catch (e) {
          return [];
        }
      }
      return [];
    })
    .refine((shareValue) => Array.isArray(shareValue), {
      message: "Share must be an array",
    }),
});
