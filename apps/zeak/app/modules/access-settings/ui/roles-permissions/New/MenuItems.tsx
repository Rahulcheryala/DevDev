import { memo } from "react";
import { Alert, AlertDescription } from "@zeak/react";
import { IoInformationCircleSharp } from "react-icons/io5";

const MenuItems = memo(() => {
  return (
    <>
      <Alert className="[&>svg]:top-[18px]" variant="warning">
        <IoInformationCircleSharp size={20} />
        <AlertDescription>
          Only Tenant Admins can create a Custom Role. Custom Roles are
          available for any company under the primary account.
        </AlertDescription>
      </Alert>
      <img src="/images/Table.png" alt="" className="mt-[32px]" />
    </>
  );
});

MenuItems.displayName = "MenuItems";
export default MenuItems;
