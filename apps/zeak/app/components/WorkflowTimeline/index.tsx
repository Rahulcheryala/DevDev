import { CustomTimeline } from "../CustomTimeline";

interface WorkflowTimelineProps {
  steps: {
    integration: boolean;
    mapping: boolean;
    frequency: boolean;
    notification: boolean;
  };
  onStepClick: (
    step: "integration" | "frequency" | "mapping" | "notification",
  ) => void;
  currentStep: "integration" | "frequency" | "mapping" | "notification";
}

export function WorkflowTimeline({
  steps,
  onStepClick,
  currentStep,
}: WorkflowTimelineProps) {
  const stepDetails = [
    {
      id: "integration",
      title: "Microsoft Dynamics Integration",
      description: "Connect your D365 instance",
      completed: steps.integration,
    },
    {
      id: "frequency",
      title: "Sync Frequency",
      description: "Set automation schedule",
      completed: steps.frequency,
    },
    {
      id: "mapping",
      title: "Data Mapping",
      description: "Configure column mappings",
      completed: steps.mapping,
    },
    {
      id: "notification",
      title: "Notifications",
      description: "Set up alert preferences",
      completed: steps.notification,
    },
  ];

  return (
    <CustomTimeline
      steps={stepDetails}
      onStepClick={(stepId) =>
        onStepClick(
          stepId as "integration" | "frequency" | "mapping" | "notification",
        )
      }
      currentStep={currentStep}
    />
  );
}
