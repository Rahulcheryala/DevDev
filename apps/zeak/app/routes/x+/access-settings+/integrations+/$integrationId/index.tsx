import { Outlet } from "@remix-run/react";
import IntegrationView from "../../../../../modules/integrations/components/ViewFlow";
import { IntegrationProvider } from "../../../../../modules/integrations/context";
import ViewController from "~/modules/integrations/components/ViewFlow/control";
import { ConnectionProvider } from "~/modules/integrations/context/connection";

export default function IntegrationViewScreen() {
  // console.log("rendering integration view screen");
  return (
    <>
      <IntegrationProvider>
        <ConnectionProvider>
          <ViewController />
        </ConnectionProvider>
      </IntegrationProvider>
      <Outlet />
    </>
  );
}
