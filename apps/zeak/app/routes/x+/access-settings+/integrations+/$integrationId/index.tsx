import { UnifiedProvider } from "~/modules/integrations/context";
import IntegrationView from "~/modules/integrations/components/ViewFlow/integration";

export default function IntegrationViewScreen() {
  return (
    <UnifiedProvider key="integration-view-provider">
      <IntegrationView />
    </UnifiedProvider>
  );
}
