import { useUnifiedContext } from "../../../context";
import { ItemHeader } from "../../../../../components/Layout/Screen";
import { ISelectedItem } from "../../../../../components/Layout/Screen/View/ItemHeader";
import IntegrationActionOptions from "../../misc/IntegrationActionOptions";
import { IntegrationType } from "../../../models/constants";
import { toast } from "@zeak/react";
import { updateIntegrationFn } from "../../../utils/api.utils";
import type { IntegrationForm as IntegrationTypes } from "../../../../integrations/models/integration-form.model";
import { refreshIntegrationsAction } from "../../../context/action";
import { ApplicationName,
        IntegrationType as IIntegrationType,
        IntegrationCategory,
        ConnectionType,
        AuthType,
      } from "prisma/prisma-client";


export default function IntegrationHeader() {
  const {
    state: { selectedIntegration, integrationFlow, integrationForm},
    dispatch,
  } = useUnifiedContext();

  // Ensure selectedIntegration is not null before destructuring
  if (!selectedIntegration) return null;

  const {
    id,
    integrationName,
    logo,
    status,
    integrationCategory,
    connectionType,
    integrationType,
  } = selectedIntegration;

  const breadcrumbs = [
    {
      label: "Settings",
      to: "/",
    },
    {
      label: "Integrations",
      to: "/x/access-settings/integrations",
    },
  ];

  const unsetIntegrationHandler = () => {
    dispatch({ type: "SET_SELECTED_INTEGRATION", payload: null });
  };

  const onCloseHandler = (bool?: boolean) => {
      dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
    };

  const editIntegrationHandler = () => {
    dispatch({ type: "SET_INTEGRATION_FLOW", payload: "edit" });
  };
console.log('In IntegrationHeader', integrationForm);
const saveEditedIntegration = async (
      id: string
    ) => {
      try {
        // const isValid = await validateForm();
        // if (!isValid) return;
        console.log("integrationForm", integrationForm, id, selectedIntegration);
        const MapDefaultFields = {
          isFavorite: false,
          integrationType: 'User Defined',
          connectionLimit: 0,
          status: 'Active',
          companyIds: [],
        }
        const checkDefaultOfFields = (inpt: string) => {
          return inpt in MapDefaultFields ? MapDefaultFields[inpt as keyof typeof MapDefaultFields] : '';
        }
         
        const EditedFields = Object.keys(integrationForm).reduce((acc, editInput) => {
          const typedKey = editInput as keyof IntegrationTypes;
          if(integrationForm[typedKey] !== checkDefaultOfFields(editInput) && integrationForm[typedKey] !== selectedIntegration[typedKey]){
            // Only set value if applicationName exists in ApplicationName enum
            if (typedKey === 'applicationName' && !(typedKey in ApplicationName)) {
              acc[typedKey] = ApplicationName[integrationForm[typedKey] as keyof typeof ApplicationName];
            } else if(typedKey === 'integrationType' && !(typedKey in IIntegrationType)){
              acc[typedKey] = IIntegrationType[integrationForm[typedKey] as keyof typeof IIntegrationType] as never;
            }else if(typedKey === 'integrationCategory' && !(typedKey in IntegrationCategory)){
              acc[typedKey] = IntegrationCategory[integrationForm[typedKey] as keyof typeof IntegrationCategory];
            }else if(typedKey === 'connectionType' && !(typedKey in ConnectionType)){
              acc[typedKey] = ConnectionType[integrationForm[typedKey] as keyof typeof ConnectionType ];
            }else if(typedKey === 'authType' && !(typedKey in AuthType)){
              acc[typedKey] = AuthType[integrationForm[typedKey] as keyof typeof AuthType];
            }
             else {
              acc[typedKey] = integrationForm[typedKey] as never;
            }
          }
          return acc;
        }, {} as IntegrationTypes);

        console.log('Edited Fiedlds', EditedFields);
  
        // const body = { ...integrationForm };
        await updateIntegrationFn(id, {
            applicationName: ApplicationName.Azure_DevOps
              } as any);
  
        // if (close) {
        //   onCloseHandler(true);
        // } else {
        //   dispatch({ type: "RESET_INTEGRATION_FORM" });
        //   dispatch({ type: "CLEAR_INTEGRATION_ERRORS" });
        // }
        
        dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
        await refreshIntegrationsAction({}, dispatch);
        return toast.success("Integration updated successfully!");
       
      } catch (error) {
        console.error("Unexpected error:", error);
        return toast.error("Failed to update integration");
      }
    };

  return (
    <ItemHeader
      component="integration"
      breadcrumbs={breadcrumbs}
      backUrl="/x/access-settings/integrations/"
      onEdit={editIntegrationHandler}
      onClose={unsetIntegrationHandler}
      saveEditedIntegration={()=>saveEditedIntegration(selectedIntegration?.id)!}
      onCloseEdit={onCloseHandler}
      type={integrationType.replace(/_/g, " ")}
      currentFlow={integrationFlow!}
      actionPopover={
        <IntegrationActionOptions
          component="details"
          integrationId={id}
          integrationType={
            integrationType.replace(/_/g, " ") as IntegrationType
          }
        />
      }
      selectedItem={
        {
          logo,
          name: integrationName,
          status,
          code: id,
          integrationCategory: integrationCategory.replace(/_/g, " "),
          connectionType,
          integrationType: integrationType.replace(/_/g, " "),
        } as ISelectedItem
      }
    />
  );
}
