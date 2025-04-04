import { CgSync } from "react-icons/cg";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { TbBuildingFactory2 } from "react-icons/tb";
import { usePermissions } from "~/hooks";
import type { AuthenticatedRouteGroup } from "~/types";
import { path } from "~/utils/path";

const settingsRoutes: AuthenticatedRouteGroup[] = [
  {
    name: "Company",
    routes: [
      {
        name: "Company",
        to: path.to.company,
        role: "employee",
        icon: <TbBuildingFactory2 />,
      },
    ],
  },
  {
    name: "System",
    routes: [
      {
        name: "Custom Fields",
        to: path.to.customFields,
        role: "employee",
        icon: <MdOutlineDashboardCustomize />,
      },
      {
        name: "Integrations",
        to: path.to.integrations,
        role: "employee",
        icon: <CgSync />,
      },
    ],
  },
];

export default function usePurchasingSubmodules() {
  const permissions = usePermissions();
  return {
    groups: settingsRoutes
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
