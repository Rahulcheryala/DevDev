import { z } from "zod";
import { zfd } from "zod-form-data";

export const standardFactorType = [
  "Hours/Piece",
  "Hours/100 Pieces",
  "Hours/1000 Pieces",
  "Minutes/Piece",
  "Minutes/100 Pieces",
  "Minutes/1000 Pieces",
  "Pieces/Hour",
  "Pieces/Minute",
  "Seconds/Piece",
  "Total Hours",
  "Total Minutes",
] as const;

export const employeeJobValidator = z.object({
  title: zfd.text(z.string().optional()),
  startDate: zfd.text(z.string().optional()),
  locationId: zfd.text(z.string().optional()),
  shiftId: zfd.text(z.string().optional()),
  managerId: zfd.text(z.string().optional()),
});

export const locationValidator = z
  .object({
    id: zfd.text(z.string().optional()),
    name: z.string().min(1, { message: "Name is required" }),
    addressLine1: z.string().min(1, { message: "Address is required" }),
    addressLine2: z.string().optional(),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    postalCode: z.string().min(1, { message: "Postal Code is required" }),
    countryCode: z.string().min(1, { message: "Country is required" }),
    timezone: z.string().min(1, { message: "Timezone is required" }),
    latitude: zfd.numeric(z.number().optional()),
    longitude: zfd.numeric(z.number().optional()),
  })
  .superRefine(({ latitude, longitude }, ctx) => {
    if ((latitude && !longitude) || (!latitude && longitude)) {
      ctx.addIssue({
        code: "custom",
        message: "Both latitude and longitude are required",
      });
    }
  });
