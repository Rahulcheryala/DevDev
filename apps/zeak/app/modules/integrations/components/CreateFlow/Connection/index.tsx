import { toast } from "@zeak/react";
import { Fragment, useMemo, useState } from "react";
import { useUnifiedContext } from "../../../context";
import { CreationTabs } from "../../../../../components/Layout";
import { ButtonProps } from "../../../../../components/Layout/Screen/Creation/SaveButton";
import { createIntegrationFn } from "../../../utils/api.utils";
import { integrationGeneralInfoSchema } from "./General";
import { IntegrationAddFlowTabs } from "../../../models/constants";
import { General } from "./General";
import { Schedule } from "./Schedule";
import { TestConnection } from "./TestConnection";
import { FaRegUserCircle } from "react-icons/fa";

type ButtonTypes = "next" | "save" | "draft" | "save_clear";

interface IntegrationCreateFlowProps {
  isOpen: boolean;
  closeDrawer: (bool?: boolean) => void;
}

const ConnectionAddFlow = ({
  isOpen,
  closeDrawer,
}: IntegrationCreateFlowProps) => {
  const [activeTab, setactiveTab] = useState<IntegrationAddFlowTabs>(
    IntegrationAddFlowTabs.STEP_1
  );
  const { state, dispatch } = useUnifiedContext();
  const { connectionForm } = state;

  const onCloseHandler = (bool?: boolean) => {
    setactiveTab(IntegrationAddFlowTabs.STEP_1);
    closeDrawer(bool);
  };

  const validateForm = async () => {
    try {
      await integrationGeneralInfoSchema.parseAsync(connectionForm);
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
      setactiveTab(IntegrationAddFlowTabs.STEP_2);
    } else if (action === "save") {
      saveData(true);
    } else if (action === "save_clear") {
      saveData(false);
    } 
    // else if (action === "draft") {
    //   saveData(true, { status: "draft" });
    // }
  };

  const saveData = async (
    close: boolean = true,
    updateBody?: Partial<typeof connectionForm>
  ) => {
    try {
      const isValid = await validateForm();
      if (!isValid) return;

      const body = { ...connectionForm, ...updateBody };
      // TODO(vamsi): create connection api
      // await createIntegrationFn(body);

      if (close) {
        onCloseHandler(true);
      } else {
        dispatch({ type: "RESET_CONNECTION_FORM" });
        dispatch({ type: "CLEAR_CONNECTION_ERRORS" });
      }

      return toast.success("Integration created successfully!");
    } catch (error) {
      console.error("Unexpected error:", error);
      return toast.error("Failed to create integration");
    }
  };

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

  const mainButton: ButtonProps = useMemo(() => {
    switch (activeTab) {
      case IntegrationAddFlowTabs.STEP_1:
        return {
          label: "Next",
          id: "next",
          onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes),
        };
      case IntegrationAddFlowTabs.STEP_2:
        return {
          label: "Next",
          id: "next",
          onClickHandler: (mode: string) => {
            setactiveTab(IntegrationAddFlowTabs.STEP_3);
          },
        };
      case IntegrationAddFlowTabs.STEP_3:
        return {
          label: "Save & Create Another",
          id: "save_clear",
          onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes),
        };
      default:
        return {
          label: "Next",
          id: "next",
          onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes),
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
            label: "Save & Test Integration",
            id: "save",
            onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes),
          },
          {
            label: "Save & Add New Connection",
            id: "save_clear",
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
      value: IntegrationAddFlowTabs.STEP_1,
      containerClassName: "overflow-auto",
      component: <General />,
    },
    {
      id: "2",
      title: "2. Schedule & Policies",
      value: IntegrationAddFlowTabs.STEP_2,
      containerClassName: "overflow-auto",
      component: <Schedule />,
    },
    {
      id: "3",
      title: "3. Test & Connect",
      value: IntegrationAddFlowTabs.STEP_3,
      containerClassName: "overflow-auto",
      component: <TestConnection />,
    },
  ];

  return (
    <CreationTabs
      label={label}
      isOpen={isOpen}
      tabs={StepTabs}
      mainButton={mainButton}
      optionButtons={optionButtons}
      closeDrawer={onCloseHandler}
      selectedTab={activeTab}
      onTabChanged={(tab) => setactiveTab(tab.value as IntegrationAddFlowTabs)}
    />
  );
};

export default ConnectionAddFlow;
