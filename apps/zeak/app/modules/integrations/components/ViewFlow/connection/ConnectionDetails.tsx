import { useUnifiedContext } from "../../../context";
import { motion } from "framer-motion";
import { DetailsSection, StatusPill } from "../../../../../components/Layout/Screen";
import TypePill from "~/components/Layout/Screen/View/TypePill";

function ConnectionDetails() {
  const {
    state: { selectedConnection, selectedIntegration, integrationFlow },
  } = useUnifiedContext();

  if (!selectedConnection || !selectedIntegration) return null;

  type ConfigKeys = "Connection Details" | "Credentials" | "Advanced";

  const CONNECTION_DETAILS_SECTIONS: Record<ConfigKeys, any> = {
    "Connection Details": [
      {
        title: "Connection Name",
        value: selectedConnection.connectionName,
      },
      { title: "Connection ID", value: selectedConnection.connectionCode},
      {
        title: "Environment Type",
        value: selectedConnection.connectionDetails?.environmentType,
      },
      {
        title: "Environment URL",
        value: selectedConnection.connectionDetails?.environmentURL,
      },
      {
        title: "Integration Type",
        value: (
          <TypePill
            type={selectedIntegration.integrationType}
          />
        ),
      },
      {
        title: "Application",
        value: selectedIntegration.applicationName.replace(/_/g, ' '),
        icon: selectedIntegration.logo
      },
      {
        title: "Purpose",
        value: selectedConnection.connectionDescription,
      },
      {
        title: "Connection status",
        value: <StatusPill status={selectedConnection.connectionStatus} />,
      },
      {
        title: "Integration Category",
        value: selectedIntegration.integrationCategory.replace(/_/g, ' '),
      }
    ],
    "Credentials": [],
    "Advanced": []
  }

  if (!selectedConnection) return null;

  return (
    <motion.div
      initial={{ x: "-10%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="flex flex-col gap-4 mb-10">
        {Object.keys(CONNECTION_DETAILS_SECTIONS).map((item) => (
          <DetailsSection
            key={item}
            title={item}
            items={CONNECTION_DETAILS_SECTIONS[item as keyof typeof CONNECTION_DETAILS_SECTIONS]}
            className="bg-[#F7F9FE]"
            // selectedIntegration={selectedIntegration}
            currentFlow={integrationFlow}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default ConnectionDetails;
