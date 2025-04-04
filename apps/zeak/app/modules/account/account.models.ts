import { z } from "zod";
import { zfd } from "zod-form-data";

export const onboardingValidator = z.object({
  companyName: z
    .string()
    .trim()
    .optional(),
  email: z.string().trim().email({ message: "Email is required" }),
  name: z.string().trim().min(1, { message: "Name is required" }),
  lastName: z.string().trim().min(1, { message: "Last Name is required" }),
  country: z.string().trim().min(1, { message: "country Name is required" }),
  state: z.string().trim().min(1, { message: "state Name is required" }),
  dateofbirth: zfd.text(z.string().optional()),
  mobilePhone: zfd.text(z.string().optional()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
  terms: z
    .string()
    .refine((val) => val === "on", {
      message: "You must accept the terms and conditions",
    })
    .default("off"),
});

export const onboardingUserValidator = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password is required" }),
  next: z.string().min(1, { message: "Next is required" }),
});

export const accountProfileValidator = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  about: z.string(),
});

export const accountPasswordValidator = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Current password is required" }),
    password: z.string().min(6, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password is required" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

export const accountPersonalDataValidator = z.object({});

export const deleteUserAttributeValueValidator = z.object({
  userAttributeId: z.string().min(20),
  userAttributeValueId: z.string().min(20),
});
