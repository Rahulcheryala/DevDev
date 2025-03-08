import { useIntegrationContext } from "../../../context";
import { motion } from "framer-motion";
import {
  DetailsSection,
  StatusPill,
} from "../../../../../components/Layout/Screen";
import ConnectionDataTable from "./ConnectionDataTable";
import { ConnectionProvider } from "../../../context/connection";
import TypePill from "~/components/Layout/Screen/View/TypePill";
import ConnectionsPill from "~/modules/integrations/components/misc/connectionsPill";

function IntegrationDetails() {
  const {
    state: { selectedIntegration, currentFlow },
  } = useIntegrationContext();

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
          currentFlow={currentFlow}
          items={[
            {
              title: "Integration Name",
              value: selectedIntegration.integrationName,
            },
            { title: "Intgration ID", value: selectedIntegration.id },
            { title: "Purpose", value: selectedIntegration.purpose },
            {
              title: "Integration Category",
              value: selectedIntegration.integrationCategory,
            },
            {
              title: "Connection Type",
              value: selectedIntegration.connectionType,
            },
            {
              title: "Authentication Type",
              value: selectedIntegration.authenticationType,
            },
            {
              title: "Status",
              value: <StatusPill status={selectedIntegration.status} />,
            },
            {
              title: "Type",
              value: (
                <TypePill
                  type={selectedIntegration.type}
                  className="bg-green-100 px-3 py-1 "
                />
              ),
            },
            {
              title: "Connections",
              value: (
                <ConnectionsPill
                  type="details"
                  connections={selectedIntegration.connections}
                />
              ),
            },
            {
              title: "Application",
              value: selectedIntegration.integrationName,
              icon: selectedIntegration.logo || '/images/dynamics365.png'
            },
          ]}
        />
        <ConnectionProvider>
          <ConnectionDataTable component="view" />
        </ConnectionProvider>
      </div>
    </motion.div>
  );
}

export default IntegrationDetails;
