import { toast } from "@zeak/react";
import { Fragment, useMemo, useState } from "react";
import CreationTabs from "~/components/Layout/Screen/Creation/CreationTabs";
import { ButtonProps } from "../../../../../components/Layout/Screen/Creation/SaveButton";
import { useUnifiedContext } from "../../../context";
import { createIntegrationFn } from "../../../utils/api.utils";
import { CreationFlowTabs } from "../../../models/constants";
import { integrationGeneralInfoSchema } from "./GeneralInfo";
import { GeneralInfo } from "./GeneralInfo";
import { SchedulePolicies } from "./SchedulePolicies";
import { TestConnect } from "./TestConnect";
import { FaRegUserCircle } from "react-icons/fa";
import { createIntegrationExample } from "~/modules/integrations/examples/create-integration-example";

type ButtonTypes = "next" | "save" | "draft" | "save_add_new_connection";

interface IntegrationCreateFlowProps {
  isOpen: boolean;
  closeDrawer: (bool?: boolean) => void;
}

const IntegrationAddFlow = ({
  isOpen,
  closeDrawer,
}: IntegrationCreateFlowProps) => {
  const [activeTab, setActiveTab] = useState<CreationFlowTabs>(
    CreationFlowTabs.STEP_1
  );
  const { state, dispatch, openConnectionDrawer } = useUnifiedContext();
  const { integrationForm, integrationFlow } = state;

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
      console.log("integrationForm", integrationForm);

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
          label: "Save & Finish",
          id: "save",
          onClickHandler: (action: string) => onSubmit(action as ButtonTypes),
          // onClickHandler: () => createIntegrationExample()
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
      value: CreationFlowTabs.STEP_1,
      containerClassName: "overflow-y-auto",
      component: <GeneralInfo />,
    },
    {
      id: "2",
      title: "2. Schedule & Policies",
      value: CreationFlowTabs.STEP_2,
      containerClassName: "overflow-auto",
      // component: <SchedulePolicies />,
      component: <div>Schedule Policies</div>,
    },
    {
      id: "3",
      title: "3. Test & Connect",
      value: CreationFlowTabs.STEP_3,
      containerClassName: "overflow-auto",
      // component: <TestConnect />,
      component: <div>Test & Connect</div>,
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
      onTabChanged={(tab) => setActiveTab(tab.value as CreationFlowTabs)}
    />
  );
};

export default IntegrationAddFlow;
