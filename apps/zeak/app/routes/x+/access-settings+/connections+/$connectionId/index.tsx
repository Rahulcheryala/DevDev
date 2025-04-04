import { useParams } from "@remix-run/react";
import { UnifiedProvider } from "~/modules/integrations/context";
import ConnectionView from "~/modules/integrations/components/ViewFlow/connection";

export default function ConnectionDetailScreen() {
  return (
    <UnifiedProvider>
      <ConnectionView />
    </UnifiedProvider>
  );
}