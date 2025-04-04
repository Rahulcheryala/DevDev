import {
  PageDetailsSection,
  DefaultFormField,
  StatusPill,
  TypePill,
  Image,
  Button,
} from "@zeak/ui";
import { motion } from "framer-motion";
import { useUnifiedContext } from "../../../context";
import ConnectionForm from "../../CreateFlow/Connection/ConnectionForm";
import { safeReplace } from "../../../utils/utils";

interface ConnectionDetailsProps {
  isEditing: boolean;
  handleEditingChange: (editing: boolean) => void;
}

function ConnectionDetails({ isEditing, handleEditingChange }: ConnectionDetailsProps) {
  const {
    state: {
      selectedConnection,
      selectedIntegration,
      connectionFlow,
      connectionForm,
    },
  } = useUnifiedContext();

  const handleEditing = () => {
    handleEditingChange(!isEditing);
  };

  if (!selectedConnection || !selectedIntegration) return null;

  console.log(connectionForm);


  const bgPicker = (environmentType: string) => {
    switch (environmentType) {
      case "SANDBOX":
        return "bg-accent-dark";
      case "PROD":
        return "bg-accent-yellow";
      case "DEV":
        return "bg-accent-green";
      case "TEST":
        return "bg-accent-blue";
      default:
        return "bg-red-500";
    }
  };


  // Transform connection details into DefaultFormField format
  const connectionFields: DefaultFormField[][] = [
    [
      {
        label: "Connection Name",
        value: selectedConnection.connectionName,
      },
      {
        label: "Connection ID",
        value: selectedConnection.connectionCode,
      },
    ],
    [
      {
        label: "Environment Type",
        value: <Button onClick={() => {}} className={`rounded-zeak pointer-events-none ${bgPicker(connectionForm.connectionDetails.environmentType || selectedConnection.connectionDetails.environmentType)}`}>
          {connectionForm.connectionDetails.environmentType || selectedConnection.connectionDetails.environmentType}
        </Button>,
      },
      {
        label: "Environment URL",
        value: (
          <span className="text-primary-bright">
            {connectionForm.connectionDetails.environmentURL || selectedConnection.connectionDetails.environmentURL}
          </span>
        ),
      },
    ],
    [
      {
        label: "Integration Type",
        value: (
          <TypePill
            variant={
              selectedIntegration.integrationType === "System"
                ? "system"
                : "user"
            }
            className="bg-green-50 px-2 py-0 h-9 rounded-zeak"
          />
        ),
      },
      {
        label: "Application",
        value: (
          <div className="flex items-center gap-2">
            <Image
              src={selectedIntegration.logo}
              alt={safeReplace(selectedIntegration.applicationName)}
              className="w-6 h-6 rounded-full"
            />
            <span>
              {safeReplace(selectedIntegration.applicationName)}
            </span>
          </div>
        ),
      },
    ],
    [
      {
        label: "Purpose",
        value:
          connectionForm.connectionDescription || selectedConnection.connectionDescription || "No description provided",
      },
      {
        label: "Connection Status",
        value: (
          <StatusPill
            status={selectedConnection.connectionStatus}
            uppercase
            className="gap-2"
          />
        ),
      },
    ],
    [
      {
        label: "Integration Category",
        value: safeReplace(selectedIntegration.integrationCategory),
      },
    ],
  ];

  return (
    <motion.div
      initial={{ x: "-10%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="flex flex-col gap-4 pb-40">
        <PageDetailsSection
          title="Connection Details"
          className="bg-[#F7F9FE]"
          defaultFields={connectionFields}
          onEditClick={handleEditing}
          editable={true}
          editing={isEditing}
          defaultIsExpanded={true}
          expandable={true}
          editingForm={
            <div className="flex flex-col gap-8">
              <ConnectionForm
                connectionForm={connectionForm}
                currentFlow={connectionFlow}
                selectedIntegration={selectedIntegration}
              />
            </div>
          }
        />

        <PageDetailsSection
          title="Credentials"
          className="bg-[#F7F9FE]"
          defaultFields={[]}
          onEditClick={() => {}}
          defaultIsExpanded={false}
          expandable={true}
        />

        <PageDetailsSection
          title="Advanced"
          className="bg-[#F7F9FE]"
          defaultFields={[]}
          onEditClick={() => {}}
          defaultIsExpanded={false}
          expandable={true}
        />
      </div>
    </motion.div>
  );
}

export default ConnectionDetails;
