import { Image, PageViewHeader2, toast, ISelectedItem } from "@zeak/ui";
import { useUnifiedContext } from "../../../context";
import { useConnectionActions } from "../../misc/ConnectionActionOptions";
import { updateConnectionFn } from "~/modules/integrations/utils/api.utils";

interface ConnectionHeaderProps {
  isEditing: boolean;
}

export default function ConnectionHeader({ isEditing }: ConnectionHeaderProps) {
  const {
    state: {
      selectedConnection,
      selectedIntegration,
      connectionForm,
      isConnectionFormDirty,
    },
    dispatch,
    setConnectionConfirmationOpen,
  } = useUnifiedContext();

  if (!selectedIntegration || !selectedConnection) return null;

  const { logo, integrationName, applicationName, integrationType } =
    selectedIntegration;
  const { id, connectionName, connectionStatus } = selectedConnection;

  const breadcrumbs = [
    {
      label: "Settings",
      to: "/",
    },
    {
      label: "Integrations",
      to: `/x/access-settings/integrations/${selectedIntegration.id}`,
    },
  ];

  const closeConnectionHandler = () => {
    if (isEditing) {
      setConnectionConfirmationOpen({
        message: [
          "You're about to leave the record you are currently editing. Any unsaved changes will be lost",
          "Are you sure you want to continue?",
        ],
        title: "Attention!",
        flag: true,
        type: "warning",
      });
    } else {
      dispatch({ type: "SET_SELECTED_CONNECTION", payload: null });
    }
  };

  const editConnectionHandler = () => {
    if (isEditing) {
      dispatch({ type: "SET_CONNECTION_FLOW", payload: null });
    } else {
      dispatch({ type: "SET_CONNECTION_FLOW", payload: "edit" });
    }
  };

  const normalizePayloadResponse = (response: any) => {
    // Handle nested objects and normalize field formats
    const normalizedResponse = {
      ...response,
      // Convert any nested connection details to a proper format
      connectionDetails: typeof response.connectionDetails === 'string' 
        ? JSON.parse(response.connectionDetails) 
        : response.connectionDetails
    };

    return normalizedResponse;
  };

  const saveConnectionHandler = async () => {
    if (isConnectionFormDirty) {
      console.log("connectionForm", connectionForm);
      const response = await updateConnectionFn(
        selectedConnection.id,
        connectionForm
      );
      
      if (response) {
        // Normalize response before setting it
        const normalizedResponse = normalizePayloadResponse(response);
        console.log("normalizedResponse", normalizedResponse);
        
        toast.success(
          "CHANGES SAVED SUCCESSFULLY",
          "Connection updated successfully"
        );
        dispatch({ type: "RESET_CONNECTION_FORM" });
        dispatch({ type: "SET_SELECTED_CONNECTION", payload: normalizedResponse });
        dispatch({ type: "SET_CONNECTION_FLOW", payload: null });
      }
    } else {
      dispatch({ type: "SET_SELECTED_CONNECTION", payload: null });
      dispatch({ type: "SET_CONNECTION_FLOW", payload: null });
    }
  };

  const actionButtons = useConnectionActions(
    selectedConnection.id.toString(),
    selectedConnection.connectionStatus
  );

  const SubHeader = () => {
    return (
      <div className="flex items-center gap-8 text-sm">
        <p className="flex items-center gap-2">
          <span className="text-secondary-tertiary">INTEGRATION</span>
          <Image
            src={"/images/menu-label/ZE-logo.png"}
            alt={"ZEAK"}
            className="w-6 h-3.5 object-fill text-xs"
          />
          <span className="text-secondary font-medium uppercase">
            {integrationName}
          </span>
        </p>
        <p className="flex items-center gap-2 ">
          <span className="text-secondary-tertiary">APPLICATION</span>
          <Image
            src={logo}
            alt={integrationName}
            className="min-h-[20px] min-w-[20px] h-[20px] w-[20px] rounded-full text-xs"
          />
          <span className="text-secondary font-medium uppercase">
            {applicationName.replace(/_/g, " ")}
          </span>
        </p>
      </div>
    );
  };

  return (
    <PageViewHeader2
      breadcrumbs={breadcrumbs}
      backUrl={`/x/access-settings/integrations/${selectedIntegration.id}`}
      isEditable={true}
      isEditing={isEditing}
      onEdit={editConnectionHandler}
      onClose={closeConnectionHandler}
      isSaveVisible={isConnectionFormDirty}
      onSave={saveConnectionHandler}
      actionButtons={actionButtons}
      showImage={false}
      subHeader={<SubHeader />}
      selectedItem={
        {
          logo,
          name: connectionName,
          status: connectionStatus,
          code: id,
          integrationName,
          application: applicationName,
        } as ISelectedItem
      }
    />
  );
}
