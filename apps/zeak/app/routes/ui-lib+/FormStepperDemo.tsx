import { useState } from "react";
import { FormStepper, Button } from "@zeak/ui";

export default function FormStepperDocumentation() {
    const [activeStep, setActiveStep] = useState(0);

    // Example step data
    const steps = [
        {
            id: 1,
            title: "Step 1",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
            isRequired: true,
            isCompleted: activeStep > 0,
            clickable: true
        },
        {
            id: 2,
            title: "Step 2",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
            isRequired: true,
            isCompleted: activeStep > 1,
            clickable: true
        },
        {
            id: 3,
            title: "Step 3",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
            isRequired: false,
            isCompleted: activeStep > 2,
            clickable: true
        },
        {
            id: 4,
            title: "Step 4",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
            isRequired: true,
            isCompleted: activeStep > 3,
            clickable: false
        },
    ];

    const nextStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const prevStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Form Stepper Component</h1>
                <p className="text-gray-600 text-lg">
                    A progressive form stepper component for multi-step processes with visual tracking of completed and required steps.
                </p>
            </header>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} FormStepper {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Basic Usage</h2>
                <div className="flex flex-col gap-6 p-6 bg-[#F0F4FD] rounded-lg border border-gray-200">
                    <FormStepper
                        breadcrumbs={["Previous", "Next"]}
                        description="Create New Form Stepper"
                        currentStep={activeStep}
                        steps={steps}
                        onStepClick={setActiveStep}
                    />
                    <div className="flex justify-between mt-6">
                        <Button
                            onClick={prevStep}
                            disabled={activeStep === 0}
                            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                        >
                            Previous
                        </Button>
                        <Button
                            onClick={nextStep}
                            disabled={activeStep === steps.length - 1}
                            className="bg-indigo-600 text-white hover:bg-indigo-700"
                        >
                            Next
                        </Button>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-800">
                            Current step: <strong>{activeStep + 1}</strong> - {steps[activeStep].title}
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Visual representation of multi-step processes</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Required step indicators</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Completion tracking for steps</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Interactive step navigation (clickable steps)</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Customizable step descriptions</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Breadcrumb navigation support</span>
                    </li>
                </ul>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Props</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-5 gap-4 border-b pb-3 pt-3 px-4 font-medium bg-gray-50 text-gray-700">
                        <div>Prop</div>
                        <div>Type</div>
                        <div>Required</div>
                        <div>Default</div>
                        <div>Description</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">steps</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">Step[]</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>Array of step objects defining the stepper</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">currentStep</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">number</code></div>
                        <div>Yes</div>
                        <div>0</div>
                        <div>Index of the currently active step</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onStepClick</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(stepIndex: number) {'=>'} void</code></div>
                        <div>Yes</div>
                        <div>-</div>
                        <div>Handler for step click events</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">breadcrumbs</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string[]</code></div>
                        <div>No</div>
                        <div>[]</div>
                        <div>Array of strings for breadcrumb navigation</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">description</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>""</div>
                        <div>Descriptive text for the stepper</div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Step Type</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`type Step = {
  id: number;
  title: string;
  description: string;
  isRequired: boolean;
  isCompleted: boolean;
  clickable: boolean;
};`}</pre>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Implementation Example</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`import { useState } from "react";
import { FormStepper } from "@zeak/ui";

// State interface for the form
interface UserSetupForm {
  name: string;
  email: string;
  preferences: string[];
  agreed: boolean;
}

const UserSetupWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<UserSetupForm>({
    name: "",
    email: "",
    preferences: [],
    agreed: false
  });
  
  // Update form data
  const updateForm = (key: keyof UserSetupForm, value: any) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };
  
  // Check if step is completed based on form data
  const isStepCompleted = (step: number) => {
    switch (step) {
      case 0: // Personal info
        return formData.name.trim() !== "" && formData.email.trim() !== "";
      case 1: // Preferences
        return formData.preferences.length > 0;
      case 2: // Agreement
        return formData.agreed;
      default:
        return false;
    }
  };
  
  // Define steps for the stepper
  const steps = [
    {
      id: 1,
      title: "Personal Information",
      description: "Enter your name and email",
      isRequired: true,
      isCompleted: isStepCompleted(0),
      clickable: true
    },
    {
      id: 2,
      title: "Preferences",
      description: "Select your preferences",
      isRequired: true,
      isCompleted: isStepCompleted(1),
      clickable: isStepCompleted(0)
    },
    {
      id: 3,
      title: "Terms & Conditions",
      description: "Review and accept terms",
      isRequired: true,
      isCompleted: isStepCompleted(2),
      clickable: isStepCompleted(0) && isStepCompleted(1)
    },
    {
      id: 4,
      title: "Complete",
      description: "Complete setup process",
      isRequired: false,
      isCompleted: false,
      clickable: false
    }
  ];
  
  // Render form based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateForm('name', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateForm('email', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Preferences</h3>
            {/* Preferences checkboxes would go here */}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Terms & Conditions</h3>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.agreed}
                  onChange={(e) => updateForm('agreed', e.target.checked)}
                  className="mr-2"
                />
                <span>I agree to the terms and conditions</span>
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-semibold text-green-600">Setup Complete!</h3>
            <p>Thank you for completing the setup process.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-8">
      <FormStepper
        breadcrumbs={["Dashboard", "User Setup"]}
        description="Complete your user profile setup"
        currentStep={currentStep}
        steps={steps}
        onStepClick={setCurrentStep}
      />
      
      <div className="p-6 bg-white border rounded-lg">
        {renderStepContent()}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        
        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1 || !isStepCompleted(currentStep)}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {currentStep === steps.length - 2 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};`}</pre>
                </div>
            </section>
        </div>
    );
} 