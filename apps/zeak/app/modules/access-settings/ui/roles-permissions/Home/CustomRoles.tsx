import { memo } from "react";
import type { EmployeeType } from "~/modules/users";
import { Role } from "./components";

type EmployeeTypesTableProps = {
  data: EmployeeType[];
  count: number;
};

const CustomRoles = memo(({ data, count }: EmployeeTypesTableProps) => {
  return <Role data={data} count={count} />;
});

CustomRoles.displayName = "CustomRoles";
export default CustomRoles;
