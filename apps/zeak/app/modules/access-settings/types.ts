import { type Database } from "@zeak/database";
import { type z } from "zod";
import type {
  roleType,
  teamStatus,
  departmentStatus,
  departmentValidator,
  logoAsFileSchema,
} from "./access-settings.model";
import type {
  getEmployeeTypes,
  getTeams,
  getDepartments,
  getPaginatedCompanyList,
  getDepartmentMembers,
} from "./access-settings.service";

export type EmployeeType = NonNullable<
  Awaited<ReturnType<typeof getEmployeeTypes>>["data"]
>[number];

export type RoleType = (typeof roleType)[number];

export type TeamType = NonNullable<
  Awaited<ReturnType<typeof getTeams>>["data"]
>[number];

export type TeamStatus = (typeof teamStatus)[number];

export type DepartmentType = NonNullable<
  Awaited<ReturnType<typeof getDepartments>>["data"]
>[number];

export type DepartmentMember = NonNullable<
  Awaited<ReturnType<typeof getDepartmentMembers>>["data"]
>[number];

export type DepartmentStatus = (typeof departmentStatus)[number];

export type DepartmentValidatorType = z.infer<typeof departmentValidator>;
export type DepartmentValidatorWithLogoFileType = z.infer<
  typeof departmentValidator
> &
  z.infer<typeof logoAsFileSchema>;

export type DepartmentListType = DepartmentType & {
  logoSignedUrl?: string;
  supervisorDetails: {
    id: string;
    fullName: string;
    email: string;
  };
};

export type CompanyType = NonNullable<
  Awaited<ReturnType<typeof getPaginatedCompanyList>>["data"]
>[number];

// Font Manager types

// fonts fetched from module-configuration
export type ApplicationFontType = { name: string; assetUrl: string };

// fonts uploaded by tenants
export type UploadedFontType = Database["public"]["Tables"]["font"]["Row"];


export const BUCKET_NAME = 'teamAvatar';
export const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
