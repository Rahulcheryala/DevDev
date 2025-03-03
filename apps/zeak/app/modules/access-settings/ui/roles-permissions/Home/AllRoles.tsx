import { memo } from "react";
import type { EmployeeType } from "~/modules/access-settings";
import { Role } from "./components";

type EmployeeTypesTableProps = {
  data: EmployeeType[];
  count: number;
};

const AllRoles = memo(({ data, count }: EmployeeTypesTableProps) => {
  return <Role data={data} count={count} />;
});

AllRoles.displayName = "AllRoles";
export default AllRoles;
