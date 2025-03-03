import { z } from "zod";

export const companyInfoValidator = z
  .object({
    name: z.string().min(1, { message: "Company name is required" }),
    companyCode: z.string().min(1, { message: "Company code is required" }),
    domainUrl: z.string().url("Must be a valid URL"),
    website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    status: z.string().optional(),
    effectivityStartDate: z.coerce.date().refine((data) => data > new Date(), {
      message: "Start date must be in the future",
    }),
    effectivityEndDate: z.coerce.date(),
    dnbNumber: z.string().optional(),
    bbbNumber: z.string().optional(),
    fiscalYearStart: z.coerce.date().optional(),
    fiscalYearEnd: z.coerce.date().optional(),
  })
  .refine(
    (data) =>
      data.effectivityStartDate &&
      data.effectivityEndDate &&
      data.effectivityStartDate < data.effectivityEndDate,
    {
      message: "End date must be after start date",
      path: ["effectivityEndDate"],
    }
  );

export const contactInfoValidator = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email("Must be a valid email"),
  phone: z.string().min(1, { message: "Phone is required" }),
});

export const addressInfoValidator = z.object({
  isActive: z.boolean(),
  addressName: z.string().min(1, { message: "Address Name is required" }),
  isDefault: z.boolean(),
  purpose: z.string().min(1, { message: "Purpose is required" }),
  address1: z.string().min(1, { message: "Address Line 1 is required" }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  contacts: z.array(contactInfoValidator).optional(),
});
