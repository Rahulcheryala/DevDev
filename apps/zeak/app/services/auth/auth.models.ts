import { z } from "zod";

export const loginValidator = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Must be a valid email"),
  password: z.string().min(6, { message: "Password is required" }),
  redirectTo: z.string(),
  deviceInfo: z.string(),
  locationInfo: z.string(),
  setup2FA: z.boolean().default(false).optional(),
});


export const signUpValidator = z.object({
  // companyName: z.string(),
  lastName: z.string().trim().min(1, { message: "Last Name is required" }),
  firstName: z.string().trim().min(1, { message: "First Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Must be a valid email"),
  password: z.string().min(6, { message: "Password is required" }),
  terms: z
    .string()
    .refine((val) => val === "on", {
      message: "You must accept the terms and conditions",
    })
    .default("off"),
  redirectTo: z.string(),
  userType: z.string(),
  deviceInfo: z.string(),
  locationInfo: z.string(),
});

export const loginApiValidator = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Must be a valid email"),
  password: z.string().min(6, { message: "Password is required" }),
});

export const forgotPasswordValidator = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Must be a valid email"),
});

export const resetPasswordValidator = z.object({
  password: z.string().min(6, { message: "Password is too short" }),
});

export const resetPasswordValidatorV2 = z
  .object({
    createPassword: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.createPassword === data.confirmPassword, {
    path: ["confirmPassword"], // Set the path of the error
    message: "Passwords do not match", // Error message
  });

export const SuccessPageNameMap = {
  RESET_PASSWORD: "reset_password",
  FORGOT_PASSWORD: "forgot_password",
};

export const callbackValidator = z.object({
  refreshToken: z.string(),
  deviceInfo: z.string().optional(),
  locationInfo: z.string().optional(),
});
