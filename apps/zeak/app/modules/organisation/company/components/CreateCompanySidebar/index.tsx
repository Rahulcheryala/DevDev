// import Progress from "~/components/Globals/Progress";
import { FormStepper } from "@zeak/ui";
import { stepsList } from "../constants";
import { useCompanyCreateStore } from "~/shared/companyCreateStore";

export default function CreateCompanySidebar() {
  const { activeStep, setActiveStep } = useCompanyCreateStore();

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
    <FormStepper
      breadcrumbs={["Organisation", "New Company"]}
      description="Create New Company"
      currentStep={activeStep}
      steps={progressSteps}
      onStepClick={setActiveStep}
    />
  );
}
