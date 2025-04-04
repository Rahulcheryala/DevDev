import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { VendorFormData, FormStep } from "~/types/vendor";
import {
  FormStep1,
  FormStep2,
  FormStep3,
  FormStep4,
  StepIndicator,
} from "~/modules/vendor-onboarding";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { CheckFiledCircle } from "@zeak/icons";
import { IoCheckmarkCircle } from "react-icons/io5";

const schema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  industry: z.string().min(1, "Industry is required"),
  description: z.string().min(1, "Description is required"),
  taxId: z.string().min(1, "Tax ID is required"),
  vatNumber: z.string().optional(),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  swiftCode: z.string().min(8, "Valid SWIFT code is required"),
  bankAddress: z.string().min(1, "Bank address is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
});

const steps: FormStep[] = [
  {
    title: "Basic Info",
    description: "Company details",
  },
  {
    title: "Location",
    description: "Address & Industry",
  },
  {
    title: "Financial",
    description: "Tax & Banking",
  },
  {
    title: "Review",
    description: "Verify details",
  },
];

export default function VendorFormOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const methods = useForm<VendorFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: VendorFormData) => {
    console.log("Form submitted:", data);
    setIsSubmitted(true);
  };

  const nextStep = async () => {
    const fields: Array<keyof VendorFormData> =
      currentStep === 0
        ? ["companyName", "registrationNumber", "email", "phone"]
        : currentStep === 1
          ? ["address", "city", "country", "industry", "description"]
          : currentStep === 2
            ? ["taxId", "bankName", "accountNumber", "swiftCode", "bankAddress"]
            : ["contactPerson"];

    const isValid = await methods.trigger(fields);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onStepClick = async (stepIndex: number) => {
    // If trying to go forward, validate all previous steps
    if (stepIndex > currentStep) {
      let isValid = true;

      // Validate all steps up to the target step
      for (let i = 0; i <= stepIndex - 1; i++) {
        const fields: Array<keyof VendorFormData> =
          i === 0
            ? ["companyName", "registrationNumber", "email", "phone"]
            : i === 1
              ? ["address", "city", "country", "industry", "description"]
              : i === 2
                ? [
                    "taxId",
                    "bankName",
                    "accountNumber",
                    "swiftCode",
                    "bankAddress",
                  ]
                : ["contactPerson"];

        const stepValid = await methods.trigger(fields);
        if (!stepValid) {
          isValid = false;
          break;
        }
      }

      if (!isValid) {
        return; // Don't allow moving forward if validation fails
      }
    }

    setCurrentStep(stepIndex);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-3xl w-full mx-auto p-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <IoCheckmarkCircle
              size={40}
              className="text-green-500 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Vendor Onboarding Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for completing the vendor onboarding process. Our team
              will review your information and contact you soon.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start New Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-8 pt-6">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Vendor Onboarding
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Complete the form below to register as a vendor
            </p>
            <StepIndicator
              steps={steps}
              currentStep={currentStep}
              onStepClick={onStepClick}
            />
          </div>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="px-8 pb-8"
            >
              <div className="mb-8">
                {currentStep === 0 && <FormStep1 />}
                {currentStep === 1 && <FormStep2 />}
                {currentStep === 2 && <FormStep3 />}
                {currentStep === 3 && <FormStep4 />}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    currentStep === 0 ? "invisible" : ""
                  }`}
                >
                  <BsArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>

                {currentStep === steps.length - 1 ? (
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit
                    <CheckFiledCircle className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Next
                    <BsArrowRight className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
