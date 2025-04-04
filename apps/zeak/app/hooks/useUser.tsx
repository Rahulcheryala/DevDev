import { path } from "~/utils/path";
import { useRouteData } from "./useRouteData";

type PersonalData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  avatarSignedUrl: string | null;
};

type Company = {
  id: string;
  name: string;
  logo: string | null;
};

type Groups = string[];

type Defaults = {
  locationId: string | null;
};

type User = PersonalData & {
  company: Company[];
  groups: Groups;
  defaults: Defaults;
};

export function useUser(): User {
  const data = useRouteData<{
    company: unknown;
    user: unknown;
    groups: unknown;
    defaults: unknown;
  }>(path.to.authenticatedRoot);

  const companyCheck = data?.companies && isCompany(data.companies[0])
  const userCheck = data?.user && isUser(data.user)
  const groupsCheck = data?.groups && isGroups(data.groups)

  if (
    companyCheck &&
    userCheck &&
    groupsCheck &&
    isDefaults(data.defaults)
  ) {
    return {
      ...data.user,
      company: data.companies,
      groups: data.groups,
      defaults: data.defaults ?? { locationId: null },
    };
  }

  // TODO: force logout -- the likely cause is development changes
  throw new Error(
    "useUser must be used within an authenticated route. If you are seeing this error, you are likely in development and have changed the session variables. Try deleting the cookies.",
  );
}

function isCompany(value: any): value is Company {
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    (typeof value.logo === "string" || value.logo === null)
  );
}

function isDefaults(value: any): value is Defaults {
  return (
    value === null ||
    typeof value.locationId === "string" ||
    value.locationId === null
  );
}

function isGroups(value: any): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

function isUser(value: any): value is User {
  return (
    typeof value.id === "string" &&
    typeof value.email === "string" &&
    typeof value.firstName === "string" &&
    typeof value.lastName === "string" &&
    "avatarUrl" in value
  );
}
