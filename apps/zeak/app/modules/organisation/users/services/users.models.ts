import { z } from "zod";
import { zfd } from "zod-form-data";

export const bulkPermissionsValidator = z.object({
  editType: z.string().min(1, { message: "Update type is required" }),
  userIds: z
    .array(z.string().min(36, { message: "Invalid selection" }))
    .min(1, { message: "Group members are required" }),
  data: z
    .string()
    .startsWith("{", { message: "Invalid JSON" })
    .endsWith("}", { message: "Invalid JSON" }),
});

export const createEmployeeValidator = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Must be a valid email"),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  employeeType: z.string().min(20, { message: "Employee type is required" }),
  inviteUser: z.string().optional(),
  password: z.nullable(z.string().min(8, { message: "Password must be at least 8 characters" })).optional(),
  enable2FA: z.string().optional(),
}).refine((data) => {
  // If not inviting user, password is required
  if (!data.inviteUser && !data.password) {
    return false;
  }
  return true;
}, {
  message: "Password is required when not sending an invite",
  path: ["password"],
})

export const createSupplierAccountValidator = z.object({
  id: z.string().min(20, "Supplier contact is required"),
  supplier: z.string().min(36, { message: "Supplier is required" }),
});

export const deactivateUsersValidator = z.object({
  redirectTo: z.string(),
  users: z
    .array(z.string().min(36, { message: "Invalid user id" }))
    .min(1, { message: "Group members are required" }),
});

export const employeeTypeValidator = z.object({
  id: zfd.text(z.string().optional()),
  name: z.string().min(1, { message: "Name is required" }),
  data: z
    .string()
    .startsWith("[", { message: "Invalid JSON" })
    .endsWith("]", { message: "Invalid JSON" }),
});

export const employeeTypePermissionsValidator = z.array(
  z.object({
    name: z.string(),
    permission: z.object({
      view: z.boolean(),
      create: z.boolean(),
      update: z.boolean(),
      delete: z.boolean(),
    }),
  }),
);

export const employeeValidator = z.object({
  id: z.string(),
  employeeType: z.string().min(20, { message: "Employee type is required" }),
  data: z
    .string()
    .startsWith("{", { message: "Invalid JSON" })
    .endsWith("}", { message: "Invalid JSON" }),
});

export const groupValidator = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  selections: z
    .array(z.string().min(36, { message: "Invalid selection" }))
    .min(1, { message: "Group members are required" }),
});

export const resendInviteValidator = z.object({
  users: z
    .array(z.string().min(36, { message: "Invalid user id" }))
    .min(1, { message: "Group members are required" }),
});

export const userPermissionsValidator = z.object({
  view: z.boolean(),
  create: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
});
