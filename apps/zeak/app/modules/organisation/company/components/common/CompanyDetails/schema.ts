import { z } from "zod";

export const editCompanyDetailsSchema = z.object({
  name: z.string().min(1).max(25),
  code: z.string().min(1),
  isActive: z.boolean(),
  purpose: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),

});

export type EditCompanyDetailsSchema = z.infer<typeof editCompanyDetailsSchema>;
