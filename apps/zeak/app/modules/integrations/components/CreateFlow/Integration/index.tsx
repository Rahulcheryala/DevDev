import { useMemo, useState, useEffect } from "react";
import { useNavigate } from '@remix-run/react';
import { toast, CreationTabs, ButtonProps } from "@zeak/ui";
import { useUnifiedContext } from "../../../context";
import { refreshIntegrationsAction } from "../../../context/action";
import { createIntegrationFn } from "../../../utils/api.utils";
import { CreationFlowTabs } from "../../../models/constants";
import { IIntegrationModel } from "../../../models/integration.model";
import { integrationGeneralInfoSchema } from "../../../hooks/form/useIntegrationForm";
import { GeneralInfo } from "./GeneralInfo";
import { SchedulePolicies } from "./SchedulePolicies";
import { TestConnect } from "./TestConnect";
import { FaRegUserCircle } from "react-icons/fa";

type ButtonTypes = "next" | "save" | "draft" | "save_add_new_connection";

interface IntegrationCreateFlowProps {
  isOpen: boolean;
  closeDrawer: (bool?: boolean) => void;
}

const IntegrationAddFlow = ({
  isOpen,
  closeDrawer,
}: IntegrationCreateFlowProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<CreationFlowTabs>(
    CreationFlowTabs.STEP_1
  );
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const {
    state: { integrationForm, integrationErrors },
    dispatch,
    openConnectionDrawer,
  } = useUnifiedContext();

  // Convert integrationErrors object to array of error messages
  useEffect(() => {
    const errorFields = Object.keys(integrationErrors).filter(
      (key) => integrationErrors[key] !== null
    );
    setErrorFields(errorFields);
  }, [integrationErrors]);

  const onCloseHandler = (bool?: boolean) => {
    setActiveTab(CreationFlowTabs.STEP_1);
    closeDrawer(bool);
  };

  const validateForm = async () => {
    try {
      await integrationGeneralInfoSchema.parseAsync(integrationForm);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast.warning("Missing Details", "Please fill in all required fields");
      }
      return false;
    }
  };

  const onSubmit = async (action: ButtonTypes) => {
    if (action === "next") {
      setActiveTab(CreationFlowTabs.STEP_2);
    } else if (action === "save") {
      saveData(true);
    } else if (action === "draft") {
      saveData(true, { status: "Draft" });
    } else if (action === "save_add_new_connection") {
      saveData(true);
      openConnectionDrawer("create");
    }
  };

  const saveData = async (
    close: boolean = true,
    updateBody?: Partial<typeof integrationForm>
  ) => {
    try {
      const isValid = await validateForm();
      if (!isValid) return;

      const body = { ...integrationForm, ...updateBody };
      const integrationResponse = await createIntegrationFn(body);
      
      let integration: IIntegrationModel;
      
      if (Array.isArray(integrationResponse)) {
        integration = integrationResponse[0];
      } else {
        integration = integrationResponse;
      }

      const integrationId = integration?.id;

      if (close) {
        onCloseHandler(true);
      } else {
        dispatch({ type: "RESET_INTEGRATION_FORM" });
        dispatch({ type: "CLEAR_INTEGRATION_ERRORS" });
      }
      refreshIntegrationsAction({}, dispatch);

      return toast.success("SUCCESS", "Integration created successfully!", {
        actions: [
          {
            label: "View Integration",
            onClick: () => {
              navigate(`/x/access-settings/integrations/${integrationId}`);
            },
          },
          {
            label: "Add New Connection",
            onClick: () => {
              dispatch({ type: "SET_SELECTED_INTEGRATION", payload: integration });
              openConnectionDrawer("create");
            },
          },
        ],
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      return toast.error(
        "Error",
        "Failed to create integration, Please try again"
      );
    }
  };

  const mainButton: ButtonProps = useMemo(() => {
    switch (activeTab) {
      case CreationFlowTabs.STEP_1:
        return {
          label: "Next",
          id: "next",
          onClickHandler: () => {
            if (errorFields.length === 0) {
              setActiveTab(CreationFlowTabs.STEP_2);
            } else {
              toast.warning(
                "Invalid Details",
                `Please check the following fields: ${errorFields.join(", ")}`
              );
            }
          },
        };
      case CreationFlowTabs.STEP_2:
        return {
          label: "Next",
          id: "next",
          onClickHandler: () => {
            if (errorFields.length === 0) setActiveTab(CreationFlowTabs.STEP_3);
          },
        };
      case CreationFlowTabs.STEP_3:
        return {
          label: "Save & Finish",
          id: "save",
          onClickHandler: (action: string) => onSubmit(action as ButtonTypes),
        };
      default:
        return {
          label: "Next",
          id: "next",
          onClickHandler: () => setActiveTab(CreationFlowTabs.STEP_1),
        };
    }
  }, [activeTab, errorFields]);

  const optionButtons: ButtonProps[] = useMemo(() => {
    switch (activeTab) {
      case CreationFlowTabs.STEP_1:
      case CreationFlowTabs.STEP_2:
        return [
          {
            label: "Save as Draft",
            id: "draft",
            onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes),
          },
        ];
      case CreationFlowTabs.STEP_3:
        return [
          {
            label: "Save & Add New Connection",
            id: "save_add_new_connection",
            onClickHandler: (mode: string) => {
              onSubmit(mode as ButtonTypes);
              openConnectionDrawer("create");
            },
          },
          {
            label: "Save as Draft",
            id: "draft",
            onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes),
          },
        ];
      default:
        return [];
    }
  }, [activeTab]);

  const StepTabs = [
    {
      id: "1",
      title: "1. General",
      value: CreationFlowTabs.STEP_1,
      containerClassName: "overflow-y-auto",
      component: <GeneralInfo />,
    },
    {
      id: "2",
      title: "2. Schedule & Policies",
      value: CreationFlowTabs.STEP_2,
      containerClassName: "overflow-auto",
      component: <SchedulePolicies />,
    },
    {
      id: "3",
      title: "3. Test & Connect",
      value: CreationFlowTabs.STEP_3,
      containerClassName: "overflow-auto",
      component: <TestConnect />,
    },
  ];

  // Variable Assignments
  const label = (
    <>
      New Integration
      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-500 px-4 py-2.5 rounded-xl ml-4">
        <FaRegUserCircle className="text-lg" />
        <span className="text-base font-medium">User Defined</span>
      </div>
    </>
  );

  return (
    <CreationTabs
      isOpen={isOpen}
      label={label}
      tabs={StepTabs}
      mainButton={mainButton}
      optionButtons={optionButtons}
      closeDrawer={onCloseHandler}
      selectedTab={activeTab}
      onTabChanged={(tab) => setActiveTab(tab.value as CreationFlowTabs)}
    />
  );
};

export default IntegrationAddFlow;
