import { toast } from "@zeak/react";
import { Fragment, useMemo, useState } from "react";
import { useUnifiedContext } from "../../../context";
import { CreationTabs } from "../../../../../components/Layout";
import { ButtonProps } from "../../../../../components/Layout/Screen/Creation/SaveButton";
import { createConnectionFn, createIntegrationFn } from "../../../utils/api.utils";
import { connectionGeneralInfoSchema } from "./General";
import { CreationFlowTabs } from "../../../models/constants";
import { General } from "./General";
import { Schedule } from "./Schedule";
import { TestConnection } from "./TestConnection";
import { FaRegUserCircle } from "react-icons/fa";
import { createIntegrationExample } from "~/modules/integrations/examples/create-integration-example";
import { createConnectionExample } from "~/modules/integrations/examples/create-connection-example";

type ButtonTypes = "next" | "save" | "draft" | "save_add_new_connection";

interface IntegrationCreateFlowProps {
  isOpen: boolean;
  closeDrawer: (bool?: boolean) => void;
}

const ConnectionAddFlow = ({
  isOpen,
  closeDrawer,
}: IntegrationCreateFlowProps) => {
  const [activeTab, setActiveTab] = useState<CreationFlowTabs>(
    CreationFlowTabs.STEP_1
  );
  const { state, dispatch } = useUnifiedContext();
  const { connectionForm, selectedIntegration } = state;

  const onCloseHandler = (bool?: boolean) => {
    setActiveTab(CreationFlowTabs.STEP_1);
    closeDrawer(bool);
  };

  const validateForm = async () => {
    try {
      await connectionGeneralInfoSchema.parseAsync(connectionForm);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast.warning("Missing Details, Cannot submit the form");
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
    } else if (action === "save_add_new_connection") {
      saveData(true);
      dispatch({ type: "RESET_CONNECTION_FORM" });
      dispatch({ type: "CLEAR_CONNECTION_ERRORS" });
      setActiveTab(CreationFlowTabs.STEP_1)
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
      await createConnectionFn(body);

      if (close) {
        onCloseHandler(true);
      } else {
        dispatch({ type: "RESET_CONNECTION_FORM" });
        dispatch({ type: "CLEAR_CONNECTION_ERRORS" });
      }

      return toast.success("Connection created successfully!");
    } catch (error) {
      console.error("Unexpected error:", error);
      return toast.error("Failed to create connection");
    }
  };

  const mainButton: ButtonProps = useMemo(() => {
    switch (activeTab) {
      case CreationFlowTabs.STEP_1:
        return {
          label: "Next",
          id: "next",
          onClickHandler: () => setActiveTab(CreationFlowTabs.STEP_2),
        };
      case CreationFlowTabs.STEP_2:
        return {
          label: "Next",
          id: "next",
          onClickHandler: () => setActiveTab(CreationFlowTabs.STEP_3),
        };
      case CreationFlowTabs.STEP_3:
        return {
          label: "Save & Create Another",
          id: "save_clear",
          onClickHandler: (action: string) => onSubmit(action as ButtonTypes),
          // onClickHandler: () => createConnectionExample(selectedIntegration?.id!)
        };
      default:
        return {
          label: "Next",
          id: "next",
          onClickHandler: () => setActiveTab(CreationFlowTabs.STEP_1),
        };
    }
  }, [activeTab]);

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
            id: "save_add_new_connection",
            onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes),
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
      // component: <Schedule />,
      component: <div>Schedule & Policies</div>,
    },
    {
      id: "3",
      title: "3. Test & Connect",
      value: CreationFlowTabs.STEP_3,
      containerClassName: "overflow-auto",
      // component: <TestConnection />,
      component: <div>Test & Connect</div>,
    },
  ];

  // Variable Assignments
  const label = (
    <Fragment>
      New Connection
      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-500 px-4 py-2.5 rounded-xl ml-4">
        <FaRegUserCircle className="text-lg" />
        <span className="text-base font-medium">User Defined</span>
      </div>
    </Fragment>
  );

  return (
    <CreationTabs
      label={label}
      isOpen={isOpen}
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
