import { BsCardText } from "react-icons/bs";
import { usePermissions } from "~/hooks";
import type { AuthenticatedRouteGroup } from "~/types";
import { path } from "~/utils/path";

const labelsReportsRoutes: AuthenticatedRouteGroup[] = [
  {
    name: "Manage",
    routes: [
      {
        name: "Labels",
        to: path.to.labelsreportsLabelList,
        role: "employee",
        icon: <BsCardText />,
      },
    ],
  },
];

export default function useLabelsReportsSubmodules() {
  const permissions = usePermissions();
  return {
    groups: labelsReportsRoutes
      .filter((group) => {
        const filteredRoutes = group.routes.filter((route) => {
          if (route.role) {
            return permissions.is(route.role);
          } else {
            return true;
          }
        });

        return filteredRoutes.length > 0;
      })
      .map((group) => ({
        ...group,
        routes: group.routes.filter((route) => {
          if (route.role) {
            return permissions.is(route.role);
          } else {
            return true;
          }
        }),
      })),
  };
}
