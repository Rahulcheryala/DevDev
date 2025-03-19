import { motion } from "framer-motion";
import { DetailsSection, StatusPill } from "../../../../../components/Layout/Screen";
import TypePill from "~/components/Layout/Screen/View/TypePill";
import ConnectionsPill from "~/modules/integrations/components/misc/connectionsPill";
import { useUnifiedContext } from "../../../context";
import ConnectionList from "./ConnectionList";

function IntegrationDetails() {
  const {
    state: { selectedIntegration, integrationFlow }, dispatch
  } = useUnifiedContext();

  if (!selectedIntegration) return null;

  return (
    <motion.div
      initial={{ x: "-10%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="flex flex-col gap-4">
        <DetailsSection
          title="Integration Details"
          className="bg-[#F7F9FE]"
          selectedIntegration={selectedIntegration}
          currentFlow={integrationFlow}
          dispatch={dispatch}
          items={[
            {
              title: "Integration Name",
              value: selectedIntegration.integrationName,
            },
            { title: "Intgration Code", value: selectedIntegration.integrationCode },
            { title: "Purpose", value: selectedIntegration.description },
            {
              title: "Integration Category",
              value: selectedIntegration.integrationCategory?.replace(/_/g, " "),
            },
            {
              title: "Connection Type",
              value: selectedIntegration.connectionType,
            },
            {
              title: "Authentication Type",
              value: selectedIntegration.authType?.replace(/_/g, " "),
            },
            {
              title: "Status",
              value: <StatusPill status={selectedIntegration.status} />,
            },
            {
              title: "Type",
              value: (
                <TypePill
                  type={selectedIntegration.integrationType.replace(/_/g, " ")}
                  className="bg-green-100 px-3 py-1"
                />
              ),
            },
            {
              title: "Connections",
              value: (
                <ConnectionsPill
                  type="details"
                  id={selectedIntegration.id}
                />
              ),
            },
            {
              title: "Application",
              value: selectedIntegration.applicationName.replace(/_/g, " "),
              icon: selectedIntegration.logo
            },
          ]}
        />
        <ConnectionList integrationId={selectedIntegration.id} component="view" />
      </div>
    </motion.div>
  );
}

export default IntegrationDetails;
