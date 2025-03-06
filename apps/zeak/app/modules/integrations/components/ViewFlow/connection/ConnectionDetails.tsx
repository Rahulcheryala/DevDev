import { useIntegrationContext } from "../../../context";
import { motion } from "framer-motion";
import { DetailsSection, StatusPill } from "../../../../../components/Layout/Screen";
import TypePill from "~/components/Layout/Screen/View/TypePill";
import { ChevronDown, ChevronUp, PenLine } from "lucide-react";
import { IntegrationResourceTypes } from "~/modules/integrations/models/constants";

const EnvironmentType = ({ type }: { type: string }) => {
  return (
    <div className="flex items-center gap-3 text-sm">
      {type === "PROD" && (
        <>
          <span className="bg-yellow-500 w-fit px-4 py-1 rounded-full text-white">PROD</span>
        </>
      )}
      {type === "DEV" && (
        <>
          <span className="bg-gray-600 w-fit px-4 py-1 rounded-full text-white">DEV</span>
        </>
      )}
      {type === "UAT" && (
        <>
          <span className="bg-orange-500 w-fit px-4 py-1 rounded-full text-white">UAT</span>
        </>
      )}
    </div>
    )
  };
  

function ConnectionDetails() {
  const {
    state: { selectedConnection, selectedIntegration, currentFlow },
    dispatch,
  } = useIntegrationContext();

  // console.log(selectedIntegration, selectedConnection);

  type ConfigKeys = "Connection Details" | "Credentials" | "Advanced";

  const CONNECTION_DETAILS_SECTIONS: Record<ConfigKeys, any> = {
    "Connection Details": [
      {
        title: "Connection Name",
        value: selectedConnection.connectionName,
      },
      { title: "Connection ID", value: selectedConnection.id },
      { title: "Purpose", value: selectedConnection.purpose },
      {
        title: "Environment Type",
        value: <EnvironmentType type={selectedConnection.environmentType}/>
      },
      {
        title: "Environment URL",
        value: selectedConnection.environmentURL,
      },
      {
        title: "Integration Type",
        value: (
          <TypePill
            type={selectedIntegration?.type!}
          />
        ),
      },
      {
        title: "Application",
        value: selectedIntegration?.application,
        icon: selectedIntegration?.logo || '/images/dynamics365.png'
      },
      {
        title: "Purpose",
        value: selectedIntegration?.purpose,
      },
      {
        title: "Connection status",
        value: <StatusPill status={selectedConnection.connectionStatus} />,
      },
      {
        title: "Integration Category",
        value: selectedIntegration?.integrationCategory,
      }
    ],
    "Credentials": [],
    "Advanced": []
  }

  const editConnectionHandler = () => {
    dispatch({ type: "SET_FLOW", payload: "edit" });
  };

  if (!selectedConnection) return null;

  return (
    <motion.div
      initial={{ x: "-10%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="flex flex-col gap-4 mb-10">
        {Object.keys(CONNECTION_DETAILS_SECTIONS).map((item) => (
          <div className="relative" key={item}>
          <div className="absolute top-6 right-2 flex items-center gap-2 z-[999]">
           <PenLine onClick={editConnectionHandler} className="h-5 w-5 mr-1.5 text-text-tertiary cursor-pointer" />
            <ChevronDown className="w-6 h-6 text-text-tertiary cursor-pointer" />
          </div>
          <DetailsSection
            key={item}
            title={item}
            items={CONNECTION_DETAILS_SECTIONS[item as keyof typeof CONNECTION_DETAILS_SECTIONS]}
            className="bg-[#F7F9FE]"
            //   selectedIntegration={selectedIntegration}
            currentFlow={currentFlow}
            resourceType={IntegrationResourceTypes.CONNECTION}
            selectedIntegration={selectedIntegration}
            selectedConnection={selectedConnection}
          />      
          </div>
        ))}
        
      </div>
    </motion.div>
  );
}

export default ConnectionDetails;
