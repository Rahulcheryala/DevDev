import { useMemo } from "react";
import { BsCartDash, BsCartPlus, BsShieldLock } from "react-icons/bs";
import { usePermissions } from "~/hooks";

import type { Route } from "~/types";
import { path } from "~/utils/path";

export default function useCreate(): Route[] {
  const permissions = usePermissions();

  const result = useMemo(() => {
    let links: Route[] = [];

    if (permissions.can("create", "purchasing")) {
      links.push({
        name: "Purchase Order",
        to: path.to.newPurchaseOrder,
        icon: <BsCartDash />,
      });
    }

    // if (permissions.can("create", "purchasing")) {
    //   links.push({
    //     name: "Supplier",
    //     to: path.to.newSupplier,
    //     icon: <PiShareNetworkFill />,
    //   });
    // }

    if (permissions.can("create", "sales")) {
      // links.push({
      //   name: "Customer",
      //   to: path.to.newCustomer,
      //   icon: <IoMdPeople />,
      // });
      links.push({
        name: "Quotation",
        to: path.to.newQuote,
        icon: <BsCartPlus />,
      });
    }

    if (permissions.can("create", "users")) {
      links.push({
        name: "Employee",
        to: path.to.newEmployee,
        icon: <BsShieldLock />,
      });
    }

    return links;
  }, [permissions]);

  return result.sort((a, b) => a.name.localeCompare(b.name));
}
