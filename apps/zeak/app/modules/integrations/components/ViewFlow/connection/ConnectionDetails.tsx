import { useIntegrationContext } from "../../../context";
import { motion } from "framer-motion";
import { DetailsSection, StatusPill } from "../../../../../components/Layout/Screen";
import ConnectionDataTable from "../ConnectionDataTable";
import { ConnectionProvider } from "../../../context/connection";
import TypePill from "~/components/Layout/Screen/View/TypePill";
import ConnectionsPill from "~/modules/integrations/components/misc/connectionsPill";
import { useState } from "react";

function ConnectionDetails() {
  const [openedSection, setOpenedSection] = useState('Connection Details');
  const {
    state: { selectedConnection, selectedIntegration, currentFlow },
  } = useIntegrationContext();

  console.log(selectedIntegration, selectedConnection);

  //* TODO VAMSI general section updates
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
        value: selectedConnection.environmentType,
      },
      {
        title: "Environment URL",
        value: selectedConnection.environmentURL,
      },
      {
        title: "Integration Type",
        value: (
          <TypePill
            type={selectedIntegration?.type}
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
      // {
      //   title: "Connections Status",
      //   value: (
      //     <ConnectionsPill
      //       connections={selectedConnection.connections}
      //     />
      //   ),
      // },
      {
        title: "Connection status",
        value: selectedConnection?.connectionStatus,
      },
      {
        title: "Integration Category",
        value: selectedIntegration?.integrationCategory,
      }
      
      // {
      //   title: "Authentication Type",
      //   value: selectedConnection.authenticationType,
      // },
      // {
      //   title: "Status",
      //   value: <StatusPill status={selectedConnection.status} />,
      // },
      // {
      //   title: "Type",
      //   value: (
      //     <TypePill
      //       type={selectedConnection.type}
      //       className="bg-green-100 px-3 py-1 "
      //     />
      //   ),
      // },
      // {
      //   title: "Connections",
      //   value: (
      //     <ConnectionsPill
      //       connections={selectedConnection.connections}
      //     />
      //   ),
      // },
      // {
      //   title: "Application",
      //   value: selectedConnection.integrationName,
      // },
      ],
    "Credentials":[],
    "Advanced":[]
}

//**END VAMSI general section updated

  if (!selectedConnection) return null;

  return (
    <motion.div
      initial={{ x: "-10%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="flex flex-col gap-4">
      { Object.keys(CONNECTION_DETAILS_SECTIONS).map((item) => (
            <DetailsSection
              key={item}
              title={item}
              items={CONNECTION_DETAILS_SECTIONS[item as keyof typeof CONNECTION_DETAILS_SECTIONS]}
              className="bg-[#F7F9FE]"
            //   selectedIntegration={selectedIntegration}
              currentFlow={currentFlow}
            />
        ))}
        {/* <DetailsSection
          title="Connection Details"
          className="bg-[#F7F9FE]"
        //   selectedIntegration={selectedIntegration}
          currentFlow={currentFlow}
          items = {[
            {
              title: "Connection Name",
              value: selectedConnection.connectionName,
            },
            { title: "Connection ID", value: selectedConnection.id },
            { title: "Purpose", value: selectedConnection.purpose },
            {
              title: "Environment Type",
              value: selectedConnection.environmentType,
            },
            {
              title: "Environment URL",
              value: selectedConnection.environmentURL,
            },
            // {
            //   title: "Authentication Type",
            //   value: selectedConnection.authenticationType,
            // },
            // {
            //   title: "Status",
            //   value: <StatusPill status={selectedConnection.status} />,
            // },
            // {
            //   title: "Type",
            //   value: (
            //     <TypePill
            //       type={selectedConnection.type}
            //       className="bg-green-100 px-3 py-1 "
            //     />
            //   ),
            // },
            // {
            //   title: "Connections",
            //   value: (
            //     <ConnectionsPill
            //       connections={selectedConnection.connections}
            //     />
            //   ),
            // },
            // {
            //   title: "Application",
            //   value: selectedConnection.integrationName,
            // },
          ]}
        /> */}
        {/* <ConnectionProvider>
          <ConnectionDataTable component="view" />
        </ConnectionProvider> */}
      </div>
    </motion.div>
  );
}

export default ConnectionDetails;
