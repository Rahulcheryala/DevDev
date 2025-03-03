import { BsFillPinMapFill } from "react-icons/bs";
import type { RouteGroup } from "~/types";
import { path } from "~/utils/path";

const resourcesRoutes: RouteGroup[] = [
  {
    name: "Configure",
    routes: [
      {
        name: "Locations",
        to: path.to.locations,
        icon: <BsFillPinMapFill />,
      },
    ],
  },
];

export default function useResourcesSubmodules() {
  return { groups: resourcesRoutes };
}
