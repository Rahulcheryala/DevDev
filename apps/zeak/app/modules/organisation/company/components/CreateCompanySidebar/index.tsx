import Progress from "~/components/Globals/Progress";
import { stepsList } from "../constants";
import { useCompanyStore } from "../../utils/useCompanyStore";

export default function CreateCompanySidebar() {
  const { activeStep, setActiveStep } = useCompanyStore();

  // Map stepsList to match Progress component's step structure
  const progressSteps = stepsList.map((step, index) => ({
    id: index + 1,
    title: step.title,
    description: step.subTitle, // Using subTitle as description
    isRequired: step.isRequired,
    isCompleted: step.isCompleted,
    clickable: step.clickable
  }));

  return (
    <Progress
      breadcrumbs={["Organisation", "New Company"]}
      description="Create New Company"
      currentStep={activeStep}
      steps={progressSteps}
      onStepClick={setActiveStep}
    />
  );
}
