import { toast } from "@zeak/react";
import { Fragment, useMemo, useState } from "react";
import { useUnifiedContext } from "../../context";
import { CreationTabs } from "../../../../components/Layout";
import { ButtonProps } from "../../../../components/Layout/Screen/Creation/SaveButton";
import { createIntegrationFn } from "../../utils/api.utils";
import { integrationGeneralInfoSchema } from "./GeneralInfo";
import { IntegrationAddFlowTabs } from "../../models/constants";
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
  const [activeTab, setActiveTab] = useState<IntegrationAddFlowTabs>(
    IntegrationAddFlowTabs.STEP_1
  );
  const { state, dispatch, openConnectionDrawer } = useUnifiedContext();
  const { integrationForm, integrationFlow } = state;

  const onCloseHandler = (bool?: boolean) => {
    setActiveTab(IntegrationAddFlowTabs.STEP_1);
    closeDrawer(bool);
  };

  const validateForm = async () => {
    try {
      await integrationGeneralInfoSchema.parseAsync(integrationForm);
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
      setActiveTab(IntegrationAddFlowTabs.STEP_2);
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
      await createIntegrationFn(body);

      if (close) {
        onCloseHandler(true);
      } else {
        dispatch({ type: "RESET_INTEGRATION_FORM" });
        dispatch({ type: "CLEAR_INTEGRATION_ERRORS" });
      }

      return toast.success("Integration created successfully!");
    } catch (error) {
      console.error("Unexpected error:", error);
      return toast.error("Failed to create integration");
    }
  };

  const mainButton: ButtonProps = useMemo(() => {
    switch (activeTab) {
      case IntegrationAddFlowTabs.STEP_1:
        return {
          label: "Next",
          id: "next",
          onClickHandler: () => setActiveTab(IntegrationAddFlowTabs.STEP_2),
        };
      case IntegrationAddFlowTabs.STEP_2:
        return {
          label: "Next",
          id: "next",
          onClickHandler: () => setActiveTab(IntegrationAddFlowTabs.STEP_3),
        };
      case IntegrationAddFlowTabs.STEP_3:
        return {
          label: "Save & Finish",
          id: "save",
          onClickHandler: (action: string) => onSubmit(action as ButtonTypes),
        };
      default:
        return {
          label: "Next",
          id: "next",
          onClickHandler: () => setActiveTab(IntegrationAddFlowTabs.STEP_1),
        };
    }
  }, [activeTab]);

  const optionButtons: ButtonProps[] = useMemo(() => {
    switch (activeTab) {
      case IntegrationAddFlowTabs.STEP_1:
      case IntegrationAddFlowTabs.STEP_2:
        return [
          {
            label: "Save as Draft",
            id: "draft",
            onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes),
          },
        ];
      case IntegrationAddFlowTabs.STEP_3:
        return [
          {
            label: "Save & Add New Connection",
            id: "save_add_new_connection",
            onClickHandler: (mode: string) => {
              openConnectionDrawer("create");
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
      value: IntegrationAddFlowTabs.STEP_1,
      containerClassName: "overflow-y-auto",
      component: <GeneralInfo />,
    },
    {
      id: "2",
      title: "2. Schedule & Policies",
      value: IntegrationAddFlowTabs.STEP_2,
      containerClassName: "overflow-auto",
      component: <SchedulePolicies />,
    },
    {
      id: "3",
      title: "3. Test & Connect",
      value: IntegrationAddFlowTabs.STEP_3,
      containerClassName: "overflow-auto",
      component: <TestConnect />,
    },
  ];

  // Variable Assignments
  const label = (
    <Fragment>
      New Integration
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
      onTabChanged={(tab) => setActiveTab(tab.value as IntegrationAddFlowTabs)}
    />
  );
};

export default IntegrationAddFlow;
