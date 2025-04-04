import {
  PageDetailsSection,
  DefaultFormField,
  StatusPill,
  TypePill,
  Image,
} from "@zeak/ui";
import { motion } from "framer-motion";
import { useUnifiedContext } from "../../../context";
import ConnectionsPill from "../../../components/misc/ConnectionsPill";
import ConnectionList from "./ConnectionList";
import IntegrationForm from "../../CreateFlow/Integration/IntegrationForm";
import { safeReplace } from "../../../utils/utils";

interface IntegrationDetailsProps {
  isEditing: boolean;
  handleEditingChange: (editing: boolean) => void;
}

function IntegrationDetails({
  isEditing,
  handleEditingChange,
}: IntegrationDetailsProps) {
  const {
    state: {
      selectedIntegration,
      integrationFlow,
      integrationForm,
      integrationErrors,
    },
  } = useUnifiedContext();

  // console.log(integrationForm)

  const handleEditing = () => {
    handleEditingChange(!isEditing);
  };

  if (!selectedIntegration) return null;

  // Transform integration details into DefaultFormField format
  const integrationFields: DefaultFormField[][] = [
    [
      {
        label: "Integration Name",
        value: selectedIntegration.integrationName,
      },
      {
        label: "Integration Code",
        value: selectedIntegration.integrationCode,
      },
    ],
    [
      {
        label: "Purpose",
        value:
          integrationForm.description ||
          selectedIntegration.description ||
          "- (No description)",
      },
      {
        label: "Integration Category",
        value:
          safeReplace(integrationForm.integrationCategory) ||
          safeReplace(selectedIntegration.integrationCategory),
      },
    ],
    [
      {
        label: "Connection Type",
        value:
          safeReplace(integrationForm.connectionType) ||
          safeReplace(selectedIntegration.connectionType),
      },
      {
        label: "Authentication Type",
        value:
          safeReplace(integrationForm.authType) ||
          safeReplace(selectedIntegration.authType),
      },
    ],
    [
      {
        label: "Status",
        value: (
          <StatusPill
            status={integrationForm.status || selectedIntegration.status}
            className="h-9"
            uppercase
          />
        ),
      },
      {
        label: "Type",
        value: (
          <TypePill
            variant={
              selectedIntegration.integrationType === "System"
                ? "system"
                : "user"
            }
            className={`px-2 py-0 h-9 rounded-zeak ${selectedIntegration.integrationType === "System" && "bg-green-50"}`}
            textClassName="text-sm font-medium text-accent-dark"
          />
        ),
      },
    ],
    [
      {
        label: "Connections",
        value: <ConnectionsPill type="details" id={selectedIntegration.id} />,
      },
      {
        label: "Application",
        value: (
          <div className="flex items-center gap-2">
            <Image
              src={selectedIntegration.logo}
              alt={
                integrationForm.applicationName ||
                selectedIntegration.applicationName
              }
              className="w-6 h-6 rounded-full text-xs"
            />
            <span>
              {safeReplace(integrationForm.applicationName) ||
                safeReplace(selectedIntegration.applicationName)}
            </span>
          </div>
        ),
      },
    ],
  ];

  return (
    <motion.div
      initial={{ x: "-10%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="space-y-4">
        <PageDetailsSection
          title="Integration Details"
          className="bg-[#F7F9FE]"
          defaultFields={integrationFields}
          editable={selectedIntegration.integrationType !== "System"}
          editing={isEditing}
          onEditClick={handleEditing}
          expandable={true}
          editingForm={
            <div className="flex flex-col gap-8">
              <IntegrationForm
                integrationForm={integrationForm}
                currentFlow={integrationFlow}
                errors={integrationErrors}
              />
            </div>
          }
        />

        <ConnectionList
          integrationId={selectedIntegration.id}
          component="view"
        />
      </div>
    </motion.div>
  );
}

export default IntegrationDetails;
