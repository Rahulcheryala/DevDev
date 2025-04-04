import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { toast, CreationTabs, ButtonProps } from "@zeak/ui";
import { useUnifiedContext } from "../../../context";
import { refreshConnectionsAction } from "../../../context/action";
import { createConnectionFn } from "../../../utils/api.utils";
import { CreationFlowTabs } from "../../../models/constants";
import { IConnectionModel } from "../../../models/connection.model";
import { connectionGeneralInfoSchema } from "../../../hooks/form/useConnectionForm";
import { General } from "./General";
import { Schedule } from "./Schedule";
import { TestConnection } from "./TestConnection";
import { FaRegUserCircle } from "react-icons/fa";

type ButtonTypes = "next" | "save" | "draft" | "save_add_new";

interface ConnectionCreateFlowProps {
  isOpen: boolean;
  closeDrawer: (bool?: boolean) => void;
}

const ConnectionAddFlow = ({
  isOpen,
  closeDrawer,
}: ConnectionCreateFlowProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<CreationFlowTabs>(
    CreationFlowTabs.STEP_1
  );
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const {
    state: {
      connectionForm,
      connectionFlow,
      connectionErrors,
      selectedIntegration,
    },
    dispatch,
  } = useUnifiedContext();

  // Convert integrationErrors object to array of error messages
  useEffect(() => {
    const errorFields = Object.keys(connectionErrors).filter(
      (key) => connectionErrors[key] !== null
    );
    setErrorFields(errorFields);
  }, [connectionErrors]);

  // Initialize integrationId when component mounts
  useEffect(() => {
    if (
      connectionFlow === "create" &&
      selectedIntegration?.id &&
      (!connectionForm?.integrationId ||
        connectionForm.integrationId !== selectedIntegration.id)
    ) {
      dispatch({
        type: "UPDATE_CONNECTION_FORM",
        payload: { integrationId: selectedIntegration.id },
        setFormDirty: false,
      });
    }
  }, [selectedIntegration?.id, connectionFlow]);

  const onCloseHandler = (bool?: boolean) => {
    setActiveTab(CreationFlowTabs.STEP_1);
    closeDrawer(bool);
  };

  const validateForm = async () => {
    try {
      // Create a flattened version of the form data for validation
      const validationData = {
        connectionName: connectionForm.connectionName,
        connectionCode: connectionForm.connectionCode,
        connectionDescription: connectionForm.connectionDescription || "",
        isEnabled: connectionForm.isEnabled || false,
        // Pull nested fields for validation
        environmentURL: connectionForm.connectionDetails?.environmentURL,
      };

      await connectionGeneralInfoSchema.parseAsync(validationData);
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
      saveData(true, { connectionStatus: "Draft" });
    } else if (action === "save_add_new") {
      saveData(true);
      dispatch({ type: "RESET_CONNECTION_FORM" });
      dispatch({ type: "CLEAR_CONNECTION_ERRORS" });
      setActiveTab(CreationFlowTabs.STEP_1);
    }
  };

  const saveData = async (
    close: boolean = true,
    updateBody?: Partial<typeof connectionForm>
  ) => {
    try {
      const isValid = await validateForm();
      if (!isValid) return;

      const body = { ...connectionForm, ...updateBody };
      const connectionResponse = await createConnectionFn(body);

      let connection: IConnectionModel;

      if (Array.isArray(connectionResponse)) {
        connection = connectionResponse[0];
      } else {
        connection = connectionResponse;
      }

      const connectionId = connection?.id;

      if (close) {
        onCloseHandler(true);
      } else {
        dispatch({ type: "RESET_CONNECTION_FORM" });
        dispatch({ type: "CLEAR_CONNECTION_ERRORS" });
      }
      refreshConnectionsAction({}, dispatch);

      return toast.success("SUCCESS", "Connection created successfully!", {
        actions: [
          {
            label: "View Connection",
            onClick: () => {
              navigate(`/x/access-settings/connections/${connectionId}`);
            },
          },
        ],
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      return toast.error(
        "Error",
        "Failed to create connection, Please try again"
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
            if (errorFields.length === 0) {
              setActiveTab(CreationFlowTabs.STEP_3);
            } else {
              toast.warning(
                "Invalid Details",
                `Please check the following fields: ${errorFields.join(", ")}`
              );
            }
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
            label: "Save & Add New",
            id: "save_add_new",
            onClickHandler: (mode: string) => {
              setActiveTab(CreationFlowTabs.STEP_1);
              onSubmit(mode as ButtonTypes);
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
      containerClassName: "overflow-auto",
      component: <General />,
    },
    {
      id: "2",
      title: "2. Schedule & Policies",
      value: CreationFlowTabs.STEP_2,
      containerClassName: "overflow-auto",
      component: <Schedule />,
    },
    {
      id: "3",
      title: "3. Test & Connect",
      value: CreationFlowTabs.STEP_3,
      containerClassName: "overflow-auto",
      component: <TestConnection />,
    },
  ];

  // Variable Assignments
  const label = (
    <>
      New Connection
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

export default ConnectionAddFlow;
