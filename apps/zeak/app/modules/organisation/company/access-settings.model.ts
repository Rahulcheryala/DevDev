import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";
import { zfd } from "zod-form-data";

////////////////////////////////////
////    Roles & Permissions    /////
////////////////////////////////////

export const roleType = ["Default", "Custom"] as const;

export const roleValidator = z.object({
  id: zfd.text(z.string().optional()),
  name: z.string().min(2, { message: "Name is required" }),
  description: z.string().min(2, { message: "Description is required" }),
  type: z.string().min(2, { message: "Type is required" }),
  effectiveDate: zfd.text(
    z.string().min(2, { message: "Effective date is required" }),
  ),
  companyId: z.string().min(2, { message: "Company is required" }),
});

export const disableRoleValidator = z.object({
  id: zfd.text(z.string().min(1, { message: "Id is required" })),
  disable: z.enum(["true", "false"], {
    message: "Disable has to be a boolean value",
  }),
});

export const duplicateRoleValidator = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  description: z.string().min(2, { message: "Description is required" }),
  disable: z.enum(["true", "false"], {
    message: "Disable has to be a boolean value",
  }),
});

//////////////////////
////    Teams    /////
//////////////////////

export const teamStatus = ["Active", "Inactive"] as const;

export const teamValidator = z.object({
  id: zfd.text(z.string().optional()),
  name: z.string().min(2, { message: "Name is required" }),
  description: z.string().min(2, { message: "Description is required" }),
  companyId: z.string().min(2, { message: "Company is required" }),
  status: z
    .enum(teamStatus, {
      message: "Status is required",
    })
    .optional(),
});

export const addTeamMemberValidator = z.object({
  teamId: z.string().min(2, { message: "Team Id is required" }),
  userId: z.string().min(2, { message: "User Id is required" }),
  status: z.string().min(2, { message: "Status is required" }),
});

export const removeTeamMemberValidator = z.object({
  ids: z.string().min(2, { message: "Id is required" }),
});

export const changeStatusTeamValidator = z.object({
  id: zfd.text(z.string().min(1, { message: "Id is required" })),
  status: z.enum(teamStatus, {
    message: `Status can have ${teamStatus.join(", ")} as values`,
  }),
});

export const duplicateTeamValidator = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  description: z.string().min(2, { message: "Description is required" }),
  companyId: z.string().min(2, { message: "Company is required" }),
  status: z
    .enum(teamStatus, {
      message: "Status is required",
    })
    .optional(),
});

////////////////////////////
////    Departments    /////
////////////////////////////

export const departmentStatus = [
  "Active",
  "Inactive",
  "Draft",
  "Blocked",
] as const;

export const departmentStatusMap = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
} as const;

export const updateDepartmentMembersValidator = z.object({
  departmentId: z.string().min(2, { message: "Department Id is required" }),
  newUsersIds: z.string().optional(),
  toBeRemovedUsers: z.string().optional(),
});

export const removeDepartmentMemberValidator = z.object({
  departmentId: z.string().min(2, { message: "Department Id is required" }),
  ids: z.string().min(2, { message: "Id is required" }),
});

export const changeStatusDepartmentValidator = z.object({
  id: zfd.text(z.string().min(1, { message: "Id is required" })),
  status: z.enum(departmentStatus, {
    message: `Status can have ${departmentStatus.join(", ")} as values`,
  }),
});

export const departmentValidator = z.object({
  id: zfd.text(z.string().optional()),
  companyId: z.string().min(2, { message: "Company is required" }),
  name: z.string().trim().min(2, { message: "Department name is required" }),
  description: z.string().optional(),
  departmentCode: z
    .string()
    .trim()
    .min(2, { message: "Department code is required" }),
  supervisor: z.string().nullable().optional(),
  email: z.string().optional(),
  status: z.enum(departmentStatus, {
    message: "Status is required",
  }),
  effectiveStartDate: z.string().optional(),
  effectiveEndDate: z.string().optional(),
});

// Logo schema when it's expected to be a File
export const logoAsFileSchema = z.object({
  logo: z.instanceof(File).optional(),
});

// Logo schema when it's expected to be a string
export const logoAsStringSchema = z.object({
  logo: z.string().optional(),
});

export const AWS_DEPARTMENT_FOLDER_NAME = "department";

export const checkDepartmentCodeValidator = z.object({
  departmentCode: z
    .string()
    .trim()
    .min(1, { message: "Department code is required" }),
});

export const checkDepartmentNameValidator = departmentValidator.pick({
  name: true,
});

export const addDepartmentMemberValidator = z.object({
  departmentId: z.string().min(2, { message: "Department Id is required" }),
  userIds: z.string().min(2, { message: "User Id is required" }),
  status: z.string().min(2, { message: "Status is required" }),
});

//////////////////////////////
////    User Profile    //////
//////////////////////////////

const phoneNumberValidator = (value: string) => {
  try {
    if (!value) return true;
    const phoneNumber = parsePhoneNumberFromString(value);
    return phoneNumber ? phoneNumber.isValid() : false;
  } catch (e) {
    return false;
  }
};

export const AWS_USER_PROFILE_FOLDER_NAME = "user";

export const accountProfileValidatorV2 = z.object({
  avatarUrl: z.string().optional(),
  firstName: z.string().trim().min(1, { message: "First name is required" }),
  lastName: z.string().trim().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Must be a valid email"),
  phno: z
    .string()
    .refine((val) => phoneNumberValidator(val), {
      message: "Must be a valid phone number",
    })
    .optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
});

//////////////////////////
////    Companies    /////
//////////////////////////

export const AWS_COMPANY_FOLDER_NAME = "company";

export const companyStatus = ["Active", "Inactive"] as const;
export const companyStatusMap = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
} as const;

export const companyValidatorV2 = z.object({
  id: zfd.text(z.string().optional()),
  logo: z.string().optional(),
  name: z.string().trim().min(1, { message: "Name is required" }),
  domainUrl: z.string().trim().min(1, { message: "Domain is required" }),
  companyCode: z.string().trim().min(1, { message: "Code is required" }),
  addressLine1: z.string().trim().min(1, { message: "Address1 is required" }),
  addressLine2: z.string().optional(),
  city: z.string().trim().min(1, { message: "City is required" }),
  state: z.string().trim().min(1, { message: "State is required" }),
  postalCode: z
    .string()
    .trim()
    .min(1, { message: "Zip/ Postal Code is required" }),
  country: z.string().trim().min(1, { message: "Country is required" }),
  primaryLanguage: z
    .string()
    .min(2, { message: "Primary Language is required" }),
  timezone: z.string().trim().min(1, { message: "Timezone is required" }),
  status: z
    .enum(teamStatus, {
      message: "Status is required",
    })
    .optional(),
});

export const updateCompanyValidator = companyValidatorV2.extend({
  id: z.string().min(1, "ID is required"),
});

export const changeStatusCompanyValidator = z.object({
  id: zfd.text(z.string().min(1, { message: "Id is required" })),
  status: z.enum(teamStatus, {
    message: `Status can have ${companyStatus.join(", ")} as values`,
  }),
});

export const primaryLanguageOptions = [
  {
    label: "English US",
    value: "EnglishUS",
  },
  {
    label: "English UK",
    value: "EnglishUK",
  },
];

//////////////////////////
//////    Fonts    ///////
//////////////////////////

export const AWS_FONTS_FOLDER_NAME = "fonts";

export const FontManagerTabMap = {
  APPLICATION_FONTS: "application-fonts",
  UPLOADED_FONTS: "uploaded-fonts",
} as const;

export const addFontValidator = z.array(
  z.object({
    name: z.string().trim().min(2, { message: "Name is required" }),
    assetUrl: z.string().trim().min(2, { message: "Asset url is required" }),
  }),
);

export const removeFontValidator = z.object({
  ids: z.string().min(2, { message: "Id is required" }),
});
