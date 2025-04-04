import * as z from "zod";

export const SignupSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(50, "50 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "8 characters")
      .regex(/[A-Z]/, "Uppercase letter")
      .regex(/[a-z]/, "Lowercase letter")
      .regex(/[\W_]/, "1 special character  !@#$%^&*()_-+=")
      .regex(/[0-9]/, "1 number"),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type TSignupForm = z.infer<typeof SignupSchema>;

export const OnboardingSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  domain: z.string().min(1, "Domain is required"),
  type: z.string().min(1, "Type is required"),
});

export type TOnboarding = z.infer<typeof OnboardingSchema>;

export const CompanySizeSchema = z.object({
  size: z.string().min(1, "Size is required"),
});

export type TCompanySize = z.infer<typeof CompanySizeSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "8 characters"),
});

export type TLogin = z.infer<typeof LoginSchema>;

export const InvitationFormSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  company: z.string(),
  password: z
    .string()
    .min(8, "8 characters")
    .regex(/[A-Z]/, "Uppercase letter")
    .regex(/[a-z]/, "Lowercase letter")
    .regex(/[\W_]/, "1 special character  !@#$%^&*()_-+=")
    .regex(/[0-9]/, "1 number"),
});

export type TInvitationForm = z.infer<typeof InvitationFormSchema>;

export const SecurityQuestionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

export type TSecurityQuestion = z.infer<typeof SecurityQuestionSchema>;

export const ForgetPassowrdSchema = z.object({
  email: z.string().email(),
});

export type TForgetPassword = z.infer<typeof ForgetPassowrdSchema>;

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "8 characters")
      .regex(/[A-Z]/, "Uppercase letter")
      .regex(/[a-z]/, "Lowercase letter")
      .regex(/[\W_]/, "1 special character  !@#$%^&*()_-+=")
      .regex(/[0-9]/, "1 number"),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type TResetPassword = z.infer<typeof ResetPasswordSchema>;
