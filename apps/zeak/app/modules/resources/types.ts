import type {
  getAttributeXXX,
  getAttributeCategoriesXXX,
  getAttributeCategoryXXX,
  getEmployeeJob,
  getLocations,
  getPeopleXXX,
} from "./resources.service";

export type AbilityDatum = {
  week: number;
  value: number;
};
export enum AbilityEmployeeStatus {
  NotStarted = "Not Started",
  InProgress = "In Progress",
  Complete = "Complete",
}

export type Attribute = NonNullable<
  Awaited<ReturnType<typeof getAttributeXXX>>["data"]
>;

export type AttributeCategory = NonNullable<
  Awaited<ReturnType<typeof getAttributeCategoriesXXX>>["data"]
>[number];

export type AttributeCategoryDetailType = NonNullable<
  Awaited<ReturnType<typeof getAttributeCategoryXXX>>["data"]
>;

export type AttributeDataType = {
  id: number;
  label: string;
  isBoolean: boolean;
  isDate: boolean;
  isList: boolean;
  isNumeric: boolean;
  isText: boolean;
  isUser: boolean;
};

export type EmployeeJob = NonNullable<
  Awaited<ReturnType<typeof getEmployeeJob>>["data"]
>;

export type Location = NonNullable<
  Awaited<ReturnType<typeof getLocations>>["data"]
>[number];

export type Person = NonNullable<
  Awaited<ReturnType<typeof getPeopleXXX>>["data"]
>[number];

export type ShiftLocation = NonNullable<
  Awaited<ReturnType<typeof getLocations>>["data"]
>[number];
