import { UnifiedProvider } from "~/modules/integrations/context";
import {
  IntegrationPageHeader,
  IntegrationPageTabs,
} from "../../../../modules/integrations/components";

export default function Integrations() {
  return (
    <div className="w-[calc(100vw-260px)] px-4 h-full">
      {/* <UnifiedProvider key="integration-list-provider"> */}
        <IntegrationPageHeader />
        <IntegrationPageTabs />
      {/* </UnifiedProvider> */}
    </div>
  );
}
