import { useParams } from "@remix-run/react";
import { UnifiedProvider } from "~/modules/integrations/context";
import ConnectionView from "~/modules/integrations/components/ViewFlow/connection";

export default function ConnectionDetailScreen() {
  const { connectionId } = useParams();

  return (
    <UnifiedProvider key={`connection-detail-${connectionId}`}>
      <ConnectionView />
    </UnifiedProvider>
  );
}