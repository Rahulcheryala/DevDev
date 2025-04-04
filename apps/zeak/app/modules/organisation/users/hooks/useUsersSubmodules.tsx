import { BsPeopleFill, BsPersonBadge } from "react-icons/bs";
import type { RouteGroup } from "~/types";
import { path } from "~/utils/path";

const usersRoutes: RouteGroup[] = [
  {
    name: "Manage",
    routes: [
      {
        name: "Employees",
        to: path.to.employeeAccounts,
        icon: <BsPeopleFill />,
      },
    ],
  },
  {
    name: "Configure",
    routes: [
      {
        name: "Employee Types",
        to: path.to.employeeTypes,
        icon: <BsPersonBadge />,
      },
    ],
  },
];

export default function useUsersSubmodules() {
  return { groups: usersRoutes };
}
